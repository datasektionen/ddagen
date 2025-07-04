import { api } from "@/utils/api";
import { useLocale } from "@/locales";
import { useRouter } from "next/router";
import { Table } from "@/components/Table";
import { Extras, Package } from "@/shared/Classes";
import { use, useEffect, useState } from "react";
import ExtraFairOrders from "@/components/Company/ExtraOrders/ExtraFairOrders";
import FoodPreferences from "@/components/Company/Preferences/FoodPreferences";
import CompanyHost from "@/components/Company/CompanyHost/CompanyHost";
import GeneralInfo from "@/components/Company/General/GeneralInfo";
import JobOffers from "@/components/Company/General/JobOffers";
import BillingInfo from "@/components/Company/Billing information/BillingInfo";
import { UserDetails } from "@/components/Company/User/UserDetails";
import { CheckMark } from "@/components/CheckMark";
import { addImageDetails } from "@/shared/addImageDetails";
import CompanyMeetingBooker from "@/components/Company/ExtraOrders/CompanyMeetingBooker";
import { InputField } from "@/components/InputField";
import { get } from "http";
import Head from "next/head";

// TODO hook the next button to the save features
// Maby break save changes into a separate steps for each page
// Add Logic to figure out saved state

export default function Exhibitor() {
  const t = useLocale();
  const router = useRouter();

  // States
  const [page, setPage] = useState<number>(0);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [saveChanges, setSaveChanges] = useState<boolean | undefined>();
  const [name, setName] = useState<string>("");
  const [whiteLogo, setWhiteLogo] = useState("");
  const [colorLogo, setColorLogo] = useState("");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [checkmarks, setCheckMarks] = useState<boolean[]>([]);
  const [extras, setExtras] = useState<Extras>();
  const [preferenceCount, setPreferenceCount] = useState({
    banqcount: 0,
    reprcount: 0,
  });
  const [physicalAddress, setPhysicalAddress] = useState("");
  const [billingMethod, setBillingMethod] = useState("");
  const [organizationNumber, setOrganizationNumber] = useState("");
  const [email, setEmail] = useState("");
  const [exhibitorPackage, setExhibitorPackage] = useState(new Package(t, -1));
  const [showSetUpPage, setShowSetUpPage] = useState<boolean>(false);
  const [hasMeeting, setHasMeeting] = useState<boolean>(false);
  const [editState, setEditState] = useState<boolean>(false);
  const [companyHostName, setCompanyHostName] = useState("");
  const [companyHostNumber, setCompanyHostNumber] = useState("");
  const [companyHostEmail, setCompanyHostEmail] = useState("");
  const [allowMarketing, setAllowMarketing] = useState(false); 
  const [hasChecked, setHasChecked] = useState<boolean>(false);

  const [showMessage, setShowMessage] = useState(false); // State för att visa meddelande
  const [message, setMessage] = useState(''); // State för att lagra meddelandet


  // Mutations
  const setExtrasMutation: ReturnType<typeof api.exhibitor.setExtras.useMutation> = api.exhibitor.setExtras.useMutation();
  const logoMutation = api.exhibitor.setLogo.useMutation();
  const descriptionMutation = api.exhibitor.setDescription.useMutation();
  const industryMutation = api.exhibitor.setIndustry.useMutation();
  const jobOffersMutation = api.exhibitor.setJobOffers.useMutation();
  const setInfoStatus = api.exhibitor.setInfoStatus.useMutation();
  const setNameMutation = api.exhibitor.setName.useMutation();
  const setPhysicalAddressMutation = api.exhibitor.setPhysicalAddress.useMutation();
  const setBillingMethodMutation = api.exhibitor.setBillingMethod.useMutation();
  const setEmailMutation = api.exhibitor.setInvoiceEmail.useMutation();
  const allowMarketingMutation = api.exhibitor.setAllowMarketing.useMutation();


  // Queries
  const getLogos = api.exhibitor.getLogo.useQuery();
  const getDescription = api.exhibitor.getDescription.useQuery();
  const getIndustry = api.exhibitor.getIndustry.useQuery();
  const getName = api.exhibitor.getName.useQuery();
  const getJobOffers = api.exhibitor.getJobOffers.useQuery();
  const getExtras = api.exhibitor.getExtras.useQuery();
  const getExhibitor = api.exhibitor.getPackage.useQuery();
  const getPreferenceCounts = api.exhibitor.getPreferenceCount.useQuery();
  const getAllowMarketing = api.exhibitor.getAllowMarketing.useQuery();
  const getIsLoggedIn = api.account.isLoggedIn.useQuery(undefined, {
    onSuccess: (data: any) => {
      setIsLoggedIn(data);
    },
  });
  const getInfoStatus = api.exhibitor.getInfoStatus.useQuery();
  const getOrganizationNumber = api.exhibitor.getOrganizationNumber.useQuery();
  const getBillingMethod = api.exhibitor.getBillingMethod.useQuery();
  const getPhysicalAddress = api.exhibitor.getPhysicalAddress.useQuery();
  const getInvoiceEmail = api.exhibitor.getInvoiceEmail.useQuery();
  const getCompanyHostName = api.exhibitor.getCompanyHostName.useQuery();
  const getCompanyHostNumber = api.exhibitor.getCompanyHostNumber.useQuery();
  const getCompanyHostEmail = api.exhibitor.getCompanyHostEmail.useQuery();
  
  //const getStudentInterests = api.exhibitor.getStudentInterests.useQuery();


  // Manage login
  useEffect(() => {
    if (!getIsLoggedIn.isSuccess) return;
    if (isLoggedIn == false) router.push("/logga-in");
  }, [isLoggedIn]);

  // Save info on when pressing next button
  const pageSave = async (page: number)=>{
    switch(page){
        case 1:
            logoMutation.mutate({
                b64data: removeImageDetails(whiteLogo),
                kind: "white",
            })
            logoMutation.mutateAsync({
                b64data: removeImageDetails(colorLogo),
                kind: "color",
            })
            descriptionMutation.mutateAsync(description)
            industryMutation.mutateAsync(industry)
            allowMarketingMutation.mutateAsync(allowMarketing)
            break;
        case 2:
            jobOffersMutation.mutateAsync({
                summerJob: getCheckmarksPos("summer"),
                internship: getCheckmarksPos("intern"),
                partTimeJob: getCheckmarksPos("partTime"),
                masterThesis: checkmarks[15],
                fullTimeJob: checkmarks[16],
                traineeProgram: checkmarks[17],
            })
            break;
        case 3:
            setPhysicalAddressMutation.mutateAsync(physicalAddress)
            setBillingMethodMutation.mutateAsync(billingMethod)
            setEmailMutation.mutateAsync(email)
            break;
        default:
            return
    }
  }

  // Manage page swapping
  const pageAmout = 6;
  let newPage;
  const nextPage = () => {
    if (!hasChecked && page === 1) {
      setShowMessage(true);
      setMessage(t.exhibitorSettings.consentWarning);
      return; // Stoppar funktionen här
    }

    pageSave(page)
    newPage = (page + 1)
    if (newPage == pageAmout){
      setShowSetUpPage(false)
    }
    setInfoStatus.mutate(newPage)
    setPage(newPage);
  }

  const prevPage = () => {
    setInfoStatus.mutate(page)
    newPage = ( page === 0 ? page : page - 1)
    setInfoStatus.mutate(newPage)
    setPage(newPage);
  }

  useEffect(()=>{
    if (getInfoStatus.data !== undefined){
      if(getInfoStatus.data >= pageAmout){
        setShowSetUpPage(false)
      }
      else{
        setShowSetUpPage(true)
        setPage(getInfoStatus.data)
      }
    }
  },[getInfoStatus.data])

  useEffect(() => {
    if (!getDescription.isSuccess) return;
    setDescription(getDescription.data.description);
  }, [getDescription.data]);

  useEffect(() => {
    if (!getAllowMarketing.isSuccess) return;
    setAllowMarketing(getAllowMarketing.data.allowMarketing);
  }, [getAllowMarketing.data]);

  useEffect(() => {
    if (!getOrganizationNumber.isSuccess) return;
    setOrganizationNumber(getOrganizationNumber.data.organizationNumber);
  }, [getOrganizationNumber.data]);

  useEffect(() => {
    if (!getCompanyHostName.isSuccess) return;
    setCompanyHostName(getCompanyHostName.data.companyHostName ?? "");
  }, [getCompanyHostName.data]);

  useEffect(() => {
    if (!getCompanyHostNumber.isSuccess) return;
    setCompanyHostNumber(getCompanyHostNumber.data.companyHostNumber ?? "");
  }, [getCompanyHostNumber.data]);

  useEffect(() => {
    if (!getCompanyHostEmail.isSuccess) return;
    setCompanyHostEmail(getCompanyHostEmail.data.companyHostEmail ?? "");
  }, [getCompanyHostEmail.data]);

  useEffect(() => {
    if (!getBillingMethod.isSuccess) return;
    setBillingMethod(getBillingMethod.data.billingMethod ?? "");
  }, [getBillingMethod.data]);

  useEffect(() => {
    if (!getPhysicalAddress.isSuccess) return;
    setPhysicalAddress(getPhysicalAddress.data.companyAddress ?? "");
  }, [getPhysicalAddress.data]);

  useEffect(() => {
    if (!getInvoiceEmail.isSuccess) return;
    setEmail(getInvoiceEmail.data.invoiceEmail ?? "");
  }, [getInvoiceEmail.data]);


  useEffect(() => {
    if (!getIndustry.isSuccess) return;
    setIndustry(getIndustry.data.industry ?? "");
  }, [getIndustry.data]);

  useEffect(() => {
    if (!getLogos.isSuccess) return;
    setWhiteLogo(addImageDetails(getLogos.data.white));
    setColorLogo(addImageDetails(getLogos.data.color));
  }, [getLogos.data]);

  {/* Extra orders*/}
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
  }, [getExtras.data]);

  useEffect(() => {
    if (!getExhibitor.isSuccess) return;
    const exhibitor = getExhibitor.data;
    console.log(getExhibitor.data);
    const exhibitorPackage = new Package(t, exhibitor.packageTier);
    console.log(exhibitor);
    exhibitorPackage.addCustomOrders(
      exhibitor.customTables,
      exhibitor.customChairs,
      exhibitor.customDrinkCoupons,
      exhibitor.customRepresentativeSpots,
      exhibitor.customBanquetTicketsWanted,
      0 // Om customMeal... finns i db så läggs det till här
    );
    setExhibitorPackage(exhibitorPackage);
    setHasMeeting(exhibitor.studentMeetings == 1);
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

  useEffect(() => {
    if(!getName.isSuccess) return;
    setName(getName.data.name)
  }, [getName.data]);

  {/* job Offers logic*/}
  useEffect(() => {
    if (!getJobOffers.isSuccess || !getJobOffers.data) return;
    let initCheckMarks = new Array<boolean>(18).fill(false);
    const jobOffers = getJobOffers.data;
    jobOffers.summerJob.map((num: number) => {
      initCheckMarks[num] = true;
    });
    jobOffers.internship.map((num: number) => {
      initCheckMarks[5 + num] = true;
    });
    jobOffers.partTimeJob.map((num: number) => {
      initCheckMarks[10 + num] = true;
    });
    initCheckMarks[15] = jobOffers.masterThesis;
    initCheckMarks[16] = jobOffers.fullTimeJob;
    initCheckMarks[17] = jobOffers.traineeProgram;
    setCheckMarks(initCheckMarks);
  }, [getJobOffers.data]);

  function removeImageDetails(img: string) {
    return img.replace(/^data:image\/[a-z]+\+?[a-z]+;base64,/, "");
  }

  function getCheckmarksPos(offer: string) {
    let array: boolean[] = [];
    switch (offer) {
      case "summer":
        array = checkmarks.slice(0, 5);
        break;
      case "intern":
        array = checkmarks.slice(5, 10);
        break;
      case "partTime":
        array = checkmarks.slice(10, 15);
        break;
    }
    return array.reduce(
      (out: number[], bool, index) => (bool ? out.concat(index) : out),
      []
    );
  }

  function getCheckMark(pos: number) {
    return (
      <CheckMark
        name={`${pos}`}
        defaultChecked={checkmarks[pos]}
        onClick={() => {
          checkmarks[pos] = !checkmarks[pos];
        }}
      />
    );
  }

  async function handleClick() {
    await Promise.all([
      logoMutation.mutate({
        b64data: removeImageDetails(whiteLogo),
        kind: "white",
      }),
      logoMutation.mutateAsync({
        b64data: removeImageDetails(colorLogo),
        kind: "color",
      }),
      descriptionMutation.mutateAsync(description),
      industryMutation.mutateAsync(industry),
      allowMarketingMutation.mutateAsync(allowMarketing),
      jobOffersMutation.mutateAsync({
        summerJob: getCheckmarksPos("summer"),
        internship: getCheckmarksPos("intern"),
        partTimeJob: getCheckmarksPos("partTime"),
        masterThesis: checkmarks[15],
        fullTimeJob: checkmarks[16],
        traineeProgram: checkmarks[17],
      }),
      setPhysicalAddressMutation.mutateAsync(physicalAddress),
      setBillingMethodMutation.mutateAsync(billingMethod),
      setEmailMutation.mutateAsync(email),
    ])
      .then(() => setSaveChanges(true))
      .catch((error) => {
        console.log(error);
        setSaveChanges(false);
      });
  }

  async function editCompanyName() {
    if (editState) {
      await setNameMutation.mutateAsync(name);
    }
    setEditState(!editState);
  }

  const rows = [
    {
      jobOffer: t.exhibitorSettings.table.row1.section2.jobs.summer,
      checkmarks: [0, 1, 2, 3, 4].map((pos) => (
        <div key={pos}>{getCheckMark(pos)}</div>
      )),
    },
    {
      jobOffer: t.exhibitorSettings.table.row1.section2.jobs.internship,
      checkmarks: [5, 6, 7, 8, 9].map((pos) => (
        <div key={pos}>{getCheckMark(pos)}</div>
      )),
    },
    {
      jobOffer: t.exhibitorSettings.table.row1.section2.jobs.partTime,
      checkmarks: [10, 11, 12, 13, 14].map((pos) => (
        <div key={pos}>{getCheckMark(pos)}</div>
      )),
    },
    {
      jobOffer: t.exhibitorSettings.table.row1.section2.other.thesis,
      checkmarks: getCheckMark(15),
    },
    {
      jobOffer: t.exhibitorSettings.table.row1.section2.other.fullTime,
      checkmarks: getCheckMark(16),
    },
    {
      jobOffer: t.exhibitorSettings.table.row1.section2.other.trainee,
      checkmarks: getCheckMark(17),
    },
  ];

    {/*Save changes logic*/}

    useEffect(() => {
      if (typeof saveChanges === "boolean") {
        setTimeout(() => {
          setSaveChanges(undefined);
        }, 3000);
      }
    }, [saveChanges]);


  {/*Page Content */}
  const table = Table(
    [
      t.exhibitorSettings.table.row1.title,
      t.exhibitorSettings.table.row2.title,
      t.exhibitorSettings.table.row3.title,
      t.exhibitorSettings.table.row5.title,
      t.admin.sales.header.companyHost.name
    ],
    [],
    [
      <>
        <GeneralInfo
        t={t}
        whiteLogo={whiteLogo}
        setWhiteLogo={setWhiteLogo}
        colorLogo={colorLogo}
        setColorLogo={setColorLogo}
        description={description}
        setDescription={setDescription}
        industry={industry}
        setIndustry={setIndustry}
        allowMarketing={allowMarketing}
        setAllowMarketing={setAllowMarketing}
        showSetUpPage={showSetUpPage}
        hasChecked={hasChecked}
        setHasChecked={setHasChecked}
        />

        <JobOffers
          t={t}
          rows={rows}
        />
        <div className="flex flex-col w-full items-center mb-8 ">


          <button
            className="block uppercase hover:scale-105 transition-transform
                    bg-cerise rounded-full text-white text-base font-normal
                      px-16 py-2 max-lg:mx-auto w-max"
            onClick={handleClick}
          >
            {t.exhibitorSettings.table.row1.section2.save}
          </button>

          {saveChanges == true && (
          <p className="text-green-500 font-bold mt-6 ">{t.success.save}</p>
          )}
          {saveChanges == false && (
            <p className="text-red-500 font-bold mt-6 ">{t.error.unknown}</p>
          )}
        </div>

        <UserDetails t={t}/>
      </>,
      <ExtraFairOrders
        t={t}
        extras={extras}
        setExtras={setExtras}
        preferenceCount={preferenceCount}
        exhibitorPackage={exhibitorPackage}
      />,
      <FoodPreferences
        t={t}
        extras={extras}
        preferenceCount={preferenceCount}
        setPreferenceCount={setPreferenceCount}
        exhibitorPackage={exhibitorPackage}
      />,
      <BillingInfo
        t={t}
        physicalAddress={physicalAddress}
        setPhysicalAddress={setPhysicalAddress}
        billingMethod={billingMethod}
        setBillingMethod={setBillingMethod}
        organizationNumber={organizationNumber}
        setOrganizationNumber={setOrganizationNumber}
        email={email}
        setEmail={setEmail}
        saveHandler={handleClick}
      />,
      <CompanyHost
      t={t}
      companyHostName={companyHostName}
      companyHostNumber={companyHostNumber}
      companyHostEmail={companyHostEmail}
      />
    ]
  );

  const pageContent = [
    <>
      <div className="uppercase text-cerise text-xl md:text-2xl font font-medium text-center px-[10px] break-words">
        {t.exhibitorSettings.startHeader}
      </div>
      <div className="w-full min:h-[400px] flex flex-col items-center">
        <button className="mt-4 mb-4" onClick={nextPage}>
          <a className="block hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base font-medium px-6 py-2 max-lg:mx-auto w-max">
            {t.exhibitorSettings.startButton}
          </a>
        </button>
      </div>
    </>,
    <>
      <GeneralInfo
      t={t}
      whiteLogo={whiteLogo}
      setWhiteLogo={setWhiteLogo}
      colorLogo={colorLogo}
      setColorLogo={setColorLogo}
      description={description}
      setDescription={setDescription}
      industry={industry}
      setIndustry={setIndustry}
      allowMarketing={allowMarketing}
      setAllowMarketing={setAllowMarketing}
      showSetUpPage={showSetUpPage}
      hasChecked={hasChecked}
      setHasChecked={setHasChecked}
      />
      {showMessage ? message : ""}
    </>,
    <>
      <JobOffers
      t={t}
      rows={rows}
      />
    </>,
    <UserDetails t={t}/>,
    <ExtraFairOrders
      t={t}
      extras={extras}
      setExtras={setExtras}
      preferenceCount={preferenceCount}
      exhibitorPackage={exhibitorPackage}
    />,
    <FoodPreferences
      t={t}
      extras={extras}
      preferenceCount={preferenceCount}
      setPreferenceCount={setPreferenceCount}
      exhibitorPackage={exhibitorPackage}
    />,

  ]

  {/*Page Content */}
  const meetings = Table(
    [
      t.exhibitorSettings.table.row4.section1.title,
    ],
    [],
    [
      <>
        <ul>
          <li> <span className="text-yellow font-bold w-4 mr-2">1: </span> {t.exhibitorSettings.table.row4.section1.info1}</li>
          <li> <span className="text-yellow font-bold w-4 mr-2">2: </span> {t.exhibitorSettings.table.row4.section1.info2}</li>
          <li> <span className="text-yellow font-bold w-4 mr-2">3: </span> {t.exhibitorSettings.table.row4.section1.info3}</li>
          <li> <br></br></li>
          <li> {t.exhibitorSettings.table.row4.section1.info4}</li>
        </ul>
      </>,
    ]
  );

  return(
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="xl:w-[1200px] lg:w-[1000px] w-full">

      </div>
      <div className="mx-auto flex flex-col items-center py-40 cursor-default bg-darkblue bg-opacity-75">
        {/*Header*/}
        <h1 className="uppercase text-cerise text-3xl md:text-5xl font-medium text-center px-[10px] break-words">
          {t.exhibitorSettings.header}
        </h1>
        <div className="flex flex-row items-center gap-4 mt-4">
          <h2 className="text-white text-xl pt-2" >
            {editState ? <InputField
              value={name}
              name="companyName"
              fields={t.exhibitorSettings.fields}
              setValue={setName}
              />
              :
              name}
          </h2>
          <a
          className={`hover:cursor-pointer ${
            editState
            ? "block uppercase hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base font-normal mt-4 px-8 py-2 max-lg:mx-auto w-max"
            : "hover:scale-105 transition-transform bg-editIcon bg-white bg-[length:30px_30px] w-[33px] h-[33px] bg-no-repeat bg-origin-content mt-4 pl-1 pb-1 rounded-md"
            }`}
            onClick={editCompanyName}
            >{editState && t.exhibitorSettings.table.row1.section2.save}</a>
        </div>
        {/*Header*/}

        {/*Selection Cards*/}

        {/*Dropdown table*/}
        <div className="h-full min-w-[200px] max-w-[1200px] w-full mt-8 px-[20px] min-[450px]:px-[60px] min-[704px]:px-[60px] ">

          {showSetUpPage ?

          <div className=" w-full rounded-2xl bg-white/20 backdrop-blur-md text-white pt-8 overflow-hidden border-2 border-cerise">
            {pageContent[page]}
            <div className="w-full flex justify-center ">


              {page > 1 ? <button className="mt-4 mb-4 mx-2" onClick={prevPage}>
                <a className="block hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base font-medium px-6 py-2 max-lg:mx-auto w-max">
                {t.exhibitorSettings.previousPage }
                </a>
              </button>: <> </> }
              {page < pageAmout-1 && page > 0 ? <button className="mt-4 mb-4 mx-2" onClick={nextPage}>
              <a className="block hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base font-medium px-6 py-2 max-lg:mx-auto w-max">
                {t.exhibitorSettings.nextPage}
              </a>
              </button> : <> </> }

              {page == pageAmout -1 ?
                  <button className="mt-4 mb-4 mx-2" onClick={nextPage}>
                  <a className="block hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base font-medium px-6 py-2 max-lg:mx-auto w-max">
                    {t.exhibitorSettings.lastPage}
                  </a>
                  </button> : <> </> }
            </div>
            <div className="w-full text-center pb-4">
              {page > 0 ?  <p> {t.exhibitorSettings.lastPageText} </p> : <> </>}
            </div>
          </div>
          :
          <>{table}</>}


          {/* Packages that have the student meeting functionality*/}
          { hasMeeting && !showSetUpPage ?
          <div>

            <h2 className="text-cerise text-2xl md:text-4xl font-medium text-center pt-12">{t.exhibitorSettings.table.row4.title} </h2>

            <div className="hidden lg:block">
              {meetings}
            </div>
            <p className="block lg:hidden text-white text-center text-2xl"> {t.exhibitorSettings.meetings.caution} </p>
            <CompanyMeetingBooker/>

          </div>


          : <></> }


        </div>
      </div>
    </>
  );
}
