import Link from "next/link";
import { MockupSeo } from "@/components/MapMockups/ui";

// Index of the map mockups. Every mockup has both floors, the numbered dots,
// companies from exhibitors.md shown with the /logos card and modal, a map
// that stops at the plan's edges with a "show whole map" button, and separate
// phone and desktop layouts.

const MOCKUPS = [
  { title: "Search first", idea: "The map fills the screen with search floating on top; matches light up and the rest of the dots go grey." },
  { title: "Thumb zone", idea: "Every control lives in a bottom sheet you drag with one thumb; the top of the screen is only map." },
  { title: "Accessible, list first", idea: "The list is the main view, with real tabs, large targets, visible focus and \"Show on map\" on every company." },
  { title: "Logo carousel", idea: "Logos sit on the map and a swipeable row of cards runs along the bottom; swiping moves the map." },
  { title: "Editorial", idea: "A normal scrolling page like /logos: big heading, the map as a framed hero, cards grouped by floor below." },
  { title: "Lite", idea: "A plain text list that's fast on a busy phone; the map only loads when you open it." },
  { title: "Full-bleed minimal", idea: "The map is the whole page; one \"All companies\" button opens search, filters and the cards." },
  { title: "Wayfinding zones", idea: "Companies grouped by the rooms on the plan (Hyllan, Puben…); picking a room flies the map there." },
  { title: "Power user", idea: "Filters, map and a sortable table side by side on desktop, driven from the keyboard." },
  { title: "Today's page, fixed", idea: "The current layout people already know, with only the broken parts fixed." },
];

export default function MapMockups() {
  return (
    <>
      <MockupSeo title="Map mockups" />
      <div className="mx-auto max-w-[1200px] px-4 pb-32 pt-28 sm:px-8 sm:pt-36 lg:px-12">
        <h1 className="text-4xl font-medium uppercase text-cerise sm:text-5xl">Map mockups</h1>
        <p className="mt-4 max-w-2xl text-white/80">
          Ten directions for the new map page. All of them keep both floors, the numbered dots,
          the companies from exhibitors.md with the /logos cards, and a map that can&apos;t be lost
          off-screen. Open each one on a phone and on a computer.
        </p>
        <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {MOCKUPS.map((m, i) => (
            <li key={m.title}>
              <Link
                href={`/map/mockups/${i + 1}`}
                className="group flex h-full gap-4 rounded-2xl border-2 border-cerise/60 bg-white/5 p-5 transition-colors hover:border-cerise hover:bg-cerise/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cerise text-xl font-medium text-white">
                  {i + 1}
                </span>
                <span>
                  <span className="block text-xl font-medium uppercase text-white group-hover:text-yellow">
                    {m.title}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-white/75">{m.idea}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
