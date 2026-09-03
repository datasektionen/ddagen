import { useLocale } from "@/locales";
import type Locale from "@/locales";
import { useEffect, useMemo, useState } from "react";
import { addImageDetails } from "@/shared/addImageDetails";
import { prisma } from "@/server/db";
import { NextSeo } from "next-seo";
import { CheckMark } from "@/components/CheckMark";

type Offers = {
  summerJob: number[];
  internship: number[];
  partTimeJob: number[];
  masterThesis: boolean;
  fullTimeJob: boolean;
  traineeProgram: boolean;
};

type Exhibitor = {
  name: string;
  logo: string | null;
  description: string;
  industry: string;
  packageTier: number;
  offers: Offers;
};

const OFFER_KEYS = [
  "summer",
  "internship",
  "partTime",
  "thesis",
  "fullTime",
  "trainee",
] as const;
type OfferKey = (typeof OFFER_KEYS)[number];

const YEARS = [0, 1, 2, 3, 4] as const;

function offerLabel(t: Locale, key: OfferKey) {
  return t.map.description[key];
}

function yearLabels(t: Locale) {
  const y = t.exhibitorSettings.table.row1.section2.year;
  return [y.one, y.two, y.three, y.four, y.five];
}

// Which job offers a company has actually filled in.
function activeOffers(o: Offers): OfferKey[] {
  const out: OfferKey[] = [];
  if (o.summerJob.length) out.push("summer");
  if (o.internship.length) out.push("internship");
  if (o.partTimeJob.length) out.push("partTime");
  if (o.masterThesis) out.push("thesis");
  if (o.fullTimeJob) out.push("fullTime");
  if (o.traineeProgram) out.push("trainee");
  return out;
}

// Union of the study years a company targets across its year-based offers.
function exhibitorYears(o: Offers): number[] {
  const s = new Set<number>();
  [...o.summerJob, ...o.internship, ...o.partTimeJob].forEach((y) => s.add(y));
  return [...s].sort((a, b) => a - b);
}

// main sponsor -> large -> medium -> small -> startup
const tierRank = (tier: number) =>
  tier === 3 ? 0 : tier === 2 ? 1 : tier === 1 ? 2 : tier === 0 ? 3 : 4;

// Cards use a light panel so companies' own logos read directly on them (no
// white box inside the card). The main sponsor (tier 3) is pulled out into a
// hero above the grid; all other cards share the same grey, and the large
// package (tier 2) is marked with a cerise border.
function cardTheme(tier: number) {
  const base = "bg-[#dfe1e9]";
  return tier === 2
    ? `${base} border-2 border-cerise`
    : `${base} border-2 border-black/10`;
}

function Tag({
  children,
  tone = "dark",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const cls =
    tone === "light"
      ? "border-darkblue/15 bg-darkblue/10 text-darkblue"
      : "border-white/25 bg-white/10 text-white";
  return (
    <span
      className={`whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] leading-none ${cls} ${className}`}
    >
      {children}
    </span>
  );
}

function ExhibitorCard({
  t,
  exhibitor,
  onOpen,
}: {
  t: Locale;
  exhibitor: Exhibitor;
  onOpen: () => void;
}) {
  // One primary chip (the company's industry if it wrote one, otherwise its
  // first job offer) plus a "+N" count — keeps the row on a single line even
  // on a narrow two-column phone layout. The rest is in the detail modal.
  const chips = [
    ...(exhibitor.industry ? [exhibitor.industry] : []),
    ...activeOffers(exhibitor.offers).map((k) => offerLabel(t, k)),
  ];

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={exhibitor.name}
      className={`group flex min-h-[180px] flex-col gap-3 rounded-2xl p-4 text-left transition-transform duration-150 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow ${cardTheme(
        exhibitor.packageTier
      )}`}
    >
      <div className="flex flex-1 items-center justify-center px-2 py-3">
        {exhibitor.logo ? (
          <img
            src={addImageDetails(exhibitor.logo)}
            alt={exhibitor.name}
            className="max-h-20 max-w-full object-contain"
          />
        ) : (
          <span className="text-center text-lg font-medium text-darkblue">
            {exhibitor.name}
          </span>
        )}
      </div>

      {chips.length > 0 && (
        <div className="flex items-center gap-1.5">
          <Tag tone="light" className="min-w-0 truncate">
            {chips[0]}
          </Tag>
          {chips.length > 1 && (
            <span className="shrink-0 rounded-full border border-darkblue/15 bg-darkblue/5 px-2 py-1 text-[11px] leading-none text-darkblue/60">
              +{chips.length - 1}
            </span>
          )}
        </div>
      )}
    </button>
  );
}

// The main sponsor (tier 3) — pulled out above the grid, larger, centred, on a
// clean white panel so a black wordmark like Ericsson's sits well.
function SponsorHero({
  t,
  exhibitor,
  onOpen,
}: {
  t: Locale;
  exhibitor: Exhibitor;
  onOpen: () => void;
}) {
  const tags = activeOffers(exhibitor.offers);

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={exhibitor.name}
      className="group flex w-full max-w-xl flex-col items-center gap-2 rounded-3xl border-4 border-yellow bg-white p-6 text-center transition-transform duration-150 hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow sm:p-8"
    >
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-darkblue/70">
        {t.logos.mainSponsor}
      </span>

      <div className="flex min-h-[150px] items-center justify-center sm:min-h-[190px]">
        {exhibitor.logo ? (
          <img
            src={addImageDetails(exhibitor.logo)}
            alt={exhibitor.name}
            className="max-h-36 max-w-[280px] object-contain sm:max-h-48 sm:max-w-[380px]"
          />
        ) : (
          <span className="text-2xl font-medium text-darkblue">
            {exhibitor.name}
          </span>
        )}
      </div>

      {tags.length > 0 && (
        <div className="mt-2 flex flex-wrap justify-center gap-1.5">
          {tags.map((k) => (
            <Tag key={k} tone="light">
              {offerLabel(t, k)}
            </Tag>
          ))}
        </div>
      )}
    </button>
  );
}

function ExhibitorModal({
  t,
  exhibitor,
  onClose,
}: {
  t: Locale;
  exhibitor: Exhibitor;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const offers = activeOffers(exhibitor.offers);
  const years = exhibitorYears(exhibitor.offers);
  const yLabels = yearLabels(t);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={exhibitor.name}
        className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border-2 border-cerise bg-darkblue p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label={t.logos.close}
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-lg leading-none text-white hover:border-yellow"
        >
          &times;
        </button>

        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
          <div className="flex h-28 w-28 flex-none items-center justify-center rounded-2xl bg-[#e9eaf0] p-3">
            {exhibitor.logo ? (
              <img
                src={addImageDetails(exhibitor.logo)}
                alt={exhibitor.name}
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <span className="text-center text-sm font-medium text-darkblue">
                {exhibitor.name}
              </span>
            )}
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-medium uppercase text-cerise sm:text-3xl">
              {exhibitor.name}
            </h2>
            {exhibitor.industry && (
              <p className="mt-1 text-sm text-white/75">{exhibitor.industry}</p>
            )}
          </div>
        </div>

        <hr className="my-5 border-white/25" />

        {exhibitor.description && (
          <p className="whitespace-pre-line text-[15px] leading-relaxed text-white">
            {exhibitor.description}
          </p>
        )}

        {offers.length > 0 && (
          <div className="mt-6">
            <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-cerise">
              {t.logos.offers}
            </h3>
            <div className="flex flex-wrap gap-2">
              {offers.map((k) => (
                <Tag key={k}>{offerLabel(t, k)}</Tag>
              ))}
            </div>
          </div>
        )}

        {years.length > 0 && (
          <div className="mt-5">
            <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-cerise">
              {t.logos.years}
            </h3>
            <div className="flex flex-wrap gap-2">
              {years.map((y) => (
                <Tag key={y}>{yLabels[y]}</Tag>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Logos({
  exhibitorData,
}: {
  exhibitorData: Exhibitor[];
}) {
  const t = useLocale();

  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedOffers, setSelectedOffers] = useState<OfferKey[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [selected, setSelected] = useState<Exhibitor | null>(null);

  const yLabels = yearLabels(t);
  const activeFilterCount = selectedOffers.length + selectedYears.length;

  function toggleOffer(k: OfferKey) {
    setSelectedOffers((prev) =>
      prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]
    );
  }
  function toggleYear(y: number) {
    setSelectedYears((prev) =>
      prev.includes(y) ? prev.filter((x) => x !== y) : [...prev, y]
    );
  }
  function clearFilters() {
    setSelectedOffers([]);
    setSelectedYears([]);
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return exhibitorData.filter((e) => {
      if (
        q &&
        !e.name.toLowerCase().includes(q) &&
        !e.industry.toLowerCase().includes(q)
      )
        return false;

      if (selectedOffers.length) {
        const has = activeOffers(e.offers);
        if (!selectedOffers.some((k) => has.includes(k))) return false;
      }

      if (selectedYears.length) {
        const yrs = exhibitorYears(e.offers);
        if (!selectedYears.some((y) => yrs.includes(y))) return false;
      }

      return true;
    });
  }, [exhibitorData, search, selectedOffers, selectedYears]);

  const sponsors = filtered.filter((e) => e.packageTier === 3);
  const rest = filtered.filter((e) => e.packageTier !== 3);

  const seoContent = {
    sv: {
      title: "Våra Utställare - Träffa Ledande IT-företag",
      description:
        "Upptäck företagen som deltar på D-Dagen 2026! Träffa ledande IT- och techföretag på KTH den 8 oktober och utforska karriärmöjligheter inom data och IT. Se hela listan över utställare här.",
      url: "https://ddagen.se/logos",
    },
    en: {
      title: "Our Exhibitors - Meet Leading IT Companies",
      description:
        "Discover the companies attending D-Dagen 2026! Meet top IT and tech firms at KTH on October 8 and explore career opportunities in computer science and IT. View the full list of exhibitors here.",
      url: "https://ddagen.se/en/logos",
    },
  };
  const { title, description, url } = seoContent[t.locale as "sv" | "en"];

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{ url, title, description }}
        additionalMetaTags={[{ name: "robots", content: "index, follow" }]}
      />

      <div className="mx-auto max-w-[1200px] px-4 pb-32 pt-28 sm:px-8 sm:pt-36 lg:px-12">
        <h1 className="text-4xl font-medium uppercase text-cerise sm:text-5xl">
          {t.logos.header}
        </h1>

        {/* Search + filter */}
        <div className="mt-8 flex flex-row items-stretch gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.map.search.placeHolder}
            aria-label={t.map.search.placeHolder}
            className="box-border h-12 min-w-0 flex-1 rounded-full border-2 border-cerise bg-white/5 px-5 text-base text-white outline-none placeholder:text-white/40 focus:border-yellow"
          />
          <button
            type="button"
            onClick={() => setShowFilter((v) => !v)}
            aria-expanded={showFilter}
            className={`box-border inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full border-2 border-cerise px-4 text-sm font-medium uppercase tracking-wide transition-colors sm:px-6 ${
              showFilter || activeFilterCount
                ? "bg-cerise text-white"
                : "text-white hover:bg-cerise/20"
            }`}
          >
            {t.map.search.buttonTwo}
            {activeFilterCount > 0 && (
              <span className="rounded-full bg-white/25 px-2 text-xs">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {showFilter && (
          <div className="mt-3 rounded-2xl border-2 border-cerise/60 bg-black/40 p-5 backdrop-blur-sm">
            <div className="grid gap-6 sm:grid-cols-2">
              <fieldset>
                <legend className="mb-3 text-xs font-medium uppercase tracking-wider text-cerise">
                  {t.map.description.offers}
                </legend>
                <div className="flex flex-col gap-2.5">
                  {OFFER_KEYS.map((k) => (
                    <label
                      key={k}
                      className="flex cursor-pointer items-center gap-3 text-sm text-white"
                    >
                      <CheckMark
                        name={k}
                        checked={selectedOffers.includes(k)}
                        onChange={() => toggleOffer(k)}
                      />
                      {offerLabel(t, k)}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="mb-3 text-xs font-medium uppercase tracking-wider text-cerise">
                  {t.logos.years}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {YEARS.map((y) => (
                    <button
                      key={y}
                      type="button"
                      onClick={() => toggleYear(y)}
                      aria-pressed={selectedYears.includes(y)}
                      className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                        selectedYears.includes(y)
                          ? "border-cerise bg-cerise text-white"
                          : "border-white/30 text-white hover:border-yellow"
                      }`}
                    >
                      {yLabels[y]}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>

            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 text-sm text-cerise underline hover:text-yellow"
              >
                {t.logos.clear}
              </button>
            )}
          </div>
        )}

        <p className="mt-4 text-sm text-white/70">
          {filtered.length} {t.logos.results}
        </p>

        {/* Main sponsor + grid */}
        {filtered.length === 0 ? (
          <p className="py-20 text-center text-white/70">{t.logos.noResults}</p>
        ) : (
          <>
            {sponsors.length > 0 && (
              <div className="mt-6 flex flex-wrap justify-center gap-6">
                {sponsors.map((e) => (
                  <SponsorHero
                    key={e.name}
                    t={t}
                    exhibitor={e}
                    onOpen={() => setSelected(e)}
                  />
                ))}
              </div>
            )}
            {rest.length > 0 && (
              <div className="mt-6 grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-3">
                {rest.map((e) => (
                  <ExhibitorCard
                    key={e.name}
                    t={t}
                    exhibitor={e}
                    onOpen={() => setSelected(e)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {selected && (
        <ExhibitorModal
          t={t}
          exhibitor={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}

export async function getServerSideProps() {
  const exhibitors = await prisma.exhibitor
    .findMany({ include: { jobOffers: true } })
    .catch(() => [] as never[]);

  const exhibitorData: Exhibitor[] = exhibitors
    .map((exhibitor) => ({
      name: exhibitor.name,
      logo:
        exhibitor.logoColor?.toString("base64") ||
        exhibitor.logoWhite?.toString("base64") ||
        null,
      description: exhibitor.description || "",
      industry: exhibitor.industry || "",
      packageTier: exhibitor.packageTier,
      offers: {
        summerJob: exhibitor.jobOffers?.summerJob ?? [],
        internship: exhibitor.jobOffers?.internship ?? [],
        partTimeJob: exhibitor.jobOffers?.partTimeJob ?? [],
        masterThesis: exhibitor.jobOffers?.masterThesis ?? false,
        fullTimeJob: exhibitor.jobOffers?.fullTimeJob ?? false,
        traineeProgram: exhibitor.jobOffers?.traineeProgram ?? false,
      },
    }))
    // Same visibility rule as before: needs a logo and an assigned package tier.
    .filter((e) => e.logo && e.packageTier >= 0)
    .sort(
      (a, b) =>
        tierRank(a.packageTier) - tierRank(b.packageTier) ||
        a.name.localeCompare(b.name, "sv")
    );

  return { props: { exhibitorData } };
}
