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
    <div className="w-full h-full text-white">
      <div className="flex flex-col items-center justify-center mt-16">
        <div>
          <table className="block bg-slate-50 bg-opacity-20 border-collapse border-solid">
            <thead className="[&>tr>th]:border-2 [&>tr>th]:border-solid [&>tr>th]:border-cerise [&>tr>th]:py-2 [&>tr>th]:px-8 ">
              <tr>
                <th>{t.admin.extraOrders.header.extras}</th>
                <th>{t.admin.extraOrders.header.amount}</th>
              </tr>
            </thead>
            <tbody
              className="[&>tr>td]:border-2 [&>tr>td]:border-t-2 [&>tr>td]:border-solid 
                      [&>tr>td]:border-cerise [&>tr>td]:p-4"
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
