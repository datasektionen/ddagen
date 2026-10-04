import type Locale from "@/locales";
import { useEffect } from "react";
import { addImageDetails } from "@/shared/addImageDetails";

export type Offers = {
  summerJob: number[];
  internship: number[];
  partTimeJob: number[];
  masterThesis: boolean;
  fullTimeJob: boolean;
  traineeProgram: boolean;
};

export type Exhibitor = {
  name: string;
  logo: string | null;
  description: string;
  industry: string;
  packageTier: number;
  offers: Offers;
};

export const OFFER_KEYS = [
  "summer",
  "internship",
  "partTime",
  "thesis",
  "fullTime",
  "trainee",
] as const;
export type OfferKey = (typeof OFFER_KEYS)[number];

export function offerLabel(t: Locale, key: OfferKey) {
  return t.map.description[key];
}

export function yearLabels(t: Locale) {
  const y = t.exhibitorSettings.table.row1.section2.year;
  return [y.one, y.two, y.three, y.four, y.five];
}

// Which job offers a company has actually filled in.
export function activeOffers(o: Offers): OfferKey[] {
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
export function exhibitorYears(o: Offers): number[] {
  const s = new Set<number>();
  [...o.summerJob, ...o.internship, ...o.partTimeJob].forEach((y) => s.add(y));
  return [...s].sort((a, b) => a - b);
}

// Cards use a light panel so companies' own logos read directly on them (no
// white box inside the card). The main sponsor (tier 3) is pulled out into a
// hero above the grid; all other cards share the same grey, and the large
// package (tier 2) is marked with a cerise border.
export function cardTheme(tier: number) {
  const base = "bg-[#dfe1e9]";
  return tier === 2
    ? `${base} border-2 border-cerise`
    : `${base} border-2 border-black/10`;
}

export function Tag({
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

export function ExhibitorCard({
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

// main sponsor -> large -> medium -> small -> startup
export const tierRank = (tier: number) =>
  tier === 3 ? 0 : tier === 2 ? 1 : tier === 1 ? 2 : tier === 0 ? 3 : 4;

// The main sponsor (tier 3) — pulled out above the grid, larger, centred, on a
// clean white panel so a black wordmark like Ericsson's sits well.
export function SponsorHero({
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

export function ExhibitorModal({
  t,
  exhibitor,
  onClose,
}: {
  t: Locale;
  exhibitor: Exhibitor;
  onClose: () => void;
}) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
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
