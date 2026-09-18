import Locale from "@/locales";
import { useState, useEffect } from "react";
import { Package, Exhibitor, ExhibitorExtras, Preferences } from "@/shared/Classes";

type AcceptedExtraOrders = {
  tables: number;
  chairs: number;
  drinkCoupons: number;
  alcFreeTicket: number;
  byExhibitor?: Record<string, AcceptedExtraOrders>;
};

export function ExtraOrderPanel({
  t,
  exhibitors,
  preferences,
  acceptedExtraOrders,
}: {
  t: Locale;
  exhibitors: Exhibitor[];
  preferences: Preferences[];
  acceptedExtraOrders: AcceptedExtraOrders;
}) {
  const [extras, setExtras] = useState<[ExhibitorExtras, ExhibitorExtras]>();

  useEffect(() => {
    let exhibitorPackage = {
      tables: 0,
      chairs: 0,
      drinkCoupons: 0,
      representativeSpots: 0,
      banquetTicket: 0,
      mealCoupons: 0,
      alcFreeTicket: 0,
    };
    let extras = {
      tables: 0,
      chairs: 0,
      drinkCoupons: 0,
      representativeSpots: 0,
      banquetTicket: 0,
      mealCoupons: 0,
      alcFreeTicket: 0,
    };

    exhibitors.forEach((exhibitor) => {
      const p = new Package(t, exhibitor.packageTier);

      exhibitorPackage.tables += p.tables// + exhibitor.customTables;
      exhibitorPackage.chairs += p.chairs// + exhibitor.customChairs;
      exhibitorPackage.drinkCoupons += p.drinkCoupons// + exhibitor.customDrinkCoupons;
      exhibitorPackage.representativeSpots += p.representatives// + exhibitor.customRepresentativeSpots;

      exhibitorPackage.banquetTicket += p.banquetTickets// + exhibitor.customBanquetTicketsWanted;
      exhibitorPackage.mealCoupons += p.mealCoupons;

      console.log("EXHIBITOR", p, exhibitor, preferences.filter((preference) => preference.exhibitorId == exhibitor.id))
      extras.mealCoupons += Math.max(
        0,
        preferences.filter((preference) => preference.type === "Representative" && preference.exhibitorId == exhibitor.id).length -
          p.mealCoupons
      );
      extras.banquetTicket += Math.max(
        0,
        preferences.filter((preference) => preference.type === "Banquet" && preference.exhibitorId == exhibitor.id).length -
          p.banquetTickets
      );
    });

    extras.tables = acceptedExtraOrders.tables;
    extras.chairs = acceptedExtraOrders.chairs;
    extras.drinkCoupons = acceptedExtraOrders.drinkCoupons * 3;
    extras.alcFreeTicket = acceptedExtraOrders.alcFreeTicket * 3;

    setExtras([exhibitorPackage, extras]);
  }, [acceptedExtraOrders, exhibitors, preferences, t]);

  console.log("PREFERENCES", preferences);

  const banquetPreferences = preferences.filter(
    (preference) => preference.type === "Banquet"
  );
  const confirmedAlcoholFreeDrinkCoupons = banquetPreferences.filter(
    (ticket) => ticket.value?.includes("AlcoholFree")
  ).length;
  const confirmedAlcoholDrinkCoupons =
    banquetPreferences.length - confirmedAlcoholFreeDrinkCoupons;

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
                  <td>{t.admin.extraOrders.row.drinkCouponsAlcFree}</td>
                  <td>{extras?.[0].alcFreeTicket}</td>
                  <td>{extras?.[1].alcFreeTicket}</td>
                  <td>
                    {extras
                      ? extras?.[0].alcFreeTicket + extras?.[1].alcFreeTicket
                      : 0}
                  </td>
                </tr>
                {/*
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
                */}
                <tr className="text-center">
                  <td>{t.admin.extraOrders.row.mealCoupons}</td>
                  <td>{extras?.[0].mealCoupons}</td>
                  <td>{extras?.[1].mealCoupons}</td>
                  <td>
                    {extras
                      ? extras?.[0].mealCoupons +
                        extras?.[1].mealCoupons
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
                <tr className="text-center">
                  <td>{t.admin.extraOrders.row.confirmedBanquetTickets}</td>
                  <td></td>
                  <td></td>
                  <td>{preferences.filter((pref) => pref.type == "Banquet").length}</td>
                </tr>
                <tr className="text-center">
                  <td>{t.admin.extraOrders.row.confirmedAlcoholDrinkCoupons}</td>
                  <td></td>
                  <td></td>
                  <td>{confirmedAlcoholDrinkCoupons}</td>
                </tr>
                <tr className="text-center">
                  <td>{t.admin.extraOrders.row.confirmedAlcoholFreeDrinkCoupons}</td>
                  <td></td>
                  <td></td>
                  <td>{confirmedAlcoholFreeDrinkCoupons}</td>
                </tr>                  
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
