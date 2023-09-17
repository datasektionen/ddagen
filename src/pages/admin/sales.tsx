import { useState } from "react";
import { useLocale } from "@/locales";
import ButtonGroup from "@/components/ButtonGroup";
import { AdminLogin } from "@/components/Admin/AdminLogin";
import { ExhibitorPanel } from "@/components/Admin/ExhibitorPanel";
import { ExtraOrderPanel } from "@/components/Admin/ExtraOrderPanel";
import { PreferencesPanel } from "@/components/Admin/PreferencesPanel";
import { Exhibitor, Preferences } from "@/shared/Classes";
import { api } from "@/utils/api";

export default function Sales() {
  const t = useLocale();
  const getExhibitors = api.admin.getExhibitors.useMutation();
  const [exhibitors, setExhibitors] = useState<Exhibitor[]>([]);
  const getFoodPreferences = api.admin.getAllFoodPreferences.useMutation();

  const [preferences, setPreferences] = useState<Preferences[]>([]);
  const [buttonSelected, setButtonSelected] = useState<1 | 2 | 3>(1);
  const [password, setPassword] = useState<string>("");

  async function login(password: string) {
    try {
      const exhibitors = await getExhibitors.mutateAsync(password);
      const foodPreferences = await getFoodPreferences.mutateAsync(password);
      if (
        exhibitors === "invalid-password" ||
        foodPreferences === "invalid-password"
      ) {
        return "invalid-password";
      }
      setExhibitors(exhibitors);
      setPreferences(foodPreferences);
      setPassword(password);
    } catch (err) {
      return "unknown-error " + err;
    }
  }

  return (
    <div>
      {exhibitors.length === 0 ? (
        <AdminLogin t={t} login={login} />
      ) : (
        <div className="w-full h-full my-48 text-white">
          <h1 className="uppercase text-cerise text-3xl md:text-5xl font-medium text-center px-[10px] break-words">
            {t.admin.sales.header.title}
          </h1>

          <ButtonGroup
            t={t}
            buttonOneText="Exhibitors"
            buttonTwoText="Extras"
            buttonThreeText="Preferences"
            buttonSelected={buttonSelected}
            setButtonSelected={setButtonSelected}
          />

          {buttonSelected == 1 ? (
            <ExhibitorPanel t={t} exhibitors={exhibitors} password={password} />
          ) : buttonSelected == 2 ? (
            <ExtraOrderPanel t={t} exhibitors={exhibitors} />
          ) : (
            <PreferencesPanel
              t={t}
              exhibitors={exhibitors}
              preferences={preferences}
            />
          )}
        </div>
      )}
    </div>
  );
}
