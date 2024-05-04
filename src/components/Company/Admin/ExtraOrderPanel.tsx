import Locale from "@/locales";
import { useState, useEffect } from "react";
import { Package, Exhibitor, ExhibitorExtras } from "@/shared/Classes";

export function ExtraOrderPanel({
  t,
  exhibitors,
}: {
  t: Locale;
  exhibitors: Exhibitor[];
}) {
  const [extras, setExtras] = useState<[ExhibitorExtras, ExhibitorExtras]>();

  useEffect(() => {
    let exhibitorPackage = {
      tables: 0,
      chairs: 0,
      drinkCoupons: 0,
      representativeSpots: 0,
      banquetTicket: 0,
    };
    let extras = {
      tables: 0,
      chairs: 0,
      drinkCoupons: 0,
      representativeSpots: 0,
      banquetTicket: 0,
    };

    exhibitors.map((exhibitor) => {
      const p = new Package(t, exhibitor.packageTier);

      exhibitorPackage.tables += p.tables + exhibitor.customTables;
      exhibitorPackage.chairs += p.chairs + exhibitor.customChairs;
      exhibitorPackage.drinkCoupons +=
        p.drinkCoupons + exhibitor.customDrinkCoupons;
      exhibitorPackage.representativeSpots +=
        p.representatives + exhibitor.customRepresentativeSpots;
      exhibitorPackage.banquetTicket +=
        p.banquetTickets + exhibitor.customRepresentativeSpots;

      extras.tables += exhibitor.extraTables;
      extras.chairs += exhibitor.extraChairs;
      extras.drinkCoupons += exhibitor.extraDrinkCoupons;
      extras.representativeSpots += exhibitor.extraRepresentativeSpots;
      extras.banquetTicket += exhibitor.totalBanquetTicketsWanted;
    });

    setExtras([exhibitorPackage, extras]);
  }, [exhibitors]);

  return (
    <div className="w-full h-full text-white">
      <div className="flex flex-col items-center justify-center mt-16">
        <div className="w-[80%] md:w-[70%] lg:w-[60%]">
          <div className="overflow-x-auto">
            <table className="w-full bg-slate-50 bg-opacity-20 border-collapse border-solid">
              <thead className="[&>tr>th]:border-2 [&>tr>th]:border-solid [&>tr>th]:border-cerise [&>tr>th]:py-2 [&>tr>th]:px-8">
                <tr>
                  <th>{t.admin.extraOrders.header.order}</th>
                  <th>{t.admin.extraOrders.header.package}</th>
                  <th>{t.admin.extraOrders.header.extras}</th>
                  <th>{t.admin.extraOrders.header.total}</th>
                </tr>
              </thead>
              <tbody
                className="[&>tr>td]:border-2 [&>tr>td]:border-t-2 [&>tr>td]:border-solid 
                        [&>tr>td]:border-cerise [&>tr>td]:p-4"
              >
                <tr className="text-center">
                  <td>{t.admin.extraOrders.row.tables}</td>
                  <td>{extras?.[0].tables}</td>
                  <td>{extras?.[1].tables}</td>
                  <td>{extras ? extras?.[0].tables + extras?.[1].tables : 0}</td>
                </tr>
                <tr className="text-center">
                  <td>{t.admin.extraOrders.row.chairs}</td>
                  <td>{extras?.[0].chairs}</td>
                  <td>{extras?.[1].chairs}</td>
                  <td>{extras ? extras?.[0].chairs + extras?.[1].chairs : 0}</td>
                </tr>
                <tr className="text-center">
                  <td>{t.admin.extraOrders.row.drinkCoupons}</td>
                  <td>{extras?.[0].drinkCoupons}</td>
                  <td>{extras?.[1].drinkCoupons}</td>
                  <td>
                    {extras
                      ? extras?.[0].drinkCoupons + extras?.[1].drinkCoupons
                      : 0}
                  </td>
                </tr>
                <tr className="text-center">
                  <td>{t.admin.extraOrders.row.representatives}</td>
                  <td>{extras?.[0].representativeSpots}</td>
                  <td>{extras?.[1].representativeSpots}</td>
                  <td>
                    {extras
                      ? extras?.[0].representativeSpots +
                        extras?.[1].representativeSpots
                      : 0}
                  </td>
                </tr>
                <tr className="text-center">
                  <td>{t.admin.extraOrders.row.banquetTickets}</td>
                  <td>{extras?.[0].banquetTicket}</td>
                  <td>{extras?.[1].banquetTicket}</td>
                  <td>
                    {extras
                      ? extras?.[0].banquetTicket + extras?.[1].banquetTicket
                      : 0}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
