import type Locale from "@/locales";
import Button from "./Button";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { Dispatch, useEffect, useState } from "react";

function range(start: number, end: number) {
  return [...Array(1 + end - start).keys()].map((v) => start + v);
}

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
  setSelectedExhibitor: Dispatch<number>
) {
  return (
    <SvgProxy
      key={position}
      onClick={() => {
        setSelectedExhibitor(position);
      }}
      selector={`#g${position}`}
    />
  );
}

export default function Map({
  t,
  mapInView,
  setMapInView,
  selectedExhibitor,
  setSelectedExhibitor,
}: {
  t: Locale;
  mapInView: 1 | 2 | 3;
  setMapInView: Dispatch<1 | 2 | 3>;
  selectedExhibitor: number;
  setSelectedExhibitor: Dispatch<number>;
}) {
  const floorTwoPositions = range(1, 79);
  const floorThreePositions = range(80, 101);
  const kthEntrancePositions = range(102, 107);

  return (
    <div className="flex flex-col items-center justify-center mt-16">
      <div>
        <div className="max-xs:w-[350px] xs:w-[450px] sm:w-[500px] md:w-[650px] h-[475px] flex justify-center bg-[#fafafa] text-5xl text-white mt-14 mb-6 p-4">
          {mapInView == 1 ? (
            <SvgLoader path="/img/map/floor-2.svg">
              {floorTwoPositions.map((position) => {
                return circleSvgProxy(position, selectedExhibitor);
              })}
              {floorTwoPositions.map((position) => {
                return groupSvgProxy(position, setSelectedExhibitor);
              })}
            </SvgLoader>
          ) : mapInView == 2 ? (
            <SvgLoader path="/img/map/floor-3.svg">
              {floorThreePositions.map((position) => {
                return circleSvgProxy(position, selectedExhibitor);
              })}
              {floorThreePositions.map((position) => {
                return groupSvgProxy(position, setSelectedExhibitor);
              })}
            </SvgLoader>
          ) : (
            <SvgLoader path="/img/map/kth-entrance.svg">
              {kthEntrancePositions.map((position) => {
                return circleSvgProxy(position, selectedExhibitor);
              })}
              {kthEntrancePositions.map((position) => {
                return groupSvgProxy(position, setSelectedExhibitor);
              })}
            </SvgLoader>
          )}
        </div>
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
          value={t.map.floors.entrance}
          loading={false}
          uppercase={false}
          onClick={() => setMapInView(3)}
        />
      </div>
    </div>
  );
}
