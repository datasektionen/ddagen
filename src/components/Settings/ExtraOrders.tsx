import Locale from "@/locales";
import { useState, Dispatch } from "react";

export default function ExtraOrders({ t }: { t: Locale }) {
  const [drinkCoupons, setDrinkCoupons] = useState(20);
  const [tables, setTables] = useState(20);
  const [chairs, setChairs] = useState(20);
  const [representatives, setRepresentatives] = useState(20);
  const [sitting, setSitting] = useState(20);
  const [editState, setEditState] = useState(false);

  function plusMinus(num: number, set: Dispatch<number>) {
    return (
      <div className="flex flex-row justify-center">
        <div
          className="flex bg-white/40 border-2 border-white/70 rounded-lg w-[40px] h-[45px] 
                        mx-1 justify-center items-center"
        >
          {num}
        </div>
        <div className="flex flex-col">
          <div
            className="flex hover:cursor-pointer bg-white rounded-lg w-full h-[21.5px] text-black font-normal select-none
                        justify-center items-center px-2 border-1 border-black mb-[2px] hover:scale-105 transition-transform"
            onClick={() => {
              set(num + 1);
            }}
          >
            +
          </div>
          <div
            className="flex hover:cursor-pointer bg-white rounded-lg w-full h-[21.5px] text-black font-normal select-none 
                        justify-center items-center px-2 border-1 border-black hover:scale-105 transition-transform "
            onClick={() => {
              if (drinkCoupons > 0) set(num - 1);
            }}
          >
            -
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center w-[80%] bg-white/40 border-2
                border-white/70 rounded-xl pb-8 mt-6 mb-16 px-8 pt-8"
    >
      <div className="grid grid-rows-6 grid-cols-6 mb-4 gap-y-1 font-medium text-lg text-center">
        <div></div>
        <div>{t.exhibitorSettings.table.row2.section2.titles.first}:</div>
        <div>{t.exhibitorSettings.table.row2.section2.titles.second}:</div>
        <div>{t.exhibitorSettings.table.row2.section2.titles.third}:</div>
        <div></div>
        <div></div>

        <div className="text-left">
          {t.exhibitorSettings.table.row2.section2.drinkCoupons}:
        </div>
        <div className="font-normal">10</div>
        <div className="font-normal">
          {editState ? plusMinus(drinkCoupons, setDrinkCoupons) : drinkCoupons}
        </div>
        <div className="font-normal">{10 + drinkCoupons}</div>
        <div className="text-right text-cerise [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)] col-span-2">
          {t.exhibitorSettings.table.row2.section2.warning}
        </div>

        <div className="text-left">
          {t.exhibitorSettings.table.row2.section2.tables}:
        </div>
        <div className="font-normal">10</div>
        <div className="font-normal">
          {editState ? plusMinus(tables, setTables) : tables}
        </div>
        <div className="font-normal">{10 + tables}</div>
        <div className="text-right text-cerise [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)] col-span-2">
          {t.exhibitorSettings.table.row2.section2.warning}
        </div>

        <div className="text-left">
          {t.exhibitorSettings.table.row2.section2.chairs}:
        </div>
        <div className="font-normal">10</div>
        <div className="font-normal">
          {editState ? plusMinus(chairs, setChairs) : chairs}
        </div>
        <div className="font-normal">{10 + chairs}</div>
        <div className="text-right text-cerise [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)] col-span-2">
          {t.exhibitorSettings.table.row2.section2.warning}
        </div>

        <div className="text-left">
          {t.exhibitorSettings.table.row2.section2.representatives}:
        </div>
        <div className="font-normal">10</div>
        <div className="font-normal">
          {editState
            ? plusMinus(representatives, setRepresentatives)
            : representatives}
        </div>
        <div className="font-normal">{10 + representatives}</div>
        <div className="text-right text-cerise [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)] col-span-2">
          {t.exhibitorSettings.table.row2.section2.warning}
        </div>

        <div className="text-left">
          {t.exhibitorSettings.table.row2.section2.sitting}:
        </div>
        <div className="font-normal">10</div>
        <div className="font-normal">
          {editState ? plusMinus(sitting, setSitting) : sitting}
        </div>
        <div className="font-normal">{10 + sitting}</div>
        <div className="text-right text-cerise [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)] col-span-2">
          {t.exhibitorSettings.table.row2.section2.warning}
        </div>
      </div>

      <a
        className={`${
          editState
            ? "block uppercase hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base font-normal px-8 py-2 max-lg:mx-auto w-max"
            : "hover:scale-105 transition-transform bg-editIcon bg-white bg-[length:30px_30px] w-[33px] h-[33px] bg-no-repeat bg-origin-content pl-1 pb-1 rounded-md"
        }`}
        href="#"
        onClick={() => {
          setEditState(!editState);
        }}
      >
        {editState ? t.exhibitorSettings.table.row2.section2.save : ""}
      </a>
    </div>
  );
}
