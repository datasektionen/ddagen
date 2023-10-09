import type Locale from "@/locales";
import { range } from "@/shared/range";
import { MapProp } from "@/shared/Classes";
import Button from "@/components/Map/Button";
import { addImageDetails } from "@/shared/addImageDetails";
import { Dispatch, useEffect, useRef, RefObject, createRef } from "react";

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
          className="flex flex-col min-h-[20%] break-all cursor-pointer items-center justify-center space-y-2 mt-4 mx-4 p-4 border-2 border-white bg-white bg-opacity-40 rounded-lg text-white text-center"
          onClick={() => setSelectedExhibitor(0)}
        >
          {exhibitor.logoColor && (
            <img
              className="w-[150px]"
              src={addImageDetails(exhibitor.logoColor)}
            />
          )}
          {!exhibitor.logoColor && exhibitor.logoWhite && (
            <img
              className="w-[100px]"
              src={addImageDetails(exhibitor.logoWhite)}
            />
          )}
          <div className="text-3xl font-medium mb-4">{exhibitor.name}</div>
          <div className="w-full break-all">
            <p className="font-medium mb-2 text-xl">{t.map.description.offers}</p>
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
        </div>
      ) : (
        <div
          ref={explorerRef}
          key={exhibitor.position}
          className="flex flex-row min-h-[10%] cursor-pointer items-center justify-center mt-4 mx-4 border-2 p-4 border-white bg-white bg-opacity-40 rounded-lg text-white text-center"
          onClick={() => {
            setMapInView(map);
            setSelectedExhibitor(exhibitor.position);
          }}
        >
          <div className="w-full flex flex-row gap-x-2 justify-between text-left">
            <div className="font-medium">{exhibitor.name}</div>
            {exhibitor.logoColor && (
              <img
                className="w-[100px]"
                src={addImageDetails(exhibitor.logoColor)}
              />
            )}
            {!exhibitor.logoColor && exhibitor.logoWhite && (
              <img
                className="w-[100px]"
                src={addImageDetails(exhibitor.logoWhite)}
              />
            )}
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
  const floorThreePositions = range(80, 101);
  const kthEntrancePositions = range(102, 107);

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
    <div className="flex flex-col gap-y-4 items-center justify-center mt-12">
      <Button
        value={"/img/arrow-up.png/"}
        loading={false}
        isImage={true}
        onClick={() => {
          if (buttonScrollRef && buttonScrollRef.current)
            buttonScrollRef.current.scrollTo(
              0,
              buttonScrollRef.current.scrollTop - 50
            );
        }}
      />
      <div
        ref={buttonScrollRef}
        className="block w-[300px] h-[550px] border-2 border-cerise
              bg-[#eaeaea] bg-opacity-10 rounded-xl pb-4 overflow-scroll scrollbar-hide"
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
      <Button
        value={"/img/arrow-down.png/"}
        loading={false}
        isImage={true}
        onClick={() => {
          if (buttonScrollRef && buttonScrollRef.current)
            buttonScrollRef.current.scrollTo(
              0,
              buttonScrollRef.current.scrollTop + 50
            );
        }}
      />
    </div>
  );
}
