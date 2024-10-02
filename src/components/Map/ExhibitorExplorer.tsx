import type Locale from "@/locales";
import { range } from "@/shared/range";
import { MapProp } from "@/shared/Classes";
import Button from "@/components/Map/Button";
import { Dispatch, useEffect, useRef, RefObject, createRef, memo } from "react";
import Image from 'next/image';

// Optimized image component
const OptimizedLogo = memo(({ 
  logoColor, 
  logoWhite, 
  name, 
  isSelected 
}: { 
  logoColor: string | null;
  logoWhite: string | null;
  name: string;
  isSelected: boolean;
}) => {
  const logoSrc = logoColor || logoWhite;
  if (!logoSrc) return null;

  const imageProps = {
    src: `data:image/png;base64,${logoSrc}`,
    alt: `${name} logo`,
    className: isSelected ? "w-[150px] mb-2" : "w-auto max-h-[50px]",
    width: isSelected ? 150 : 100,
    height: isSelected ? 75 : 50,
    loading: "eager" as "eager",
    quality: 80,
  };

  return <Image {...imageProps} />;
});

OptimizedLogo.displayName = 'OptimizedLogo';

// Memoized Explorer component
const Explorer = memo(({
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
}) => {
  if (!exhibitor) return null;

  const isSelected = exhibitor.position === selectedExhibitor;

  return (
    <div
      ref={explorerRef}
      key={exhibitor.position}
      className={`
        flex ${isSelected ? 'flex-col min-h-[20%]' : 'flex-row min-h-[10%]'}
        cursor-pointer items-center justify-center 
        mt-4 mx-4 ${isSelected ? 'px-4 py-6' : 'p-4'}
        border-2 border-white bg-white bg-opacity-40 rounded-lg 
        text-white text-center ${isSelected ? 'overflow-y-auto' : 'overflow-hidden'}
      `}
      onClick={() => isSelected ? setSelectedExhibitor(0) : (setMapInView(map), setSelectedExhibitor(exhibitor.position))}
    >
      {isSelected ? (
        <>
          <OptimizedLogo
            logoColor={exhibitor.logoColor ?? null}
            logoWhite={exhibitor.logoWhite ?? null}
            name={exhibitor.name}
            isSelected={true}
          />
          <div className="text-3xl font-medium mb-4 max-w-full break-words">
            {exhibitor.name}
          </div>
          <div className="mb-4 max-w-full break-words">
            {exhibitor.description}
          </div>
          {hasValidOffer(exhibitor) && <OffersList exhibitor={exhibitor} t={t} />}
        </>
      ) : (
        <div className="w-full grid grid-cols-2 gap-x-2 text-left">
          <div className="font-medium break-words">{exhibitor.name}</div>
          <div className="flex justify-end">
            <OptimizedLogo
              logoColor={exhibitor.logoColor ?? null}
              logoWhite={exhibitor.logoWhite ?? null}
              name={exhibitor.name}
              isSelected={false}
            />
          </div>
        </div>
      )}
    </div>
  );
});

Explorer.displayName = 'Explorer';

// Separate offers list component
const OffersList = memo(({ exhibitor, t }: { exhibitor: MapProp; t: Locale }) => (
  <div>
    <p className="font-medium mb-2 text-xl">{t.map.description.offers}</p>
    <ol className="list-disc inline-block text-left">
      {exhibitor.offers.summerJob.length > 0 && <li>{t.map.description.summer}</li>}
      {exhibitor.offers.internship.length > 0 && <li>{t.map.description.internship}</li>}
      {exhibitor.offers.partTimeJob.length > 0 && <li>{t.map.description.partTime}</li>}
      {exhibitor.offers.masterThesis && <li>{t.map.description.thesis}</li>}
      {exhibitor.offers.fullTimeJob && <li>{t.map.description.fullTime}</li>}
      {exhibitor.offers.traineeProgram && <li>{t.map.description.trainee}</li>}
    </ol>
  </div>
));

OffersList.displayName = 'OffersList';

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

const ExhibitorExplorer = ({
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
}) => {
  const floorTwoPositions = range(1, 79);
  const floorThreePositions = range(80, 101);
  const kthEntrancePositions = range(102, 107);

  const buttonScrollRef = useRef<HTMLDivElement>(null);
  const exhibitorRefs = useRef<{ [key: number]: RefObject<HTMLDivElement> }>(
    {}
  );

  useEffect(() => {
    const currentRef = exhibitorRefs.current[selectedExhibitor];
    if (selectedExhibitor !== 0 && currentRef?.current) {
      currentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedExhibitor]);

  return (
    <div 
      id="explorer"
      className="h-full w-full mt-0 md:mb-0 flex flex-col gap-y-4 items-center justify-center"
    >
      <div
        ref={buttonScrollRef}
        className="min-h-full w-full border-4 border-pink-600
                bg-[#eaeaea] bg-opacity-10 rounded-xl pb-4 overflow-scroll 
                scrollbar-hide overflow-x-hidden mb-3"
      >
        {[
          { positions: floorTwoPositions, map: 1 },
          { positions: floorThreePositions, map: 2 },
          { positions: kthEntrancePositions, map: 3 },
        ].map(({ positions, map }) =>
          positions.map((position) => {
            if (!exhibitorRefs.current[position]) {
              exhibitorRefs.current[position] = createRef();
            }
            return (
              <Explorer
                key={position}
                t={t}
                map={map as 1 | 2 | 3}
                setMapInView={setMapInView}
                exhibitor={exhibitors[position]}
                selectedExhibitor={selectedExhibitor}
                setSelectedExhibitor={setSelectedExhibitor}
                explorerRef={exhibitorRefs.current[position]}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default memo(ExhibitorExplorer);