import Locale from "@/locales";
import { Dispatch } from "react";
import { Preferences } from "../../../shared/Classes";

type Options = "Vegan" | "Meat" | "LactoseFree" | "GlutenFree" | "AlcoholFree";

export function EditPreferences({
  t,
  pos,
  setPos,
  preferences,
  editState,
  setEditState,
}: {
  t: Locale;
  pos: number;
  setPos: Dispatch<number>;
  preferences: Preferences[];
  editState: undefined | string;
  setEditState: Dispatch<undefined | string>;
}) {
  
  function valueToString(options: Options[]) {
    var str = "";
    options.map((option) => {
      switch (option) {
        case "Vegan":
          str += t.exhibitorSettings.table.row3.options.vegetarian + ", ";
          break;
        case "Meat":
          str += t.exhibitorSettings.table.row3.options.meat + ", ";
          break;
        case "LactoseFree":
          str += t.exhibitorSettings.table.row3.options.lactoseFree + ", ";
          break;
        case "GlutenFree":
          str += t.exhibitorSettings.table.row3.options.glutenFree + ", ";
          break;
        case "AlcoholFree":
          str += t.exhibitorSettings.table.row3.options.alcoholFree + ", ";
          break;          
      }
    });
   
    return str.substring(0, str.length - 2);
  }

  return (
    <div className="relative w-[80%] py-5 px-3 mt-6 mb-6 bg-black/25 border-solid border-yellow border-2 rounded-xl overflow-hidden">
      <table>
        <tbody
          className="text-lg [&>tr>td]:text-right [&>tr>td>label]:font-normal [&>tr>td>label]:text-white
                      [&>tr>td>input]:bg-transparent [&>tr>td>input]:outline-none [&>tr>td>input]:w-[300%] 
                      [&>tr>td>input]:ml-2 [&>tr>td>input]:font-light"
        >
          <tr>
            <td>
              <label htmlFor="name">
                {t.exhibitorSettings.fieldsAddPreferences.name}:
              </label>
            </td>
            <td>
              <input
                type="text"
                name="name"
                value={preferences[pos].name}
                disabled={true}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="preferences">
                {t.exhibitorSettings.fieldsAddPreferences.preferences}:
              </label>
            </td>
            <td>
              <input
                type="text"
                name="preferences"
                value={valueToString(preferences[pos].value)}
                disabled={true}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="other">
                {t.exhibitorSettings.fieldsAddPreferences.comment}:
              </label>
            </td>
            <td>
              <input
                type="text"
                name="other"
                value={preferences[pos].comment}
                disabled={true}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="absolute right-2 top-2">
        <button
          className={`${
            editState == preferences[pos].id
              ? "hiddden"
              : "bg-editIcon bg-white"
          } bg-[length:30px_30px] w-[33px] h-[33px] bg-no-repeat bg-origin-content 
             pl-1 pb-1 rounded-md hover:scale-105 transition-transform`}
          onClick={() => {
            setPos(pos);
            setEditState(preferences[pos].id);
          }}
        />
      </div>
    </div>
  );
}
