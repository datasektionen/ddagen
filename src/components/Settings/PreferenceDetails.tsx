import Locale from "@/locales";
import { api } from "@/utils/api";
import { useState, useEffect } from "react";
import { Package, Preferences } from "../../shared/Classes";
import { AddPreferences } from "./AddPreferences";
import { EditPreferences } from "./EditPreferences";

export function PreferenceDetails({
  t,
  type,
  exhibitorPackage,
}: {
  t: Locale;
  type: "Banquet" | "Representative";
  exhibitorPackage: Package;
}) {
  const defaultPreference = new Preferences(undefined, "", [], "", type);

  const getPreferences = api.exhibitor.getFoodPreferencess.useQuery(type);

  const [pos, setPos] = useState(0);
  const [preferences, setPreferences] = useState([defaultPreference]);
  const [editState, setEditState] = useState<undefined | string>(undefined);

  useEffect(() => {
    setPos(0);
  }, [preferences]);

  useEffect(() => {
    if (!getPreferences.isSuccess) return;
    setPreferences([defaultPreference].concat(getPreferences.data));
  }, [getPreferences.isSuccess]);

  return (
    <div className="w-full flex flex-col items-center">
      {preferences.slice(1).map((preference, pos) => (
        <div className="w-full flex flex-col items-center" key={preference.id}>
          <EditPreferences
            t={t}
            pos={pos + 1}
            setPos={setPos}
            preferences={preferences}
            editState={editState}
            setEditState={setEditState}
          />
        </div>
      ))}
      <AddPreferences
        t={t}
        pos={pos}
        type={type}
        preferences={preferences}
        setPreferences={setPreferences}
        setEditState={setEditState}
        exhibitorPackage={exhibitorPackage}
      />
    </div>
  );
}
