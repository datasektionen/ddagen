import type Locale from "@/locales";
import { prisma } from "@/server/db";
import { useLocale } from "@/locales";
import { Dispatch, useRef, useState } from "react";
import Map from "@/components/Map/Map";
import Search from "@/components/Map/Search";
import Button from "@/components/Map/Button";
import Exhibitor from "./utst%C3%A4llare";

type MapProp = {
  name: string;
  logoWhite?: string | null;
  logoColor?: string | null;
  description: string;
  package?: "main" | "headhunter" | "sponsor" | "premium" | "base" | "startup";
  jobOfferId?: string;
  offers: (number[] | boolean)[];
  position: number;
};

function range(start: number, end: number) {
  return [...Array(1 + end - start).keys()].map((v) => start + v);
}

function Explorer({
  t,
  map,
  setMapInView,
  exhibitor,
  selectedExhibitor,
  setSelectedExhibitor,
}: {
  t: Locale;
  map: 1 | 2 | 3;
  setMapInView: Dispatch<1 | 2 | 3>;
  exhibitor: MapProp | undefined;
  selectedExhibitor: number;
  setSelectedExhibitor: Dispatch<number>;
}) {
  if (exhibitor) {
    {
      return exhibitor.position == selectedExhibitor ? (
        <div
          key={exhibitor.position}
          className="flex flex-col min-h-[20%] break-all cursor-pointer items-center space-y-2 mt-4 mx-4 p-4 border-2 border-white bg-white bg-opacity-40 rounded-lg text-white"
          onClick={() => setSelectedExhibitor(0)}
        >
          <div>{exhibitor.name}</div>
          <div>{exhibitor.description}</div>
        </div>
      ) : (
        <div
          key={exhibitor.position}
          className="flex flex-row min-h-[10%] cursor-pointer items-center justify-center mt-4 mx-4 border-2 border-white bg-white bg-opacity-40 rounded-lg text-white"
          onClick={() => {
            setMapInView(map);
            setSelectedExhibitor(exhibitor.position);
          }}
        >
          <div>{exhibitor.name}</div>
        </div>
      );
    }
  }
  return <></>;
}

export default function Karta({ exhibitorData }: { exhibitorData: MapProp[] }) {
  const t = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const exhibitors = Object.fromEntries(
    exhibitorData.map((exhibitor) => [exhibitor.position, exhibitor])
  );
  console.log(exhibitors);

  const floorTwoPositions = range(1, 79);
  const floorThreePositions = range(80, 101);
  const kthEntrancePositions = range(102, 107);

  const [mapInView, setMapInView] = useState<1 | 2 | 3>(1);
  const [selectedExhibitor, setSelectedExhibitor] = useState<number>(0);

  return (
    <div className="flex flex-col h-full w-full pt-52 pb-40">
      <h1 className="text-cerise text-6xl font-medium uppercase text-center">
        {t.map.header}
      </h1>
      {/* <Search t={t} /> */}
      {/* ExhibitorExplorer */}
      <div className="flex max-lg:flex-col-reverse max-lg:items-center lg:flex-row lg:items-start justify-center space-x-10">
        <div className="flex flex-col gap-y-4 items-center justify-center mt-12">
          <Button
            value={"/img/arrow-up.png/"}
            loading={false}
            isImage={true}
            onClick={() => {
              if (ref && ref.current)
                ref.current.scrollTo(0, ref.current.scrollTop - 50);
            }}
          />
          <div
            ref={ref}
            className="block w-[300px] h-[550px] border-2 border-cerise
                    bg-[#eaeaea] bg-opacity-10 rounded-xl pb-4 overflow-scroll scrollbar-hide"
          >
            {floorTwoPositions.map((position) => (
              <Explorer
                t={t}
                map={1}
                setMapInView={setMapInView}
                exhibitor={exhibitors[position]}
                selectedExhibitor={selectedExhibitor}
                setSelectedExhibitor={setSelectedExhibitor}
              />
            ))}
            {floorThreePositions.map((position) => (
              <Explorer
                t={t}
                map={2}
                setMapInView={setMapInView}
                exhibitor={exhibitors[position]}
                selectedExhibitor={selectedExhibitor}
                setSelectedExhibitor={setSelectedExhibitor}
              />
            ))}
            {kthEntrancePositions.map((position) => (
              <Explorer
                t={t}
                map={3}
                setMapInView={setMapInView}
                exhibitor={exhibitors[position]}
                selectedExhibitor={selectedExhibitor}
                setSelectedExhibitor={setSelectedExhibitor}
              />
            ))}
          </div>
          <Button
            value={"/img/arrow-down.png/"}
            loading={false}
            isImage={true}
            onClick={() => {
              if (ref && ref.current)
                ref.current.scrollTo(0, ref.current.scrollTop + 50);
            }}
          />
        </div>
        {/* ExhibitorExplorer */}
        <Map
          t={t}
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
    package: exhibitor.package || null,
    jobOfferId: exhibitor.jobOfferId || null,
    offers: [
      exhibitor.jobOffers?.summerJob,
      exhibitor.jobOffers?.internship,
      exhibitor.jobOffers?.partTimeJob,
      exhibitor.jobOffers?.masterThesis || null,
      exhibitor.jobOffers?.fullTimeJob || null,
      exhibitor.jobOffers?.traineeProgram || null,
    ],
    position: exhibitor.mapPosition,
  }));

  return {
    props: {
      exhibitorData,
    },
  };
}
