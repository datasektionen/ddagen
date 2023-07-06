import Locale from "@/locales";
import { api } from "@/utils/api";
import { Package } from "@/shared/Classes";
import { useState, useEffect, Dispatch } from "react";

export default function ExtraOrders({
  t,
  exhibitorPackage,
}: {
  t: Locale;
  exhibitorPackage: Package;
}) {
  const getExtras = api.exhibitor.getExtras.useQuery();
  const extrasMutation = api.exhibitor.setExtras.useMutation();

  const [editState, setEditState] = useState(false);
  const [tables, setTables] = useState(0);
  const [chairs, setChairs] = useState(0);
  const [drinkCoupons, setDrinkCoupons] = useState(0);
  const [representatives, setRepresentatives] = useState(0);
  const [banquetTickets, setBanquetTickets] = useState(0);

  useEffect(() => {
    if (!getExtras.isSuccess) return;
    setTables(getExtras.data.extraTables);
    setChairs(getExtras.data.extraChairs);
    setDrinkCoupons(getExtras.data.extraDrinkCoupons);
    setRepresentatives(getExtras.data.extraRepresentativeSpots);
    setBanquetTickets(getExtras.data.totalBanquetTicketsWanted);
  }, [getExtras.isSuccess]);

  function handleClick() {
    setEditState(!editState);
    extrasMutation.mutate({
      extraTables: tables,
      extraChairs: chairs,
      extraDrinkCoupons: drinkCoupons,
      extraRepresentativeSpots: representatives,
      totalBanquetTicketsWanted: banquetTickets,
    });
  }

  function plusMinus(num: number, set: Dispatch<number>, step: number) {
    return (
      <div className="flex flex-row items-center justify-center">
        <div
          className="flex bg-white/40 border-2 border-white/70 rounded-lg w-[40px] h-[45px] 
                        mx-1 justify-center items-center font-normal"
        >
          {num}
        </div>
        <div className="flex flex-col">
          <div
            className="flex hover:cursor-pointer bg-white rounded-lg w-full h-[21.5px] text-black font-normal select-none
                        justify-center items-center px-2 border-1 border-black mb-[2px] hover:scale-105 transition-transform"
            onClick={() => {
              set(num + step);
            }}
          >
            +
          </div>
          <div
            className="flex hover:cursor-pointer bg-white rounded-lg w-full h-[21.5px] text-black font-normal select-none 
                        justify-center items-center px-2 border-1 border-black hover:scale-105 transition-transform "
            onClick={() => {
              if (num >= 0 && num - step >= 0) set(num - step);
            }}
          >
            -
          </div>
        </div>
      </div>
    );
  }

  const rows = [
    {
      name: t.exhibitorSettings.table.row2.section2.drinkCoupons,
      included: exhibitorPackage.drinkCoupons,
      get: drinkCoupons,
      set: setDrinkCoupons,
      increment: 10,
    },
    {
      name: t.exhibitorSettings.table.row2.section2.tables,
      included: exhibitorPackage.tables,
      get: tables,
      set: setTables,
      increment: 1,
    },
    {
      name: t.exhibitorSettings.table.row2.section2.chairs,
      included: exhibitorPackage.chairs,
      get: chairs,
      set: setChairs,
      increment: 1,
    },
    {
      name: t.exhibitorSettings.table.row2.section2.representatives,
      included: exhibitorPackage.representatives,
      get: representatives,
      set: setRepresentatives,
      increment: 1,
    },
    {
      name: t.exhibitorSettings.table.row2.section2.sitting,
      included: exhibitorPackage.banquetTickets,
      get: banquetTickets,
      set: setBanquetTickets,
      increment: 1,
    },
  ];
  return (
    <div
      className="flex flex-col items-center w-[80%] bg-white/40 border-2
                border-white/70 rounded-xl pb-8 mt-6 mb-16 px-8 pt-8"
    >
      <div
        className={`max-md:hidden grid grid-cols-6 grid-rows-6 font-medium text-lg text-center [&>div]:pt-6
                    [&>div]:border-b-2 [&>div]:border-white [&>div]:border-solid ${
                      t.locale == "sv" ? "[&>div]:pb-4" : ""
                    } `}
      >
        {/* Title */}
        <div className="!border-transparent"></div>
        <div className="!border-transparent">
          {t.exhibitorSettings.table.row2.section2.titles.first}:
        </div>
        <div className="!border-transparent">
          {t.exhibitorSettings.table.row2.section2.titles.second}:
        </div>
        <div className="!border-transparent">
          {t.exhibitorSettings.table.row2.section2.titles.third}:
        </div>
        <div className="!border-transparent"></div>
        <div className="!border-transparent"></div>
        {/* Title */}

        {/* Section 1 */}
        <div className="text-left">
          {t.exhibitorSettings.table.row2.section2.drinkCoupons}:
        </div>
        <div className="font-normal text-2xl">
          {exhibitorPackage.drinkCoupons}
        </div>
        <div className="font-normal text-2xl">
          {editState
            ? plusMinus(drinkCoupons, setDrinkCoupons, 10)
            : drinkCoupons}
        </div>
        <div className="font-normal text-2xl">
          {exhibitorPackage.drinkCoupons + drinkCoupons}
        </div>
        <div className="text-right text-cerise [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)] col-span-2 text-base">
          {t.exhibitorSettings.table.row2.section2.warning}
        </div>
        {/* Section 1 */}

        {/* Section 2 */}
        <div className="text-left">
          {t.exhibitorSettings.table.row2.section2.tables}:
        </div>
        <div className="font-normal text-2xl">{exhibitorPackage.tables}</div>
        <div className="font-normal text-2xl">
          {editState ? plusMinus(tables, setTables, 1) : tables}
        </div>
        <div className="font-normal text-2xl">
          {exhibitorPackage.tables + tables}
        </div>
        <div className="text-right text-cerise [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)] col-span-2 text-base">
          {t.exhibitorSettings.table.row2.section2.warning}
        </div>
        {/* Section 2 */}

        {/* Section 3 */}
        <div className="text-left">
          {t.exhibitorSettings.table.row2.section2.chairs}:
        </div>
        <div className="font-normal text-2xl">{exhibitorPackage.chairs}</div>
        <div className={"font-normal text-2xl"}>
          {editState ? plusMinus(chairs, setChairs, 1) : chairs}
        </div>
        <div className="font-normal text-2xl">
          {exhibitorPackage.chairs + chairs}
        </div>
        <div className="text-right text-cerise [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)] col-span-2 text-base">
          {t.exhibitorSettings.table.row2.section2.warning}
        </div>
        {/* Section 3 */}

        {/* Section 4 */}
        <div className="text-left">
          {t.exhibitorSettings.table.row2.section2.representatives}:
        </div>
        <div className="font-normal text-2xl">
          {exhibitorPackage.representatives}
        </div>
        <div className={"font-normal text-2xl"}>
          {editState
            ? plusMinus(representatives, setRepresentatives, 1)
            : representatives}
        </div>
        <div className="font-normal text-2xl">
          {exhibitorPackage.representatives + representatives}
        </div>
        <div className="text-right text-cerise [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)] col-span-2 text-base">
          {t.exhibitorSettings.table.row2.section2.warning}
        </div>
        {/* Section 4 */}

        {/* Section 5 */}
        <div className="text-left !border-transparent">
          {t.exhibitorSettings.table.row2.section2.sitting}:
        </div>
        <div className="font-normal text-2xl !border-transparent">
          {exhibitorPackage.banquetTickets}
        </div>
        <div className={"font-normal text-2xl !border-transparent"}>
          {editState
            ? plusMinus(banquetTickets, setBanquetTickets, 1)
            : banquetTickets}
        </div>
        <div className="font-normal text-2xl !border-transparent">
          {exhibitorPackage.banquetTickets + banquetTickets}
        </div>
        <div className="text-right text-cerise [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)] col-span-2 !border-transparent text-base">
          {t.exhibitorSettings.table.row2.section2.warning}
        </div>
      </div>

      <div className="md:hidden w-full flex flex-col font-normal text-lg text-center overflow-scroll">
        {rows.map((row, i) => (
          <div
            className={`flex flex-col py-4 ${
              i != 4 ? "border-b-2 border-white border-solid" : ""
            }`}
          >
            <div className="font-medium text-2xl">{row.name}</div>
            <div>
              {t.exhibitorSettings.table.row2.section2.titles.first}:{" "}
              {row.included}
            </div>
            <div>
              {t.exhibitorSettings.table.row2.section2.titles.second}:{" "}
              {editState ? plusMinus(row.get, row.set, row.increment) : row.get}
            </div>
            <div>
              {t.exhibitorSettings.table.row2.section2.titles.third}:{" "}
              {row.get + row.included}
            </div>
            <div className="text-cerise [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)] col-span-2 text-normal">
              {t.exhibitorSettings.table.row2.section2.warning}
            </div>
          </div>
        ))}
      </div>
      {/* Section 5 */}

      <a
        className={`hover:cursor-pointer ${
          editState
            ? "block uppercase hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base font-normal mt-4 px-8 py-2 max-lg:mx-auto w-max"
            : "hover:scale-105 transition-transform bg-editIcon bg-white bg-[length:30px_30px] w-[33px] h-[33px] bg-no-repeat bg-origin-content mt-4 pl-1 pb-1 rounded-md"
        }`}
        onClick={handleClick}
      >
        {editState ? t.exhibitorSettings.table.row2.section2.save : ""}
      </a>
    </div>
  );
}
