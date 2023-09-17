import Locale from "@/locales";
import { addImageDetails } from "@/shared/addImageDetails";
import { Exhibitor, sortExhibitors } from "@/shared/Classes";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function ExhibitorPanel({
  t,
  exhibitors,
  password,
}: {
  t: Locale;
  exhibitors: Exhibitor[];
  password: string;
}) {
  const router = useRouter();
  const login = api.admin.login.useMutation();

  useEffect(() => {
    if (login.isSuccess) {
      router.push("/utställare");
    }
  }, [login.isSuccess]);

  return (
    <div className="w-full h-full text-white">
      <div className="flex flex-col items-center justify-center">
        <div className="text-center text-xl my-10 font-medium">
          <p>
            {t.admin.sales.amountOfExhibitors}:&nbsp;
            <span className="text-cerise">{exhibitors.length}</span>
          </p>
        </div>
        <div>
          <table className="block bg-slate-50 bg-opacity-20 border-collapse border-solid">
            <thead className="[&>tr>th]:border-2 [&>tr>th]:border-solid [&>tr>th]:border-cerise [&>tr>th]:py-2 [&>tr>th]:px-8 ">
              <tr>
                <th>{t.admin.sales.header.name}</th>
                <th>{t.admin.sales.header.logoWhite}</th>
                <th>{t.admin.sales.header.logoColour}</th>
                <th>{t.admin.sales.header.description}</th>
                <th>{t.admin.sales.header.package}</th>
                <th>{t.admin.sales.header.extras.name}</th>
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
                      onClick={() => login.mutate({ exhibitorId: exhibitor.id, password })}
                    >{t.admin.sales.login}</button>
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
                  <td className="text-center">{exhibitor.package}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
