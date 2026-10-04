import { useEffect, useState, useLayoutEffect } from "react";
import fs from "fs";
import path from "path";
import { prisma } from "@/server/db";
import { useLocale } from "@/locales";
import { MapProp } from "@/shared/Classes";
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('@/components/Map/NewMap'), { ssr: false });
import Search from "@/components/Map/Search";
import ExhibitorExplorer from "@/components/Map/ExhibitorExplorer";
import { ExhibitorModal } from "@/components/ExhibitorCard";
import { NextSeo } from 'next-seo';

export default function Karta({ exhibitorData }: { exhibitorData: MapProp[] }) {
  const t = useLocale();

  const [exhibitors, setExhibitors] = useState(
    Object.fromEntries(
      exhibitorData.map((exhibitor) => [exhibitor.position, exhibitor])
    )
  );
  const [query, setQuery] = useState<{
    searchQuery: string;
    years: (0 | 1 | 2 | 3 | 4)[];
    offers: string[];
    industries: string[];
  }>({
    searchQuery: "",
    years: [],
    offers: [],
    industries: [],
  });
  const [mapInView, setMapInView] = useState<1 | 2 | 3>(1);
  const [selectedExhibitor, setSelectedExhibitor] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setExhibitors(
      Object.fromEntries(
        exhibitorData.map((exhibitor) => {
          if (!RegExp(query.searchQuery).test(exhibitor.name.toLowerCase()))
            return [];

          if (query.years.length !== 0) {
            const hasMatchingYear =
              query.years.some((year) =>
                exhibitor.offers.summerJob.includes(year) ||
                exhibitor.offers.internship.includes(year) ||
                exhibitor.offers.partTimeJob.includes(year)
              );
            if (!hasMatchingYear) {
              return [];
            }
          }

          if (query.offers.length > 0) {
            console.log("QUERY OFFERS: ", query.offers);
              const hasMatchingOffer = query.offers.some((offerType, _) => {
                console.log("COMPARE", offerType, "\nVS", exhibitor.offers);
              switch(offerType) {
                case 'summer':
                  return exhibitor.offers.summerJob.length > 0;
                case 'internship':
                  return exhibitor.offers.internship.length > 0;
                case 'partTime':
                  return exhibitor.offers.partTimeJob.length > 0;
                case 'thesis':
                  return exhibitor.offers.masterThesis;
                case 'fullTime':
                  return exhibitor.offers.fullTimeJob;
                case 'trainee':
                  return exhibitor.offers.traineeProgram;
                default:
                  return false;
              }
            });

            if (!hasMatchingOffer) {
              return [];
            }
          }
          if (query.industries.length > 0) {
            const hasMatchingIndustry = query.industries.some((industryType) =>
              exhibitor.industryType?.toLowerCase() === (industryType.toLowerCase())
            );
            if (!hasMatchingIndustry) {
              return [];
            }
          }

          return [exhibitor.position, exhibitor];
        })
      )
    );
  }, [query]);

  // Fix unwanted behavior in mobile WebKit, excuse my hacky solution
  useEffect(() => {
    window.scrollTo(0, 100);
  }, []);


  const seoContent = {
    sv: {
      title: "Karta - Hitta Utställare och Lokaler",
      description: "Få en överblick över D-Dagen med vår interaktiva karta. Se alla utställare, lokaler och viktiga platser på KTH Campus Valhallavägen den 8 oktober. Planera ditt besök och hitta enkelt till alla företag och evenemang!",
      url: "https://ddagen.se/karta",
    },
    en: {
      title: "Map - Find Exhibitors and Venues",
      description: "Get an overview of D-Dagen with our interactive map. View all exhibitors, venues, and key locations at KTH Campus Valhallavägen on October 8. Plan your visit and easily find all companies and events!",
      url: "https://ddagen.se/en/karta",
    },
  };

  const { title, description, url } = seoContent[t.locale as "sv" | "en"];

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          url,
          title,
          description
        }}
        additionalMetaTags={[
          {
            name: 'robots',
            content: 'index, follow'
          }
        ]}
      />
    <div className="h-screen flex max-md:flex-col-reverse max-md:items-center md:flex-row md:items-start overflow-hidden relative max-lg:mt-20 lg:pt-20">
      <div
        id="sidebar"
        className="px-4 md:pr-4 flex flex-col items-center w-full md:w-3/5 box-border bg-darkblue bg-opacity-75"
      >
        <Search t={t} setQuery={setQuery} />
        <ExhibitorExplorer
          t={t}
          exhibitors={exhibitors}
          setMapInView={setMapInView}
          selectedExhibitor={selectedExhibitor}
          setSelectedExhibitor={setSelectedExhibitor}
          onOpen={() => setShowModal(true)}
        />
      </div>
      <div id="map-container" className="w-full md:pr-4">
        <Map
          t={t}
          exhibitors={exhibitors}
          mapInView={mapInView}
          selectedExhibitor={selectedExhibitor}
          setSelectedExhibitor={(position) => {
            setSelectedExhibitor(position);
            setShowModal(true);
          }}
        />
      </div>
    </div>
    {showModal && exhibitors[selectedExhibitor] && (
      <ExhibitorModal
        t={t}
        exhibitor={exhibitors[selectedExhibitor]}
        onClose={() => setShowModal(false)}
      />
    )}
    </>
  );
}

// Map number -> company, maintained by hand from the printed map.
const EXHIBITOR_LIST = path.join(
  process.cwd(),
  "public/downloadables/exhibitor_map/exhibitors.md"
);

function readExhibitorList() {
  return fs
    .readFileSync(EXHIBITOR_LIST, "utf8")
    .split("\n")
    .map((line) => line.match(/^\|\s*(\d+)\s*\|\s*(.+?)\s*\|\s*([23])\s*\|$/))
    .filter((m): m is RegExpMatchArray => m !== null)
    .map((m) => ({ position: +m[1], name: m[2], floor: +m[3] as 2 | 3 }));
}

// "Nore Technology AB" and "Nore Technology", "AtlasCopco" and "Atlas Copco"
// should count as the same company.
function normalizeName(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+ab$/, "")
    .replace(/[^a-z0-9åäöé]/g, "");
}

export async function getServerSideProps() {
  const exhibitors = await prisma.exhibitor.findMany({
    include: {
      jobOffers: true,
    },
  }).catch((err: any) => { return [] });

  const byName = Object.fromEntries(
    exhibitors.map((e) => [normalizeName(e.name), e])
  );

  // Exact name first, then a unique prefix match ("Tieto" -> "Tietoevry").
  function findExhibitor(name: string) {
    const key = normalizeName(name);
    if (byName[key]) return byName[key];
    if (key.length < 4) return undefined;
    const candidates = Object.entries(byName).filter(
      ([k]) => k.startsWith(key) || (k.length >= 4 && key.startsWith(k))
    );
    return candidates.length === 1 ? candidates[0][1] : undefined;
  }

  const exhibitorData: MapProp[] = readExhibitorList().map(
    ({ position, name, floor }) => {
      const exhibitor = findExhibitor(name);
      if (!exhibitor && exhibitors.length > 0)
        console.warn(`karta: no exhibitor in the database matches "${name}" (${position})`);

      return {
        name: exhibitor?.name ?? name,
        logo:
          exhibitor?.logoColor?.toString("base64") ||
          exhibitor?.logoWhite?.toString("base64") ||
          null,
        description: exhibitor?.description || "",
        industry: exhibitor?.industry || "",
        packageTier: exhibitor?.packageTier ?? -1,
        offers: {
          summerJob: exhibitor?.jobOffers?.summerJob ?? [],
          internship: exhibitor?.jobOffers?.internship ?? [],
          partTimeJob: exhibitor?.jobOffers?.partTimeJob ?? [],
          masterThesis: exhibitor?.jobOffers?.masterThesis ?? false,
          fullTimeJob: exhibitor?.jobOffers?.fullTimeJob ?? false,
          traineeProgram: exhibitor?.jobOffers?.traineeProgram ?? false,
        },
        industryType: exhibitor?.industryType || "",
        position,
        floor,
      };
    }
  );

  return {
    props: {
      exhibitorData,
    },
  };
}
