import { useLocale } from "@/locales";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ButtonGroup from "@/components/ButtonGroup";
import { AdminLogin } from "@/components/Company/Admin/AdminLogin";
import { ExhibitorPanel } from "@/components/Company/Admin/ExhibitorPanel";
import { ExtraOrderPanel } from "@/components/Company/Admin/ExtraOrderPanel";
import { PreferencesPanel } from "@/components/Company/Admin/PreferencesPanel";
import { Exhibitor, Preferences } from "@/shared/Classes";
import { api } from "@/utils/api";
import Head from "next/head";

export default function Sales() {
  const t = useLocale();
  const router = useRouter();
  const trpc = api.useContext();

  const [exhibitors, setExhibitors] = useState<Exhibitor[]>([]);
  const [preferences, setPreferences] = useState<Preferences[]>([]);
  const [buttonSelected, setButtonSelected] = useState<1 | 2 | 3>(1);
  const [password, setPassword] = useState<string>("");

  const logout = api.admin.logout.useMutation();
  const getExhibitors = api.admin.getExhibitors.useMutation();
  const getFoodPreferences = api.admin.getAllFoodPreferences.useMutation();

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

  useEffect(() => {
    logout.mutate();
  }, []);

  useEffect(() => {
    if (logout.isSuccess && logout.data.status) {
      trpc.account.invalidate();
      router.reload();
    }
  }, [logout.isSuccess]);

  return (
    <>
      <Head>
          <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div>
        {password === "" ? (
          <AdminLogin t={t} login={login} />
        ) : (
          <div className="w-full h-full py-48 text-white bg-darkblue bg-opacity-75">
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
              <ExhibitorPanel
                t={t}
                exhibitors={exhibitors}
                preferences={preferences}
                password={password}
                reloadLogin={() => login(password)}
              />
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
    </>
  );
}
