import type Locale from "@/locales";
import { useState } from "react";
import { CheckMark } from "../CheckMark";
import Button from "./Button";

export default function Search({ t }: { t: Locale }) {
  const years = [1, 2, 3, 4, 5];
  const offers = [
    t.exhibitorSettings.table.row1.section2.jobs.summer,
    t.exhibitorSettings.table.row1.section2.jobs.internship,
    t.exhibitorSettings.table.row1.section2.jobs.partTime,
    t.exhibitorSettings.table.row1.section2.other.thesis,
    t.exhibitorSettings.table.row1.section2.other.fullTime,
    t.exhibitorSettings.table.row1.section2.other.trainee,
  ];

  const [query, setQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center mt-12">
      <div className="flex max-md:flex-col max-md:gap-y-4 md:flex-row items-center my-4">
        <input
          className="w-[350px] xs:w-[400px] min-h-[40px] outline-none border-2 border-cerise bg-[#eaeaea] bg-opacity-10 
                    rounded-3xl px-3 text-white text-opacity-50 focus:placeholder:text-transparent"
          type="text"
          placeholder={t.map.search.placeHolder}
          value={query}
          onChange={(q) => setQuery(q.target.value)}
        />
        <div className="flex flex-row">
          <Button value={t.map.search.buttonOne} loading={false} />
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
                {years.map((year) => {
                  return (
                    <div className="flex flex-row space-x-1 ml-2">
                      <div>{year}</div>
                      <div>
                        <CheckMark name="e" />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-rows-3 grid-cols-2 gap-2 mt-4">
                {offers.map((offer) => {
                  return (
                    <div className="w-full flex flex-row space-x-1 ml-2 justify-between">
                      <div>{offer}</div>
                      <div>
                        <CheckMark name="e" />
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
