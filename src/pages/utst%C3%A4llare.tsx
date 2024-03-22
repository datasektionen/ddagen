import { api } from "@/utils/api";
import { useLocale } from "@/locales";
import { useRouter } from "next/router";
import { Table } from "@/components/Table";
import { Extras, Package } from "@/shared/Classes";
import { useEffect, useState } from "react";
import { UploadButton } from "@/components/Settings/UploadButton";
import { TextInput } from "@/components/Settings/TextInput";
import RowOne from "@/components/Settings/RowOne";
import ExtraFairOrders from "@/components/Settings/ExtraFairOrders";
import FoodPreferences from "@/components/Settings/FoodPreferences";
import GeneralInfo from "@/components/Settings/GeneralInfo";
import JobOffers from "@/components/Settings/JobOffers";
import { UserDetails } from "@/components/Settings/UserDetails";
import { CheckMark } from "@/components/CheckMark";


// TODO hook the next button to the save features
//
//

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


  const [extras, setExtras] = useState<Extras>();
  const [preferenceCount, setPreferenceCount] = useState({
    banqcount: 0,
    reprcount: 0,
  });
  const [exhibitorPackage, setExhibitorPackage] = useState(new Package(t, ""));

  // Mutations
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

 

  // Manage login
  useEffect(() => {
    //if (!getIsLoggedIn.isSuccess) return;
    //if (isLoggedIn == false) router.push("/logga-in");
  }, [isLoggedIn]);

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
    const exhibitorPackage = new Package(t, exhibitor.package);
    exhibitorPackage.addCustomOrders(
      exhibitor.customTables,
      exhibitor.customChairs,
      exhibitor.customDrinkCoupons,
      exhibitor.customRepresentativeSpots,
      exhibitor.customBanquetTicketsWanted
    );
    setExhibitorPackage(exhibitorPackage);
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

  const pageAmout = 6;
  const nextPage = () => {
    setPage((prevIndex) => (prevIndex + 1) % pageAmout);
  }

  const prevPage = () => {
    setPage((prevIndex) => ( prevIndex === 0 ? prevIndex : prevIndex - 1));
  }

  {/* General information*/}
  const logoMutation = api.exhibitor.setLogo.useMutation();
  const descriptionMutation = api.exhibitor.setDescription.useMutation();




  {/* job Offers*/}
  const getJobOffers = api.exhibitor.getJobOffers.useQuery();
  const jobOffersMutation = api.exhibitor.setJobOffers.useMutation();
  const [checkmarks, setCheckMarks] = useState<boolean[]>([]);

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

  const table = Table(
    [
      t.exhibitorSettings.table.row1.title,
      t.exhibitorSettings.table.row2.title,
      t.exhibitorSettings.table.row3.title,
    ],
    [],
    [
      <RowOne t={t} />,
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

  // save managment

  useEffect(() => {
    if (typeof saveChanges === "boolean") {
      setTimeout(() => {
        setSaveChanges(undefined);
      }, 3000);
    }
  }, [saveChanges]);


  async function saveHandle() {
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
          
          {table}
        </div>
      </div>
    </>
  );
}
