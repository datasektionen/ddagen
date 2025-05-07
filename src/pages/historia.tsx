import { useLocale } from "@/locales";
import { NextSeo } from "next-seo";
import { useState, useRef } from "react";

function Year({
  bgColor,
  borderColor,
  toReverse,
  textColor,
  pgImage,
  showDate,
  nrOfCompanies,
  year,
  extraInfo,
}: {
  bgColor: string;
  borderColor: string;
  toReverse: boolean;
  textColor: string;
  pgImage: string;
  showDate: boolean;
  nrOfCompanies: string;
  year: number;
  extraInfo: string;
}) {
  const t = useLocale();
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
    <div className={`
        flex
        ${toReverse ? "flex-row-reverse" : "flex-row"}
        gap-4 px-[50px] md:px-[50px] justify-between`}>
      <div className={`basis-1/2 flex flex-col ${toReverse ? "items-start" : "items-end"}`}>
        {/* <h2 className="text-center lg:text-3xl md: text-xl text-white">{eventInfo[1]}</h2> */}
        <div className="flex bg-slate-100 bg-opacity-50 mt-2 " onClick={openModal}>
          <img src={pgImage} className=" max-w-[400px] object-contain"></img>
        </div>
      </div>
      <div className="basis-[124px] h-full flex justify-center">
        <div className="flex relative justify-center w-4 bg-cerise h-full min-h-[300px]">
          {showDate && <div className="flex absolute justify-center items-center h-16 w-16 rounded-full bg-cerise text-white text-lg">
            {year}
          </div>}
        </div>
      </div>
      <div className={`basis-1/2 flex flex-col justify-center ${toReverse ? "items-end" : "items-start"}`}>
      <h2 className="lg:text-3xl md: text-xl text-white">D-Dagen {year}</h2>
      <p className=" text-white text-xl">{t.history.nrOfCompanies} {nrOfCompanies} </p>
      </div>
      {modalState && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-40"
            ref={modalRef}
            onClick={handleOverlayClick}
          >
          <div className={`bg-white bg-opacity-70 w-[500px] pb-5 flex flex-col rounded-3xl`}>
            <div className="relative py-[0px] justify-center flex flex-row">
                <img src={pgImage} />

                <button
                  className="absolute top-5 right-3 w-[50px] h-[50px] flex items-center justify-center"
                  onClick={closeModal}
                >
                  <div className="absolute h-[50px] w-[5px] bg-white rounded-md rotate-45"></div>
                  <div className="absolute h-[50px] w-[5px] bg-white rounded-md -rotate-45"></div>
                </button>
              </div>
              <div className="px-5 mt-5">
                <h2 className="text-3xl text-black">
                  {year}
                </h2>
                {/* <h3 className="text-cerise text-2xl mt-2">
                  {t.event.subheader + eventInfo[0] + ":"}
                </h3> */}
                <p className="text-black text-start mt-5">{extraInfo}</p>
              </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Years() {
  const t = useLocale();

  const years = [
    {
      year: 2025,
      pgImage: "/img/historia/pg2025.jpg",
      nrOfCompanies: "?",
      text: t.history.text2025
    },
    {
      year: 2024,
      pgImage: "/img/historia/pg2024.jpg",
      nrOfCompanies: "101",
      text: t.event.fullParagraph2
    },
    {
      year: 2023,
      pgImage: "/img/historia/pg2023.png",
      nrOfCompanies: "107",
      text: t.event.fullParagraph3
    },
  ]

  const seoContent = {
    sv: {
      title: "D-Dagen genom tiderna!",
      description: "Utforska D-Dagens historia och se hur vi har utvecklats genom åren.",
      url: "https://ddagen.se/historia",
    },
    en: {
      title: "D-Dagen through the years!",
      description: "Explore the history of D-Dagen and see how we have developed over the years.",
      url: "https://ddagen.se/en/historia",
    },
  };

  const { title, description, url } = seoContent[t.locale as "sv" | "en"];

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          url,
          title,
          description
        }}
        additionalMetaTags={[
          {
            name: 'robots',
            content: 'index, follow'
          }
        ]}
      />
      <div className="pt-[200px] pb-[300px]">
        <h1 className="text-5xl text-cerise font-medium text-center"> {t.history.header}</h1>
        <div className="flex flex-col mt-8">
          <div className="flex justify-center">
            <div className="w-4 bg-cerise h-full min-h-[30px] rounded-t-full"></div>
          </div>
          {years?.map((year, i) => (
            <Year
              key={i}
              bgColor="bg-[#E2B7C9]"
              borderColor="border-[#E2B7C9]"
              toReverse={i%2 == 0}
              textColor="text-[#E2B7C9]"
              pgImage={year?.pgImage}
              showDate={!(i > 0 && year.year === years[i-1].year)}
              nrOfCompanies={year.nrOfCompanies}
              year={year.year}
              extraInfo={year.text}
              />
            ))
          }
        </div>
          <div className="flex justify-center">
            <div className="w-4 bg-cerise h-full min-h-[30px] rounded-b-full"></div>
          </div>
      </div>
    </>
  );
}
