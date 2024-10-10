import type Locale from "@/locales";
import { range } from "@/shared/range";
import { MapProp } from "@/shared/Classes";
import Button from "@/components/Map/Button";
import { addImageDetails } from "@/shared/addImageDetails";
import { Dispatch, useEffect, useRef, RefObject, createRef } from "react";

function hasValidOffer(exhibitor: MapProp) {
  return (
    exhibitor.offers.summerJob.length > 0 ||
    exhibitor.offers.internship.length > 0 ||
    exhibitor.offers.partTimeJob.length > 0 ||
    exhibitor.offers.masterThesis ||
    exhibitor.offers.fullTimeJob ||
    exhibitor.offers.traineeProgram
  );
}

function Explorer({
  t,
  map,
  setMapInView,
  exhibitor,
  selectedExhibitor,
  setSelectedExhibitor,
  explorerRef,
}: {
  t: Locale;
  map: 1 | 2 | 3;
  setMapInView: Dispatch<1 | 2 | 3>;
  exhibitor: MapProp | undefined;
  selectedExhibitor: number;
  setSelectedExhibitor: Dispatch<number>;
  explorerRef: RefObject<HTMLDivElement>;
}) {
  if (exhibitor) {
    {
      return exhibitor.position == selectedExhibitor ? (
        <div
          ref={explorerRef}
          key={exhibitor.position}
          className="flex flex-col min-h-[20%] cursor-pointer items-center justify-center 
                    space-y-2 mt-4 mx-4 px-4 py-6 border-2 border-white bg-white bg-opacity-40 
                    rounded-lg text-white text-center overflow-y-auto"
          onClick={() => setSelectedExhibitor(0)}
        >
          {exhibitor.logoColor && (
            <img
              className="w-[150px] mb-2"
              src={addImageDetails(exhibitor.logoColor)}
            />
          )}
          {!exhibitor.logoColor && exhibitor.logoWhite && (
            <img
              className="w-[150px] mb-2"
              src={addImageDetails(exhibitor.logoWhite)}
            />
          )}
          <div className="text-3xl font-medium mb-4 max-w-full break-words">
            {exhibitor.name}
          </div>
          <div className="mb-4 max-w-full break-words">
            {exhibitor.description}
          </div>
          {hasValidOffer(exhibitor) && (
            <div>
              <p className="font-medium mb-2 text-xl">
                {t.map.description.offers}
              </p>
              <ol className="list-disc inline-block text-left">
                {exhibitor.offers.summerJob.length > 0 && (
                  <li>{t.map.description.summer}</li>
                )}
                {exhibitor.offers.internship.length > 0 && (
                  <li>{t.map.description.internship}</li>
                )}
                {exhibitor.offers.partTimeJob.length > 0 && (
                  <li>{t.map.description.partTime}</li>
                )}
                {exhibitor.offers.masterThesis && (
                  <li>{t.map.description.thesis}</li>
                )}
                {exhibitor.offers.fullTimeJob && (
                  <li>{t.map.description.fullTime}</li>
                )}
                {exhibitor.offers.traineeProgram && (
                  <li>{t.map.description.trainee}</li>
                )}
              </ol>
            </div>
          )}
        </div>
      ) : (
        <div
          ref={explorerRef}
          key={exhibitor.position}
          className="flex flex-row min-h-[10%] cursor-pointer items-center justify-center 
                      mt-4 mx-4 border-2 p-4 border-white bg-white bg-opacity-40 rounded-lg 
                    text-white text-center overflow-hidden"
          onClick={() => {
            setMapInView(map);
            setSelectedExhibitor(exhibitor.position);
          }}
        >
          <div className="w-full grid grid-cols-2 gap-x-2 text-left">
            <div className="font-medium break-words">{exhibitor.name}</div>
            <div className="flex justify-end">
              {exhibitor.logoColor && (
                <img
                  className="w-auto max-h-[50px]"
                  src={addImageDetails(exhibitor.logoColor)}
                />
              )}
              {!exhibitor.logoColor && exhibitor.logoWhite && (
                <img
                  className="w-auto max-h-[50px]"
                  src={addImageDetails(exhibitor.logoWhite)}
                />
              )}
            </div>
          </div>
        </div>
      );
    }
  }
  return <></>;
}

export default function ExhibitorExplorer({
  t,
  exhibitors,
  mapInView,
  setMapInView,
  selectedExhibitor,
  setSelectedExhibitor,
}: {
  t: Locale;
  exhibitors: {
    [k: string]: MapProp;
  };
  mapInView: 1 | 2 | 3;
  setMapInView: Dispatch<1 | 2 | 3>;
  selectedExhibitor: number;
  setSelectedExhibitor: Dispatch<number>;
}) {
  const floorTwoPositions = range(1, 79);
  const floorThreePositions = range(80, 98);
  const kthEntrancePositions = range(99, 102);

  const buttonScrollRef = useRef<HTMLDivElement>(null);
  const exhibitorRefs = useRef<{ [key: number]: RefObject<HTMLDivElement> }>(
    {}
  );

  useEffect(() => {
    const currentRef = exhibitorRefs.current[selectedExhibitor];
    if (selectedExhibitor !== 0 && currentRef && currentRef.current) {
      currentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedExhibitor]);

  return (
    <div 
      id={"explorer"}
      className="h-full w-full mt-0 md:mb-0 flex flex-col gap-y-4 items-center justify-center"
    >
      <div
        ref={buttonScrollRef}
        className="min-h-full w-full border-4 border-pink-600
                bg-[#eaeaea] bg-opacity-10 rounded-xl pb-4 overflow-scroll 
                  scrollbar-hide overflow-x-hidden mb-3"
      >
        {floorTwoPositions.map((position) => {
          if (!exhibitorRefs.current[position])
            exhibitorRefs.current[position] = createRef();
          return (
            <Explorer
              t={t}
              map={1}
              setMapInView={setMapInView}
              exhibitor={exhibitors[position]}
              selectedExhibitor={selectedExhibitor}
              setSelectedExhibitor={setSelectedExhibitor}
              explorerRef={exhibitorRefs.current[position]}
            />
          );
        })}
        {floorThreePositions.map((position) => {
          if (!exhibitorRefs.current[position])
            exhibitorRefs.current[position] = createRef();
          return (
            <Explorer
              t={t}
              map={2}
              setMapInView={setMapInView}
              exhibitor={exhibitors[position]}
              selectedExhibitor={selectedExhibitor}
              setSelectedExhibitor={setSelectedExhibitor}
              explorerRef={exhibitorRefs.current[position]}
            />
          );
        })}
        {kthEntrancePositions.map((position) => {
          if (!exhibitorRefs.current[position])
            exhibitorRefs.current[position] = createRef();
          return (
            <Explorer
              t={t}
              map={3}
              setMapInView={setMapInView}
              exhibitor={exhibitors[position]}
              selectedExhibitor={selectedExhibitor}
              setSelectedExhibitor={setSelectedExhibitor}
              explorerRef={exhibitorRefs.current[position]}
            />
          );
        })}
      </div>
    </div>
  );
}
