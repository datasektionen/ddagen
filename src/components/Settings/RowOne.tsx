import Locale from "@/locales";
import { useState } from "react";
import { TextInput } from "./TextInput";
import { CheckMark } from "./CheckMark";
import { AddContact } from "./AddContact";
import { UploadButton } from "./UploadButton";
import { EditContact } from "./EditContact";
import { User } from "./Classes";

export default function RowOne({ t }: { t: Locale }) {
  const [user, setUser] = useState(
    new User(
      "Anders Andersson",
      "07012345567",
      "anders.anderssson@företag.se",
      "Art director"
    )
  );
  const [editState, setEditState] = useState(false);


  return (
    <div className="flex flex-col w-full items-center overflow-auto mt-6">
      <h1 className="uppercase text-cerise text-4xl font-normal px-[10px] break-words">
        {t.exhibitorSettings.table.row1.section1.header}
      </h1>

      {/* Section 1 */}
      <div className="flex flex-row gap-8 mt-8 mb-20">
        <UploadButton
          textAbove={"Vit Logga"}
          textInside={"Logga"}
          accept={"image/png"}
        />
        <UploadButton
          textAbove={"Logga m. färg"}
          textInside={"Logga"}
          accept={"image/png"}
        />
        <TextInput
          textAbove={t.exhibitorSettings.table.row1.section1.description}
          placeHolderText={
            t.exhibitorSettings.table.row1.section1.placeholderText
          }
        />
      </div>
      {/* Section 1 */}

      {/* Section 2 */}
      <h1 className="uppercase text-cerise text-4xl font-normal px-[10px] break-words">
        {t.exhibitorSettings.table.row1.section2.header}
      </h1>

      <div className="grid grid-cols-6 grid-rows-4 mx-auto gap-y-2 justify-end mt-8 mb-8">
        <div></div>
        <div>{t.exhibitorSettings.table.row1.section2.year.one}</div>
        <div>{t.exhibitorSettings.table.row1.section2.year.two}</div>
        <div>{t.exhibitorSettings.table.row1.section2.year.three}</div>
        <div>{t.exhibitorSettings.table.row1.section2.year.four}</div>
        <div>{t.exhibitorSettings.table.row1.section2.year.five}</div>
        <div className="pr-8 text-right">
          {t.exhibitorSettings.table.row1.section2.jobs.summer}
        </div>
        <div>
          <CheckMark name={"summerYearOne"} />
        </div>
        <div>
          <CheckMark name={"summerYearTwo"} />
        </div>
        <div>
          <CheckMark name={"summerYearThree"} />
        </div>
        <div>
          <CheckMark name={"summerYearFour"} />
        </div>
        <div>
          <CheckMark name={"summerYearFive"} />
        </div>
        <div className="pr-8 text-right">
          {t.exhibitorSettings.table.row1.section2.jobs.internship}
        </div>
        <div>
          <CheckMark name={"internshipYearOne"} />
        </div>
        <div>
          <CheckMark name={"internshipYearTwo"} />
        </div>
        <div>
          <CheckMark name={"internshipYearThree"} />
        </div>
        <div>
          <CheckMark name={"internshipYearFour"} />
        </div>
        <div>
          <CheckMark name={"internshipYearFive"} />
        </div>
        <div className="pr-8 text-right">
          {t.exhibitorSettings.table.row1.section2.jobs.partTime}
        </div>
        <div>
          <CheckMark name={"partTimeYearOne"} />
        </div>
        <div>
          <CheckMark name={"partTimeYearTwo"} />
        </div>
        <div>
          <CheckMark name={"partTimeYearThree"} />
        </div>
        <div>
          <CheckMark name={"partTimeYearFour"} />
        </div>
        <div>
          <CheckMark name={"partTimeYearFive"} />
        </div>
      </div>

      <div className="flex flex-row mb-12 gap-x-16">
        <div className="flex flex-row">
          <span className="mr-4 items-center">
            {t.exhibitorSettings.table.row1.section2.other.thesis}
          </span>
          <CheckMark name={"thesis"} />
        </div>
        <div className="flex flex-row">
          <span className="mr-4 items-center">
            {t.exhibitorSettings.table.row1.section2.other.fullTime}
          </span>
          <CheckMark name={"fullTime"} />
        </div>
        <div className="flex flex-row">
          <span className="mr-4 items-center">
            {t.exhibitorSettings.table.row1.section2.other.trainee}
          </span>
          <CheckMark name={"trainee"} />
        </div>
      </div>

      <button className="mb-12">
        <a
          className="block uppercase hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base font-normal px-16 py-2 max-lg:mx-auto w-max"
          href="#"
        >
          {t.exhibitorSettings.table.row1.section2.save}
        </a>
      </button>
      {/* Section 2 */}

      {/* Section 3 */}
      <h1 className="uppercase text-cerise text-4xl font-normal px-[10px] break-words mt-6">
        {t.exhibitorSettings.table.row1.section3.header}
      </h1>
      <EditContact
        t={t}
        user={user}
        setUser={setUser}
        editState={editState}
        setEditState={setEditState}
      />
      <AddContact
        t={t}
        user={user}
        setUser={setUser}
        editState={editState}
        setEditState={setEditState}
      />
      {/* Section 3 */}
    </div>
  );
}
