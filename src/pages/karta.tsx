import { useEffect, useState, useLayoutEffect } from "react";
import { prisma } from "@/server/db";
import { useLocale } from "@/locales";
import { MapProp } from "@/shared/Classes";
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('@/components/Map/NewMap'), { ssr: false });
import Search from "@/components/Map/Search";
import ExhibitorExplorer from "@/components/Map/ExhibitorExplorer";
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
              exhibitor.industryType?.toLowerCase().includes(industryType.toLowerCase())
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
      description: "Få en överblick över D-Dagen 2025 med vår interaktiva karta. Se alla utställare, lokaler och viktiga platser på KTH Campus Valhallavägen den 9 oktober. Planera ditt besök och hitta enkelt till alla företag och evenemang!",
      url: "https://ddagen.se/karta",
    },
    en: {
      title: "Map - Find Exhibitors and Venues",
      description: "Get an overview of D-Dagen 2025 with our interactive map. View all exhibitors, venues, and key locations at KTH Campus Valhallavägen on October 9. Plan your visit and easily find all companies and events!",
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
    <div className="h-screen flex max-md:flex-col-reverse max-md:items-center md:flex-row md:items-start md:pt-20 overflow-hidden relative">
      <div
        id="sidebar"
        className="px-4 md:pr-4 flex flex-col items-center w-full md:w-3/5 box-border bg-darkblue bg-opacity-75"
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
    </>
  );
}

export async function getServerSideProps() {
  const exhibitors = await prisma.exhibitor.findMany({
    include: {
      jobOffers: true,
    },
  }).catch((err: any) => { return [] });

  /*const exhibitorData = [...(new Array(110))].map((_, i) => ({
    name: String.fromCharCode(65 + (i % 26)),
    logoWhite: null,
    logoColor: null,
    description: String.fromCharCode(65 + (i % 26)),
    jobOfferId: 0,
    offers: {
      summerJob: [Math.floor(i/26) % 5],
      internship: [Math.floor(i/13) % 5],
      partTimeJob: [Math.floor(i/7) % 5],
      masterThesis: i % 2 === 0,
      fullTimeJob: i % 3 === 0,
      traineeProgram: i % 4 === 0,
    },
    position: i + 1,
  }));*/

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
    industryType: exhibitor.industryType,
    position: exhibitor.mapPosition,
  }));

  return {
    props: {
      exhibitorData,
    },
  };
}
