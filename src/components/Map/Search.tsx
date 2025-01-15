import { Dispatch, useState, useEffect, useRef } from "react";
import type Locale from "@/locales";
import { CheckMark } from "../CheckMark";
import Button from "./Button";

const YEARS = [0, 1, 2, 3, 4];
const OFFER_LABELS = [
  'summer', 'internship', 'partTime', 'thesis', 'fullTime', 'trainee'
];
const DATA_MASTER_PROGRAM_KEYS = [
  "computerScience",
  "ICTInnovation",
  "cyberSecurity",
  "sustainableDigitalisation",
  "systemControl",
  "softwareEngineering",
  "embeddedSystems",
  "informationNetworkEngineering",
  "industrialManagement",
  "interactiveMediaTechnology",
  "communicationSystems",
  "machineLearning",
  "medicalEngineering",
  "appliedMathematics",
];

export default function Search({
  t,
  setQuery,
}: {
  t: Locale;
  setQuery: Dispatch<{
    searchQuery: string;
    years: (0 | 1 | 2 | 3 | 4)[];
    offers: Record<string, boolean>;
    masterPrograms: string[];
  }>;
}) {
  const getSafeValue = <T extends Record<string, any>>(obj: T, key: keyof T): T[keyof T] | "" => {
    return obj && key in obj ? obj[key] : "";
  };

  const offers = OFFER_LABELS.map((label) => {
    const jobOffer = getSafeValue(
      t.exhibitorSettings.table.row1.section2.jobs ?? {},
      label as keyof typeof t.exhibitorSettings.table.row1.section2.jobs
    );
    const otherOffer = getSafeValue(
      t.exhibitorSettings.table.row1.section2.other ?? {},
      label as keyof typeof t.exhibitorSettings.table.row1.section2.other
    );
    return jobOffer || otherOffer || "";
  });
  const dataMasterPrograms = DATA_MASTER_PROGRAM_KEYS.map((key) =>
    getSafeValue(
      t.exhibitorSettings.table.row1.section2.datamasters ?? {},
      key as keyof typeof t.exhibitorSettings.table.row1.section2.datamasters
    )
  );
  const otherMasterPrograms = [
    t.exhibitorSettings.table.row1.section2.otherMasters.other,
  ];

  const TOTAL_CHECKMARKS = YEARS.length + offers.length + dataMasterPrograms.length + otherMasterPrograms.length;

  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [checkmarks, setCheckmarks] = useState<boolean[]>(Array(TOTAL_CHECKMARKS).fill(false));
  const filterRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const applySearch = () => {
      setQuery({
        searchQuery,
        years: checkmarks
        .slice(0, 5)
        .map((value, index) => (value ? index : -1))
        .filter((index) => index !== -1) as (0 | 1 | 2 | 3 | 4)[],
              offers: OFFER_LABELS.reduce((acc, label, index) => {
          acc[label] = checkmarks[YEARS.length + index];
          return acc;
        }, {} as Record<string, boolean>),
        masterPrograms: [
          ...dataMasterPrograms.filter((_, index) => checkmarks[YEARS.length + offers.length + index]),
          ...otherMasterPrograms.filter((_, index) => checkmarks[YEARS.length + offers.length + dataMasterPrograms.length + index]),
        ],
      });
    };
    console.log('Search function called with searchQuery:', searchQuery);
    console.log('State of checkmarks:', checkmarks);
    applySearch();
  }, [searchQuery, checkmarks, setQuery]);

  const toggleCheckmarkAndApply = (index: number) => {
    setCheckmarks((prev) => {
      const newCheckmarks = [...prev];
      newCheckmarks[index] = !newCheckmarks[index];
      return newCheckmarks;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node) &&
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        console.log("Click outside detected");
        setShowFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterRef, searchBarRef]);

  const renderCheckmarks = (labels: string[], startIndex: number) => {
    return labels.map((label, index) => (
      <div key={`${startIndex + index}`} className="flex flex-row space-x-1 justify-between items-center">
        <CheckMark
          name={`${startIndex + index}`}
          checked={checkmarks[startIndex + index]}
          onChange={() => toggleCheckmarkAndApply(startIndex + index)}
        />
        <div className="text-sm flex-grow">{label}</div>
      </div>
    ));
  };

  return (
    <div id={"search"} className="h-20 w-full flex flex-col items-center justify-center">
      <div ref={searchBarRef} className="w-full flex items-center my-4">
        <input
          className="h-10 grow outline-none border-2 border-cerise bg-[#eaeaea] bg-opacity-10 rounded-3xl px-3 text-white text-opacity-50 focus:placeholder:text-transparent"
          type="text"
          placeholder={t.map.search.placeHolder}
          value={searchQuery}
          onChange={(q) => setSearchQuery(q.target.value)}
        />
        <div className="h-10 flex flex-row text-3xl box-border">
          <Button
            value="/img/hamburger.png"
            loading={false}
            onClick={() => setShowFilter(!showFilter)}
            isImage={true}
          />
        </div>
      </div>
      <div className="flex justify-center w-full relative">
        {showFilter && (
          <div
            ref={filterRef}
            className="absolute top-full z-10 w-11/12 block border-4 border-pink-600 bg-[#867c8b] bg-opacity-60 backdrop-blur-sm rounded-lg text-white justify-center text-xl"
            style={{marginTop: '10px'}}
          >
            <div className="w-fullx h-full flex flex-col justify-center items-center p-3 font-light text-base max-h-[70vh] overflow-y-auto">
              {/* Years */}
              <div className="flex flex-row space-x-4 items-center">
              <span>{t.map.search.filterYear}:</span>
              {renderCheckmarks(YEARS.map(year => (year + 1).toString()), 0)}
            </div>
              {/* Offers */}
              <div className="grid grid-rows-3 grid-cols-2 gap-y-2 mt-3">
              {renderCheckmarks(offers, YEARS.length)}
            </div>

              {/* Master Programs */}
              {(checkmarks.slice(3, 5).some((checked) => checked)) && (
              <div className="mt-4 pb-4">
                <span>{t.map.search.dataMasterPrograms}:</span>
                <div className="grid grid-rows-2 grid-cols-2 gap-y-2 mt-3 pb-4">
                  {renderCheckmarks(dataMasterPrograms, YEARS.length + offers.length)}
                </div>

                <span>{t.map.search.otherMasterPrograms}:</span>
                <div className="grid grid-rows-1 grid-cols-1 gap-y-2 mt-3">
                  {renderCheckmarks(otherMasterPrograms, YEARS.length + offers.length + dataMasterPrograms.length)}
                </div>
              </div>
            )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
