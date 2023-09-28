import { useLocale } from "@/locales";
import { useState, useEffect, useRef } from "react";
import { addImageDetails } from "@/shared/addImageDetails";
import { prisma } from "@/server/db";
import { Package } from "@prisma/client";

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
        src={addImageDetails(pic)}
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
              <img src={addImageDetails(pic)} alt={companyName} />
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
              <p className="text-white text-center mt-5">{description}</p>
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
                pic={exhibitor.logoColor} // exhibitor.logoColor
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
type LogosProps = {
  exhibitorData: {
    id?: string;
    name: string;
    logoWhite?: string | null;
    logoColor?: string | null;
    description?: string;
    package?: Package;
    jobOfferId?: string;
  }[];
};
export default function Logos({ exhibitorData }: LogosProps) {
  const t = useLocale();
  const headsponsorPackages = exhibitorData.filter((e) => e.package === "main");
  const premiumPackages = exhibitorData.filter((e) => e.package === "premium");
  const headhunterPackages = exhibitorData.filter(
    (e) => e.package === "headhunter"
  );
  const sponsorPackages = exhibitorData.filter((e) => e.package === "sponsor");
  const basePackages = exhibitorData.filter((e) => e.package === "base");
  const startupPackages = exhibitorData.filter((e) => e.package === "startup");

  return (
    <div className="pt-[200px] pb-[300px]">
      <h1 className="uppercase text-cerise text-5xl font-medium text-center">
        {" "}
        {t.logos.header}
      </h1>
      <div className="block sm:hidden">
        {RenderLogos(headsponsorPackages, 1, "w-[250px]")}
        {RenderLogos(premiumPackages, 2, "w-[125px]")}
        {RenderLogos(headhunterPackages, 2, "w-[125px]")}
        {RenderLogos(sponsorPackages, 3, "w-[80px]")}
        {RenderLogos(basePackages, 3, "w-[80px]")}
        {RenderLogos(startupPackages, 3, "w-[80px]")}
      </div>

      <div className="hidden sm:block">
        {RenderLogos(headsponsorPackages, 1, "w-[600px]")}
        {RenderLogos(premiumPackages, 2, "w-[400px]")}
        {RenderLogos(headhunterPackages, 2, "w-[400px]")}
        {RenderLogos(sponsorPackages, 4, "w-[300px]")}
        {RenderLogos(basePackages, 4, "w-[300px]")}
        {RenderLogos(startupPackages, 4, "w-[300px]")}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const exhibitors = await prisma.exhibitor.findMany();

  const exhibitorData = exhibitors.map((exhibitor) => ({
    name: exhibitor.name || null,
    logoWhite: exhibitor.logoWhite?.toString("base64") || null,
    logoColor: exhibitor.logoColor?.toString("base64") || null,
    description: exhibitor.description || null,
    package: exhibitor.package || null,
    jobOfferId: exhibitor.jobOfferId || null,
  }));

  return {
    props: {
      exhibitorData,
    },
  };
}
