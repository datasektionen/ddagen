import type Locale from "@/locales";
import { MapProp } from "@/shared/Classes";
import { ExhibitorCard } from "@/components/ExhibitorCard";
import { Dispatch, useEffect, useRef, RefObject, createRef } from "react";

export default function ExhibitorExplorer({
  t,
  exhibitors,
  setMapInView,
  selectedExhibitor,
  setSelectedExhibitor,
  onOpen,
}: {
  t: Locale;
  exhibitors: {
    [k: string]: MapProp;
  };
  setMapInView: Dispatch<1 | 2 | 3>;
  selectedExhibitor: number;
  setSelectedExhibitor: Dispatch<number>;
  onOpen: () => void;
}) {
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

  const sorted = Object.values(exhibitors)
    .filter(Boolean)
    .sort((a, b) => a.position - b.position);

  return (
    <div
      id={"explorer"}
      className="h-full w-full mt-0 md:mb-0 flex flex-col gap-y-4 items-center justify-center"
    >
      <div
        className="min-h-full w-full border-4 border-pink-600
                bg-[#eaeaea] bg-opacity-10 rounded-xl pb-4 overflow-scroll
                  scrollbar-hide overflow-x-hidden mb-3"
      >
        <div className="grid grid-cols-1 gap-4 p-4 xs:grid-cols-2">
          {sorted.map((exhibitor) => {
            if (!exhibitorRefs.current[exhibitor.position])
              exhibitorRefs.current[exhibitor.position] = createRef();
            return (
              <div
                key={exhibitor.position}
                ref={exhibitorRefs.current[exhibitor.position]}
                className="relative flex flex-col"
              >
                <ExhibitorCard
                  t={t}
                  exhibitor={exhibitor}
                  onOpen={() => {
                    setMapInView(exhibitor.floor === 3 ? 2 : 1);
                    setSelectedExhibitor(exhibitor.position);
                    onOpen();
                  }}
                />
                {/* Same look as the numbered markers on the map */}
                <span
                  className={`pointer-events-none absolute left-3 top-3 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-pink-600 text-white ring ${
                    selectedExhibitor === exhibitor.position
                      ? "ring-3 ring-yellow"
                      : "ring-2 ring-pink-500"
                  }`}
                >
                  {exhibitor.position}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
