import { Dispatch, useState, useEffect, useRef } from "react";
import type Locale from "@/locales";
import { CheckMark } from "../CheckMark";
import Button from "./Button";

export default function Search({
  t,
  setQuery,
}: {
  t: Locale;
  setQuery: Dispatch<{
    searchQuery: string;
    years: (0 | 1 | 2 | 3 | 4)[];
    offers: {
      summer: boolean;
      internship: boolean;
      partTime: boolean;
      thesis: boolean;
      fullTime: boolean;
      trainee: boolean;
    };
    masterPrograms: string[];
  }>;
}) {
  const years = [0, 1, 2, 3, 4];
  const offers = [
    t.exhibitorSettings.table.row1.section2.jobs.summer,
    t.exhibitorSettings.table.row1.section2.jobs.internship,
    t.exhibitorSettings.table.row1.section2.jobs.partTime,
    t.exhibitorSettings.table.row1.section2.other.thesis,
    t.exhibitorSettings.table.row1.section2.other.fullTime,
    t.exhibitorSettings.table.row1.section2.other.trainee,
  ];
  const dataMasterPrograms = [
    t.exhibitorSettings.table.row1.section2.datamasters.computerScience,
    t.exhibitorSettings.table.row1.section2.datamasters.ICTInnovation,
    t.exhibitorSettings.table.row1.section2.datamasters.cyberSecurity,
    t.exhibitorSettings.table.row1.section2.datamasters.sustainableDigitalisation,
    t.exhibitorSettings.table.row1.section2.datamasters.systemControl,
    t.exhibitorSettings.table.row1.section2.datamasters.softwareEngineering,
    t.exhibitorSettings.table.row1.section2.datamasters.embeddedSystems,
    t.exhibitorSettings.table.row1.section2.datamasters.informationNetworkEngineering,
    t.exhibitorSettings.table.row1.section2.datamasters.industrialManagement,
    t.exhibitorSettings.table.row1.section2.datamasters.interactiveMediaTechnology,
    t.exhibitorSettings.table.row1.section2.datamasters.communicationSystems,
    t.exhibitorSettings.table.row1.section2.datamasters.machineLearning,
    t.exhibitorSettings.table.row1.section2.datamasters.medicalEngineering,
    t.exhibitorSettings.table.row1.section2.datamasters.softwareEngineering,
    t.exhibitorSettings.table.row1.section2.datamasters.apliedMathematics,
  ];
  const otherMasterPrograms = [
    t.exhibitorSettings.table.row1.section2.otherMasters.other,
  ];

  const OFFER_START_INDEX = 5;
  const DATA_MASTER_PROGRAMS_START_INDEX = OFFER_START_INDEX + offers.length;
  const OTHER_MASTER_PROGRAMS_START_INDEX = DATA_MASTER_PROGRAMS_START_INDEX + dataMasterPrograms.length;


  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [checkmarks, setCheckmarks] = useState<boolean[]>([]);
  useEffect(() => {
    setCheckmarks(Array<boolean>(OTHER_MASTER_PROGRAMS_START_INDEX + otherMasterPrograms.length).fill(false));
  }, [otherMasterPrograms.length]);
  const filterRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const setSearchQueryAndApply = (value: string) => {
    setSearchQuery(value);
    // applySearch(value, checkmarks, setQuery);
  };

  const toggleCheckmarkAndApply = (index: number) => {
    setCheckmarks((prev) => {
      const newCheckmarks = [...prev];
      newCheckmarks[index] = !newCheckmarks[index];
      // applySearch(searchQuery, newCheckmarks, setQuery);
      return newCheckmarks;
    });
  };

  useEffect(() => {
    const applySearch = () => {
      setQuery({
        searchQuery,
        years: checkmarks
          .slice(0, 5)
          .map((value, index) => (value ? index : -1))
          .filter((index) => index !== -1) as (0 | 1 | 2 | 3 | 4)[],
        offers: {
          summer: checkmarks[OFFER_START_INDEX],
          internship: checkmarks[OFFER_START_INDEX + 1],
          partTime: checkmarks[OFFER_START_INDEX + 2],
          thesis: checkmarks[OFFER_START_INDEX + 3],
          fullTime: checkmarks[OFFER_START_INDEX + 4],
          trainee: checkmarks[OFFER_START_INDEX + 5],
        },
        masterPrograms: [
          ...dataMasterPrograms.filter((_, index) => checkmarks[DATA_MASTER_PROGRAMS_START_INDEX + index ]),
          ...otherMasterPrograms.filter((_, index) => checkmarks[OTHER_MASTER_PROGRAMS_START_INDEX + index]),
        ],
      });
    };

    console.log('Search function called with searchQuery:', searchQuery);
    console.log('State of checkmarks:', checkmarks);

    applySearch();
  }, [searchQuery, checkmarks, setQuery]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node) &&
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setShowFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterRef, searchBarRef]);

  return (
    <div id={"search"} className="h-20 w-full flex flex-col items-center justify-center">
      <div ref={searchBarRef} className="w-full flex items-center my-4">
        <input
          className="h-10 grow outline-none border-2 border-cerise bg-[#eaeaea] bg-opacity-10
                    rounded-3xl px-3 text-white text-opacity-50 focus:placeholder:text-transparent"
          type="text"
          placeholder={t.map.search.placeHolder}
          value={searchQuery}
          onChange={(q) => setSearchQueryAndApply(q.target.value)}
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
                {years.map((year, pos) => (
                  <div className="flex flex-row space-x-1 items-center" key={`${pos}`}>
                    <span className="text-lg text-gray-500">{year + 1}</span>
                    <input
                      type="checkbox"
                      name={`${pos}`}
                      checked={checkmarks[pos]}
                      onChange={() => toggleCheckmarkAndApply(pos)}
                      className={`form-checkbox w-6 h-6 hover:cursor-pointer hover:border-yellow
                                    bg-black/25 checked:bg-cerise checked:border-white rounded-lg focus:ring-0
                                    border-2 border-cerise`}
                    />
                  </div>
                ))}
              </div>
              {/* Offers */}
              <div className="grid grid-rows-3 grid-cols-2 gap-y-2 mt-3">
                {offers.map((offer, pos) => (
                  <div
                    key={`${OFFER_START_INDEX + pos}`}
                    className="flex flex-row space-x-1 justify-between items-center"
                  >
                    <div style={{ marginTop: '-2px' }}>
                      <CheckMark
                        name={`${OFFER_START_INDEX + pos}`}
                        checked={checkmarks[OFFER_START_INDEX + pos]}
                        onChange={() => toggleCheckmarkAndApply( OFFER_START_INDEX + pos)}
                      />
                    </div>
                    <div className="text-sm flex-grow">{offer}</div>
                  </div>
                ))}
              </div>
              {/* Master Programs */}
              {checkmarks.slice(3,5).some((checked) => checked) && (
                <div className="mt-4 pb-4">
                  {/* Data masters */}
                  <span>{t.map.search.dataMasterPrograms}:</span>
                  <div className="grid grid-rows-2 grid-cols-2 gap-y-2 mt-3 pb-4">
                    {dataMasterPrograms.map((program, index) => (
                      <div
                        key={`master-${index}`}
                        className="flex flex-row space-x-1 justify-between items-center"
                      >
                        <div style={{ marginTop: '-2px' }}>
                          <CheckMark
                            name={`master-${DATA_MASTER_PROGRAMS_START_INDEX + index}`}
                            checked={checkmarks[DATA_MASTER_PROGRAMS_START_INDEX + index]}
                            onChange={() => toggleCheckmarkAndApply(DATA_MASTER_PROGRAMS_START_INDEX + index)}
                          />
                        </div>
                        <div className="text-sm flex-grow">{program}</div>
                      </div>
                    ))}
                  </div>
                  {/* other masters */}
                  <span>{t.map.search.otherMasterPrograms}:</span>
                  <div className="grid grid-rows-1 grid-cols-1 gap-y-2 mt-3">
                    {otherMasterPrograms.map((program, index) => (
                      <div
                        key={`master-${index}`}
                        className="flex flex-row space-x-1 justify-between items-center"
                      >
                        <div style={{ marginTop: '-2px' }}>
                          <CheckMark
                            name={`master-${OTHER_MASTER_PROGRAMS_START_INDEX + index}`}
                            checked={checkmarks[OTHER_MASTER_PROGRAMS_START_INDEX + index]}
                            onChange={() => toggleCheckmarkAndApply(OTHER_MASTER_PROGRAMS_START_INDEX + index)}
                          />
                        </div>
                        <div className="text-sm flex-grow">{program}</div>
                      </div>
                    ))}
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
