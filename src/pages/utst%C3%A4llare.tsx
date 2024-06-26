import { api } from "@/utils/api";
import { useLocale } from "@/locales";
import { useRouter } from "next/router";
import { Table } from "@/components/Table";
import { Extras, Package } from "@/shared/Classes";
import { use, useEffect, useState } from "react";
import ExtraFairOrders from "@/components/Company/ExtraOrders/ExtraFairOrders";
import FoodPreferences from "@/components/Company/Preferences/FoodPreferences";
import GeneralInfo from "@/components/Company/General/GeneralInfo";
import JobOffers from "@/components/Company/General/JobOffers";
import { UserDetails } from "@/components/Company/User/UserDetails";
import { CheckMark } from "@/components/CheckMark";
import { addImageDetails } from "@/shared/addImageDetails";
import CompanyMeetingBooker from "@/components/Company/ExtraOrders/CompanyMeetingBooker";
import { set } from "zod";

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
  const [whiteLogo, setWhiteLogo] = useState("");
  const [colorLogo, setColorLogo] = useState("");
  const [description, setDescription] = useState("");
  const [checkmarks, setCheckMarks] = useState<boolean[]>([]);
  const [extras, setExtras] = useState<Extras>();
  const [preferenceCount, setPreferenceCount] = useState({
    banqcount: 0,
    reprcount: 0,
  });
  const [exhibitorPackage, setExhibitorPackage] = useState(new Package(t, -1));
  const [showSetUpPage, setShowSetUpPage] = useState<boolean>(false);
  const [hasMeeting, setHasMeeting] = useState<boolean>(false);

  // Mutations
  const setExtrasMutation: ReturnType<typeof api.exhibitor.setExtras.useMutation> = api.exhibitor.setExtras.useMutation();
  const logoMutation = api.exhibitor.setLogo.useMutation();
  const descriptionMutation = api.exhibitor.setDescription.useMutation();
  const jobOffersMutation = api.exhibitor.setJobOffers.useMutation();
  const setInfoStatus = api.exhibitor.setInfoStatus.useMutation();
  const createMeeting = api.meeting.createMeeting.useMutation();


  // Queries
  const getLogos = api.exhibitor.getLogo.useQuery();
  const getDescription = api.exhibitor.getDescription.useQuery();
  const getJobOffers = api.exhibitor.getJobOffers.useQuery();
  const getExtras = api.exhibitor.getExtras.useQuery();
  const getExhibitor = api.exhibitor.getPackage.useQuery();
  const getPreferenceCounts = api.exhibitor.getPreferenceCount.useQuery();
  const getAll = api.exhibitor.get.useQuery();
  const getIsLoggedIn = api.account.isLoggedIn.useQuery(undefined, {
    onSuccess: (data: any) => {
      setIsLoggedIn(data);
    },
  });
  const getInfoStatus = api.exhibitor.getInfoStatus.useQuery();
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
        default:
            return
    }
  }

  useEffect(() => {
    if (!getAll.isSuccess) return;
    //if (!getStudentInterests.data) return;

    //console.log(getStudentInterests.data[0].ugkthid);
    //console.log(getAll.data.organizationNumber);

    // Call this code below to create new meetings

    // createMeeting.mutateAsync(JSON.stringify({
    //   studentId: getStudentInterests.data[0].ugkthid,
    //   exhibitorId: getAll.data.organizationNumber,
    // }));


  }, [getAll.data]);

  // Manage page swapping
  const pageAmout = 6;
  let newPage;
  const nextPage = () => {
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
        getExtras.data.totalBanquetTicketsWanted
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
      exhibitor.customBanquetTicketsWanted
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
    });
  }, [extras]);


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
      jobOffersMutation.mutateAsync({
        summerJob: getCheckmarksPos("summer"),
        internship: getCheckmarksPos("intern"),
        partTimeJob: getCheckmarksPos("partTime"),
        masterThesis: checkmarks[15],
        fullTimeJob: checkmarks[16],
        traineeProgram: checkmarks[17],
      }),
    ])
      .then(() => setSaveChanges(true))
      .catch((error) => {
        console.log(error);
        setSaveChanges(false);
      });
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
        setDescription={setDescription}/>

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
      setDescription={setDescription}/>
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
    <div className="xl:w-[1200px] lg:w-[1000px] w-full">

    </div>
      <div className="mx-auto flex flex-col items-center py-40 cursor-default">
        {/*Header*/}
        <h1 className="uppercase text-cerise text-3xl md:text-5xl font-medium text-center px-[10px] break-words">
          {t.exhibitorSettings.header} 
        </h1>
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
