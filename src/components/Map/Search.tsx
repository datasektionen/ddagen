import type Locale from "@/locales";
import { CheckMark } from "../CheckMark";
import { useState, MouseEventHandler } from "react";

function Button({
  value,
  loading,
  onClick,
}: {
  value: string;
  loading: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      disabled={loading}
      className="
        bg-cerise transition-transform hover:scale-110 text-white 
        uppercase w-fit ml-3 py-2 px-5 rounded-full cursor-pointer 
        disabled:cursor-wait disabled:grayscale
      "
      onClick={onClick}
    >
      {value}
    </button>
  );
}

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
      <div className="flex flex-row my-4">
        <input
          className="h-[40px] w-[400px] outline-none border-2 border-cerise bg-[#eaeaea] bg-opacity-10 
                    rounded-3xl px-3 text-white text-opacity-50 focus:placeholder:text-transparent"
          type="text"
          placeholder={t.map.search.placeHolder}
          value={query}
          onChange={(q) => setQuery(q.target.value)}
        />
        <Button value={t.map.search.buttonOne} loading={false} />
        <Button
          value={t.map.search.buttonTwo}
          loading={false}
          onClick={() => setShowFilter(!showFilter)}
        />
      </div>
      <div className="flex justify-center w-full">
        {showFilter && (
          <div
            className="w-[400px] h-[200px] flex border-2 border-cerise bg-[#eaeaea] bg-opacity-10
                          rounded-lg p-2 text-white justify-center text-xl"
          >
            <div className="flex flex-col items-center">
              <div className="flex flex-row mt-2">
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
              <div className="grid grid-rows-3 grid-cols-2 gap-2 mt-4 justify-items-center">
                {offers.map((offer) => {
                  return (
                    <div className="flex flex-row space-x-1 ml-2">
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
