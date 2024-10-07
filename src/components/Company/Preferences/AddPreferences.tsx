import Locale from "@/locales";
import { api } from "@/utils/api";
import { CheckMark } from "../../CheckMark";
import { InputField } from "../InputField";
import { type Dispatch, useState, useEffect, type FormEvent } from "react";
import { Extras, Package, Preferences } from "@/shared/Classes";

type Options = "Vegan" | "Meat" | "LactoseFree" | "GlutenFree";

export function AddPreferences({
  t,
  pos,
  type,
  extras,
  preferences,
  setPreferences,
  preferenceCount,
  setPreferenceCount,
  editState,
  setEditState,
  exhibitorPackage,
}: {
  t: Locale;
  pos: number;
  type: "Representative" | "Banquet";
  extras: Extras | undefined;
  preferences: Preferences[];
  setPreferences: Dispatch<Preferences[]>;
  preferenceCount: { banqcount: number; reprcount: number };
  setPreferenceCount: Dispatch<{ banqcount: number; reprcount: number }>;
  editState: undefined | string;
  setEditState: Dispatch<undefined | string>;
  exhibitorPackage: Package;
}) {
  const deadline = "2024-09-18";
  const allowPreferenceChange = new Date() <= new Date("2024-09-22");
  const isRepresentative = type == "Representative";
  const defaultPreference = new Preferences(undefined, "", [], "", type);

  const [checkmarks, setCheckMarks] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const [extraPreferences, setExtraPreferences] = useState(0);
  const [preference, setPreference] = useState(preferences[pos]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const setPreferenceMutation = api.exhibitor.setFoodPreferences.useMutation();
  const deletePreferenceMutation =
    api.exhibitor.deleteFoodPreferences.useMutation();

  function convertCheckMarks(checkmarks: boolean[]): Options[] {
    const options: Options[] = ["Meat", "Vegan", "LactoseFree", "GlutenFree"];
    return checkmarks.map((_, i) => options[i]).filter((_, i) => checkmarks[i]);
  }

  function setCount(
    preferenceType: "Representative" | "Banquet",
    amount: number
  ) {
    if (type == "Banquet") {
      if (preferenceType == type) return preferenceCount.banqcount + amount;
      else return preferenceCount.reprcount + amount;
    } else {
      if (preferenceType == type) return preferenceCount.reprcount + amount;
      else return preferenceCount.banqcount + amount;
    }
  }

  function handleSubmission(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const maxPreferences = isRepresentative
      ? exhibitorPackage.representatives
      : exhibitorPackage.banquetTickets;
    if (
      preference.id ||
      preferences.length <= maxPreferences + extraPreferences
    ) {
      setPreferenceMutation.mutate({
        id: preference.id,
        name: preference.name,
        value: preference.value,
        comment: preference.comment,
        type: preference.type,
        locale: t.locale,
        allowPreferenceChange: allowPreferenceChange,
      });
      setPreferenceCount({
        banqcount: setCount("Banquet", 1),
        reprcount: setCount("Representative", 1),
      });
    } else {
      if (errorMessage == undefined)
        setErrorMessage(
          t.exhibitorSettings.table.row3.alerts.errorAddingMorePreferencesThanAllowed(
            maxPreferences + extraPreferences
          )
        );
    }
  }

  function deletePreferenceInDatabase() {
    setPreferenceCount({
      banqcount: setCount("Banquet", -1),
      reprcount: setCount("Representative", -1),
    });
    deletePreferenceMutation.mutate({
      id: preferences[pos].id,
      locale: t.locale,
      allowPreferenceChange: allowPreferenceChange,
    });
  }

  useEffect(() => {
    if (pos < preferences.length) {
      const pref = preferences[pos];
      setPreference(pref);
      setCheckMarks([
        pref.value.includes("Meat"),
        pref.value.includes("Vegan"),
        pref.value.includes("LactoseFree"),
        pref.value.includes("GlutenFree"),
      ]);
    }
  }, [preferences, pos]);

  useEffect(() => {
    if (setPreferenceMutation.data) {
      if (setPreferenceMutation.data.ok) {
        if (setPreferenceMutation.data.update)
          setPreferences(
            preferences.map((p, i) =>
              i == 0 ? defaultPreference : i == pos ? preference : p
            )
          );
        else
          setPreferences([
            ...preferences.map((p, i) => (i == 0 ? defaultPreference : p)),
            { ...preference, id: setPreferenceMutation.data.id },
          ]);
        setEditState(undefined);
      } else {
        if (errorMessage == undefined)
          setErrorMessage(setPreferenceMutation.data.error);
      }
      setPreferenceMutation.reset();
    } else if (setPreferenceMutation.isError) {
      setErrorMessage(t.error.unknown);
    }

    if (deletePreferenceMutation.data) {
      if (deletePreferenceMutation.data.ok) {
        setPreferences(preferences.filter((p) => p.id != preference.id));
        setEditState(undefined);
      } else {
        if (errorMessage == undefined)
          setErrorMessage(deletePreferenceMutation.data.error);
      }
      deletePreferenceMutation.reset();
    } else if (deletePreferenceMutation.isError) {
      setErrorMessage(t.error.unknown);
    }
  }, [
    setPreferenceMutation.isSuccess,
    setPreferenceMutation.isError,
    deletePreferenceMutation.isSuccess,
    deletePreferenceMutation.isError,
  ]);

  useEffect(() => {
    if (typeof errorMessage === "string") {
      setTimeout(() => {
        setErrorMessage(undefined);
      }, 3000);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (extras == undefined) return;
    setExtraPreferences(
      isRepresentative
        ? extras.extraRepresentativeSpots
        : extras.totalBanquetTicketsWanted
    );
  }, [extras]);

  return (
    <div className="flex flex-col items-center w-[80%] bg-black/25 border-solid border-yellow border-2 rounded-xl pb-8 mt-8 mb-16 overflow-hidden">
      <form
        className="flex flex-col w-[90%] bg-transparent outline-none gap-7 mt-10"
        onSubmit={handleSubmission}
      >
        <InputField
          type="text"
          name="name"
          value={preference.name}
          setValue={(name) => {
            setPreference({ ...preference, name: name });
          }}
          fields={t.exhibitorSettings.fieldsAddPreferences}
        />
        <div className="flex flex-col">
          <div className="border-b-2 border-white border-solid">
            <p className="font-normal text-lg">
              {t.exhibitorSettings.table.row3.preferencesHeader}
            </p>
            <p className="font-normal test-base">
              {/*t.exhibitorSettings.table.row3.prefrenceSubHeader*/}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div
              className={
                isRepresentative
                  ? "flex flex-col lg:flex-row pt-6 px-20"
                  : "flex flex-col lg:grid lg:grid-rows-2 lg:grid-cols-2 pt-6 px-36"
              }
            >
              {[
                t.exhibitorSettings.table.row3.options.meat,
                t.exhibitorSettings.table.row3.options.vegetarian,
                t.exhibitorSettings.table.row3.options.lactoseFree,
                t.exhibitorSettings.table.row3.options.glutenFree,
              ].map((option, i) => (
                <div
                  className={
                    isRepresentative
                      ? `flex flex-row ${i == 0 ? "hidden" : ""}`
                      : ""
                  }
                  key={option}
                >
                  <div className="grid grid-cols-2 gap-x-16 md:gap-x-10 mt-4">
                    <div>{option}</div>
                    <CheckMark
                      name={option}
                      checked={checkmarks[i]}
                      onClick={() => {
                        var newCheckmarks = [...checkmarks];
                        newCheckmarks[i] = !newCheckmarks[i];

                        switch(i) // used to make meat and vegan mutually exclusive
                        {
                          case 0:
                            if(newCheckmarks[i])
                            {
                              newCheckmarks[1] = false;
                            }
                            break;
                          case 1:
                            if(newCheckmarks[i])
                            {
                              newCheckmarks[0] = false;
                            }
                            break;
                        }
                       
             

                        setPreference({
                          ...preference,
                          value: convertCheckMarks(newCheckmarks),
                        });
                        setCheckMarks(newCheckmarks);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <InputField
          type="text"
          name="comment"
          value={preference.comment}
          setValue={(comment) => {
            setPreference({ ...preference, comment: comment });
          }}
          required={false}
          fields={t.exhibitorSettings.fieldsAddPreferences}
        />
        <div className="flex flex-col max-sm:gap-y-4 sm:flex-row gap-x-8 mt-4 justify-center">
          {editState ? 
          <button type="button" onClick={deletePreferenceInDatabase}>
            <a className="block uppercase hover:scale-105 transition-transform bg-black/75 rounded-full text-white text-base font-normal px-8 py-2 max-lg:mx-auto w-max">
              {t.exhibitorSettings.table.row1.section3.delete}
            </a>
          </button>
          : <div></div>}
          <button type="submit">
            <a className="block uppercase hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base font-normal px-8 py-2 max-lg:mx-auto w-max">
              {editState
                ? t.exhibitorSettings.table.row1.section3.save
                : t.exhibitorSettings.table.row1.section3.add}
            </a>
          </button>
        </div>
        {errorMessage && (
          <p className="text-red-500 font-bold text-border-black text-center">
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
}
