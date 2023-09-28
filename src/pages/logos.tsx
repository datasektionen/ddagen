import { useLocale } from "@/locales";
import { useState, useEffect, useRef } from "react";
import { Exhibitor } from "@/shared/Classes";
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
        className={`${size}`}
      />

      {modalState && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60"
          ref={modalRef}
          onClick={handleOverlayClick}
        >
          <div
            className={`bg-black bg-opacity-0 w-[500px] pt-10 pb-5 flex flex-col rounded-3xl`}
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
                {"Omega point"}
              </h2>
              <p className="text-white text-center mt-5">
                {
                  "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also "
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
                companyName={exhibitor.companyName || exhibitor}
                description={exhibitor.description || exhibitor}
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

  const startupPackages = exhibitorData.filter((e) => e.package === "startup");
  const mainPackages = exhibitorData.filter((e) => e.package === "main");
  const basePackages = exhibitorData.filter((e) => e.package === "base");
  const headhunterPackages = exhibitorData.filter(
    (e) => e.package === "headhunter"
  );
  const premiumPackages = exhibitorData.filter((e) => e.package === "premium");

  const list = ["a", "b", "c", "d", "e", "f"];
  return (
    <div className="pt-[200px] pb-[300px]">
      <h1 className="uppercase text-cerise text-5xl font-medium text-center">
        {" "}
        {t.logos.header}
      </h1>
      {RenderLogos(list, 1, "w-[500px]")}
      {RenderLogos(list, 2, "w-[400px]")}
      {RenderLogos(list, 3, "w-[300px]")}
      {/*
      {RenderLogos(mainPackages, 3)}
      {RenderLogos(startupPackages, 3)}
      {RenderLogos(basePackages, 3)}
      {RenderLogos(headhunterPackages, 3)}
      {RenderLogos(premiumPackages, 2)}
      */}
    </div>
  );
}
