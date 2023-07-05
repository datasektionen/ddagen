import { api } from "@/utils/api";
import { InputField } from "@/components/InputField";
import { useLocale, type Locale } from "@/locales";
import React, { useEffect, useState } from "react";
import { getPackage } from "@/utils/packages";
import { useRouter } from "next/router";
import { Table } from "@/components/Table";
import { Package } from "@/shared/Classes";
import RowOne from "@/components/Settings/RowOne";
import RowTwo from "@/components/Settings/RowTwo";
import RowThree from "@/components/Settings/RowThree";

export default function Exhibitor() {
  const t = useLocale();
  const router = useRouter();
  const trpc = api.useContext();

  const [exhibitorPackage, setExhibitorPackage] = useState(new Package(t, ""));

  // Get variables from DB
  const exhibitor = api.exhibitor.get.useQuery();
  const isLoggedIn = api.account.isLoggedIn.useQuery();
  const getExhibitor = api.exhibitor.getPackage.useQuery();

  // Get Mutations
  const logout = api.account.logout.useMutation();

  // TODO: Fix stutter
  // useEffect(() => {
  //   if (!isLoggedIn.data) {
  //     router.push("/logga-in");
  //   }
  // }, [isLoggedIn.data]);

  useEffect(() => {
    if (logout.isSuccess) {
      trpc.account.invalidate();
      router.push("/");
    }
  }, [logout.isSuccess]);

  useEffect(() => {
    if (!getExhibitor.isSuccess) return;
    setExhibitorPackage(new Package(t, getExhibitor.data.package));
  }, [getExhibitor.isSuccess]);

  return (
    <>
      <div className="mx-auto flex flex-col items-center py-40">
        {/*Header*/}
        <h1 className="uppercase text-cerise text-5xl font-medium text-center px-[10px] break-words">
          {t.exhibitorSettings.header}
        </h1>
        {/*Header*/}

        {/*Dropdown table*/}
        <div className="h-full min-w-[200px] max-w-[1200px] w-full mt-[15px] px-[20px] min-[450px]:px-[60px] min-[704px]:px-[60px]">
          {Table(
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
          )}
        </div>
      </div>
    </>
  );
}
