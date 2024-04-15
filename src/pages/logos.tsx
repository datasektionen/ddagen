import { useLocale } from "@/locales";
import { useState, useRef } from "react";
import { addImageDetails } from "@/shared/addImageDetails";
import { prisma } from "@/server/db";
import { Package } from "@prisma/client";

function OffersList({ offers }: { offers: (number[] | boolean)[] }) {
  const t = useLocale();
  const jobTypeNames = [
    t.exhibitorSettings.table.row1.section2.jobs.summer,
    t.exhibitorSettings.table.row1.section2.jobs.internship,
    t.exhibitorSettings.table.row1.section2.jobs.partTime,
    t.exhibitorSettings.table.row1.section2.other.thesis,
    t.exhibitorSettings.table.row1.section2.other.fullTime,
    t.exhibitorSettings.table.row1.section2.other.trainee,
  ];

  const hasValidOffer = offers.some((offer, index) => {
    if (index < 3 && Array.isArray(offer) && offer[0] >= 0) {
      return true;
    }
    if (index >= 3 && offer) {
      return true;
    }
    return false;
  });

  if (!hasValidOffer) return null;
  return (
    <div className="flex flex-col items-center mt-5">
      <p className="text-cerise uppercase">{t.logos.offers}</p>
      <ul className="list-disc pl-5 mt-5 ">
        {offers.map((offer, index) => {
          if (index < 3 && Array.isArray(offer) && offer[0] >= 0) {
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
  offers: (number[] | boolean)[];
}) {
  const [modalState, setModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    setModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModal(false);
    document.body.style.overflow = "auto";
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
          className="cursor-pointer fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-lg"
          ref={modalRef}
          onClick={handleOverlayClick}
        >
          <div
            className={`scrollbar-hide px-10 py-5 max-h-[80vh] overflow-y-auto cursor-default bg-slate-600 bg-opacity-50 w-[300px] sm:w-[500px] pt-10 pb-5 flex flex-col rounded-3xl`}
          >
            <div className="relative py-[0px] justify-center flex flex-row">
              <img src={addImageDetails(pic)} alt={companyName} />
            </div>
            <div className="px-5 mt-5">
              <h2 className="text-center text-3xl text-cerise">
                {companyName}
              </h2>
              <p className="text-white text-center mt-5 break-words ">
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
          className="flex flex-row justify-center items-center gap-14 mt-[75px]"
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
    packageTier: number;
    jobOfferId?: string;
    offers: (number[] | boolean)[];
  }[];
};

export default function Logos({ exhibitorData }: LogosProps) {
  const t = useLocale();
  const mainsponsorPackages = exhibitorData.filter(
    (e) => e.packageTier === 3 && e.logoColor
  );
  const largeAndMediumPackages = exhibitorData.filter(
    (e) =>
      (e.packageTier === 2 || e.packageTier === 1) && e.logoColor
  );
  const smallPackages = exhibitorData.filter(
    (e) => e.packageTier === 0 && e.logoColor
  );
  const startupPackages = exhibitorData.filter(
    (e) => e.packageTier === 4 && e.logoColor
  );
  const smallAndStartUpPackages = [...smallPackages, ...startupPackages];

  return (
    <div className="pt-[200px] pb-[300px] px-[10px] sm:px-[100px] lg:px-[200px]">
      <h1 className="uppercase text-cerise text-5xl font-medium text-center">
        {" "}
        {t.logos.header}
      </h1>
      <div className="bg-slate-600 py-[50px] mt-[100px] rounded-lg bg-opacity-40 px-[50px]">
        <div className="block sm:hidden">
          {RenderLogos(mainsponsorPackages, 1, "w-[250px]")}
          {RenderLogos(largeAndMediumPackages, 2, "w-[125px]")}
          {RenderLogos(smallAndStartUpPackages, 3, "w-[80px]")}
        </div>

        <div className="hidden xl:block">
          {RenderLogos(mainsponsorPackages, 1, "w-[350px]")}
          {RenderLogos(largeAndMediumPackages, 3, "w-[250px]")}
          {RenderLogos(smallAndStartUpPackages, 6, "w-[125px]")}
        </div>

        <div className="hidden sm:block xl:hidden">
          {RenderLogos(mainsponsorPackages, 1, "w-[350px]")}
          {RenderLogos(largeAndMediumPackages, 3, "w-[250px]")}
          {RenderLogos(smallAndStartUpPackages, 4, "w-[125px]")}
        </div>
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
      exhibitor.jobOffers?.summerJob,
      exhibitor.jobOffers?.internship,
      exhibitor.jobOffers?.partTimeJob,
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
