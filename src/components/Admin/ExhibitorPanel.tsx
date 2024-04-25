import Locale from "@/locales";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { addImageDetails } from "@/shared/addImageDetails";
import {
  Exhibitor,
  Preferences,
  sortExhibitors,
  Package,
} from "@/shared/Classes";

export function ExhibitorPanel({
  t,
  exhibitors,
  preferences,
  password,
}: {
  t: Locale;
  exhibitors: Exhibitor[];
  preferences: Preferences[];
  password: string;
}) {
  const [preferenceCount, setPreferenceCount] =
    useState<Map<string, { banquet: number; representative: number }>>();

  const router = useRouter();
  const trpc = api.useContext();
  const login = api.admin.login.useMutation();

  useEffect(() => {
    if (login.isSuccess) {
      router.push("/utställare");
    }
  }, [login.isSuccess]);

  useEffect(() => {
    const count = new Map<
      string,
      { banquet: number; representative: number }
    >();
    exhibitors.map((exhibitor) => {
      count.set(exhibitor.id, { banquet: 0, representative: 0 });
    });
    preferences.map((preference) => {
      if (preference.exhibitorId && count.has(preference.exhibitorId)) {
        const prefCount = count.get(preference.exhibitorId);
        if (prefCount) {
          switch (preference.type) {
            case "Banquet":
              prefCount.banquet += 1;
              break;
            case "Representative":
              prefCount.representative += 1;
              break;
          }
          count.set(preference.exhibitorId, prefCount);
        }
      }
    });
    setPreferenceCount(count);
  }, [preferences]);

  function getLoginFunction(exhibitorId: string) {
    return async () => {
      await trpc.invalidate();
      login.mutate({ exhibitorId: exhibitorId, password });
    };
  }

  function evaluataPreferences(
    exhibitor: Exhibitor,
    type: "Representative" | "Banquet"
  ) {
    if (preferenceCount && preferenceCount.has(exhibitor.id)) {
      const prefCount = preferenceCount.get(exhibitor.id);
      if (prefCount) {
        const exhibitorPackage = new Package(t, exhibitor.packageTier);
        const exhibitorRepresentativeCount =
          exhibitorPackage.representatives +
          exhibitor.extraRepresentativeSpots +
          exhibitor.customRepresentativeSpots;
        const exhibitorBanquetCount =
          exhibitorPackage.banquetTickets +
          exhibitor.totalBanquetTicketsWanted +
          exhibitor.customBanquetTicketsWanted;
        

        let amount = "0/0";          
        switch (type) {
          case 'Representative':
            amount = `${prefCount.representative}/${exhibitorRepresentativeCount}`;
            break;
          case 'Banquet':
            amount = `${prefCount.banquet}/${exhibitorBanquetCount}`;
            break;
        }

        const goalReached =
          (type == "Representative" &&
            exhibitorRepresentativeCount == prefCount.representative) ||
          (type == "Banquet" && exhibitorBanquetCount == prefCount.banquet);
        const goalNotReached =
          (type == "Representative" &&
            exhibitorRepresentativeCount > prefCount.representative) ||
          (type == "Banquet" && exhibitorBanquetCount > prefCount.banquet);
        const preferencesGreaterThanGoal =
          (type == "Representative" &&
            exhibitorRepresentativeCount < prefCount.representative) ||
          (type == "Banquet" && exhibitorBanquetCount < prefCount.banquet);

        if (goalReached)
          return <span className="font-medium text-green-500	">{amount}</span>;
        if (goalNotReached)
          return <span className="font-medium text-orange-500	">{amount}</span>;
        if (preferencesGreaterThanGoal)
          return <span className="font-medium text-red-500	">{amount}</span>;
      }
    }
    <span className="font-medium text-red-500	">Fail</span>;
  }

  return (
    <div className="w-full h-full text-white">
      <div className="flex flex-col items-center justify-center">
        <div className="text-center text-xl my-10 font-medium">
          <p>
            {t.admin.sales.amountOfExhibitors}:&nbsp;
            <span className="text-cerise">{exhibitors.length}</span>
          </p>
        </div>
        <div className="w-[80%] sm:w-[90%]">
          <div className="overflow-x-auto">
            <table className="w-full bg-slate-50 bg-opacity-20 border-collapse border-solid">
              <thead className="[&>tr>th]:border-2 [&>tr>th]:border-solid [&>tr>th]:border-cerise [&>tr>th]:py-2 [&>tr>th]:px-4 ">
                <tr>
                  <th>{t.admin.sales.header.name}</th>
                  <th>{t.admin.sales.header.logoWhite}</th>
                  <th>{t.admin.sales.header.logoColour}</th>
                  <th>{t.admin.sales.header.description}</th>
                  <th>{t.admin.sales.header.package}</th>
                  <th>{t.admin.sales.header.extras.name}</th>
                  <th>{t.admin.sales.header.verification.name}</th>
                </tr>
              </thead>
              <tbody
                className="[&>tr>td]:border-2 [&>tr>td]:border-t-2 [&>tr>td]:border-solid
                      [&>tr>td]:border-cerise [&>tr>td]:p-4"
              >
                {sortExhibitors(exhibitors).map((exhibitor, i) => (
                  <tr key={i}>
                    <td className="text-center break-words">
                      <p>{exhibitor.name}</p>
                      <button
                        className="mt-2 bg-cerise bg-blue-500 py-1 px-2 rounded-md"
                        onClick={getLoginFunction(exhibitor.id)}
                      >
                        {t.admin.sales.login}
                      </button>
                    </td>
                    <td>
                      {exhibitor.logoWhite ? (
                        <img
                          className="mx-auto w-[150px]"
                          src={addImageDetails(exhibitor.logoWhite)}
                        />
                      ) : (
                        <p className="font-bold text-center">U/A</p>
                      )}
                    </td>
                    <td>
                      {exhibitor.logoColor ? (
                        <img
                          className="mx-auto max-w-[150px]"
                          src={addImageDetails(exhibitor.logoColor)}
                        />
                      ) : (
                        <p className="font-bold text-center">U/A</p>
                      )}
                    </td>
                    <td className="align-top break-words max-w-[150px] text-xs">
                      {exhibitor.description}
                    </td>
                    <td className="text-center">{ t.packages.name[exhibitor.packageTier] }</td>
                    <td>
                      <div className="flex flex-col text-center px-2">
                        <div>
                          {t.admin.sales.header.extras.chairs}:{" "}
                          {exhibitor.extraChairs}
                        </div>
                        <div>
                          {t.admin.sales.header.extras.tables}:{" "}
                          {exhibitor.extraTables}
                        </div>
                        <div>
                          {t.admin.sales.header.extras.drinkCoupons}:{" "}
                          {exhibitor.extraDrinkCoupons}
                        </div>
                        <div>
                          {t.admin.sales.header.extras.representativeSpots}:{" "}
                          {exhibitor.extraRepresentativeSpots}
                        </div>
                        <div>
                          {t.admin.sales.header.extras.banquetTickets}:{" "}
                          {exhibitor.totalBanquetTicketsWanted}
                        </div>
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="flex flex-col">
                        <div>
                          {t.admin.sales.header.verification.banquet}:{" "}
                          {evaluataPreferences(exhibitor, "Banquet")}
                        </div>
                        <div>
                          {t.admin.sales.header.verification.representatives}:{" "}
                          {evaluataPreferences(exhibitor, "Representative")}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
