import Locale from "@/locales";
import { api } from "@/utils/api";
import { useState, useEffect } from "react";
import ExtraOrders from "./ExtraOrders";

export default function RowTwo({ t }: { t: Locale }) {
  const defaultPackage = {
    name: "",
    tables: 0,
    chairs: 0,
    drinkCoupons: 0,
    representatives: 0,
    banquetTickets: 0,
  };
  const getExhibitor = api.exhibitor.getPackage.useQuery();
  const [exhibitorPackage, setExhibitorPackage] = useState(defaultPackage);

  function getPackage(exhibitorPackage: string) {
    switch (exhibitorPackage) {
      case "base":
        return {
          name: t.exhibitorSettings.table.row2.packages.base,
          tables: 1,
          chairs: 1,
          drinkCoupons: 10,
          representatives: 2,
          banquetTickets: 2,
        };
      case "sponsor":
        return {
          name: t.exhibitorSettings.table.row2.packages.sponsor,
          tables: 1,
          chairs: 1,
          drinkCoupons: 10,
          representatives: 2,
          banquetTickets: 2,
        };
      case "headhunter":
        return {
          name: t.exhibitorSettings.table.row2.packages.headhunter,
          tables: 1,
          chairs: 1,
          drinkCoupons: 20,
          representatives: 4,
          banquetTickets: 2,
        };
      case "premium":
        return {
          name: t.exhibitorSettings.table.row2.packages.premium,
          tables: 1,
          chairs: 1,
          drinkCoupons: 30,
          representatives: 4,
          banquetTickets: 4,
        };
      default:
        return defaultPackage;
    }
  }

  useEffect(() => {
    if (!getExhibitor.isSuccess) return;
    setExhibitorPackage(getPackage(getExhibitor.data.package));
  }, [getExhibitor.isSuccess]);

  return (
    <div className="flex flex-col w-full items-center overflow-auto mt-6">
      {/* Section 1 */}
      <h1 className="uppercase text-cerise text-4xl font-normal px-[10px] break-words">
        {t.exhibitorSettings.table.row2.section1.header}
      </h1>
      <h2 className="mt-4 underline underline-offset-8 text-4xl font-normal">
        {exhibitorPackage.name}
      </h2>
      <p className="mt-8 text-2xl text-center font-normal">
        {t.exhibitorSettings.table.row2.section1.info}:
      </p>
      <button className="mt-4 mb-2">
        <a
          className="block uppercase hover:scale-105 transition-transform bg-cerise rounded-full text-2xl font-normal px-12 py-3 max-lg:mx-auto w-max"
          href="katalog"
        >
          {t.exhibitorSettings.table.row2.section1.catalogue}
        </a>
      </button>
      {/* Section 1 */}

      {/* Section 2 */}
      <div className="flex flex-col w-full items-center">
        <h1 className="mt-12 uppercase text-cerise text-4xl font-normal px-[10px] break-words">
          {t.exhibitorSettings.table.row2.section2.header}
        </h1>
        <ExtraOrders t={t} exhibitorPackage={exhibitorPackage} />
      </div>
      {/* Section 2 */}
    </div>
  );
}
