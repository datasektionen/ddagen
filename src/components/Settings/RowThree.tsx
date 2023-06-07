import Locale from "@/locales";
import { useState } from "react";
import { Preferences } from "./Classes";
import { AddPreferences } from "./AddPreferences";
import { EditPreferences } from "./EditPreferences";

export default function RowThree({ t }: { t: Locale }) {
  const [prefOne, setPrefOne] = useState(
    new Preferences(
      "Anders Andersson",
      [
        t.exhibitorSettings.table.row3.options.vegetarian,
        t.exhibitorSettings.table.row3.options.lactoseFree,
      ],
      "Nötter och koriander"
    )
  );

  const [prefTwo, setPrefTwo] = useState(
    new Preferences(
      "Anders Andersson",
      [
        t.exhibitorSettings.table.row3.options.vegetarian,
        t.exhibitorSettings.table.row3.options.lactoseFree,
      ],
      "Nötter och koriander"
    )
  );

  const [editStateSectionOne, setEditStateSectionOne] = useState(false);
  const [editStateSectionTwo, setEditStateSectionTwo] = useState(false);

  return (
    <div className="flex flex-col w-full items-center overflow-auto mt-6">
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
      <EditPreferences
        t={t}
        preferences={prefOne}
        setPreferences={setPrefOne}
        editState={editStateSectionOne}
        setEditState={setEditStateSectionOne}
      />
      <AddPreferences
        t={t}
        preferences={prefOne}
        setPreferences={setPrefOne}
        editState={editStateSectionOne}
        setEditState={setEditStateSectionOne}
        sectionOne={true}
      />
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
      <EditPreferences
        t={t}
        preferences={prefTwo}
        setPreferences={setPrefTwo}
        editState={editStateSectionTwo}
        setEditState={setEditStateSectionTwo}
      />
      <AddPreferences
        t={t}
        preferences={prefTwo}
        setPreferences={setPrefTwo}
        editState={editStateSectionTwo}
        setEditState={setEditStateSectionTwo}
        sectionOne={false}
      />
      {/* Section 2 */}
    </div>
  );
}
