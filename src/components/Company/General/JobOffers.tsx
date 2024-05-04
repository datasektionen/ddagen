import React from "react";
import Locale from "@/locales";

// need to find a way to make this work for the student page as well
export default function JobOffers(
    {
        t,
        rows,
    }: {
        t: Locale, 
        rows: {
          jobOffer: string;
          checkmarks: any;
      }[];
    }
){
    
  const years = [
      t.exhibitorSettings.table.row1.section2.year.one,
      t.exhibitorSettings.table.row1.section2.year.two,
      t.exhibitorSettings.table.row1.section2.year.three,
      t.exhibitorSettings.table.row1.section2.year.four,
      t.exhibitorSettings.table.row1.section2.year.five,
    ];

    return (
      
        <div className="flex flex-col w-full items-center overflow-auto text-center">

            <h2 className="uppercase text-cerise text-2xl md:text-4xl font-normal px-[10px] break-words mb-8 pt-4 w-full">
                {t.exhibitorSettings.table.row1.section2.header}
            </h2>
            <div className="max-lg:hidden w-[75%]">
            <div className="grid grid-cols-6 grid-rows-4 mx-auto gap-y-2 mb-8">
            <div></div>
            {years.map((year) => (
                <div key={'year_'+year}>{year}</div>
                ))}
            <div className="pr-8 text-left" >{rows[0].jobOffer}</div>
            {rows[0].checkmarks}
            <div className="pr-8 text-left" >{rows[1].jobOffer}</div>
            {rows[1].checkmarks}
            <div className="pr-8 text-left" >{rows[2].jobOffer}</div>
            {rows[2].checkmarks}
            </div>
            <div className="flex flex-row mb-12 gap-x-16 justify-center">
            {[3, 4, 5].map((pos) => (
                <div className="flex flex-row" key={'setup_'+pos}>
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
                    <div key={'year_'+year}>{year}</div>
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