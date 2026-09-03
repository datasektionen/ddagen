import Locale from "@/locales";
import { api } from "@/utils/api";
import { CheckMark } from "../../CheckMark";
import { InputField } from "../InputField";
import { type Dispatch, useState, useEffect, type FormEvent } from "react";
import { Extras, Package, Preferences } from "@/shared/Classes";

type Options = "Vegan" | "Meat" | "LactoseFree" | "GlutenFree" | "AlcoholFree";

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
  setPos,
  exhibitorPackage,
  includedCount,
  pendingTicketCount,
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
  setPos: Dispatch<number>;
  exhibitorPackage: Package;
  includedCount: number;
  pendingTicketCount: number;
}) {
  const trpc = api.useContext();
  const allowPreferenceChange = new Date() <= new Date("2026-09-09T23:59:59");
  const deadlinePassed = new Date() > new Date("2026-09-09T17:00:00");
  const isRepresentative = type == "Representative";
  const extraTicketPrice = isRepresentative ? 450 : 2000;
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
  const [showForm, setShowForm] = useState(false);

  const setPreferenceMutation = api.exhibitor.setFoodPreferences.useMutation();
  const createOrderRequest = api.exhibitor.createOrderRequest.useMutation({
    onSuccess: () => trpc.exhibitor.getOrders.invalidate(),
  });
  const deletePreferenceMutation =
    api.exhibitor.deleteFoodPreferences.useMutation();

  function convertCheckMarks(checkmarks: boolean[]): Options[] {
    const options: Options[] = ["Meat", "Vegan", "LactoseFree", "GlutenFree", "AlcoholFree"];
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
    if (deadlinePassed && !editState) {
      const addingExtraTicket = preferences.length - 1 + pendingTicketCount >= includedCount;
      createOrderRequest.mutate({
        type: isRepresentative ? "meal_ticket" : "banquette_ticket",
        amount: 1,
        price_per_unit: addingExtraTicket ? extraTicketPrice : 0,
        ticket_name: preference.name,
        ticket_value: preference.value,
        ticket_comment: preference.comment,
      });
      return;
    }

    if (allowPreferenceChange) {
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
    } else if (!allowPreferenceChange) {
      setErrorMessage(t.error.changePreferencesAfterDeadline);
    }
  }

  function deletePreferenceInDatabase() {
    if (deadlinePassed) {
      setErrorMessage(t.error.changePreferencesAfterDeadline);
      return;
    }

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
        pref.value.includes("AlcoholFree"),
      ]);
    }
  }, [preferences, pos]);

  useEffect(() => {
    if (setPreferenceMutation.data) {
      if (setPreferenceMutation.data.ok) {
        if (setPreferenceMutation.data.update)
          setPreferences(
            preferences.map((p, i) =>
              i == 0
                ? defaultPreference
                : i == pos
                  ? setPreferenceMutation.data.update
                    ? preference
                    : { ...preference, id: setPreferenceMutation.data.id }
                  : p
            )
          );
        else
          setPreferences([
            ...preferences.map((p, i) => (i == 0 ? defaultPreference : p)),
            { ...preference, id: setPreferenceMutation.data.id },
          ]);
        setEditState(undefined);
        setShowForm(false);
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
        setShowForm(false);
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
    if (createOrderRequest.isSuccess) {
      setEditState(undefined);
      setShowForm(false);
      createOrderRequest.reset();
    } else if (createOrderRequest.isError) {
      setErrorMessage(t.error.unknown);
      createOrderRequest.reset();
    }
  }, [createOrderRequest.isSuccess, createOrderRequest.isError]);

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

  useEffect(() => {
    if (editState !== undefined) setShowForm(true);
  }, [editState]);

  if (!showForm) {
    const ticketCount = preferences.length - 1;
    const extraTicketCount = Math.max(0, ticketCount - includedCount);

    return (
      <div className={`w-[80%] flex items-center ${ticketCount > 0 ? "justify-between" : "justify-center"} mt-8 mb-4`}>
        {ticketCount > 0 && (
          <p className="text-white text-lg">
            {t.exhibitorSettings.table.row3.ticketCount(
              ticketCount,
              includedCount,
              extraTicketCount
            )}
          </p>
        )}
        <button
          type="button"
          className="uppercase hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base font-normal px-8 py-2 w-max"
          onClick={() => {
            setPos(0);
            setEditState(undefined);
            setPreference(defaultPreference);
            setCheckMarks([false, false, false, false, false]);
            setShowForm(true);
          }}
        >
          {t.exhibitorSettings.table.row3.addTicket}
        </button>
      </div>
    );
  }

  const addingExtraTicket = !preference.id &&
    (preferences.length - 1 + pendingTicketCount >= includedCount);

  return (
    <div className={`flex flex-col items-center w-[80%] bg-black/25 border-solid ${editState ? "border-cerise" : "border-gold"} border-2 rounded-xl my-8 pb-8 overflow-hidden`}>
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
        <div className="text-white flex flex-col">
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
                  ? "flex flex-col lg:grid lg:grid-rows-2 lg:grid-cols-2 pt-6 px-36"
                  : "flex flex-col lg:grid lg:grid-rows-2 lg:grid-cols-2 pt-6 px-36"
              }
            >
              {[
                t.exhibitorSettings.table.row3.options.meat,
                t.exhibitorSettings.table.row3.options.vegetarian,
                t.exhibitorSettings.table.row3.options.lactoseFree,
                t.exhibitorSettings.table.row3.options.glutenFree,
                t.exhibitorSettings.table.row3.options.alcoholFree,
              ].map((option, i) => (
                <div
                  className={
                    isRepresentative
                      ? `${i == 4 ? "hidden" : ""}`
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
        <div className="mt-2">
          {addingExtraTicket && (
            <p className={`text-white text-center text-lg rounded-md p-2 ${deadlinePassed ? "" : "border-[1px] border-cerise"}`}>
              {t.exhibitorSettings.table.row3.extraTicketDisclaimer} <strong>{t.exhibitorSettings.table.row3.extraTicketPrice(extraTicketPrice)}</strong>
            </p>
          )}
          {deadlinePassed && !editState && (
            <p className="text-white text-center text-lg rounded-md border-[1px] border-cerise p-2">
              {t.exhibitorSettings.table.row3.ticketRequestDisclaimer}
            </p>
          )}
        </div>
        <div className="flex flex-col max-sm:gap-y-4 sm:flex-row gap-x-8 justify-center">
          {editState && !deadlinePassed ? 
          <button type="button" onClick={deletePreferenceInDatabase}>
            <a className="block uppercase hover:scale-105 transition-transform bg-transparent border border-red-400 rounded-full text-red-400 text-base font-normal px-8 py-2 max-lg:mx-auto w-max">
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
          <button
            type="button"
            onClick={() => {
              setEditState(undefined);
              setShowForm(false);
            }}
          >
            <a className="block uppercase hover:scale-105 transition-transform bg-transparent border border-white rounded-full text-white text-base font-normal px-8 py-2 max-lg:mx-auto w-max">
              {t.exhibitorSettings.table.row1.section3.cancel}
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
