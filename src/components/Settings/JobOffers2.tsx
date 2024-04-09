import Locale, {useLocale} from "@/locales";
import React, {useState} from "react";
import {step} from "@/components/Settings/Step";
import {CheckMark} from "@/components/CheckMark";

export function JobOffers(){
  const t = useLocale();
  const [checkmarks, setCheckMarks] = useState<boolean[]>([]);
  // Other
  const years = [
    t.exhibitorSettings.table.row1.section2.year.one,
    t.exhibitorSettings.table.row1.section2.year.two,
    t.exhibitorSettings.table.row1.section2.year.three,
    t.exhibitorSettings.table.row1.section2.year.four,
    t.exhibitorSettings.table.row1.section2.year.five,
  ];

  const rows = [
    {
      jobOffer: t.exhibitorSettings.table.row1.section2.jobs.summer,
      checkmarks: [0, 1, 2, 3, 4].map((pos) => (
        <div key={pos}>{getCheckMark(pos)}</div>
      )),
    },
    {
      jobOffer: t.exhibitorSettings.table.row1.section2.jobs.internship,
      checkmarks: [5, 6, 7, 8, 9].map((pos) => (
        <div key={pos}>{getCheckMark(pos)}</div>
      )),
    },
    {
      jobOffer: t.exhibitorSettings.table.row1.section2.jobs.partTime,
      checkmarks: [10, 11, 12, 13, 14].map((pos) => (
        <div key={pos}>{getCheckMark(pos)}</div>
      )),
    },
    {
      jobOffer: t.exhibitorSettings.table.row1.section2.other.thesis,
      checkmarks: getCheckMark(15),
    },
    {
      jobOffer: t.exhibitorSettings.table.row1.section2.other.fullTime,
      checkmarks: getCheckMark(16),
    },
    {
      jobOffer: t.exhibitorSettings.table.row1.section2.other.trainee,
      checkmarks: getCheckMark(17),
    },
  ];

  function getCheckMark(pos: number) {
    return (
      <CheckMark
        name={`${pos}`}
        defaultChecked={checkmarks[pos]}
        onClick={() => {
          checkmarks[pos] = !checkmarks[pos];
        }}
      />
    );
  }

  const content = <div>
    <div className="max-lg:hidden w-[75%]">
      <div className="grid grid-cols-6 grid-rows-4 mx-auto gap-y-2 gap-32 mb-8">
        <div></div>
        {years.map((year) => (
          <div className="text-white">{year}</div>
        ))}
        <div className="pr-8 text-left text-white">{rows[0].jobOffer}</div>
        {rows[0].checkmarks}
        <div className="pr-8 text-left text-white">{rows[1].jobOffer}</div>
        {rows[1].checkmarks}
        <div className="pr-8 text-left text-white">{rows[2].jobOffer}</div>
        {rows[2].checkmarks}
      </div>
      <div className="ml-[20px] flex flex-row mb-12 gap-x-16">
        {[3, 4, 5].map((pos) => (
          <div className="flex flex-row" key={pos}>
            <span className="mr-4 items-center text-white">{rows[pos].jobOffer}</span>
            {rows[pos].checkmarks}
          </div>
        ))}
      </div>
    </div>

    <div className="lg:hidden w-full mb-10">
      <div className="flex flex-col gap-y-2 text-lg items-center">
        <div
          className="flex flex-row gap-x-0 xxxs:gap-x-1 xxs:gap-x-3
                              xs:gap-x-7 sm:gap-x-14 md:gap-x-20 justify-center"
        >
          {years.map((year) => (
            <div>{year}</div>
          ))}
        </div>
        {rows.map((row) => (
          <div className="flex flex-col gap-y-2" key={row.jobOffer}>
            {row.jobOffer}
            <div
              className="flex flex-row gap-x-0 xxxs:gap-x-2 xxs:gap-x-4
                              xs:gap-x-8 sm:gap-x-14 md:gap-x-20 justify-center"
            >
              {row.checkmarks}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>;

  return step(t.exhibitorSettings.step1.title,1,content,t);
}
