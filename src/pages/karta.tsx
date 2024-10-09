import { useEffect, useState, useLayoutEffect } from "react";
import { prisma } from "@/server/db";
import { useLocale } from "@/locales";
import { MapProp } from "@/shared/Classes";
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('@/components/Map/NewMap'), { ssr: false });
import Search from "@/components/Map/Search";
import ExhibitorExplorer from "@/components/Map/ExhibitorExplorer";

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
    offers: {
      summer: boolean;
      internship: boolean;
      partTime: boolean;
      thesis: boolean;
      fullTime: boolean;
      trainee: boolean;
    };
  }>({
    searchQuery: "",
    years: [],
    offers: {
      summer: false,
      internship: false,
      partTime: false,
      thesis: false,
      fullTime: false,
      trainee: false,
    },
  });
  const [mapInView, setMapInView] = useState<1 | 2 | 3>(1);
  const [selectedExhibitor, setSelectedExhibitor] = useState<number>(0);

  useEffect(() => {
    setExhibitors(
      Object.fromEntries(
        exhibitorData.map((exhibitor) => {
          // Name search check
          if (!RegExp(query.searchQuery, 'i').test(exhibitor.name.toLowerCase()))
            return [];
  
          // Year check - matches any selected year for year-specific offers
          const yearMatch = query.years.length === 0 || query.years.some(year => 
            (query.offers.summer && exhibitor.offers.summerJob.includes(year)) ||
            (query.offers.internship && exhibitor.offers.internship.includes(year)) ||
            (query.offers.partTime && exhibitor.offers.partTimeJob.includes(year))
          );

          const noOffersSelected = 
            !query.offers.summer &&
            !query.offers.internship &&
            !query.offers.partTime &&
            !query.offers.thesis &&
            !query.offers.fullTime &&
            !query.offers.trainee;
  
          // Non-year-specific offers check (OR condition for offer types)
          const otherOffersMatch = noOffersSelected ||
            (query.offers.thesis && exhibitor.offers.masterThesis) ||
            (query.offers.fullTime && exhibitor.offers.fullTimeJob) ||
            (query.offers.trainee && exhibitor.offers.traineeProgram);
  
          // Combine both yearMatch and otherOffersMatch
          const offerMatch = yearMatch && otherOffersMatch;
  
          // Final match decision: Must match any year or offer
          if (offerMatch) {
            return [exhibitor.position, exhibitor];
          }
  
          return [];
        })
      )
    );
  }, [query]);

  // Fix unwanted behavior in mobile WebKit, excuse my hacky solution
  useEffect(() => {
    window.scrollTo(0, 100);
  }, []);

  return (
    <div className="h-screen flex max-md:flex-col-reverse max-md:items-center md:flex-row md:items-start md:pt-20 overflow-hidden relative">
      <div 
        id="sidebar" 
        className="px-4 md:pr-4 flex flex-col items-center w-full md:w-3/5 box-border"
      >
        <Search t={t} setQuery={setQuery} />
        <ExhibitorExplorer
          t={t}
          exhibitors={exhibitors}
          mapInView={mapInView}
          setMapInView={setMapInView}
          selectedExhibitor={selectedExhibitor}
          setSelectedExhibitor={setSelectedExhibitor}
        />
      </div>
      <div id="map-container" className="w-full md:pr-4">
        <Map
          t={t}
          exhibitors={exhibitors}
          mapInView={mapInView}
          selectedExhibitor={selectedExhibitor}
          setSelectedExhibitor={setSelectedExhibitor}
        />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const exhibitors = await prisma.exhibitor.findMany({
    include: {
      jobOffers: true,
    },
  }).catch((err: any) => { return [] });

  const exhibitorData = exhibitors.map((exhibitor) => ({
    name: exhibitor.name,
    logoWhite: exhibitor.logoWhite?.toString("base64") || null,
    logoColor: exhibitor.logoColor?.toString("base64") || null,
    description: exhibitor.description,
    jobOfferId: exhibitor.jobOfferId,
    offers: {
      summerJob: exhibitor.jobOffers.summerJob,
      internship: exhibitor.jobOffers.internship,
      partTimeJob: exhibitor.jobOffers.partTimeJob,
      masterThesis: exhibitor.jobOffers.masterThesis,
      fullTimeJob: exhibitor.jobOffers.fullTimeJob,
      traineeProgram: exhibitor.jobOffers.traineeProgram,
    },
    position: exhibitor.mapPosition,
  }));

  return {
    props: {
      exhibitorData,
    },
  };
}
