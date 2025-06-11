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
  const disablePreferences = (new Date() > new Date("2025-09-11"));
  const deadline = {
    drinkCoupons: "2025-09-10",
    tables: "2025-09-10",
    chairs: "2025-09-10",
    representatives: "2025-09-10",
    banquet: "2025-09-10",
    mealCoupons: "2025-09-10",
    alcFreeTicket: "2025-09-10"
  };

  const [editState, setEditState] = useState(false);
  const [tables, setTables] = useState(0);
  const [chairs, setChairs] = useState(0);
  const [drinkCoupons, setDrinkCoupons] = useState(0);
  const [representatives, setRepresentatives] = useState(0);
  const [banquetTickets, setBanquetTickets] = useState(0);
  const [mealCoupons, setMealCoupons] = useState(0);
  const [alcFreeTicket, setAlcFreeTicket] = useState(0);
  const [lastChanged, setLastChanged] = useState<Date>();

  useEffect(() => {
    if (extras == undefined) return;
    setTables(extras.extraTables);
    setChairs(extras.extraChairs);
    setDrinkCoupons(extras.extraDrinkCoupons);
    setRepresentatives(extras.extraRepresentativeSpots);
    setBanquetTickets(extras.totalBanquetTicketsWanted);
    setAlcFreeTicket(extras.alcFreeTickets);
    setMealCoupons(extras.extraMealCoupons);
    extras.lastChanged && setLastChanged(extras.lastChanged);
  }, [extras]);

  function handleClick() {
    if (editState == true) {
      /* IF SOMETHING CHANGED, UPDATE THE LASTCHANGED TIME */
      if(
        extras?.extraTables != tables || 
        extras?.extraChairs != chairs || 
        extras?.extraDrinkCoupons != drinkCoupons || 
        extras?.extraRepresentativeSpots != representatives || 
        extras?.totalBanquetTicketsWanted != banquetTickets || 
        extras?.alcFreeTickets != alcFreeTicket ||
        extras?.extraMealCoupons != mealCoupons 
      ){
        setExtras({
          extraTables: tables,
          extraChairs: chairs,
          extraDrinkCoupons: drinkCoupons,
          extraRepresentativeSpots: representatives,
          totalBanquetTicketsWanted: banquetTickets,
          extraMealCoupons: mealCoupons,
          alcFreeTickets: alcFreeTicket,
          lastChanged: new Date()
        });
        return;
      }
      /* NOTHING CHANGED, KEEP THE PREVIOUS LAST CHANGED TIME */
      setExtras({
        extraTables: tables,
        extraChairs: chairs,
        extraDrinkCoupons: drinkCoupons,
        extraRepresentativeSpots: representatives,
        totalBanquetTicketsWanted: banquetTickets,
        extraMealCoupons: mealCoupons,
        alcFreeTickets: alcFreeTicket,
        lastChanged: extras?.lastChanged
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
    disabledConditionMessage?: string,
    lower: number = 0,
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
              if (num >= lower && num - step >= lower) set(num - step);
            }}
            disabled={disableAll || disabledCondition || num == lower}
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
      disableAll: disablePreferences,
      disableCondition: disablePreferences,
      disableConditionMessage: "",
      increment: 1,
      deadline: deadline.tables,
    },
    {
      name: t.exhibitorSettings.table.row2.section2.chairs,
      included: exhibitorPackage.chairs,
      get: chairs,
      set: setChairs,
      disableAll: disablePreferences,
      disableCondition: disablePreferences,
      disableConditionMessage: "",
      increment: 1,
      deadline: deadline.chairs,
    },
    {
      name: t.exhibitorSettings.table.row2.section2.drinkCoupons,
      included: exhibitorPackage.drinkCoupons,
      get: drinkCoupons,
      set: setDrinkCoupons,
      disableAll: disablePreferences,
      disableCondition: disablePreferences,
      disableConditionMessage: "",
      increment: 1,
      deadline: deadline.drinkCoupons,
    },
    {
      name: "alcfree",
      included: 0,
      get: alcFreeTicket,
      set: setAlcFreeTicket,
      disableAll: disablePreferences,
      diableCondition: disablePreferences,
      disableConditionMessage: "",
      increment: 4,
      deadline: deadline.drinkCoupons
    },
    /*
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
    */
    {
      name: t.exhibitorSettings.table.row2.section2.mealCoupons,
      included: exhibitorPackage.mealCoupons,
      get: mealCoupons,
      set: setMealCoupons,
      disableAll: disablePreferences,
      disableCondition: disablePreferences,
      disableConditionMessage: "",
      increment: 1,
      deadline: deadline.mealCoupons,
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
          {editState ? plusMinus(tables, setTables, 1, disablePreferences) : tables}
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
          {editState ? plusMinus(chairs, setChairs, 1, disablePreferences) : chairs}
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
            ? plusMinus(drinkCoupons, setDrinkCoupons, 4, disablePreferences, false, "", -1 * exhibitorPackage.drinkCoupons)
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

        {/* Section4 */}
        <div className="text-left">
          {t.exhibitorSettings.table.row2.section2.alcFreeTicket}:
        </div>
        <div className="font-normal text-2xl">
          {0}
        </div>
        <div className="font-normal text-2xl">
          {editState
            ? plusMinus(alcFreeTicket, setAlcFreeTicket, 4, disablePreferences)
            : alcFreeTicket}
        </div>
        <div className="font-normal text-cerise [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)] text-2xl">
          {alcFreeTicket}
        </div>
        <div className="text-right text-white/90 [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)] col-span-2 text-base">
          {t.exhibitorSettings.table.row2.section2.warning +
            deadline.alcFreeTicket}
        </div>

        {/* Section4 */}

        {/*}       COMMENT: THIS WAS REMOVED FROM THE UI, BUT LEFT IN THE CODE FOR FUTURE USE
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
         Section 4 */}
        
        {/* Section 5 */}
        <div className="text-left">
          {t.exhibitorSettings.table.row2.section2.mealCoupons}:
        </div>
        <div className="font-normal text-2xl">
          {exhibitorPackage.mealCoupons}
        </div>
        <div className={"font-normal text-2xl"}>
          {editState
            ? plusMinus(
                mealCoupons,
                setMealCoupons,
                1,
                disablePreferences)
            : mealCoupons}
        </div>
        <div className="font-normal text-cerise [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)] text-2xl">
          {exhibitorPackage.mealCoupons + mealCoupons}
        </div>
        <div className="text-right text-white/90 [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)] col-span-2 text-base">
          {t.exhibitorSettings.table.row2.section2.warning +
            deadline.mealCoupons}
        </div>
        {/* Section 5 */}

        {/* Section 6 */}
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
      {/* Section 6 */}

      {lastChanged &&
        <div className="font-normal text-cerise [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)] text-2xl">
          {t.exhibitorSettings.table.row2.section2.lastChanged + lastChanged.getDate() + "/" + (lastChanged.getMonth() + 1) + " " + 
          lastChanged.getHours().toString().padStart(2, '0') + ":" + 
          lastChanged.getMinutes().toString().padStart(2, '0')}
        </div>
      }

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
