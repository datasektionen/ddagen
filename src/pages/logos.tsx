import { useLocale } from "@/locales";
import { useState, useEffect, useRef } from "react";
import { api } from "@/utils/api";

function Logo({
  pic,
  companyName,
  description,
  size,
}: {
  pic: string;
  companyName: string;
  description: string;
  size: string;
}) {
  const [modalState, setModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (modalRef.current === event.target) {
      closeModal();
    }
  };

  return (
    <div>
      <img
        src={pic}
        alt={companyName}
        onClick={openModal}
        className={`${size} cursor-pointer`}
      />

      {modalState && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60"
          ref={modalRef}
          onClick={handleOverlayClick}
        >
          <div
            className={`bg-black bg-opacity-0 w-[300px] sm:w-[500px] pt-10 pb-5 flex flex-col rounded-3xl`}
          >
            <div className="relative py-[0px] justify-center flex flex-row">
              <img src={pic} alt={companyName} />
              {/* 
              <button
                className="absolute top-5 right-3 w-[50px] h-[50px] flex items-center justify-center"
                onClick={closeModal}
              >
                <div className="absolute h-[50px] w-[5px] bg-black rounded-md rotate-45"></div>
                <div className="absolute h-[50px] w-[5px] bg-black rounded-md -rotate-45"></div>
              </button>
              */}
            </div>
            <div className="px-5 mt-5">
              <h2 className="text-center text-3xl text-cerise">
                {companyName}
              </h2>
              <p className="text-white text-center mt-5">
                {
                description
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function chunkArray<T>(array: T[], size: number): T[][] {
  const chunkedArr: T[][] = [];
  let index = 0;
  while (index < array.length) {
    chunkedArr.push(array.slice(index, size + index));
    index += size;
  }
  return chunkedArr;
}
function RenderLogos(packageList: any[], rowSize: number, logoSize: string) {
  return (
    <>
      {chunkArray(packageList, rowSize).map((chunk, rowIndex) => (
        <div
          key={rowIndex}
          className="flex flex-row justify-center items-center mb-4 gap-5 mt-[100px]"
        >
          {chunk.map((exhibitor, idx) => (
            <div key={idx}>
              <Logo
                pic={"/img/omegapoint_logo.svg"} // exhibitor.logoColor
                companyName={exhibitor.name}
                description={exhibitor.description}
                size={logoSize}
              />
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export default function Logos() {
  const t = useLocale();

  const exhibitorsQuery = api.public.getExhibitors.useQuery();
  const exhibitorData = exhibitorsQuery.data || [];
  const loading = exhibitorsQuery.isLoading;
  const error = exhibitorsQuery.error;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching exhibitors. Please try again later.</p>;
  }

  const headSponsor = exhibitorData.filter((e) => e.name.toLowerCase() === "omegapoint");
  const premiumPackages = exhibitorData.filter((e) => e.package === "premium");
  const headhunterPackages = exhibitorData.filter(
    (e) => e.package === "headhunter"
  );
  const sponsorPackages = exhibitorData.filter((e) => e.package === "sponsor");
  const basePackages = exhibitorData.filter((e) => e.package === "base");
  const startupPackages = exhibitorData.filter((e) => e.package === "startup");




  const list = ["a", "b", "c", "d", "e", "f"];
  return (
    <div className="pt-[200px] pb-[300px]">
      <h1 className="uppercase text-cerise text-5xl font-medium text-center">
        {" "}
        {t.logos.header}
      </h1>
      <div className="block sm:hidden">
      {RenderLogos(premiumPackages, 1, "w-[250px]")}
      {RenderLogos(basePackages, 2, "w-[125px]")}
      {RenderLogos(basePackages, 2, "w-[125px]")}
      {RenderLogos(basePackages, 3, "w-[80px]")}
      {RenderLogos(basePackages, 3, "w-[80px]")}
      {RenderLogos(basePackages, 3, "w-[80px]")}
      </div>

      <div className="hidden sm:block">
      {RenderLogos(premiumPackages, 1, "w-[600px]")}
      {RenderLogos(basePackages, 2, "w-[400px]")}
      {RenderLogos(basePackages, 2, "w-[400px]")}
      {RenderLogos(basePackages, 3, "w-[300px]")}
      {RenderLogos(basePackages, 3, "w-[300px]")}
      {RenderLogos(basePackages, 3, "w-[300px]")}
      </div>

      {/*
      {RenderLogos(list, 1, "w-[500px]")}
      {RenderLogos(list, 2, "w-[400px]")}
      {RenderLogos(list, 3, "w-[300px]")}
      {RenderLogos(list, 4, "w-[200px]")}
      {RenderLogos(headSponsor, 1, "w-[500px]")}
      {RenderLogos(premiumPackages, 2, "w-[400px]")}
      {RenderLogos(headhunterPackages, 2, "w-[400px]")}
      {RenderLogos(base, 3)}
      {RenderLogos(headhunterPackages, 3)}
      {RenderLogos(premiumPackages, 2)}
      */}
    </div>
  );
}
