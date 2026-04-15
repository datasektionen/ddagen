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
  JobOffer,
} from "@/shared/Classes";

import {
  AddExhibitorForm,
} from "@/components/Company/Admin/AddExhibitorForm";
import { UpdateSpecialOrders } from "./UpdateSpecialOrdersForm";
import { DeleteExhibitorLock } from "./DeleteExhibitorLock";
import { UpdateCompanyHost } from "./updateCompanyHostForm";
import { UpdatePositionForm } from "./UpdatePositionForm";
import { UpdateIndustryTypeForm } from "./UpdateIndustryTypeForm";

export function ExhibitorPanel({
  t,
  exhibitors,
  preferences,
  exhibitorsInterests,
  password,
  reloadLogin,
  jobOffers,
}: {
  t: Locale;
  exhibitors: Exhibitor[];
  preferences: Preferences[];
  exhibitorsInterests: ExhibitorInfo[];
  password: string;
  reloadLogin: () => void;
  jobOffers: JobOffer[];
}) {
  const [preferenceCount, setPreferenceCount] =
    useState<Map<string, { banquet: number; representative: number }>>();

  const [showAddExhibitor, setShowAddExhibitor] = useState<boolean>(false);
  const [addExhibitorSuccess, setAddExhibitorSuccess] = useState<boolean>(false);

  const [showDeleteLock, setShowDeleteLock] = useState<boolean>(false);
  const [showDeleteExhibitor, setShowDeleteExhibitor] = useState<boolean>(false);

  const [selectedExhibitor, setSelectedExhibitor] = useState<Exhibitor>();

  const [showSpecialOrdersForm, setShowSpecialOrdersForm] = useState<boolean>(false);
  const [showCompanyHostForm, setShowCompanyHostForm] = useState<boolean>(false);
  const [showUpdatePositionForm, setShowUpdatePositionForm] = useState<boolean>(false);
  const [showUpdateIndustryTypeForm, setShowIndustryTypeForm] = useState<boolean>(false);

  const router = useRouter();
  const trpc = api.useContext();
  const login = api.admin.login.useMutation();
  const addExhibitor = api.admin.addExhibitor.useMutation();
  const deleteExhibitor = api.admin.deleteExhibitor.useMutation();
  const updateSpecialOrders = api.exhibitor.setSpecialOrders.useMutation();
  const updateCompanyHost = api.exhibitor.setCompanyHost.useMutation();
  const updatePosition = api.exhibitor.setPosition.useMutation();
  const updateIndustryType = api.exhibitor.setIndustryType.useMutation();

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

    try {
      await updateSpecialOrders.mutateAsync({
        exhibitorId: exhibitorId,
        studentMeetings: studentMeetings,
        socialMediaPost: socialmediaPost,
        panelDiscussion: panelDiscussion,
        goodieBagLogo: goodieBagLogo
      });

      await reloadLogin();
    }
    catch(err) {
      console.error(err);
    }
  }

  async function handleUpdateCompanyHost(
    exhibitorId: string,
    companyHostName: string, 
    companyHostNumber: string, 
    companyHostEmail: string) {

    try {
      await updateCompanyHost.mutateAsync({
        exhibitorId: exhibitorId,
        companyHostName: companyHostName,
        companyHostNumber: companyHostNumber,
        companyHostEmail: companyHostEmail
      });

      await reloadLogin();
    }
    catch(err) {
      console.error(err);
    }
  }

  async function handleUpdatePosition(
    exhibitorId: string,
    mapPosition: number) {

    try {
      await updatePosition.mutateAsync({
        exhibitorId: exhibitorId,
        mapPosition: mapPosition
      });

      await reloadLogin();
    }
    catch(err) {
      console.error(err);
    }
  }

  async function handleUpdateIndustryType(
    exhibitorId: string,
    industrytype: string) {

      try {
        await updateIndustryType.mutateAsync({
          exhibitorId: exhibitorId,
          industryType: industrytype
        });

        await reloadLogin();
      }
      catch(err) {
        console.error(err);
      }
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
      console.log(response, "response!!!");
      if(response?.ok === true){
        setAddExhibitorSuccess(_ => true);
        reloadLogin();
        console.log("RETURNING blank");
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
    setShowSpecialOrdersForm(false);
  }

  function closeUpdateCompanyHostForm() {
    setSelectedExhibitor(undefined);
    setShowCompanyHostForm(false);
  }

  function closeUpdatePositionForm() {
    setSelectedExhibitor(undefined);
    setShowUpdatePositionForm(false);
  }

  function closeUpdateIndustryTypeForm() {
    setSelectedExhibitor(undefined);
    setShowIndustryTypeForm(false);
  }

  const handleDeleteExhibitor = async (exhibitorId: string) => {
    try {
      await deleteExhibitor.mutateAsync({
        password: password,
        exhibitorId: exhibitorId
      });
      await reloadLogin(); // Reload the exhibitor list after deletion
      setShowDeleteExhibitor(false);
      setShowDeleteLock(false);
    } catch (err) {
      console.error("Failed to delete exhibitor:", err);
    }
  }

  function convertToCSV(data: Exhibitor[], selectedAttributes: string[]): string {
    const jobOfferFields = ["summerJob", "internship", "partTimeJob", "masterThesis", "fullTimeJob", "traineeProgram"];
    const packageTiers = ["Small", "Medium", "Large", "Main sponsor", "startup", "error"];

    // Create the header
    const header = selectedAttributes.concat(jobOfferFields).join(',');

    const consentData = data.filter(exhibitor => exhibitor.allowMarketing)

    // Build the rows
    const rows = consentData.map(exhibitor => {
      // Find the matching job offer by ID
      const jobOffer = jobOffers.find(offer => offer.id === exhibitor.jobOfferId);

      // Extract exhibitor attributes
      const exhibitorValues = selectedAttributes.map(attr => 
        attr != "packageTier" ? JSON.stringify(exhibitor[attr as keyof Exhibitor] ?? "") :
        JSON.stringify(packageTiers[exhibitor.packageTier != -1 ? exhibitor.packageTier : 5])
      );

      // Extract job offer attributes (if matching job offer is found)
      const jobOfferValues = jobOffer
        ? [
            JSON.stringify(jobOffer.summerJob.map(x => x + 1)).replaceAll(",", ";"),
            JSON.stringify(jobOffer.internship.map(x => x + 1)).replaceAll(",", ";"),
            JSON.stringify(jobOffer.partTimeJob.map(x => x + 1)).replaceAll(",", ";"),
            JSON.stringify(jobOffer.masterThesis).replaceAll(",", ";"),
            JSON.stringify(jobOffer.fullTimeJob).replaceAll(",", ";"),
            JSON.stringify(jobOffer.traineeProgram).replaceAll(",", ";")
          ]
        : Array(jobOfferFields.length).fill(""); // Empty strings if no match

      return exhibitorValues.concat(jobOfferValues).join(',');
    });

    return [header, ...rows].join('\n');
  }


  function downloadCSV(data: Exhibitor[], filename: string): void {
    console.log(data);
    const csv = convertToCSV(data, ["organizationNumber", "name", "description", "industry", "packageTier"]);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' }); 
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob); 
    link.target = '_blank';
    link.download = filename;
    link.click(); 
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
          <div className="flex w-full text-xl mb-5 font-medium justify-between items-end">
            <div>
              {showAddExhibitor ? 
                (
                  <>
                    <AddExhibitorForm 
                      t={t} addExhibitor={handleAddExhibitor} exhibitorsInterests={exhibitorsInterests} closeModal={closeAddExhibitorForm} /> 
                  </>
                ) : (
                  <>
                    {
                    addExhibitorSuccess &&
                    <p>
                      {t.admin.addCompany.addExhibitorSuccess.added}&nbsp;
                    </p>
                    }
                    <button
                      className="mt-2 bg-cerise bg-blue-500 py-1 px-2 rounded-md"
                      onClick={()=>{setShowAddExhibitor(_ => true)}}
                      >
                      {t.admin.addCompany.addCompanyButton}
                    </button>
                  </>
              )}
            </div>
            <div>
              {showDeleteLock ?
                <DeleteExhibitorLock
                  t={t}
                  onSubmit={(passcode: string) => {
                    if(passcode == "123456"){
                      setShowDeleteLock(_ => false);
                      setShowDeleteExhibitor(_ => true);
                    }
                  }}
                  closeModal={() => {
                    setShowDeleteLock(_ => false);
                  }}
                  />
                :
                <button
                  className="mt-2 bg-red-800 py-1 px-2 rounded-md"
                  onClick={()=>{setShowDeleteLock(_ => true)}}
                  >
                  {t.admin.deleteCompanyButton}
                </button>
                }
            </div>
          </div>
          <div>
            <button
            className="mt-2 bg-cerise bg-blue-500 py-1 px-2 rounded-md"
            onClick={()=>downloadCSV(exhibitors, "utställare.csv")}>
              Ladda ned företagsdata
            </button>           
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-slate-50 bg-opacity-20 border-collapse border-solid">
              <thead className="[&>tr>th]:border-2 [&>tr>th]:border-solid [&>tr>th]:border-cerise [&>tr>th]:py-2 [&>tr>th]:px-4 ">
                <tr>
                  <th>{t.admin.sales.header.name}</th>
                  <th>{t.admin.sales.header.extras.name}</th>
                  <th>{t.admin.sales.header.verification.name}</th>
                  <th>{t.admin.sales.header.specialOrders.name}</th>
                  <th>{t.exhibitorSettings.table.row5.title}</th>
                  <th>{t.admin.sales.header.companyHost.name}</th>
                    {showDeleteExhibitor &&
                    <th>
                      {t.admin.sales.header.delete}
                    </th>
                    }
                </tr>
              </thead>
              <tbody
                className="[&>tr>td]:border-2 [&>tr>td]:border-t-2 [&>tr>td]:border-solid
                      [&>tr>td]:border-cerise [&>tr>td]:p-4"
              >
                {sortExhibitors(exhibitors).map((exhibitor, i) => (
                  <tr key={i}>
                    <td className="text-center break-words">
                      {exhibitor.logoColor ? (
                        <img
                          className="mx-auto max-w-[150px]"
                          src={addImageDetails(exhibitor.logoColor)}
                        />
                        ) : (
                          <p className="font-bold text-center">U/A</p>
                      )}
                      <p>{exhibitor.name}</p>
                      <p>{t.admin.sales.header.package}: { t.packages.name[exhibitor.packageTier] }</p>
                      <button
                        className="mt-2 bg-cerise bg-blue-500 py-1 px-2 rounded-md"
                        onClick={getLoginFunction(exhibitor.id)}
                      >
                        {t.admin.sales.login}
                      </button>
                    </td>
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
                        {selectedExhibitor?.id == exhibitor.id && showSpecialOrdersForm ? (
                          <UpdateSpecialOrders t={t} exhibitor={selectedExhibitor} closeModal={closeUpdateSpecialOrderForm} 
                          setSpecialOrders={handleUpdateSpecialOrders}
                          setShowSpecialOrdersForm={setShowSpecialOrdersForm}/>
                        ) : (
                          <button
                          className="mt-2 bg-cerise bg-blue-500 py-1 px-2 rounded-md"
                          onClick={()=>{setSelectedExhibitor(exhibitor); setShowSpecialOrdersForm(true)}}
                          >
                          {t.admin.sales.header.specialOrders.specialOrderButton}
                          </button>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col">
                        <b>{t.exhibitorSettings.table.row5.section1.email}</b>
                        {exhibitor.invoiceEmail || "U/A"}
                        <b>{t.exhibitorSettings.table.row5.section1.billingMethodText}</b>
                        {exhibitor.billingMethod == "" ? t.exhibitorSettings.table.row5.section1.billingMethods[0] : exhibitor.billingMethod}
                        <b>{t.exhibitorSettings.table.row5.section1.physicalAddress}</b>
                        {exhibitor.physicalAddress || "U/A"}
                        <b>{t.exhibitorSettings.table.row5.section1.organizationNumber}</b>
                        {exhibitor.organizationNumber?.[0] == "0" ? (t.locale == "sv" ? "Utländskt företag" : "Foreign company") : exhibitor.organizationNumber }
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col">
                        <b>{t.admin.sales.header.companyHost.companyHostName}</b>
                        {exhibitor.companyHostName || "U/A"}
                        <b>{t.admin.sales.header.companyHost.companyHostEmail}</b>
                        {exhibitor.companyHostEmail || "U/A"}
                        <b>{t.admin.sales.header.companyHost.companyHostNumber}</b>
                        {exhibitor.companyHostNumber || "U/A"}
                      </div>
                      <div className="w-full text-xl mb-5 font-medium">
                        {selectedExhibitor?.id == exhibitor.id && showCompanyHostForm ? (
                          <UpdateCompanyHost t={t} exhibitor={selectedExhibitor} closeModal={closeUpdateCompanyHostForm} 
                          setCompanyHost={handleUpdateCompanyHost}
                          setShowUpdateCompanyHostForm={setShowCompanyHostForm}/>
                        ) : (
                          <button
                          className="mt-2 bg-cerise bg-blue-500 py-1 px-2 rounded-md"
                          onClick={()=>{setSelectedExhibitor(exhibitor); setShowCompanyHostForm(true)}}
                          >
                          {t.admin.sales.header.specialOrders.specialOrderButton}
                          </button>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col">
                        <b>{t.admin.sales.header.position}</b>
                        {exhibitor.mapPosition || "N/A"}
                      </div>
                      <div className="w-full text-xl mb-5 font-medium">
                        {selectedExhibitor?.id == exhibitor.id && showUpdatePositionForm ? (
                          <UpdatePositionForm t={t} exhibitor={selectedExhibitor} closeModal={closeUpdatePositionForm} 
                          setPosition={handleUpdatePosition}
                          setShowUpdatePositionForm={setShowUpdatePositionForm}/>
                        ) : (
                          <button
                          className="mt-2 bg-cerise bg-blue-500 py-1 px-2 rounded-md"
                          onClick={()=>{setSelectedExhibitor(exhibitor); setShowUpdatePositionForm(true)}}
                          >
                          {t.admin.sales.header.specialOrders.specialOrderButton}
                          </button>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col">
                        <b>{t.exhibitorSettings.fieldsUpdateIndustryType.name}</b>
                        {exhibitor.industryType || "N/A"}
                      </div>
                      <div className="w-full text-xl mb-5 font-medium">
                        {selectedExhibitor?.id == exhibitor.id && showUpdateIndustryTypeForm ? (
                          <UpdateIndustryTypeForm t={t} exhibitor={selectedExhibitor} closeModal={closeUpdateIndustryTypeForm} 
                          setIndustryType={handleUpdateIndustryType}
                          setShowIndustryTypeForm={setShowIndustryTypeForm}/>
                        ) : (
                          <button
                          className="mt-2 bg-cerise bg-blue-500 py-1 px-2 rounded-md"
                          onClick={()=>{setSelectedExhibitor(exhibitor); setShowIndustryTypeForm(true)}}
                          >
                          {t.admin.sales.header.specialOrders.specialOrderButton}
                          </button>
                        )}
                        <div className="flex flex-col">
                          <b>{t.exhibitorSettings.fieldsUpdateIndustryType.industry}</b>
                          <p>{exhibitor.industry}</p>
                        </div>
                      </div>
                    </td>
                    {showDeleteExhibitor &&
                    <td>
                      <button
                        className="mt-2 bg-red-800 py-1 px-2 rounded-md"
                        onClick={() => handleDeleteExhibitor(exhibitor.id)}
                      >
                        {t.admin.sales.header.deleteExhibitor}
                      </button>
                    </td>
                    }
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
