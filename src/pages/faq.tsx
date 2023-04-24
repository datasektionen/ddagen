import { useLocale } from "@/locales";
import React, { useState } from "react";
import { Carousel } from  "flowbite-react"

function handleAnchorStrings(text: string) {
  const parts = text.split(/(<a[^>]*>.*?<\/a>)/g);
  return (
    <p>
      {parts.map((part, i) => {
        if (part.startsWith("<a")) {
          const hrefMatches = part.match(/href=['"](.*?)['"]/);
          const href = hrefMatches ? hrefMatches[1] : "";
          return (
            <a key={i} href={href} className="text-cerise underline">
              {part.replace(/<a[^>]*>|<\/a>/g, "")}
            </a>
          );
        } else {
          return <span key={i}>{part}</span>;
        }
      })}
    </p>
  );
}

function Table(questions: Array<string>, answers: Array<string>) {
  const stateAction = Array.from({ length: questions.length }, () =>
    useState(false)
  );

  return (
    <div className="mt-[50px]">
      {questions.map((_, i) => (
        <div key={i}>
          <button
            onClick={() => stateAction[i][1](!stateAction[i][0])}
            className="items-center flex flex-row  justify-between pl-[20px] pr-[20px] py-[15px] text-left text-white max-h-[300px] w-full bg-slate-50 bg-opacity-20 border-[2px] border-cerise"
          >
            {" "}
            {questions[i]}
            <img
              src="/img/caret.svg"
              className={`${
                stateAction[i][0] ? "rotate-180" : ""
              } duration-200 ml-4 h-4 `}
            ></img>
          </button>

          <div
            className={`${
              stateAction[i][0]
                ? "max-h-[800px] py-[40px]"
                : "max-h-0 text-[0px]"
            }  duration-200 ease-out text-white py-[0px] pl-[20px] pr-[20px] bg-gray bg-opacity-50 border-[2px] border-cerise flex items-center`}
          >
            {handleAnchorStrings(answers[i])}
          </div>
        </div>
      ))}
    </div>
  );
}

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
      [t.faq.table1text1, t.faq.table1text2, t.faq.table1text3]
    ),
    Table(
      [t.faq.table2row1, t.faq.table2row2],
      [t.faq.table2text1, t.faq.table2text2]
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
      ]
    ),
    Table([t.faq.table4row1], [t.faq.table4text1]),
  ];

  const [currentTable, setCurrentTable] = useState(2);
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="py-[150px] flex flex-col items-center">
      {/*Header*/}
      <div className="w-full ">
        <p className=" text-center text-cerise text-[50px] sm:text-[100px] w-full">
          {" "}
          {t.faq.header}
        </p>
        <p className=" text-center text-cerise text-[50px] sm:text-[100px] w-full">
          {" "}
          FAQ
        </p>
      </div>
      {/*Header*/}

      {/*Carousel*/}
      <div className="h-[35vh] sm:h-[45vh] md:h-[55vh] lg:h-[65vh] xl:h-[80vh] w-full mt-[150px] xl:px-12">
        <Carousel className="px-16 sm:px-24 pb-20">
          <img src={slides[0].url} className="object-cover h-full w-full" />
          <img src={slides[1].url} className="object-cover h-full w-full" />
          <img src={slides[2].url} className="object-cover h-full w-full" />
        </Carousel>
      </div>
      {/*Carousel*/}

      {/*Dropdown table*/}
      <div className="h-full min-w-[200px] max-w-[1200px] w-full mt-[100px] px-[20px] min-[450px]:px-[60px] min-[704px]:px-[60px]">
        {/*Dropdown buttons*/}
        <div className="h-[50px] bg-inherit flex flex-col sm:flex-row  justify-center items-center mb-[80px] px-[30px] sm:px-[0px] ">
          <div className="sm:w-full flex flex-row justify-center items-center">
            <div
              className={`${
                !(currentTable - 2) ? "brightness-100" : "brightness-75"
              } sm:w-full text-center h-[50px] mr-[20px] sm:mr-[40px] bg-slate-50 bg-opacity-20 border-[3px] border-cerise flex items-center justify-center cursor-pointer`}
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
              } sm:w-full text-center h-[50px] mr-[0px] sm:mr-[40px] bg-slate-50 bg-opacity-20 border-[3px] border-cerise flex items-center justify-center cursor-pointer`}
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
              } sm:w-full text-center h-[50px]  mr-[20px] sm:mr-[40px] bg-slate-50 bg-opacity-20 border-[3px] border-cerise flex items-center justify-center cursor-pointer`}
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
              } sm:w-full text-center h-[50px] bg-slate-50 bg-opacity-20 border-[3px] border-cerise flex items-center justify-center cursor-pointer`}
              onClick={() => setCurrentTable(3)}
            >
              <p className="text-white text-[11px] sm:text-base break-words w-[100px] sm:w-auto">
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
      <a href={t.faq.catalogPath} target="blank">
        <button className="mt-[100px] h-[80px] w-[250px] bg-cerise rounded-[40px] border-cerise flex items-center justify-center px-[30px] flex-col hover:scale-105 transition-transform">
          <div className="flex items-center">
            <span className="text-white text-[20px]">
              {t.faq.productCatalog}
            </span>
          </div>
        </button>
      </a>
      {/*Product Catalog button*/}
    </div>
  );
}
