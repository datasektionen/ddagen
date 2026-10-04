import { useLocale } from "@/locales";
import type Locale from "@/locales";
import { useMemo, useState } from "react";
import { addImageDetails } from "@/shared/addImageDetails";
import { prisma } from "@/server/db";
import { NextSeo } from "next-seo";
import { CheckMark } from "@/components/CheckMark";
import {
  type Exhibitor,
  OFFER_KEYS,
  type OfferKey,
  offerLabel,
  yearLabels,
  activeOffers,
  exhibitorYears,
  Tag,
  ExhibitorCard,
  ExhibitorModal,
} from "@/components/ExhibitorCard";

const YEARS = [0, 1, 2, 3, 4] as const;

// main sponsor -> large -> medium -> small -> startup
const tierRank = (tier: number) =>
  tier === 3 ? 0 : tier === 2 ? 1 : tier === 1 ? 2 : tier === 0 ? 3 : 4;

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
            className="max-h-36 max-w-[280px] object-contain sm:max-h-48 sm:max-w-[380px] w-full h-full"
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
