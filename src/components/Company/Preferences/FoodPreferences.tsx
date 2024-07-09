import Locale from "@/locales";
import { Extras, Package } from "@/shared/Classes";
import { PreferenceDetails } from "./PreferenceDetails";
import { Dispatch } from "react";

export default function FoodPreferences({
  t,
  extras,
  preferenceCount,
  setPreferenceCount,
  exhibitorPackage,
}: {
  t: Locale;
  extras: Extras | undefined;
  preferenceCount: { banqcount: number; reprcount: number };
  setPreferenceCount: Dispatch<{ banqcount: number; reprcount: number }>;
  exhibitorPackage: Package;
}) {
  const deadline = "2024-09-12"

  return (
    <div className="flex flex-col w-full items-center text-center overflow-auto mt-6 outline-yellow">
      {/* Section 1 */}
      <h1 className="uppercase text-cerise text-2xl md:text-4xl font-normal px-[10px] break-words">
        {t.exhibitorSettings.table.row3.section1.header}
      </h1>
      <p className="text-base md:text-xl font-normal pt-6">
        {t.exhibitorSettings.table.row3.section1.paragraphOne}
      </p>
      <p className="text-base md:text-xl font-normal">
        {t.exhibitorSettings.table.row3.section1.paragraphTwo}
      </p>
      <p className="text-base md:text-md font-normal pt-6">
        {t.exhibitorSettings.table.row3.usagenotice}
      </p>

      <p className="text-base md:text-lg font-normal mt-4">
        {t.exhibitorSettings.table.row3.warning + deadline}
      </p>
      <PreferenceDetails
        t={t}
        type={"Representative"}
        extras={extras}
        preferenceCount={preferenceCount}
        setPreferenceCount={setPreferenceCount}
        exhibitorPackage={exhibitorPackage}
  
      />
      {/* Section 1 */}

      {/* Section 2 */}
      <h1 className="uppercase text-cerise text-2xl md:text-4xl font-normal px-[10px] break-words">
        {t.exhibitorSettings.table.row3.section2.header}
      </h1>
      <p className="text-base md:text-xl font-normal pt-6">
        {t.exhibitorSettings.table.row3.section2.paragraphOne}
      </p>
      <p className="text-base md:text-xl font-normal">
        {t.exhibitorSettings.table.row3.section2.paragraphTwo}
      </p>
      
      <p className="text-base md:text-md font-normal pt-4">
        {t.exhibitorSettings.table.row3.section2.paragraphThree}
      </p>

      <p className="text-base md:text-lg font-normal mt-4">
        {t.exhibitorSettings.table.row3.warning + deadline}
      </p>
      <PreferenceDetails
        t={t}
        type={"Banquet"}
        extras={extras}
        preferenceCount={preferenceCount}
        setPreferenceCount={setPreferenceCount}
        exhibitorPackage={exhibitorPackage}
      />
      {/* Section 2 */}
    </div>
  );
}
