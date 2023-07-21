import { api } from "@/utils/api";
import { useLocale } from "@/locales";
import { useRouter } from "next/router";
import { Table } from "@/components/Table";
import { Package } from "@/shared/Classes";
import { useEffect, useState } from "react";
import RowOne from "@/components/Settings/RowOne";
import RowTwo from "@/components/Settings/RowTwo";
import RowThree from "@/components/Settings/RowThree";

export default function Exhibitor() {
  const t = useLocale();
  const router = useRouter();
  const trpc = api.useContext();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);
  const [exhibitorPackage, setExhibitorPackage] = useState(new Package(t, ""));

  // API calls
  const logout = api.account.logout.useMutation();
  const getExhibitor = api.exhibitor.getPackage.useQuery();
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
    if (!getExhibitor.isSuccess) return;
    setExhibitorPackage(new Package(t, getExhibitor.data.package));
  }, [getExhibitor.isSuccess]);

  const table = Table(
    [
      t.exhibitorSettings.table.row1.title,
      t.exhibitorSettings.table.row2.title,
      t.exhibitorSettings.table.row3.title,
    ],
    [],
    [
      <RowOne t={t} />,
      <RowTwo t={t} exhibitorPackage={exhibitorPackage} />,
      <RowThree t={t} exhibitorPackage={exhibitorPackage} />,
    ]
  );

  return isLoggedIn ? (
    <>
      <div className="mx-auto flex flex-col items-center py-40">
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
