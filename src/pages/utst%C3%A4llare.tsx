import { api } from "@/utils/api";
import { useLocale } from "@/locales";
import { useRouter } from "next/router";
import { Table } from "@/components/Table";
import { Extras, Package } from "@/shared/Classes";
import { useEffect, useState } from "react";
import RowOne from "@/components/Settings/RowOne";
import RowTwo from "@/components/Settings/RowTwo";
import RowThree from "@/components/Settings/RowThree";

export default function Exhibitor() {
  const t = useLocale();
  const router = useRouter();
  const trpc = api.useContext();

  const [extras, setExtras] = useState(new Extras(0, 0, 0, 0, 0));
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);
  const [preferenceCount, setPreferenceCount] = useState({
    banqcount: 0,
    reprcount: 0,
  });
  const [exhibitorPackage, setExhibitorPackage] = useState(new Package(t, ""));

  // Mutations
  const logout = api.account.logout.useMutation();
  const setExtrasMutation = api.exhibitor.setExtras.useMutation();

  // Queries
  const getExtras = api.exhibitor.getExtras.useQuery();
  const getExhibitor = api.exhibitor.getPackage.useQuery();
  const getPreferenceCounts = api.exhibitor.getPreferenceCount.useQuery();
  const getIsLoggedIn = api.account.isLoggedIn.useQuery(undefined, {
    onSuccess: (data) => {
      setIsLoggedIn(data);
    },
  });

  useEffect(() => {
    if (!getIsLoggedIn.isSuccess) return;
    if (isLoggedIn == false) router.push("/logga-in");
  }, [isLoggedIn]);

  useEffect(() => {
    if (logout.isSuccess) {
      router.push("/");
      trpc.account.invalidate();
    }
  }, [logout.isSuccess]);

  useEffect(() => {
    if (!getExtras.isSuccess) return;
    setExtras(
      new Extras(
        getExtras.data.extraChairs,
        getExtras.data.extraTables,
        getExtras.data.extraDrinkCoupons,
        getExtras.data.extraRepresentativeSpots,
        getExtras.data.totalBanquetTicketsWanted
      )
    );
  }, [getExtras.isSuccess]);

  useEffect(() => {
    if (!getPreferenceCounts.isSuccess) return;
    setPreferenceCount(getPreferenceCounts.data);
  }, [getExtras.isSuccess]);

  useEffect(() => {
    if (!getExhibitor.isSuccess) return;
    setExhibitorPackage(new Package(t, getExhibitor.data.package));
  }, [getExhibitor.isSuccess]);

  useEffect(() => {
    if (!getExtras.isSuccess) return;
    setExtrasMutation.mutate({
      extraTables: extras.extraTables,
      extraChairs: extras.extraChairs,
      extraDrinkCoupons: extras.extraDrinkCoupons,
      extraRepresentativeSpots: extras.extraRepresentativeSpots,
      totalBanquetTicketsWanted: extras.totalBanquetTicketsWanted,
    });
  }, [extras]);

  const table = Table(
    [
      t.exhibitorSettings.table.row1.title,
      t.exhibitorSettings.table.row2.title,
      t.exhibitorSettings.table.row3.title,
    ],
    [],
    [
      <RowOne t={t} />,
      <RowTwo
        t={t}
        extras={extras}
        setExtras={setExtras}
        preferenceCount={preferenceCount}
        exhibitorPackage={exhibitorPackage}
      />,
      <RowThree
        t={t}
        extras={extras}
        preferenceCount={preferenceCount}
        setPreferenceCount={setPreferenceCount}
        exhibitorPackage={exhibitorPackage}
      />,
    ]
  );

  return isLoggedIn ? (
    <>
      <div className="mx-auto flex flex-col items-center py-40 cursor-default">
        {/*Header*/}
        <h1 className="uppercase text-cerise text-3xl md:text-5xl font-medium text-center px-[10px] break-words">
          {t.exhibitorSettings.header}
        </h1>
        {/*Header*/}

        {/*Dropdown table*/}
        <div className="h-full min-w-[200px] max-w-[1200px] w-full mt-[15px] px-[20px] min-[450px]:px-[60px] min-[704px]:px-[60px]">
          {table}
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="mx-auto flex flex-col items-center py-40">
        <img src={"/img/loading.gif"} className="my-24 w-32 h-32" />
      </div>
    </>
  );
}
