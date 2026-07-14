import { useLocale } from "@/locales";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import ButtonGroup from "@/components/ButtonGroup";
import { ExhibitorPanel } from "@/components/Company/Admin/ExhibitorPanel";
import { ExtraOrderPanel } from "@/components/Company/Admin/ExtraOrderPanel";
import { PreferencesPanel } from "@/components/Company/Admin/PreferencesPanel";
import { Exhibitor, ExhibitorInfo, JobOffer, Preferences } from "@/shared/Classes";
import { api } from "@/utils/api";
import Head from "next/head";
import { CompanyMeetingsPanel } from "@/components/Company/Admin/CompanyMeetingsPanel";

export default function Sales() {
  const t = useLocale();
  const router = useRouter();
  const trpc = api.useContext();

  const [exhibitors, setExhibitors] = useState<Exhibitor[]>([]);
  const [preferences, setPreferences] = useState<Preferences[]>([]);
  const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
  const [exhibitorsInterests, setExhibitorsInterests] = useState<ExhibitorInfo[]>([]);
  const [buttonSelected, setButtonSelected] = useState<1 | 2 | 3 | 4>(1);

  const logout = api.admin.logout.useMutation();
  const getExhibitors = api.admin.getExhibitors.useMutation();
  const getFoodPreferences = api.admin.getAllFoodPreferences.useMutation();
  const getExhibitorInterestRegistration = api.admin.getExhibitorInterestRegistration.useMutation();
  const getAllJobOffers = api.admin.getAllJobOffers.useMutation();


  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const getIsLoggedIn = api.admin.isLoggedIn.useQuery(undefined, {
    onSuccess: (data: any) => {
      setIsLoggedIn(data);
    },
  });

  const hasLoaded = useRef(false);

  useEffect(() => {
    if (!getIsLoggedIn.isSuccess) return;
    if (!isLoggedIn){
      handleLogout();
      return;
    }

    if (hasLoaded.current) return;
    hasLoaded.current = true;

    loadExhibitors();
  }, [getIsLoggedIn.isSuccess, isLoggedIn]);


  const loadExhibitors = async () => {
    const exhibitors = await getExhibitors.mutateAsync();
    const foodPreferences = await getFoodPreferences.mutateAsync();
    const exhibitorsInterests = await getExhibitorInterestRegistration.mutateAsync();
    const jobOffers = await getAllJobOffers.mutateAsync();
    if (
      exhibitors === "UNAUTHORIZED" ||
      foodPreferences === "UNAUTHORIZED" ||
      exhibitorsInterests === "UNAUTHORIZED" ||
      jobOffers === "UNAUTHORIZED"
    ) {
      setIsLoggedIn(false);
      return;
    }

    setExhibitors(exhibitors);
    setPreferences(foodPreferences);
    setExhibitorsInterests(exhibitorsInterests);
    setJobOffers(jobOffers)
  }

  const handleLogout = () => {
    logout.mutate();
  }

  useEffect(() => {
    if (logout.isSuccess && logout.data.status) {
      trpc.admin.invalidate();
      router.push("/logga-in");
    }
  }, [logout.isSuccess]);

  return (
    <>
      <Head>
          <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div>
        {(!isLoggedIn || !getIsLoggedIn.isSuccess) ?
          <div className="w-full h-full py-48 text-white bg-darkblue bg-opacity-75"></div>
          :
          <div className="w-full h-full py-48 text-white bg-darkblue bg-opacity-75">
            <h1 className="uppercase text-cerise text-3xl md:text-5xl font-medium text-center px-[10px] break-words">
              {t.admin.sales.header.title}
            </h1>
            <button
              className="w-full text-center mt-2 text-white hover:text-red-300 cursor-pointer"
              onClick={() => {handleLogout()}}
            >
              {t.exhibitorSettings.logoutButton}
            </button>

            <ButtonGroup
              t={t}
              buttonOneText="Exhibitors"
              buttonTwoText="Extras"
              buttonThreeText="Preferences"
              buttonFourText="Meetings"
              buttonSelected={buttonSelected}
              setButtonSelected={setButtonSelected}
            />

            {buttonSelected == 1 ? (
              <ExhibitorPanel
                t={t}
                exhibitors={exhibitors}
                preferences={preferences}
                exhibitorsInterests={exhibitorsInterests}
                reloadLogin={() => loadExhibitors()}
                jobOffers={jobOffers}
              />
            ) : buttonSelected == 2 ? (
              <ExtraOrderPanel t={t} exhibitors={exhibitors} preferences={preferences} />
            ) : buttonSelected == 3 ? (
              <PreferencesPanel
                t={t}
                exhibitors={exhibitors}
                preferences={preferences}
              />
            ) : <CompanyMeetingsPanel
                  t={t}
                  exhibitors={exhibitors}
                  />
            }
          </div>
        }
      </div>
    </>
  );
}
