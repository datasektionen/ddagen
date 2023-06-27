import Locale from "@/locales";
import { InputField } from "./InputField";
import { CheckMark } from "./CheckMark";
import { useState, Dispatch } from "react";
import { Preferences } from "../../shared/Classes";

export function AddPreferences({
  t,
  preferences,
  setPreferences,
  editState,
  setEditState,
  sectionOne,
}: {
  t: Locale;
  preferences: Preferences;
  setPreferences: Dispatch<Preferences>;
  editState: boolean;
  setEditState: Dispatch<boolean>;
  sectionOne: boolean;
}) {
  const updatePreferences = (currentPrefs: string[], pref: string) => {
    var index = currentPrefs.indexOf(pref);
    if (index >= 0) currentPrefs.splice(index, 1);
    else currentPrefs.push(pref);
    return currentPrefs;
  };

  const setPreferencesValue = (currentPrefs: string[], pref: string) => {
    setPreferences(
      new Preferences(
        preferences.name,
        updatePreferences(currentPrefs, pref),
        preferences.other
      )
    );
  };

  return (
    <div className="flex flex-col items-center w-[80%] bg-white/40 border-2 border-white/70 rounded-xl pb-8 mb-16">
      <form className="flex flex-col w-[90%] bg-transparent outline-none gap-7 my-8">
        <InputField
          type="text"
          name="name"
          value={editState ? preferences.name : ""}
          setValue={(name) => {
            setPreferences(
              new Preferences(name, preferences.preferences, preferences.other)
            );
          }}
          fields={t.exhibitorSettings.fiedlsAddPreferences}
        />
        <div className="flex flex-col">
          <div className="border-b-2 border-white border-solid">
            <p className="font-normal text-lg">
              {t.exhibitorSettings.table.row3.preferencesHeader}
            </p>
          </div>
          <div className="flex flex-col">
            {sectionOne ? (
              <div className="flex flex-row justify-between pt-6 px-20">
                <div className="flex flex-row gap-x-10">
                  <div>{t.exhibitorSettings.table.row3.options.vegetarian}</div>
                  <div>
                    <CheckMark
                      name="vegetarian"
                      defaultChecked={
                        editState
                          ? preferences.preferences.includes(
                              t.exhibitorSettings.table.row3.options.vegetarian
                            )
                          : false
                      }
                      onClick={() => {
                        setPreferencesValue(
                          preferences.preferences,
                          t.exhibitorSettings.table.row3.options.vegetarian
                        );
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-row gap-x-10">
                  <div>
                    {t.exhibitorSettings.table.row3.options.lactoseFree}
                  </div>
                  <div>
                    <CheckMark
                      name="lactoseFree"
                      defaultChecked={
                        editState
                          ? preferences.preferences.includes(
                              t.exhibitorSettings.table.row3.options.lactoseFree
                            )
                          : false
                      }
                      onClick={() => {
                        setPreferencesValue(
                          preferences.preferences,
                          t.exhibitorSettings.table.row3.options.lactoseFree
                        );
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-row gap-x-10">
                  <div>{t.exhibitorSettings.table.row3.options.glutenFree}</div>
                  <div>
                    <CheckMark
                      name="glutenFree"
                      defaultChecked={
                        editState
                          ? preferences.preferences.includes(
                              t.exhibitorSettings.table.row3.options.glutenFree
                            )
                          : false
                      }
                      onClick={() => {
                        setPreferencesValue(
                          preferences.preferences,
                          t.exhibitorSettings.table.row3.options.glutenFree
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-rows-2 grid-cols-4 text-left pt-6 px-36">
                <div>{t.exhibitorSettings.table.row3.options.meat}</div>
                <div>
                  <CheckMark
                    name="meat"
                    defaultChecked={
                      editState
                        ? preferences.preferences.includes(
                            t.exhibitorSettings.table.row3.options.meat
                          )
                        : false
                    }
                    onClick={() => {
                      setPreferencesValue(
                        preferences.preferences,
                        t.exhibitorSettings.table.row3.options.meat
                      );
                    }}
                  />
                </div>

                <div>{t.exhibitorSettings.table.row3.options.lactoseFree}</div>
                <div>
                  <CheckMark
                    name="lactoseFree"
                    defaultChecked={
                      editState
                        ? preferences.preferences.includes(
                            t.exhibitorSettings.table.row3.options.lactoseFree
                          )
                        : false
                    }
                    onClick={() => {
                      setPreferencesValue(
                        preferences.preferences,
                        t.exhibitorSettings.table.row3.options.lactoseFree
                      );
                    }}
                  />
                </div>

                <div>{t.exhibitorSettings.table.row3.options.vegetarian}</div>
                <div>
                  <CheckMark
                    name="vegetarian"
                    defaultChecked={
                      editState
                        ? preferences.preferences.includes(
                            t.exhibitorSettings.table.row3.options.vegetarian
                          )
                        : false
                    }
                    onClick={() => {
                      setPreferencesValue(
                        preferences.preferences,
                        t.exhibitorSettings.table.row3.options.vegetarian
                      );
                    }}
                  />
                </div>
                <div>{t.exhibitorSettings.table.row3.options.glutenFree}</div>
                <div>
                  <CheckMark
                    name="glutenFree"
                    defaultChecked={
                      editState
                        ? preferences.preferences.includes(
                            t.exhibitorSettings.table.row3.options.glutenFree
                          )
                        : false
                    }
                    onClick={() => {
                      setPreferencesValue(
                        preferences.preferences,
                        t.exhibitorSettings.table.row3.options.glutenFree
                      );
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <div></div>
        </div>
        <InputField
          type="text"
          name="other"
          value={editState ? preferences.other : ""}
          setValue={(other) => {
            setPreferences(
              new Preferences(preferences.name, preferences.preferences, other)
            );
          }}
          fields={t.exhibitorSettings.fiedlsAddPreferences}
        />
      </form>

      <div className="flex flex-row gap-x-8">
        <button>
          <a
            className="block uppercase hover:scale-105 transition-transform bg-[#A7A7A7] rounded-full text-white text-base font-normal px-8 py-2 max-lg:mx-auto w-max"
            href="#"
          >
            {t.exhibitorSettings.table.row1.section3.remove}
          </a>
        </button>
        <button
          onClick={() => {
            setEditState(false);
          }}
        >
          <a
            className="block uppercase hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base font-normal px-8 py-2 max-lg:mx-auto w-max"
            href="#"
          >
            {t.exhibitorSettings.table.row1.section3.save}
          </a>
        </button>
      </div>
    </div>
  );
}
