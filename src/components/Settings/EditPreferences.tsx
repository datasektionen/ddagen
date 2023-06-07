import Locale from "@/locales";
import { Preferences } from "./Classes";
import { Dispatch, useState } from "react";

export function EditPreferences({
  t,
  preferences,
  setPreferences,
  editState,
  setEditState,
}: {
  t: Locale;
  preferences: Preferences;
  setPreferences: Dispatch<Preferences>;
  editState: boolean;
  setEditState: Dispatch<boolean>;
}) {
  return (
    <div className="relative w-[80%] py-5 px-3 mt-6 mb-12 bg-white/40 border-2 border-white/70 rounded-xl">
      <table>
        <tbody
          className="text-lg [&>tr>td]:text-right [&>tr>td>label]:font-normal [&>tr>td>label]:text-[#555555] 
                      [&>tr>td>input]:bg-transparent [&>tr>td>input]:outline-none [&>tr>td>input]:w-[250px] 
                      [&>tr>td>input]:ml-2 [&>tr>td>input]:font-light"
        >
          <tr>
            <td>
              <label htmlFor="name">
                {t.exhibitorSettings.fiedlsAddPreferences.name}:
              </label>
            </td>
            <td>
              <input
                type="text"
                name="name"
                value={preferences.name}
                disabled={true}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="preferences">
                {t.exhibitorSettings.fiedlsAddPreferences.preferences}:
              </label>
            </td>
            <td>
              <input
                type="text"
                name="preferences"
                value={preferences.preferences.join(',  ')}
                disabled={true}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="other">
                {t.exhibitorSettings.fiedlsAddPreferences.other}:
              </label>
            </td>
            <td>
              <input
                type="text"
                name="other"
                value={preferences.other}
                disabled={true}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="absolute right-2 top-2">
        <button
          className={`${
            editState ? "hiddden" : "bg-editIcon bg-white"
          } bg-[length:30px_30px] w-[33px] h-[33px] bg-no-repeat bg-origin-content 
             pl-1 pb-1 rounded-md hover:scale-105 transition-transform`}
          onClick={() => {
            setEditState(true);
            setPreferences(preferences);
          }}
        />
      </div>
    </div>
  );
}
