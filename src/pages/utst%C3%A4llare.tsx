import { api } from "@/utils/api";
import { useLocale } from "@/locales";
import { useRouter } from "next/router";
import { Table } from "@/components/Table";
import { Extras, Package } from "@/shared/Classes";
import { useEffect, useState } from "react";
import { UploadButton } from "@/components/Settings/UploadButton";
import { TextInput } from "@/components/Settings/TextInput";
import RowOne from "@/components/Settings/RowOne";
import RowTwo from "@/components/Settings/RowTwo";
import RowThree from "@/components/Settings/RowThree";
import GeneralInfo from "@/components/Settings/GeneralInfo";
import JobOffers from "@/components/Settings/JobOffers";
import { UserDetails } from "@/components/Settings/UserDetails";


export default function Exhibitor() {
  const t = useLocale();
  const router = useRouter();

  // States
  const [page, setPage] = useState<number>(0);
  const pageAmout = 6;
  const nextPage = () => {
    setPage((prevIndex) => (prevIndex + 1) % pageAmout);
  }

  const prevPage = () => {
    setPage((prevIndex) => ( prevIndex === 0 ? prevIndex : prevIndex - 1));
  }


  const [extras, setExtras] = useState<Extras>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
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

  useEffect(() => {
    //if (!getIsLoggedIn.isSuccess) return;
    //if (isLoggedIn == false) router.push("/logga-in");
  }, [isLoggedIn]);

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
  

  
  const [whiteLogo, setWhiteLogo] = useState("");
  const [colorLogo, setColorLogo] = useState("");
  const [description, setDescription] = useState("");
  
    
  

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
      />
    </>,
    <UserDetails t={t}/>,
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
        <div className="h-full min-w-[200px] max-w-[1200px] w-full mt-[15px] px-[20px] min-[450px]:px-[60px] min-[704px]:px-[60px]">
          <div className=" w-full rounded-2xl bg-white/20 backdrop-blur-md text-white pt-8">
            {pageContent[page]}
            <div className="w-full flex justify-center">


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
              {page == pageAmout -1 ?  <p> {t.exhibitorSettings.lastPageText} </p> : <> </>}
            </div>
          </div>
          
          {table}
        </div>
      </div>
    </>
  );
}
