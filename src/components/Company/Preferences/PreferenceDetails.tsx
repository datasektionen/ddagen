import Locale from "@/locales";
import { api } from "@/utils/api";
import { Dispatch, useState, useEffect } from "react";
import { Extras, Package, Preferences } from "../../../shared/Classes";
import { AddPreferences } from "./AddPreferences";
import { EditPreferences } from "./EditPreferences";

export function PreferenceDetails({
  t,
  type,
  extras,
  preferenceCount,
  setPreferenceCount,
  exhibitorPackage,
}: {
  t: Locale;
  type: "Banquet" | "Representative";
  extras: Extras | undefined;
  preferenceCount: { banqcount: number; reprcount: number };
  setPreferenceCount: Dispatch<{ banqcount: number; reprcount: number }>;
  exhibitorPackage: Package;
}) {
  const defaultPreference = new Preferences(undefined, "", [], "", type);

  const includedCount = type === "Banquet"
    ? exhibitorPackage.banquetTickets
    : exhibitorPackage.mealCoupons;

  const getPreferences = api.exhibitor.getFoodPreferences.useQuery(type);
  const getOrders = api.exhibitor.getOrders.useQuery();

  const pendingTicketType = type === "Banquet" ? "banquette_ticket" : "meal_ticket";
  const pendingTicketRequests = (getOrders.data?.requests ?? []).filter(
    (request) => request.item.type === pendingTicketType
  );
  const pendingIncludedCount = Math.min(
    pendingTicketRequests.length,
    Math.max(0, includedCount - (getPreferences.data?.length ?? 0))
  );

  const [pos, setPos] = useState(0);
  const [preferences, setPreferences] = useState([defaultPreference]);
  const [editState, setEditState] = useState<undefined | string>(undefined);

  useEffect(() => {
    setPos(0);
  }, [preferences]);

  useEffect(() => {
    if (!getPreferences.isSuccess) return;

    setPreferences([defaultPreference].concat(getPreferences.data));
  }, [getPreferences.isSuccess, getPreferences.data, includedCount, type]);

  return (
    <div className="w-full flex flex-col items-center">
      <AddPreferences
        t={t}
        pos={pos}
        type={type}
        extras={extras}
        preferences={preferences}
        setPreferences={setPreferences}
        preferenceCount={preferenceCount}
        setPreferenceCount={setPreferenceCount}
        editState={editState}
        setEditState={setEditState}
        setPos={setPos}
        exhibitorPackage={exhibitorPackage}
        includedCount={includedCount}
        pendingTicketCount={pendingTicketRequests.length}
      />
      {preferences.slice(1).map((preference, pos) => {
        const borderClass = pos < includedCount ? "border-cerise" : "border-gold";
        return (
          <div className="w-full text-white flex flex-col items-center rounded-xl" key={preference.id}>
            <EditPreferences
              t={t}
              pos={pos + 1}
              setPos={setPos}
              preferences={preferences}
              editState={editState}
              setEditState={setEditState}
              borderClass={borderClass}
              ticketPrice={pos >= includedCount ? (type === "Banquet" ? 2000 : 450) : undefined}
            />
          </div>
        );
      })}
      {pendingTicketRequests.map((request) => (
        <div
          className={`w-[80%] mb-4 border-2 border-dashed rounded-xl bg-black/10 px-3 py-5 text-center text-white/70 ${pendingTicketRequests.indexOf(request) < pendingIncludedCount ? "border-cerise" : "border-gold"}`}
          key={`${type}-pending-${request.item.id}`}
        >
          {t.exhibitorSettings.table.row3.pendingTicket}
        </div>
      ))}
      {Array.from(
        { length: Math.max(0, includedCount - (preferences.length - 1) - pendingIncludedCount) },
        (_, index) => (
          <div
            className="w-[80%] mb-4 border-2 border-dashed border-cerise/50 rounded-xl bg-black/10 px-3 py-5 text-center text-white/50"
            key={`${type}-included-placeholder-${index}`}
          >
            Person {preferences.length + index}
          </div>
        )
      )}
    </div>
  );
}
