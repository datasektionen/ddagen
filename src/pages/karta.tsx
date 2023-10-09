import { prisma } from "@/server/db";
import { useLocale } from "@/locales";
import Map from "@/components/Map/Map";
import { useEffect, useState } from "react";
import Search from "@/components/Map/Search";
import { MapProp } from "@/shared/Classes";
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
    years: (1 | 2 | 3 | 4 | 5)[];
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
    console.log(query);
    setExhibitors(
      Object.fromEntries(
        exhibitorData.map((exhibitor) => {
          if (!exhibitor.name.includes(query.searchQuery)) return [];
          if (query.years.length != 0) {
            if (
              !query.years.some((year) =>
                exhibitor.offers.summerJob.includes(year)
              ) &&
              !query.years.some((year) =>
                exhibitor.offers.internship.includes(year)
              ) &&
              !query.years.some((year) =>
                exhibitor.offers.partTimeJob.includes(year)
              )
            )
              return [];
          }
          if (
            (query.offers.summer && exhibitor.offers.summerJob.length == 0) ||
            (query.offers.internship &&
              exhibitor.offers.internship.length == 0) ||
            (query.offers.partTime &&
              exhibitor.offers.partTimeJob.length == 0) ||
            (query.offers.thesis && !exhibitor.offers.masterThesis) ||
            (query.offers.fullTime && !exhibitor.offers.fullTimeJob) ||
            (query.offers.trainee && !exhibitor.offers.traineeProgram)
          )
            return [];

          return [exhibitor.position, exhibitor];
        })
      )
    );
  }, [query]);

  return (
    <div className="flex flex-col h-full w-full pt-52 pb-40">
      <h1 className="text-cerise text-6xl font-medium uppercase text-center">
        {t.map.header}
      </h1>
      <Search t={t} setQuery={setQuery} />

      <div className="flex max-lg:flex-col-reverse max-lg:items-center lg:flex-row lg:items-start lg:space-x-10 justify-center">
        <ExhibitorExplorer
          t={t}
          exhibitors={exhibitors}
          mapInView={mapInView}
          setMapInView={setMapInView}
          selectedExhibitor={selectedExhibitor}
          setSelectedExhibitor={setSelectedExhibitor}
        />
        <Map
          t={t}
          exhibitors={exhibitors}
          mapInView={mapInView}
          setMapInView={setMapInView}
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
  });

  const exhibitorData = exhibitors.map((exhibitor) => ({
    name: exhibitor.name,
    logoWhite: exhibitor.logoWhite?.toString("base64") || null,
    logoColor: exhibitor.logoColor?.toString("base64") || null,
    description: exhibitor.description,
    package: exhibitor.package,
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
