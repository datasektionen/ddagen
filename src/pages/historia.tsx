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
  nrOfVisitors,
  dda,
  year,
  extraInfo,
  isFirst = false,
  isLast = false
}: {
  bgColor: string;
  borderColor: string;
  toReverse: boolean;
  textColor: string;
  pgImage: string;
  showDate: boolean;
  nrOfCompanies: string;
  nrOfVisitors: string;
  dda: string;
  year: number;
  extraInfo: string;
  isFirst?: boolean;
  isLast?: boolean;
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
        flex max-sm:flex-row-reverse
        ${toReverse ? "lg:flex-row-reverse" : "lg:flex-row"}
        gap-4 px-[50px] md:px-[50px] justify-between`}>
      <div className={`basis-1/2 flex flex-col ${toReverse ? "lg:items-start" : "lg:items-end"}`}>
        <div className="flex bg-slate-100 bg-opacity-50 mt-2 " onClick={openModal}>
          <img src={pgImage} className=" max-w-[400px] object-contain"></img>
        </div>
      </div>
      <div className="basis-[124px] h-full flex justify-center">
        <div className={`flex relative justify-center w-4 bg-cerise ${isFirst && "max-lg:rounded-t-full"} ${isLast && "max-lg:rounded-b-full"} h-full min-h-[300px]`}>
          {showDate && <div className="flex absolute justify-center items-center h-16 w-16 rounded-full bg-cerise text-white text-lg">
            {year}
          </div>}
        </div>
      </div>
      <div className={`basis-1/2 flex flex-col justify-center max-sm:hidden ${toReverse ? "lg:items-end" : "lg:items-start"}`}>
      <h2 className="lg:text-3xl md: text-xl text-white">D-Dagen {year}</h2>
      <p className={`text-white text-xl ${toReverse ? "lg:text-right" : ""}`}>{t.history.nrOfCompanies} {nrOfCompanies} <br/>{t.history.nrOfVisitors} {nrOfVisitors} <br/>{t.history.dda} <br/> {dda?.split(" & ").map((x,i)=>i==0?<>{x}<br /></>:<>{x}</>)}</p>
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
                <p className={`text-black text-xl sm:hidden ${toReverse ? "sm:text-right" : ""}`}>{t.history.nrOfCompanies} {nrOfCompanies} <br/>{t.history.nrOfVisitors} {nrOfVisitors} <br/>{t.history.dda} <br/> {dda?.split(" & ").map((x,i)=>i==0?<>{x}<br /></>:<>{x}</>)}</p>
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
      nrOfCompanies: "TBD",
      nrOfVisitors: "TBD",
      dda: "Max Berglund & Mortada Nasser",
      text: t.history.text2025
    },
    {
      year: 2024,
      pgImage: "/img/historia/pg2024.jpg",
      nrOfCompanies: "101",
      nrOfVisitors: "3281",
      dda: "William Nordwall & Toshihide Sakao",
      text: t.history.text2024
    },
    {
      year: 2023,
      pgImage: "/img/historia/pg2023.png",
      nrOfCompanies: "107",
      nrOfVisitors: "≈3000",
      dda: "Axel Andin Johansson & Johan Abdi",
      text: t.history.text2023
    },
    {
      year: 2022,
      pgImage: "/img/historia/pg2022.png",
      nrOfCompanies: "85",
      nrOfVisitors: "≈2500",
      dda: "Carl Chemnitz & Kevin Wenström",
      text: t.history.text2022
    },
    {
      year: 2021,
      pgImage: "/img/historia/pg2021.png",
      nrOfCompanies: "60",
      nrOfVisitors: "≈2000",
      dda: "Erik Nordlöf & Adam Sjöberg",
      text: t.history.text2021
    },
    {
      year: 2020,
      pgImage: "/img/historia/pg2020.jpg",
      nrOfCompanies: "35",
      nrOfVisitors: "≈1000",
      dda: "Julia Byström & Andreas Wallström",
      text: t.history.text2020
    },
    {
      year: 2019,
      pgImage: "/img/historia/pg2019.jpg",
      nrOfCompanies: "81",
      nrOfVisitors: "≈2000",
      dda: "Simone De Blasio & Victor Sellstedt",
      text: t.history.text2019
    },
    {
      year: 2018,
      pgImage: "/img/historia/pg2018.png",
      nrOfCompanies: "75",
      nrOfVisitors: "?",
      dda: "Nils Streijffert",
      text: ""
    },
    {
      year: 2017,
      pgImage: "/img/historia/pg2017.jpg",
      nrOfCompanies: "60",
      nrOfVisitors: "?",
      dda: "Linn Jensen",
      text: ""
    },
    {
      year: 2016,
      pgImage: "/img/historia/pg2016.png",
      nrOfCompanies: "48",
      nrOfVisitors: "?",
      dda: "Albin Johansson Söderholm",
      text: t.history.text2016
    },
    {
      year: 2015,
      pgImage: "/img/historia/pg2015.png",
      nrOfCompanies: "35",
      nrOfVisitors: "?",
      dda: "David Masko",
      text: t.history.text2015
    },
    {
      year: 2014,
      pgImage: "/img/historia/pg2014.png",
      nrOfCompanies: "39",
      nrOfVisitors: "?",
      dda: "Johan Arnör",
      text: ""
    },
    {
      year: 2013,
      pgImage: "/img/historia/pgLama.png",
      nrOfCompanies: "38",
      nrOfVisitors: "?",
      dda: "Jennie Olsson",
      text: ""
    },
    {
      year: 2012,
      pgImage: "/img/historia/pgLama.png",
      nrOfCompanies: "36",
      nrOfVisitors: "?",
      dda: "Mattias Folke",
      text: ""
    },
    {
      year: 2011,
      pgImage: "/img/historia/pgLama.png",
      nrOfCompanies: "?",
      nrOfVisitors: "?",
      dda: "Andreas Falk",
      text: ""
    }
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
        <h2 className="text-xl text-white  text-center mx-auto mt-5 max-w-4xl">{t.history.subheader}</h2>
        <div className="flex flex-col mt-8">
          <div className="flex justify-center max-lg:hidden">
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
              nrOfVisitors={year.nrOfVisitors}
              dda={year.dda}
              year={year.year}
              extraInfo={year.text}
              isFirst={i === 0}
              isLast={i === years.length - 1}
              />
            ))
          }
        </div>
          <div className="flex justify-center max-lg:hidden">
            <div className="w-4 bg-cerise h-full min-h-[30px] rounded-b-full"></div>
          </div>
      </div>
    </>
  );
}
