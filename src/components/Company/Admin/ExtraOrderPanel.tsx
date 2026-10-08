import Locale from "@/locales";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Package, Exhibitor, ExhibitorExtras, Preferences } from "@/shared/Classes";
import { api } from "@/utils/api";

type AcceptedExtraOrders = {
  tables: number;
  chairs: number;
  drinkCoupons: number;
  alcFreeTicket: number;
  byExhibitor?: Record<string, AcceptedExtraOrders>;
};

type PendingExtraOrder = {
  id: string;
  exhibitor_id: string;
  companyName: string;
  updated_at: Date;
  item: {
    type: string;
    amount: number;
    price_per_unit: number;
    ticket_name?: string | null;
    ticket_value?: string[];
    ticket_comment?: string | null;
  };
};

export function ExtraOrderPanel({
  t,
  exhibitors,
  preferences,
  acceptedExtraOrders,
  pendingExtraOrders,
}: {
  t: Locale;
  exhibitors: Exhibitor[];
  preferences: Preferences[];
  acceptedExtraOrders: AcceptedExtraOrders;
  pendingExtraOrders: PendingExtraOrder[];
}) {
  const [extras, setExtras] = useState<[ExhibitorExtras, ExhibitorExtras]>();
  const router = useRouter();
  const login = api.admin.login.useMutation();
  const activeExhibitorIds = new Set(exhibitors.map((exhibitor) => exhibitor.id));
  const visiblePendingExtraOrders = pendingExtraOrders.filter((request) =>
    activeExhibitorIds.has(request.exhibitor_id)
  );

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
      exhibitorPackage.representativeSpots += p.representatives// + exhibitor.customRepresentativeSpots;

      exhibitorPackage.banquetTicket += p.banquetTickets// + exhibitor.customBanquetTicketsWanted;
      exhibitorPackage.mealCoupons += p.mealCoupons;

      const representativePreferences = preferences.filter(
        (preference) =>
          preference.type === "Representative" &&
          preference.exhibitorId === exhibitor.id
      );
      const banquetPreferences = preferences.filter(
        (preference) =>
          preference.type === "Banquet" &&
          preference.exhibitorId === exhibitor.id
      );
      const includedBanquetPreferences = banquetPreferences.slice(
        0,
        p.banquetTickets
      );
      const extraBanquetPreferences = banquetPreferences.slice(
        p.banquetTickets
      );
      const includedAlcoholFreeTickets = includedBanquetPreferences.filter(
        (preference) => preference.value?.includes("AlcoholFree")
      ).length;
      const extraAlcoholFreeTickets = extraBanquetPreferences.filter(
        (preference) => preference.value?.includes("AlcoholFree")
      ).length;

      exhibitorPackage.alcFreeTicket += includedAlcoholFreeTickets * 3;
      exhibitorPackage.drinkCoupons +=
        p.drinkCoupons - includedAlcoholFreeTickets * 3;
      extras.alcFreeTicket += extraAlcoholFreeTickets * 3;
      extras.drinkCoupons +=
        (extraBanquetPreferences.length - extraAlcoholFreeTickets) * 3;

      extras.mealCoupons += Math.max(
        0,
        representativePreferences.length -
          p.mealCoupons
      );
      extras.banquetTicket += extraBanquetPreferences.length;
    });

    const activeAcceptedExtraOrders = exhibitors.reduce(
      (totals, exhibitor) => {
        const accepted = acceptedExtraOrders.byExhibitor?.[exhibitor.id];
        if (!accepted) return totals;

        totals.tables += accepted.tables;
        totals.chairs += accepted.chairs;
        totals.drinkCoupons += accepted.drinkCoupons;
        totals.alcFreeTicket += accepted.alcFreeTicket;
        return totals;
      },
      { tables: 0, chairs: 0, drinkCoupons: 0, alcFreeTicket: 0 }
    );

    extras.tables = activeAcceptedExtraOrders.tables;
    extras.chairs = activeAcceptedExtraOrders.chairs;
    extras.drinkCoupons += activeAcceptedExtraOrders.drinkCoupons * 3;
    extras.alcFreeTicket += activeAcceptedExtraOrders.alcFreeTicket * 3;

    setExtras([exhibitorPackage, extras]);
  }, [acceptedExtraOrders, exhibitors, preferences, t]);

  const banquetPreferences = preferences.filter(
    (preference) => preference.type === "Banquet"
  );
  const confirmedAlcoholFreeDrinkCoupons = banquetPreferences.filter(
    (ticket) => ticket.value?.includes("AlcoholFree")
  ).length * 3;
  const confirmedAlcoholDrinkCoupons =
    banquetPreferences.length * 3 - confirmedAlcoholFreeDrinkCoupons;

  async function loginToExhibitor(exhibitorId: string) {
    await login.mutateAsync({ exhibitorId });
    await router.push("/utställare");
  }

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

      <div className="flex flex-col items-center justify-center mt-16">
        <div className="w-[80%] md:w-[70%] lg:w-[60%]">
          <h3 className="text-2xl font-medium">{t.admin.extraOrders.sections.pending.title}</h3>
          <div className="overflow-x-auto mt-4">
            <table className="w-full bg-slate-50 bg-opacity-20 border-collapse border-solid">
              <thead className="[&>tr>th]:border-2 [&>tr>th]:border-solid [&>tr>th]:border-cerise [&>tr>th]:py-2 [&>tr>th]:px-4">
                <tr>
                  <th>{t.admin.extraOrders.sections.pending.company}</th>
                  <th>{t.admin.extraOrders.sections.pending.type}</th>
                  <th>{t.admin.extraOrders.sections.pending.details}</th>
                  <th>{t.admin.extraOrders.sections.pending.amount}</th>
                  <th>{t.admin.extraOrders.sections.pending.pricePerUnit}</th>
                  <th>{t.admin.extraOrders.sections.pending.totalPrice}</th>
                  <th>{t.admin.extraOrders.sections.pending.updated}</th>
                </tr>
              </thead>
              <tbody className="[&>tr>td]:border-2 [&>tr>td]:border-t-2 [&>tr>td]:border-solid [&>tr>td]:border-cerise [&>tr>td]:p-4">
                {visiblePendingExtraOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center">{t.admin.extraOrders.sections.pending.empty}</td>
                  </tr>
                ) : visiblePendingExtraOrders.map((request) => {
                  const itemName = t.admin.extraOrders.itemNames[request.item.type as keyof typeof t.admin.extraOrders.itemNames];
                  const details = [
                    request.item.ticket_name,
                    request.item.ticket_value?.join(", "),
                    request.item.ticket_comment,
                  ].filter(Boolean).join(" - ");

                  return (
                    <tr key={request.id} className="text-center">
                      <td>
                        <button
                          type="button"
                          className="text-cerise underline hover:text-white"
                          aria-label={`${t.admin.extraOrders.sections.pending.login}: ${request.companyName}`}
                          onClick={() => loginToExhibitor(request.exhibitor_id)}
                        >
                          {request.companyName}
                        </button>
                      </td>
                      <td>{itemName ?? request.item.type}</td>
                      <td>{details || "-"}</td>
                      <td>{request.item.amount}</td>
                      <td>{request.item.price_per_unit} {t.admin.extraOrders.currency}</td>
                      <td>{request.item.amount * request.item.price_per_unit} {t.admin.extraOrders.currency}</td>
                      <td>{new Date(request.updated_at).toLocaleString(t.locale)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
