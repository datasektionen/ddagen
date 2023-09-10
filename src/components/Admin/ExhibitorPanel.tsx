import Locale from "@/locales";
import { addImageDetails } from "@/shared/addImageDetails";
import { Exhibitor, sortExhibitors } from "@/shared/Classes";

export function ExhibitorPanel({
  t,
  exhibitors,
}: {
  t: Locale;
  exhibitors: Exhibitor[];
}) {
  return (
    <div className="w-full h-full text-white">
      <div className="flex flex-col items-center justify-center mt-16">
        <div>
          <table className="block bg-slate-50 bg-opacity-20 border-collapse border-2 border-solid border-white">
            <thead className="[&>tr>th]:border-r-2 [&>tr>th]:border-solid [&>tr>th]:border-white [&>tr>th]:py-2 [&>tr>th]:px-8 ">
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
              className="[&>tr>td]:border-r-2 [&>tr>td]:border-t-2 [&>tr>td]:border-solid 
                      [&>tr>td]:border-white [&>tr>td]:p-4"
            >
              {sortExhibitors(exhibitors).map((exhibitor, i) => (
                <tr key={i}>
                  <td className="text-center break-words">{exhibitor.name}</td>
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
