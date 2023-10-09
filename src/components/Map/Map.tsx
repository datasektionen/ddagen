import type Locale from "@/locales";
import { Dispatch } from "react";
import { range } from "@/shared/range";
import Button from "@/components/Map/Button";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { MapProp } from "@/shared/Classes";

function circleSvgProxy(position: number, selectedExhibitor: number) {
  return (
    <SvgProxy
      key={position}
      selector={`#p${position}`}
      class={
        selectedExhibitor === position
          ? "cursor-pointer z-50 animate-[blinkingText_2s_infinite] drop-shadow-[0_0_7px_#ee2a7b]"
          : "cursor-pointer transition-all fill-cerise ease-in-out duration-700"
      }
    />
  );
}

function groupSvgProxy(
  position: number,
  exhibitor: MapProp | undefined,
  setSelectedExhibitor: Dispatch<number>
) {
  return (
    <SvgProxy
      key={position}
      onClick={() => {
        setSelectedExhibitor(position);
      }}
      selector={`#g${position}`}
      class={exhibitor == undefined ? "hidden" : ""}
    />
  );
}

export default function Map({
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

  return (
    <div className="flex flex-col items-center justify-center lg:mt-16">
      <div className="max-xs:w-[350px] xs:w-[450px] sm:w-[500px] md:w-[650px] max-sm:h-[350px] h-[475px] flex justify-center bg-[#fafafa] text-5xl text-white mt-14 mb-6 xs:p-4">
        {mapInView == 1 ? (
          <SvgLoader path="/img/map/floor-2.svg">
            {floorTwoPositions.map((position) => {
              return circleSvgProxy(position, selectedExhibitor);
            })}
            {floorTwoPositions.map((position) => {
              return groupSvgProxy(
                position,
                exhibitors[position],
                setSelectedExhibitor
              );
            })}
          </SvgLoader>
        ) : mapInView == 2 ? (
          <SvgLoader path="/img/map/floor-3.svg">
            {floorThreePositions.map((position) => {
              return circleSvgProxy(position, selectedExhibitor);
            })}
            {floorThreePositions.map((position) => {
              return groupSvgProxy(
                position,
                exhibitors[position],
                setSelectedExhibitor
              );
            })}
          </SvgLoader>
        ) : (
          <SvgLoader path="/img/map/kth-entrance.svg">
            {kthEntrancePositions.map((position) => {
              return circleSvgProxy(position, selectedExhibitor);
            })}
            {kthEntrancePositions.map((position) => {
              return groupSvgProxy(
                position,
                exhibitors[position],
                setSelectedExhibitor
              );
            })}
          </SvgLoader>
        )}
      </div>
      <div className="flex flex-row items-center">
        <Button
          value={t.map.floors.one}
          loading={false}
          uppercase={false}
          onClick={() => setMapInView(1)}
        />
        <Button
          value={t.map.floors.two}
          loading={false}
          uppercase={false}
          onClick={() => setMapInView(2)}
        />
        <Button
          value="KTH Entré"
          loading={false}
          uppercase={false}
          onClick={() => setMapInView(3)}
        />
      </div>
    </div>
  );
}
