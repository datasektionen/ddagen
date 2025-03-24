import Locale from "@/locales";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { addImageDetails } from "@/shared/addImageDetails";
import {
  Exhibitor,
  ExhibitorInfo,
  Preferences,
  sortExhibitors,
  Package,
} from "@/shared/Classes";

import {
  AddExhibitorForm,
} from "@/components/Company/Admin/AddExhibitorForm";
import { UpdateSpecialOrders } from "./UpdateSpecialOrdersForm";

export function ExhibitorPanel({
  t,
  exhibitors,
  preferences,
  password,
  reloadLogin,
}: {
  t: Locale;
  exhibitors: Exhibitor[];
  preferences: Preferences[];
  password: string;
  reloadLogin: () => void;
}) {
  const [preferenceCount, setPreferenceCount] =
    useState<Map<string, { banquet: number; representative: number }>>();

  const [showAddExhibitor, setShowAddExhibitor] = useState<boolean>(false);
  const [addExhibitorSuccess, setAddExhibitorSuccess] = useState<boolean>(false);

  const [selectedExhibitor, setSelectedExhibitor] = useState<Exhibitor>();

  const router = useRouter();
  const trpc = api.useContext();
  const login = api.admin.login.useMutation();
  const addExhibitor = api.admin.addExhibitor.useMutation();
  const updateSpecialOrders = api.exhibitor.setSpecialOrders.useMutation();

  useEffect(() => {
    if (login.isSuccess) {
      router.push("/utställare");
    }
  }, [login.isSuccess]);

  useEffect(() => {
    const count = new Map<
      string,
      { banquet: number; representative: number }
    >();
    exhibitors.map((exhibitor) => {
      count.set(exhibitor.id, { banquet: 0, representative: 0 });
    });
    preferences.map((preference) => {
      if (preference.exhibitorId && count.has(preference.exhibitorId)) {
        const prefCount = count.get(preference.exhibitorId);
        if (prefCount) {
          switch (preference.type) {
            case "Banquet":
              prefCount.banquet += 1;
              break;
            case "Representative":
              prefCount.representative += 1;
              break;
          }
          count.set(preference.exhibitorId, prefCount);
        }
      }
    });
    setPreferenceCount(count);
  }, [preferences]);

  function getLoginFunction(exhibitorId: string) {
    return async () => {
      await trpc.invalidate();
      login.mutate({ exhibitorId: exhibitorId, password });
    };
  }

  async function handleUpdateSpecialOrders(
    exhibitorId: string,
    studentMeetings: number, 
    socialmediaPost: number, 
    panelDiscussion: number, 
    goodieBagLogo: number) {

    updateSpecialOrders.mutateAsync({
      exhibitorId: exhibitorId,
      studentMeetings: studentMeetings,
      socialMediaPost: socialmediaPost,
      panelDiscussion: panelDiscussion,
      goodieBagLogo: goodieBagLogo
    })
  }

  async function handleAddExhibitor(exhibitor: ExhibitorInfo) {
    addExhibitor.mutateAsync({
      password: password,
      contactPerson: exhibitor.contactPerson,
      telephoneNumber: exhibitor.telephoneNumber,
      companyName: exhibitor.companyName,
      organizationNumber: exhibitor.organizationNumber,
      email: exhibitor.email,
      packageTier: exhibitor.packageTier,
      studentMeetings: exhibitor.studentMeetings,
      sendEmailToExhibitor: exhibitor.sendEmailToExhibitor,
      mapPosition: exhibitor.mapPosition,
      meetingTimeSlots: exhibitor.meetingTimeSlots,
    }).then((response) => {
      console.log(response);
      if(response?.ok === true){
        setAddExhibitorSuccess(_ => true);
        reloadLogin();
        return "";
      }
      return response?.error || "unknown-error";
    }).catch((err) => {
      return "unknown-error";
    });
    return "unknown-error";
  }

  function closeAddExhibitorForm() {
    setShowAddExhibitor(_ => false);
  }

  function closeUpdateSpecialOrderForm() {
    setSelectedExhibitor(undefined);
  }

  function evaluataPreferences(
    exhibitor: Exhibitor,
    type: "Representative" | "Banquet"
  ) {
    if (preferenceCount && preferenceCount.has(exhibitor.id)) {
      const prefCount = preferenceCount.get(exhibitor.id);
      if (prefCount) {
        const exhibitorPackage = new Package(t, exhibitor.packageTier);
        const exhibitorRepresentativeCount =
          exhibitorPackage.representatives +
          exhibitor.extraRepresentativeSpots +
          exhibitor.customRepresentativeSpots;
        const exhibitorBanquetCount =
          exhibitorPackage.banquetTickets +
          exhibitor.totalBanquetTicketsWanted +
          exhibitor.customBanquetTicketsWanted;
        

        let amount = "0/0";          
        switch (type) {
          case 'Representative':
            amount = `${prefCount.representative}/${exhibitorRepresentativeCount}`;
            break;
          case 'Banquet':
            amount = `${prefCount.banquet}/${exhibitorBanquetCount}`;
            break;
        }

        const goalReached =
          (type == "Representative" &&
            exhibitorRepresentativeCount == prefCount.representative) ||
          (type == "Banquet" && exhibitorBanquetCount == prefCount.banquet);
        const goalNotReached =
          (type == "Representative" &&
            exhibitorRepresentativeCount > prefCount.representative) ||
          (type == "Banquet" && exhibitorBanquetCount > prefCount.banquet);
        const preferencesGreaterThanGoal =
          (type == "Representative" &&
            exhibitorRepresentativeCount < prefCount.representative) ||
          (type == "Banquet" && exhibitorBanquetCount < prefCount.banquet);

        if (goalReached)
          return <span className="font-medium text-green-500	">{amount}</span>;
        if (goalNotReached)
          return <span className="font-medium text-orange-500	">{amount}</span>;
        if (preferencesGreaterThanGoal)
          return <span className="font-medium text-red-500	">{amount}</span>;
      }
    }
    <span className="font-medium text-red-500	">Fail</span>;
  }
  return (
    <div className="w-full h-full text-white">
      <div className="flex flex-col items-center justify-center">
        <div className="text-center text-xl my-10 font-medium">
          <p>
            {t.admin.sales.amountOfExhibitors}:&nbsp;
            <span className="text-cerise">{exhibitors.length}</span>
          </p>
        </div>
        <div className="w-[80%] sm:w-[90%]">
          <div className="w-full text-xl mb-5 font-medium">
            {showAddExhibitor ? 
              (
                addExhibitorSuccess ?
                <p>
                  {t.admin.addCompany.addExhibitorSuccess.added}&nbsp;
                  <span className="text-cerise">{t.admin.addCompany.addExhibitorSuccess.reload}</span>
                </p>
                :
                <AddExhibitorForm 
                  t={t} addExhibitor={handleAddExhibitor} closeModal={closeAddExhibitorForm} /> 
              ) : (
                <button
                  className="mt-2 bg-cerise bg-blue-500 py-1 px-2 rounded-md"
                  onClick={()=>{setShowAddExhibitor(_ => true)}}
                  >
                  {t.admin.addCompany.addCompanyButton}
                </button>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-slate-50 bg-opacity-20 border-collapse border-solid">
              <thead className="[&>tr>th]:border-2 [&>tr>th]:border-solid [&>tr>th]:border-cerise [&>tr>th]:py-2 [&>tr>th]:px-4 ">
                <tr>
                  <th>{t.admin.sales.header.name}</th>
                  <th>{t.admin.sales.header.logoColour}</th>
                  <th>{t.admin.sales.header.package}</th>
                  <th>{t.admin.sales.header.extras.name}</th>
                  <th>{t.admin.sales.header.verification.name}</th>
                  <th>{t.admin.sales.header.specialOrders.name}</th>
                </tr>
              </thead>
              <tbody
                className="[&>tr>td]:border-2 [&>tr>td]:border-t-2 [&>tr>td]:border-solid
                      [&>tr>td]:border-cerise [&>tr>td]:p-4"
              >
                {sortExhibitors(exhibitors).map((exhibitor, i) => (
                  <tr key={i}>
                    <td className="text-center break-words">
                      <p>{exhibitor.name}</p>
                      <button
                        className="mt-2 bg-cerise bg-blue-500 py-1 px-2 rounded-md"
                        onClick={getLoginFunction(exhibitor.id)}
                      >
                        {t.admin.sales.login}
                      </button>
                    </td>
                    <td>
                      {exhibitor.logoColor ? (
                        <img
                          className="mx-auto max-w-[150px]"
                          src={addImageDetails(exhibitor.logoColor)}
                        />
                      ) : (
                        <p className="font-bold text-center">U/A</p>
                      )}
                    </td>
                    <td className="text-center">{ t.packages.name[exhibitor.packageTier] }</td>
                    <td>
                      <div className="flex flex-col text-center px-2">
                        <div>
                          {t.admin.sales.header.extras.chairs}:{" "}
                          {exhibitor.extraChairs}
                        </div>
                        <div>
                          {t.admin.sales.header.extras.tables}:{" "}
                          {exhibitor.extraTables}
                        </div>
                        <div>
                          {t.admin.sales.header.extras.drinkCoupons}:{" "}
                          {exhibitor.extraDrinkCoupons}
                        </div>
                        <div>
                          {t.admin.sales.header.extras.representativeSpots}:{" "}
                          {exhibitor.extraRepresentativeSpots}
                        </div>
                        <div>
                          {t.admin.sales.header.extras.mealCoupons}:{" "}
                          {exhibitor.extraMealCoupons}
                        </div>
                        <div>
                          {t.admin.sales.header.extras.banquetTickets}:{" "}
                          {exhibitor.totalBanquetTicketsWanted}
                        </div>
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="flex flex-col">
                        <div>
                          {t.admin.sales.header.verification.banquet}:{" "}
                          {evaluataPreferences(exhibitor, "Banquet")}
                        </div>
                        <div>
                          {t.admin.sales.header.verification.representatives}:{" "}
                          {evaluataPreferences(exhibitor, "Representative")}
                        </div>
                      </div>
                    </td>
                    <td>
                      {exhibitor.studentMeetings != 0 ? (<div>
                        {t.admin.sales.header.specialOrders.studentMeetings}
                      </div>) : null}
                      {exhibitor.socialMediaPost != 0 ? (<div>
                        {t.admin.sales.header.specialOrders.socialMediaPost}
                      </div>) : null}
                      {exhibitor.panelDiscussion != 0 ? (<div>
                        {t.admin.sales.header.specialOrders.panelDiscussion}
                      </div>) : null}
                      {exhibitor.goodieBagLogo != 0 ? (<div>
                        {t.admin.sales.header.specialOrders.goodiebagLogo}
                      </div>) : null}
                      <div className="w-full text-xl mb-5 font-medium">
                        {selectedExhibitor?.id == exhibitor.id ? (
                          <UpdateSpecialOrders t={t} exhibitor={selectedExhibitor} closeModal={closeUpdateSpecialOrderForm} 
                          setSpecialOrders={handleUpdateSpecialOrders}/>
                        ) : (
                          <button
                          className="mt-2 bg-cerise bg-blue-500 py-1 px-2 rounded-md"
                          onClick={()=>{setSelectedExhibitor(exhibitor)}}
                          >
                          {t.admin.sales.header.specialOrders.specialOrderButton}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
