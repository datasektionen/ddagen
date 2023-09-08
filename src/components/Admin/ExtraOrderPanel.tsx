import Locale from "@/locales";
import { useState, useEffect } from "react";
import { Exhibitor, ExhibitorExtras } from "@/shared/Classes";

export function ExtraOrderPanel({
  t,
  exhibitors,
}: {
  t: Locale;
  exhibitors: Exhibitor[];
}) {
  const [extras, setExtras] = useState<ExhibitorExtras>();

  useEffect(() => {
    let count = {
      tables: 0,
      chairs: 0,
      drinkCoupons: 0,
      representativeSpots: 0,
      banquetTicket: 0,
    };

    exhibitors.map((exhibitor) => {
      count.tables += exhibitor.extraTables;
      count.chairs += exhibitor.extraChairs;
      count.drinkCoupons += exhibitor.extraDrinkCoupons;
      count.representativeSpots += exhibitor.extraRepresentativeSpots;
      count.banquetTicket += exhibitor.totalBanquetTicketsWanted;
    });

    setExtras(count);
  }, [exhibitors]);

  return (
    <div className="w-full h-full mt-48 mb-36 text-white">
      {/*Header*/}
      <h1 className="uppercase text-cerise text-3xl md:text-5xl font-medium text-center px-[10px] break-words">
        {t.admin.extraOrders.header.title}
      </h1>
      {/*Header*/}

      <div className="flex flex-col items-center justify-center mt-16">
        <div>
          <table className="block bg-slate-50 bg-opacity-20 border-collapse border-2 border-solid border-white">
            <thead className="[&>tr>th]:border-r-2 [&>tr>th]:border-solid [&>tr>th]:border-white [&>tr>th]:py-2 [&>tr>th]:px-8 ">
              <tr>
                <th>{t.admin.extraOrders.header.extras}</th>
                <th>{t.admin.extraOrders.header.amount}</th>
              </tr>
            </thead>
            <tbody
              className="[&>tr>td]:border-r-2 [&>tr>td]:border-t-2 [&>tr>td]:border-solid 
                      [&>tr>td]:border-white [&>tr>td]:p-4"
            >
              <tr className="text-center">
                <td>{t.admin.extraOrders.row.tables}</td>
                <td>{extras?.tables}</td>
              </tr>
              <tr className="text-center">
                <td>{t.admin.extraOrders.row.chairs}</td>
                <td>{extras?.chairs}</td>
              </tr>
              <tr className="text-center">
                <td>{t.admin.extraOrders.row.drinkCoupons}</td>
                <td>{extras?.drinkCoupons}</td>
              </tr>
              <tr className="text-center">
                <td>{t.admin.extraOrders.row.representatives}</td>
                <td>{extras?.representativeSpots}</td>
              </tr>
              <tr className="text-center">
                <td>{t.admin.extraOrders.row.banquetTickets}</td>
                <td>{extras?.banquetTicket}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
