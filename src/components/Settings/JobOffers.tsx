import React from "react";
import Locale from "@/locales";
import { CheckMark } from "@/components/CheckMark";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";


export default function JobOffers(
    {
        t,
       
    }: {
        t: Locale;
    }
){
    const getJobOffers = api.exhibitor.getJobOffers.useQuery();
   
    const [checkmarks, setCheckMarks] = useState<boolean[]>([]);
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

      useEffect(() => {
        if (!getJobOffers.isSuccess || !getJobOffers.data) return;
        let initCheckMarks = new Array<boolean>(18).fill(false);
        const jobOffers = getJobOffers.data;
        jobOffers.summerJob.map((num: number) => {
          initCheckMarks[num] = true;
        });
        jobOffers.internship.map((num: number) => {
          initCheckMarks[5 + num] = true;
        });
        jobOffers.partTimeJob.map((num: number) => {
          initCheckMarks[10 + num] = true;
        });
        initCheckMarks[15] = jobOffers.masterThesis;
        initCheckMarks[16] = jobOffers.fullTimeJob;
        initCheckMarks[17] = jobOffers.traineeProgram;
        setCheckMarks(initCheckMarks);
      }, [getJobOffers.data]);

    return (
      
        <div className="flex flex-col w-full items-center overflow-auto text-center">

            <h1 className="uppercase text-cerise text-2xl md:text-4xl font-normal px-[10px] break-words mb-8 pt-4 w-full">
                {t.exhibitorSettings.table.row1.section2.header}
            </h1>
            <div className="max-lg:hidden w-[75%]">
            <div className="grid grid-cols-6 grid-rows-4 mx-auto gap-y-2 mb-8">
            <div></div>
            {years.map((year) => (
                <div>{year}</div>
                ))}
            <div className="pr-8 text-left">{rows[0].jobOffer}</div>
            {rows[0].checkmarks}
            <div className="pr-8 text-left">{rows[1].jobOffer}</div>
            {rows[1].checkmarks}
            <div className="pr-8 text-left">{rows[2].jobOffer}</div>
            {rows[2].checkmarks}
            </div>
            <div className="flex flex-row mb-12 gap-x-16 justify-center">
            {[3, 4, 5].map((pos) => (
                <div className="flex flex-row" key={pos}>
                <span className="mr-4 items-center">{rows[pos].jobOffer}</span>
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


        </div>
      
    );
}