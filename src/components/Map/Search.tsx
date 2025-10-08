import { Dispatch, useState, useEffect, useRef } from "react";
import type Locale from "@/locales";
import { CheckMark } from "../CheckMark";
import Button from "./Button";

const YEARS = [0, 1, 2, 3, 4];
const OFFER_LABELS = [
  'summer', 'internship', 'partTime', 'thesis', 'fullTime', 'trainee'
];
const INDUSTRIES_LABELS = [
  'it', 'f', 'ie', 'ps', 'c', 'er', 'me', 'o'
];

export default function Search({
  t,
  setQuery,
}: {
  t: Locale;
  setQuery: Dispatch<{
    searchQuery: string;
    years: (0 | 1 | 2 | 3 | 4)[];
    offers: string[];
    industries: string[];
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

  const industries = INDUSTRIES_LABELS.map((label) => getSafeValue(
    t.exhibitorSettings.table.row1.section2.industry ?? {},
    label as keyof typeof t.exhibitorSettings.table.row1.section2.industry
  ));

  const TOTAL_CHECKMARKS = YEARS.length + offers.length + industries.length;

  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [checkmarks, setCheckmarks] = useState<boolean[]>(Array(TOTAL_CHECKMARKS).fill(false));
  const filterRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const applySearch = () => {
      setQuery({
        searchQuery: searchQuery.toLowerCase(),
        years: checkmarks
        .slice(0, 5)
        .map((value, index) => (value ? index : -1))
        .filter((index) => index !== -1) as (0 | 1 | 2 | 3 | 4)[],
        offers: OFFER_LABELS.filter((_, index) => checkmarks[YEARS.length + index]),
        industries: INDUSTRIES_LABELS.filter((_, index) => checkmarks[YEARS.length + OFFER_LABELS.length + index]),
      });
    };
    console.log('Search function called with searchQuery:', searchQuery);
    console.log('State of checkmarks:', checkmarks);
    console.log("State of query: ", {
      searchQuery,
      years: checkmarks
      .slice(0, 5)
      .map((value, index) => (value ? index : -1))
      .filter((index) => index !== -1) as (0 | 1 | 2 | 3 | 4)[],
      offers: OFFER_LABELS.filter((_, index) => checkmarks[YEARS.length + index]),
      industries: INDUSTRIES_LABELS.filter((_, index) => checkmarks[YEARS.length + OFFER_LABELS.length + index]),
    });
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
              {/* Industries */}
              <div className="grid grid-rows-3 grid-cols-2 gap-y-2 mt-3">
                <span>{t.map.search.filterIndustry}:</span><br></br>
                {renderCheckmarks(industries, YEARS.length + OFFER_LABELS.length)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
