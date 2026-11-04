import { api } from "@/utils/api";
import { useLocale } from "@/locales";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { InputField } from "@/components/InputField";
import FoodPreferences from "@/components/Company/Preferences/_FoodPreferences";
import Head from "next/head";
import ExhibitorLayout from "@/shared/exhibitorLayout";
import { Extras, Package } from "@/shared/Classes";

// TODO hook the next button to the save features
// Maby break save changes into a separate steps for each page
// Add Logic to figure out saved state

export default function ExhibitorTickets({
    children
} : {
    children: React.ReactElement
}) {
  const t = useLocale();
  const router = useRouter();

  // States
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [extras, setExtras] = useState<Extras>();
  const [preferenceCount, setPreferenceCount] = useState({ banqcount: 0, reprcount: 0 });
  const [exhibitorPackage, setExhibitorPackage] = useState(new Package(t, -1));
  const [hasMeeting, setHasMeeting] = useState<boolean>(false);
  const [saveChanges, setSaveChanges] = useState<boolean | undefined>();
  const [name, setName] = useState<string>("");
  
  const getName = api.exhibitor.getName.useQuery();
  const getIsLoggedIn = api.account.isLoggedIn.useQuery(undefined, {
    onSuccess: (data: any) => {
      setIsLoggedIn(data);
    },
  });

  // Manage login
  useEffect(() => {
    if (!getIsLoggedIn.isSuccess) return;
    //if (isLoggedIn == false) router.push("/logga-in");
  }, [isLoggedIn]);

  const getExtras = api.exhibitor.getExtras.useQuery();
  const getPreferenceCounts = api.exhibitor.getPreferenceCount.useQuery();
  const getExhibitor = api.exhibitor.getPackage.useQuery();

  useEffect(() => {
    if (!getExtras.isSuccess) return;
    setExtras(
      new Extras(
        getExtras.data.extraChairs,
        getExtras.data.extraTables,
        getExtras.data.extraDrinkCoupons,
        getExtras.data.extraRepresentativeSpots,
        getExtras.data.totalBanquetTicketsWanted,
        getExtras.data.extraMealCoupons,
        getExtras.data.alcFreeDrinkCoupons,
        getExtras.data?.lastChanged || undefined
      )
    );
  }, [getExtras.data]);
  
  useEffect(() => {
    if (!getPreferenceCounts.isSuccess) return;
    setPreferenceCount(getPreferenceCounts.data);
  }, [getPreferenceCounts.data]);

  useEffect(() => {
    if (!getExhibitor.isSuccess) return;
    const exhibitor = getExhibitor.data;
    const exhibitorPackageObj = new Package(t, exhibitor.packageTier);
    exhibitorPackageObj.addCustomOrders(
      exhibitor.customTables,
      exhibitor.customChairs,
      exhibitor.customDrinkCoupons,
      exhibitor.customRepresentativeSpots,
      exhibitor.customBanquetTicketsWanted,
      0 // Om customMeal... finns i db så läggs det till här
    );
    setExhibitorPackage(exhibitorPackageObj);
    setHasMeeting(exhibitor.studentMeetings == 1);
  }, [getExhibitor.data]);

  const setExtrasMutation = api.exhibitor.setExtras.useMutation();

  useEffect(() => {
    if (extras == undefined) return;
    setExtrasMutation.mutate({
      extraTables: extras.extraTables,
      extraChairs: extras.extraChairs,
      extraDrinkCoupons: extras.extraDrinkCoupons,
      extraRepresentativeSpots: extras.extraRepresentativeSpots,
      totalBanquetTicketsWanted: extras.totalBanquetTicketsWanted,
      extraMealCoupons: extras.extraMealCoupons,
      alcFreeDrinkCoupons: extras.alcFreeTickets,
      lastChanged: extras.lastChanged || new Date(),
    });
  }, [extras]);

  useEffect(() => {
    if(!getName.isSuccess) return;
    setName(getName.data.name)
  }, [getName.data]);


  async function handleSave() {
    if (!extras) return;
    try {
      await setExtrasMutation.mutateAsync({
        extraTables: extras.extraTables,
        extraChairs: extras.extraChairs,
        extraDrinkCoupons: extras.extraDrinkCoupons,
        extraRepresentativeSpots: extras.extraRepresentativeSpots,
        totalBanquetTicketsWanted: extras.totalBanquetTicketsWanted,
        extraMealCoupons: extras.extraMealCoupons,
        alcFreeDrinkCoupons: extras.alcFreeTickets,
        lastChanged: extras.lastChanged || new Date(),
      });
      setSaveChanges(true);
    } catch (err) {
      console.error(err);
      setSaveChanges(false);
    }
  }
  
  return(
    <>
      <ExhibitorLayout>
        <>
          <FoodPreferences
            t={t}
            extras={extras}
            preferenceCount={preferenceCount}
            setPreferenceCount={setPreferenceCount}
            exhibitorPackage={exhibitorPackage}
          />
        </>
      </ExhibitorLayout>
    </>
  );
}
