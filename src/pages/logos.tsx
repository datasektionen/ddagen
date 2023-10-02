import { useLocale } from "@/locales";
import { useState, useRef } from "react";
import { addImageDetails } from "@/shared/addImageDetails";
import { prisma } from "@/server/db";
import { Package } from "@prisma/client";

function OffersList({ offers }: { offers: (number[] | boolean | null)[] }) {

  const jobTypeNames = [
    "Summer Job",
    "Internship",
    "Part-time Job",
    "Master Thesis",
    "Full-time Job",
    "Trainee Program",
  ];
  return (
    <div className="flex flex-col items-center mt-5">
      <p className="text-cerise uppercase">Erbjuder</p>
      <ul className="list-disc pl-5 mt-5 ">
        {offers.map((offer, index) => {
          if (index < 3 && offer !== null) {
            return (
              <li key={index} className="mb-2 text-white">
                {jobTypeNames[index]}
              </li>
            );
          }
          if (index >= 3 && offer) {
            return (
              <li key={index} className="mb-2 text-white">
                {jobTypeNames[index]}
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
}

function Logo({
  pic,
  companyName,
  description,
  size,
  offers,
}: {
  pic: string;
  companyName: string;
  description: string;
  size: string;
  offers: (number[] | boolean | null)[];
}) {
  const [modalState, setModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    setModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModal(false);
    document.body.style.overflow = 'auto';
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
          className="cursor-pointer fixed inset-0 flex items-center justify-center bg-black bg-opacity-60"
          ref={modalRef}
          onClick={handleOverlayClick}
        >
          <div
            className={`max-h-[80vh] overflow-y-auto cursor-default bg-black bg-opacity-0 w-[300px] sm:w-[500px] pt-10 pb-5 flex flex-col rounded-3xl`}
          >
            <div className="relative py-[0px] justify-center flex flex-row">
              <img src={addImageDetails(pic)} alt={companyName} />
            </div>
            <div className="px-5 mt-5">
              <h2 className="text-center text-3xl text-cerise">
                {companyName}
              </h2>
              <p className="text-white text-center mt-5 break-words">
                {description}
              </p>
              <OffersList offers={offers} />
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
          className="flex flex-row justify-center items-center mb-4 gap-10 mt-[100px]"
        >
          {chunk.map((exhibitor, idx) => (
            <div key={idx}>
              <Logo
                pic={exhibitor.logoColor}
                companyName={exhibitor.name}
                description={exhibitor.description}
                size={logoSize}
                offers={exhibitor.offers}
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
    offers: (number[] | boolean | null)[];
  }[];
};

export default function Logos({ exhibitorData }: LogosProps) {
  const t = useLocale();
  const headsponsorPackages = exhibitorData.filter(
    (e) => e.package === "main" && e.logoColor
  );
  const headhunterAndPremiumPackages = exhibitorData.filter(
    (e) =>
      (e.package === "headhunter" || e.package === "premium") && e.logoColor
  );
  const sponsorPackages = exhibitorData.filter(
    (e) => e.package === "sponsor" && e.logoColor
  );
  const basePackages = exhibitorData.filter(
    (e) => e.package === "base" && e.logoColor
  );
  const startupPackages = exhibitorData.filter(
    (e) => e.package === "startup" && e.logoColor
  );

  return (
    <div className="pt-[200px] pb-[300px] sm:px-[100px]">
      <h1 className="uppercase text-cerise text-5xl font-medium text-center">
        {" "}
        {t.logos.header}
      </h1>
      <div className="block sm:hidden">
        {RenderLogos(headsponsorPackages, 1, "w-[250px]")}
        {RenderLogos(headhunterAndPremiumPackages, 2, "w-[125px]")}
        {RenderLogos(sponsorPackages, 2, "w-[125px]")}
        {RenderLogos(basePackages, 3, "w-[80px]")}
        {RenderLogos(startupPackages, 3, "w-[80px]")}
      </div>

      <div className="hidden sm:block">
        {RenderLogos(headsponsorPackages, 1, "w-[500px]")}
        {RenderLogos(headhunterAndPremiumPackages, 2, "w-[400px]")}
        {RenderLogos(sponsorPackages, 2, "w-[400px]")}
        {RenderLogos(basePackages, 4, "w-[300px]")}
        {RenderLogos(startupPackages, 4, "w-[300px]")}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const exhibitors = await prisma.exhibitor.findMany({
    include: {
      jobOffers: true,
    },
  });

  const exhibitorData = exhibitors.map((exhibitor) => ({
    name: exhibitor.name || null,
    logoWhite: exhibitor.logoWhite?.toString("base64") || null,
    logoColor: exhibitor.logoColor?.toString("base64") || null,
    description: exhibitor.description || null,
    package: exhibitor.package || null,
    jobOfferId: exhibitor.jobOfferId || null,
    offers: [
      exhibitor.jobOffers?.summerJob || null,
      exhibitor.jobOffers?.internship || null,
      exhibitor.jobOffers?.partTimeJob || null,
      exhibitor.jobOffers?.masterThesis || null,
      exhibitor.jobOffers?.fullTimeJob || null,
      exhibitor.jobOffers?.traineeProgram || null,
    ],
  }));

  return {
    props: {
      exhibitorData,
    },
  };
}
