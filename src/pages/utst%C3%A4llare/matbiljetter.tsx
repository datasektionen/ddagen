import { api } from "@/utils/api";
import { useLocale } from "@/locales";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import ExhibitorLayout from "@/shared/exhibitorLayout";
import { PreferenceDetails } from "@/components/Company/Preferences/PreferenceDetails";
import ExtraFairOrders from "@/components/Company/ExtraOrders/ExtraFairOrders";
import { Extras, Package } from "@/shared/Classes";

export default function Matbiljetter() {
  const t = useLocale();
  const router = useRouter();

  const [extras, setExtras] = useState<Extras>();
  const [preferenceCount, setPreferenceCount] = useState({ banqcount: 0, reprcount: 0 });
  const [exhibitorPackage, setExhibitorPackage] = useState(new Package(t, -1));
  const [saveChanges, setSaveChanges] = useState<boolean | undefined>();

  const getExtras = api.exhibitor.getExtras.useQuery();
  const getPreferenceCounts = api.exhibitor.getPreferenceCount.useQuery();
  const getExhibitor = api.exhibitor.getPackage.useQuery();
  const setExtrasMutation = api.exhibitor.setExtras.useMutation();

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
			0
		);
		setExhibitorPackage(exhibitorPackageObj);
  }, [getExhibitor.data]);

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

  const deadline = "2026-09-10"

  return (
	<>
	  <ExhibitorLayout>
			<>
				<div className="flex flex-col w-full items-center text-center overflow-auto mt-6 outline-yellow">
					<h1 className="uppercase text-cerise text-2xl md:text-4xl font-normal px-[10px] break-words">
						{t.exhibitorSettings.table.row3.section1.header}
					</h1>
					<p className="text-base text-white md:text-xl font-normal pt-6">
						{t.exhibitorSettings.table.row3.section1.paragraphOne}
					</p>
					<p className="text-base text-white md:text-xl font-normal">
						{t.exhibitorSettings.table.row3.section1.paragraphTwo}
					</p>
					<p className="text-base text-white md:text-md font-normal pt-6">
						{t.exhibitorSettings.table.row3.usagenotice}
					</p>

					<p className="text-base text-white md:text-lg font-normal mt-4">
						{t.exhibitorSettings.table.row3.warning + deadline}
					</p>

					<PreferenceDetails
						t={t}
						type={"Representative"}
						extras={extras}
						preferenceCount={preferenceCount}
						setPreferenceCount={setPreferenceCount}
						exhibitorPackage={exhibitorPackage}
					/>
				</div>
			</>
	  </ExhibitorLayout>
	</>
  );
}
