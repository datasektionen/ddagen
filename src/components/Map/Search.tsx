import type Locale from "@/locales";
import { Dispatch, useEffect, useState } from "react";
import { CheckMark } from "../CheckMark";
import Button from "./Button";

function applySearch(
  searchQuery: string,
  checkmarks: boolean[],
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
  }>
) {
  setQuery({
    searchQuery: searchQuery.toLowerCase(),
    years: checkmarks
      .slice(0, 5)
      .map((value, index) => (value ? index : -1))
      .filter((index) => index !== -1) as (0 | 1 | 2 | 3 | 4)[],
    offers: {
      summer: checkmarks[5],
      internship: checkmarks[6],
      partTime: checkmarks[7],
      thesis: checkmarks[8],
      fullTime: checkmarks[9],
      trainee: checkmarks[10],
    },
  });
}

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

  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [checkmarks] = useState(Array<boolean>(11).fill(false));

  return (
    <div className="flex flex-col items-center justify-center mt-12">
      <div className="flex max-md:flex-col max-md:gap-y-4 md:flex-row items-center my-4">
        <input
          className="w-[350px] xs:w-[400px] min-h-[40px] outline-none border-2 border-cerise bg-[#eaeaea] bg-opacity-10 
                    rounded-3xl px-3 text-white text-opacity-50 focus:placeholder:text-transparent"
          type="text"
          placeholder={t.map.search.placeHolder}
          value={searchQuery}
          onChange={(q) => setSearchQuery(q.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter")
              applySearch(searchQuery, checkmarks, setQuery);
          }}
        />
        <div className="flex flex-row">
          <Button
            value={t.map.search.buttonOne}
            loading={false}
            onClick={() => applySearch(searchQuery, checkmarks, setQuery)}
          />
          <Button
            value={t.map.search.buttonTwo}
            loading={false}
            onClick={() => setShowFilter(!showFilter)}
          />
        </div>
      </div>
      <div className="flex justify-center w-full">
        {showFilter && (
          <div
            className="w-[350px] xs:w-[400px] min-h-[175px] block border-2 border-cerise bg-[#eaeaea] bg-opacity-10
                          rounded-lg text-white justify-center text-xl"
          >
            <div className="w-full h-full flex flex-col justify-center items-center max-xs:p-6">
              <div className="flex flex-row mt-1">
                {t.map.search.filterYear}:
                {years.map((year, pos) => {
                  return (
                    <div
                      key={`${pos}`}
                      className="flex flex-row space-x-1 ml-2"
                    >
                      <div>{year + 1}</div>
                      <div>
                        <CheckMark
                          name={`${pos}`}
                          defaultChecked={checkmarks[pos]}
                          onClick={() => {
                            checkmarks[pos] = !checkmarks[pos];
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-rows-3 grid-cols-2 gap-2 mt-4">
                {offers.map((offer, pos) => {
                  return (
                    <div
                      key={`${pos + 5}`}
                      className="w-full flex flex-row space-x-1 ml-2 justify-between"
                    >
                      <div>{offer}</div>
                      <div>
                        <CheckMark
                          name={`${pos + 5}`}
                          defaultChecked={checkmarks[pos + 5]}
                          onClick={() => {
                            checkmarks[pos + 5] = !checkmarks[pos + 5];
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
