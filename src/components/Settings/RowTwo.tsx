import Locale from "@/locales";
import { Dispatch } from "react";
import ExtraOrders from "./ExtraOrders";
import { Extras, Package } from "@/shared/Classes";

export default function RowTwo({
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
  return (
    <div className="w-full flex flex-col items-center mt-6">
      {/* Section 1 */}
      <h1 className="uppercase text-cerise text-2xl md:text-4xl font-normal px-[10px] break-words">
        {t.exhibitorSettings.table.row2.section1.header}
      </h1>
      <h2 className="mt-4 underline underline-offset-8 text-2xl md:text-4xl font-normal">
        {exhibitorPackage.name}
      </h2>
      <p className="mt-8 text-lg md:text-2xl text-center font-normal">
        {t.exhibitorSettings.table.row2.section1.info}:
      </p>
      <button className="mt-4 mb-2">
        <a
          className="block uppercase hover:scale-105 transition-transform bg-cerise rounded-full text-lg md:text-2xl font-normal px-6 md:px-12 py-3 max-lg:mx-auto w-max"
          href="katalog"
        >
          {t.exhibitorSettings.table.row2.section1.catalogue}
        </a>
      </button>
      {/* Section 1 */}

      {/* Section 2 */}
      <div className="flex flex-col w-full items-center">
        <h1 className="mt-12 uppercase text-cerise text-2xl md:text-4xl font-normal px-[10px] break-words">
          {t.exhibitorSettings.table.row2.section2.header}
        </h1>
        <ExtraOrders
          t={t}
          extras={extras}
          setExtras={setExtras}
          preferenceCount={preferenceCount}
          exhibitorPackage={exhibitorPackage}
        />
      </div>
      {/* Section 2 */}
    </div>
  );
}
