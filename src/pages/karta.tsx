import { useEffect, useState, useCallback, Suspense } from "react";
import { prisma } from "@/server/db";
import { useLocale } from "@/locales";
import { MapProp } from "@/shared/Classes";
import dynamic from 'next/dynamic';
import Loading from "@/components/Map/Loading";
import Search from "@/components/Map/Search";
import ExhibitorExplorer from "@/components/Map/ExhibitorExplorer";

const Map = dynamic(() => import('@/components/Map/NewMap'), { 
  ssr: false,
  loading: () => <Loading />
});

const filterExhibitors = (exhibitors: MapProp[], query: QueryType) => {
  return Object.fromEntries(
    exhibitors
      .filter(exhibitor => {
        if (!RegExp(query.searchQuery, 'i').test(exhibitor.name)) return false;
        
        if (query.years.length > 0) {
          const hasMatchingYear = query.years.some(year => 
            exhibitor.offers.summerJob.includes(year) ||
            exhibitor.offers.internship.includes(year) ||
            exhibitor.offers.partTimeJob.includes(year)
          );
          if (!hasMatchingYear) return false;
        }
        
        const offerChecks = {
          summer: () => query.offers.summer && exhibitor.offers.summerJob.length === 0,
          internship: () => query.offers.internship && exhibitor.offers.internship.length === 0,
          partTime: () => query.offers.partTime && exhibitor.offers.partTimeJob.length === 0,
          thesis: () => query.offers.thesis && !exhibitor.offers.masterThesis,
          fullTime: () => query.offers.fullTime && !exhibitor.offers.fullTimeJob,
          trainee: () => query.offers.trainee && !exhibitor.offers.traineeProgram
        };

        return !Object.values(offerChecks).some(check => check());
      })
      .map(exhibitor => [exhibitor.position, exhibitor])
  );
};

type QueryType = {
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
};

const initialQuery: QueryType = {
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
};

export default function Karta({ exhibitorData }: { exhibitorData: MapProp[] }) {
  const t = useLocale();
  const [isClient, setIsClient] = useState(false);
  const [exhibitors, setExhibitors] = useState<{[key: number]: MapProp}>({});
  const [query, setQuery] = useState<QueryType>(initialQuery);
  const [mapInView, setMapInView] = useState<1 | 2 | 3>(1);
  const [selectedExhibitor, setSelectedExhibitor] = useState<number>(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const filteredExhibitors = filterExhibitors(exhibitorData, query);
    setExhibitors(filteredExhibitors);
  }, [query, exhibitorData]);

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = exhibitorData
        .filter(exhibitor => exhibitor.logoColor || exhibitor.logoWhite)
        .map(exhibitor => {
          return Promise.all([
            exhibitor.logoColor && new Promise(resolve => {
              const img = new Image();
              img.onload = resolve;
              img.src = `data:image/png;base64,${exhibitor.logoColor}`;
            }),
            exhibitor.logoWhite && new Promise(resolve => {
              const img = new Image();
              img.onload = resolve;
              img.src = `data:image/png;base64,${exhibitor.logoWhite}`;
            })
          ]);
        });

      await Promise.all(imagePromises);
      setImagesLoaded(true);
    };

    preloadImages();
  }, [exhibitorData]);

  useEffect(() => {
    setIsClient(true);
    window.scrollTo(0, 100);
  }, []);

  if (!isClient || !imagesLoaded) {
    return <Loading />;
  }

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
        <Suspense fallback={<Loading />}>
          <Map
            t={t}
            exhibitors={exhibitors}
            mapInView={mapInView}
            selectedExhibitor={selectedExhibitor}
            setSelectedExhibitor={setSelectedExhibitor}
          />
        </Suspense>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const exhibitors = await prisma.exhibitor.findMany({
    include: {
      jobOffers: true,
    },
  });

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