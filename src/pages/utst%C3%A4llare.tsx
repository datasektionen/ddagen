import { InputField } from "@/components/InputField";
import { useLocale, type Locale } from "@/locales";
import { api } from "@/utils/api";
import React, { Fragment, useEffect, useState } from "react";
import type { User } from "@prisma/client";
import { getPackage } from "@/utils/packages";
import { useRouter } from "next/router";
import { Table } from "@/components/Table";
import RowOne from "@/components/Settings/RowOne";
import RowTwo from "@/components/Settings/RowTwo";
import RowThree from "@/components/Settings/RowThree";

export default function Exhibitor() {
  const t = useLocale();
  const router = useRouter();
  const trpc = api.useContext();

  const logout = api.account.logout.useMutation();
  const isLoggedIn = api.account.isLoggedIn.useQuery().data;

  // const exhibitor = api.exhibitor.get.useQuery();
  // const whiteLogo = api.exhibitor.logo.useQuery("white");
  // const colorLogo = api.exhibitor.logo.useQuery("color");
  // const description = api.exhibitor.
  // const updateExhibitor = api.exhibitor.update.useMutation();
  // const contacts = api.exhibitor.getContacts.useQuery();
  // const removeContact = api.exhibitor.deleteContact.useMutation();
  // const setLogo = api.exhibitor.setLogo.useMutation();
  // const logoWhite = api.exhibitor.logo.useQuery("white");
  // const jobOffers = api.exhibitor.getJobOffers.useQuery();
  // const updateJobOffers = api.exhibitor.updateJobOffers.useMutation();

  // // TODO: Fix stutter
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     router.push("/logga-in");
  //   }
  // }, [isLoggedIn]);

  useEffect(() => {
    if (logout.isSuccess) {
      trpc.account.invalidate();
      router.push("/");
    }
  }, [logout.isSuccess]);

  // const [currentTable, setCurrentTable] = useState(2);
  // const [pendingChanges, setPendingChanges] = useState(false);
  // const [logoLoading, setLogoLoading] = useState(false);

  // const [invoiceEmail, setInvoiceEmail] = useState("");
  // const [description, setDescription] = useState("");
  // const [extraChairs, setExtraChairs] = useState(0);
  // const [extraTables, setExtraTables] = useState(0);
  // const [extraDrinkCoupons, setExtraDrinkCoupons] = useState(0);
  // const [extraRepresentativeSpots, setExtraRepresentativeSpots] = useState(0);
  // const [totalBanquetTicketsWanted, setTotalBanquetTicketsWanted] = useState(0);

  // const [addingContact, setAddingContact] = useState(false);

  // const pkg = exhibitor.data?.package
  //   ? getPackage(t, exhibitor.data.package)
  //   : null;

  // const totalChairs = extraChairs + (pkg?.chairs ?? 0);
  // const totalTables = extraTables + (pkg?.tables ?? 0);
  // const totalDrinkCoupons = extraDrinkCoupons + (pkg?.drinkCoupons ?? 0);
  // const totalRepresentativeSpots =
  //   extraRepresentativeSpots + (pkg?.representativeSpots ?? 0);

  // const setNumber = (setter: (value: number) => void) => (value: string) => {
  //   const parsed =
  //     value === "" ? 0 : parseInt(value.replace(/[^0-9]/g, ""), 10);
  //   setter(parsed);
  //   setPendingChanges(true);
  // };
  // const setExtraChairsStr = setNumber(setExtraChairs);
  // const setExtraTablesStr = setNumber(setExtraTables);
  // const setExtraDrinkCouponsStr = setNumber(setExtraDrinkCoupons);
  // const setExtraRepresentativeSpotsStr = setNumber(setExtraRepresentativeSpots);
  // const setExtraBanquetTicketsStr = setNumber(setTotalBanquetTicketsWanted);

  // useEffect(() => {
  //   if (!exhibitor.isSuccess) return;
  //   setInvoiceEmail(exhibitor.data.invoiceEmail ?? "");
  //   setDescription(exhibitor.data.description ?? "");
  //   setExtraChairs(exhibitor.data.extraChairs);
  //   setExtraTables(exhibitor.data.extraTables);
  //   setExtraDrinkCoupons(exhibitor.data.extraDrinkCoupons);
  //   setExtraRepresentativeSpots(exhibitor.data.extraRepresentativeSpots);
  //   setTotalBanquetTicketsWanted(exhibitor.data.totalBanquetTicketsWanted);
  // }, [exhibitor.isSuccess]);

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
              <RowTwo t={t} exhibitorPackage="Baspaket" />,
              <RowThree t={t} />,
            ]
          )}
        </div>
      </div>
    </>
  );
}
