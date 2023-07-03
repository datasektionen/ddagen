import Locale from "@/locales";
import { PreferenceDetails } from "./PreferenceDetails";

export default function RowThree({ t }: { t: Locale }) {
  return (
    <div className="flex flex-col w-full items-center text-center overflow-auto mt-6">
      {/* Section 1 */}
      <h1 className="uppercase text-cerise text-4xl font-normal px-[10px] break-words">
        {t.exhibitorSettings.table.row3.section1.header}
      </h1>
      <p className="text-xl font-normal pt-6">
        {t.exhibitorSettings.table.row3.section1.paragraphOne}
      </p>
      <p className="text-xl font-normal">
        {t.exhibitorSettings.table.row3.section1.paragraphTwo}
      </p>
      <PreferenceDetails t={t} type="Representative" />
      {/* Section 1 */}

      {/* Section 2 */}
      <h1 className="uppercase text-cerise text-4xl font-normal px-[10px] break-words">
        {t.exhibitorSettings.table.row3.section2.header}
      </h1>
      <p className="text-xl font-normal pt-6">
        {t.exhibitorSettings.table.row3.section2.paragraphOne}
      </p>
      <p className="text-xl font-normal">
        {t.exhibitorSettings.table.row3.section2.paragraphTwo}
      </p>
      <PreferenceDetails t={t} type="Banquet" />
      {/* Section 2 */}
    </div>
  );
}
