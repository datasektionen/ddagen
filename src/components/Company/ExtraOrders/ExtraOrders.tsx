import Locale from "@/locales";
import { Extras, Package } from "@/shared/Classes";
import { useState, useEffect, Dispatch } from "react";

export default function ExtraOrders({
  t,
  extras,
  setExtras,
  preferenceCount,
  exhibitorPackage,
}: {
  t: Locale;
  extras: Extras | undefined;
  setExtras: Dispatch<Extras | undefined>;
  preferenceCount: { banqcount: number; reprcount: number };
  exhibitorPackage: Package;
}) {
  // on disable if deadline has passed
  const disablePreferences = new Date() > new Date("2024-09-18");
  const deadline = {
    drinkCoupons: "2024-09-18",
    tables: "2024-09-18",
    chairs: "2024-09-18",
    representatives: "2024-09-18",
    banquet: "2024-09-18",
  };

  const [editState, setEditState] = useState(false);
  const [tables, setTables] = useState(0);
  const [chairs, setChairs] = useState(0);
  const [drinkCoupons, setDrinkCoupons] = useState(0);
  const [representatives, setRepresentatives] = useState(0);
  const [banquetTickets, setBanquetTickets] = useState(0);

  useEffect(() => {
    if (extras == undefined) return;
    setTables(extras.extraTables);
    setChairs(extras.extraChairs);
    setDrinkCoupons(extras.extraDrinkCoupons);
    setRepresentatives(extras.extraRepresentativeSpots);
    setBanquetTickets(extras.totalBanquetTicketsWanted);
  }, [extras]);

  function handleClick() {
    if (editState == true) {
      setExtras({
        extraTables: tables,
        extraChairs: chairs,
        extraDrinkCoupons: drinkCoupons,
        extraRepresentativeSpots: representatives,
        totalBanquetTicketsWanted: banquetTickets,
      });
    }
    setEditState(!editState);
  }

  function plusMinus(
    num: number,
    set: Dispatch<number>,
    step: number,
    disableAll?: boolean,
    disabledCondition?: boolean,
    disabledConditionMessage?: string
  ) {
    return (
      <div className="flex flex-row items-center justify-center">
        <div
          className="flex bg-black/25 border-solid border-yellow border-2 rounded-lg w-[40px] h-[45px] 
                        mx-1 justify-center items-center font-normal"
        >
          {num}
        </div>
        <div className="flex flex-col">
          <button
            className="flex hover:cursor-pointer bg-cerise rounded-lg w-full h-[21.5px] text-white font-normal select-none
                        justify-center items-center px-2 border border-white/20 hover:scale-105 transition-transform mb-[2px]
                        disabled:bg-black/25 disabled:border disabled:border-solid"
            disabled={disableAll}
            onClick={() => {
              set(num + step);
            }}
          >
            +
          </button>
          <button
            className="flex hover:cursor-pointer bg-cerise rounded-lg w-full h-[21.5px] text-white font-normal select-none 
                        justify-center items-center px-2 border border-white/20 hover:scale-105 transition-transform
                        disabled:bg-black/25 disabled:border disabled:border-solid"
            onClick={() => {
              if (num >= 0 && num - step >= 0) set(num - step);
            }}
            disabled={disableAll || disabledCondition || num == 0}
            title={
              disableAll
                ? ""
                : disabledCondition && num != 0
                ? disabledConditionMessage
                : ""
            }
          >
            -
          </button>
        </div>
      </div>
    );
  }

  const rows = [
    {
      name: t.exhibitorSettings.table.row2.section2.tables,
      included: exhibitorPackage.tables,
      get: tables,
      set: setTables,
      disableAll: false,
      disableCondition: false,
      disableConditionMessage: "",
      increment: 1,
      deadline: deadline.tables,
    },
    {
      name: t.exhibitorSettings.table.row2.section2.chairs,
      included: exhibitorPackage.chairs,
      get: chairs,
      set: setChairs,
      disableAll: false,
      disableCondition: false,
      disableConditionMessage: "",
      increment: 1,
      deadline: deadline.chairs,
    },
    {
      name: t.exhibitorSettings.table.row2.section2.drinkCoupons,
      included: exhibitorPackage.drinkCoupons,
      get: drinkCoupons,
      set: setDrinkCoupons,
      disableAll: false,
      disableCondition: false,
      disableConditionMessage: "",
      increment: 8,
      deadline: deadline.drinkCoupons,
    },
    {
      name: t.exhibitorSettings.table.row2.section2.representatives,
      included: exhibitorPackage.representatives,
      get: representatives,
      set: setRepresentatives,
      disableAll: disablePreferences,
      disableCondition:
        exhibitorPackage.representatives + representatives <=
        preferenceCount.reprcount,
      disableConditionMessage:
        t.exhibitorSettings.table.row2.section2.disabledButtonMessages
          .representatives,
      increment: 1,
      deadline: deadline.representatives,
    },
    {
      name: t.exhibitorSettings.table.row2.section2.sitting,
      included: exhibitorPackage.banquetTickets,
      get: banquetTickets,
      set: setBanquetTickets,
      disableAll: disablePreferences,
      disableCondition:
        exhibitorPackage.banquetTickets + banquetTickets <=
        preferenceCount.banqcount,
      disableConditionMessage:
        t.exhibitorSettings.table.row2.section2.disabledButtonMessages.banquet,
      increment: 1,
      deadline: deadline.banquet,
    },
  ];
  return (
    <div
      className="flex flex-col items-center w-[80%] bg-black/25 border-solid border-yellow border-2 rounded-xl pb-8 mt-6 mb-16 px-8 pt-8"
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
          {t.exhibitorSettings.table.row2.section2.tables}:
        </div>
        <div className="font-normal text-2xl">{exhibitorPackage.tables}</div>
        <div className="font-normal text-2xl">
          {editState ? plusMinus(tables, setTables, 1) : tables}
        </div>
        <div className="font-normal text-cerise [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)] text-2xl">
          {exhibitorPackage.tables + tables}
        </div>
        <div className="text-right text-white/90 [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)] col-span-2 text-base">
          {t.exhibitorSettings.table.row2.section2.warning + deadline.tables}
        </div>
        {/* Section 1 */}

        {/* Section 2 */}
        <div className="text-left">
          {t.exhibitorSettings.table.row2.section2.chairs}:
        </div>
        <div className="font-normal text-2xl">{exhibitorPackage.chairs}</div>
        <div className={"font-normal text-2xl"}>
          {editState ? plusMinus(chairs, setChairs, 1) : chairs}
        </div>
        <div className="font-normal text-cerise [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)] text-2xl">
          {exhibitorPackage.chairs + chairs}
        </div>
        <div className="text-right text-white/90 [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)] col-span-2 text-base">
          {t.exhibitorSettings.table.row2.section2.warning + deadline.chairs}
        </div>
        {/* Section 2 */}

        {/* Section 3 */}
        <div className="text-left">
          {t.exhibitorSettings.table.row2.section2.drinkCoupons}:
        </div>
        <div className="font-normal text-2xl">
          {exhibitorPackage.drinkCoupons}
        </div>
        <div className="font-normal text-2xl">
          {editState
            ? plusMinus(drinkCoupons, setDrinkCoupons, 8)
            : drinkCoupons}
        </div>
        <div className="font-normal text-cerise [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)] text-2xl">
          {exhibitorPackage.drinkCoupons + drinkCoupons}
        </div>
        <div className="text-right text-white/90 [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)] col-span-2 text-base">
          {t.exhibitorSettings.table.row2.section2.warning +
            deadline.drinkCoupons}
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
            ? plusMinus(
                representatives,
                setRepresentatives,
                1,
                disablePreferences,
                exhibitorPackage.representatives + representatives <=
                  preferenceCount.reprcount,
                t.exhibitorSettings.table.row2.section2.disabledButtonMessages
                  .representatives
              )
            : representatives}
        </div>
        <div className="font-normal text-cerise [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)] text-2xl">
          {exhibitorPackage.representatives + representatives}
        </div>
        <div className="text-right text-white/90 [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)] col-span-2 text-base">
          {t.exhibitorSettings.table.row2.section2.warning +
            deadline.representatives}
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
            ? plusMinus(
                banquetTickets,
                setBanquetTickets,
                1,
                disablePreferences,
                exhibitorPackage.banquetTickets + banquetTickets <=
                  preferenceCount.banqcount,
                t.exhibitorSettings.table.row2.section2.disabledButtonMessages
                  .banquet
              )
            : banquetTickets}
        </div>
        <div className="font-normal text-cerise [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)] text-2xl !border-transparent">
          {exhibitorPackage.banquetTickets + banquetTickets}
        </div>
        <div className="text-right text-white/90 [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)] col-span-2 !border-transparent text-base">
          {t.exhibitorSettings.table.row2.section2.warning + deadline.banquet}
        </div>
      </div>

      <div className="md:hidden w-full flex flex-col font-normal text-lg text-center overflow-scroll">
        {rows.map((row, i) => (
          <div
            key={i}
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
              {editState
                ? plusMinus(
                    row.get,
                    row.set,
                    row.increment,
                    row.disableAll,
                    row.disableCondition,
                    row.disableConditionMessage
                  )
                : row.get}
            </div>
            <div>
              <p>
                {t.exhibitorSettings.table.row2.section2.titles.third}:{" "}
                <span className="text-cerise [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)]">
                  {row.get + row.included}
                </span>
              </p>
            </div>
            <div className="text-white/90 [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)] col-span-2 text-normal">
              {t.exhibitorSettings.table.row2.section2.warning + row.deadline}
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
