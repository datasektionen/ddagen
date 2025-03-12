import Link from "next/link";
import { useLocale } from "@/locales";
import React, { useState } from "react";
import { Carousel } from "flowbite-react";
import { Table } from "@/components/Table";
import { NextSeo } from 'next-seo';

export default function Faq() {
  const t = useLocale();
  const slides = [
    {
      url: "/img/slide1.png",
    },
    {
      url: "/img/slide2.png",
    },
    {
      url: "/img/slide3.png",
    },
  ];

  const tables = [
    Table(
      [t.faq.table1row1, t.faq.table1row2, t.faq.table1row3],
      [t.faq.table1text1, t.faq.table1text2, t.faq.table1text3],
      []
    ),
    Table(
      [t.faq.table2row1, t.faq.table2row2],
      [t.faq.table2text1, t.faq.table2text2],
      []
    ),
    Table(
      [
        t.faq.table3row1,
        t.faq.table3row2,
        t.faq.table3row3,
        t.faq.table3row4,
        t.faq.table3row5,
      ],
      [
        t.faq.table3text1,
        t.faq.table3text2,
        t.faq.table3text3,
        t.faq.table3text4,
        t.faq.table3text5,
      ],
      []
    ),
    Table([t.faq.table4row1], [t.faq.table4text1], []),
  ];

  const [currentTable, setCurrentTable] = useState(2);

  const seoContent = {
    sv: {
      title: "D-Dagen 2025 | Vanliga Frågor (FAQ) - Allt du behöver veta",
      description: "Har du frågor om D-Dagen 2025? Här hittar du svar på vanliga frågor om eventet, deltagande, företagsmöjligheter, kontaktsamtal och mer. Få all information du behöver inför mässan på KTH den 9 oktober.",
      url: "https://ddagen.se/faq",
    },
    en: {
      title: "D-Dagen 2025 | FAQ - Everything You Need to Know",
      description: "Have questions about D-Dagen 2025? Find answers to frequently asked questions about the event, participation, company opportunities, career meetings, and more. Get all the information you need before the fair at KTH on October 9.",
      url: "https://ddagen.se/en/faq",
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
      <div className="flex flex-col items-center w-full pb-[150px] ">
        <div className="xl:w-[1200px] lg:w-[1000px] w-full">
          <h1 className="uppercase text-center text-cerise pt-[110px] lg:pt-[140px] mb-16 text-5xl font-medium">
            {" "}
            {t.faq.header}
          </h1>

  
          <div className="h-[35vh] sm:h-[45vh] md:h-[55vh] xl:h-[80vh] w-full ">
            <Carousel className="px-16 sm:px-24 pb-20">
              <img src={slides[0].url} className="object-cover h-full w-full grayscale" />
              <img src={slides[1].url} className="object-cover h-full w-full grayscale" />
              <img src={slides[2].url} className="object-cover h-full w-full grayscale" />
            </Carousel>
          </div>
      

          {/*Dropdown table*/}
          <div className="h-full min-w-[200px] w-full  mt-[100px] min-[450px]:px-[60px] min-[704px]:px-[60px] ">
            {/*Dropdown buttons*/}
            <div className="h-[50px] bg-inherit flex flex-col sm:flex-row  justify-center items-center mb-[80px] px-[30px] sm:px-[0px] ">
              <div className="sm:w-full flex flex-row justify-center items-center">
                <div
                  className={`${
                    !(currentTable - 2) ? "brightness-100" : "brightness-75"
                  } sm:w-full text-center rounded-md backdrop-blur-md h-[50px] mr-[20px] sm:mr-[40px] bg-slate-50 bg-opacity-20 border-[3px] border-cerise flex items-center justify-center cursor-pointer hover:brightness-100 hover:scale-105 transition-transform`}
                  onClick={() => setCurrentTable(2)}
                >
                  <p className="text-white text-[11px] sm:text-base break-words w-[100px] sm:w-auto">
                    {" "}
                    {t.faq.box3}
                  </p>
                </div>
                <div
                  className={`${
                    !(currentTable - 0) ? "brightness-100" : "brightness-75"
                  } sm:w-full text-center rounded-md backdrop-blur-md h-[50px] mr-[0px] sm:mr-[40px] bg-slate-50 bg-opacity-20 border-[3px] border-cerise flex items-center justify-center cursor-pointer hover:brightness-100 hover:scale-105 transition-transform`}
                  onClick={() => setCurrentTable(0)}
                >
                  <p className="text-white text-[11px] sm:text-base break-words w-[100px] sm:w-auto">
                    {" "}
                    {t.faq.box1}
                  </p>
                </div>
              </div>

              <div className="sm:w-full flex flex-row justify-center items-center mt-[20px] sm:mt-[0px]">
                <div
                  className={`${
                    !(currentTable - 1) ? "brightness-100" : "brightness-75"
                  } sm:w-full text-center rounded-md backdrop-blur-md h-[50px]  mr-[20px] sm:mr-[40px] bg-slate-50 bg-opacity-20 border-[3px] border-cerise flex items-center justify-center cursor-pointer hover:brightness-100 hover:scale-105 transition-transform`}
                  onClick={() => setCurrentTable(1)}
                >
                  <p className="text-white text-[11px] sm:text-base break-words w-[100px] sm:w-auto">
                    {" "}
                    {t.faq.box2}
                  </p>
                </div>
                <div
                  className={`${
                    !(currentTable - 3) ? "brightness-100" : "brightness-75"
                  } sm:w-full text-center rounded-md backdrop-blur-md h-[50px] bg-slate-50 bg-opacity-20 border-[3px] border-cerise flex items-center justify-center cursor-pointer hover:brightness-100 hover:scale-105 transition-transform`}
                  onClick={() => setCurrentTable(3)}
                >
                  <p className="text-white text-[11px] sm:text-base break-words w-[100px] sm:w-auto ">
                    {" "}
                    {t.faq.box4}
                  </p>
                </div>
              </div>
              {/*Dropdown buttons*/}
            </div>
            {tables[currentTable]}
          </div>
          {/*Dropdown table*/}

          {/*Product Catalog button*/}
          <div className="w-full flex flex-col items-center">
            <Link
                className="mt-[100px] h-[80px] w-[250px] bg-cerise rounded-[40px] border-cerise flex items-center justify-center px-[30px] flex-col hover:scale-105 transition-transform text-white text-[20px]"
                target="_blank"
                href={t.faq.catalogPath}
                >
                  {t.faq.productCatalog}
            </Link>
          </div>
        

        </div>
      </div>
    </>
  );
}
