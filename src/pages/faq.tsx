import { useLocale } from "@/locales";
import React, { useState } from "react";

function Table(questions: Array<string>, answers: Array<string>, stateAction: Array<[boolean, React.Dispatch<React.SetStateAction<boolean>>]>){
  
  return(
    <div className="mt-[50px]">

    {questions.map((_, i) => (
      <div>
        <button onClick={() => 
          stateAction[i][1](!stateAction[i][0])} className="pl-[20px] pr-[20px] py-[15px] text-left text-white max-h-[300px] w-full bg-slate-50 bg-opacity-20 border-[3px] border-cerise"> {questions[i]}
        </button>
      {stateAction[i][0] ? (
      <div className="pl-[20px] pr-[20px] max-h-[300px] min-h-[100px] bg-gray bg-opacity-50 border-[1px] border-cerise flex items-center">
      <p className=" py-[20px] text-white">{answers[i]}</p>
      </div>) : null}
      </div>
    ))}   
    
    </div>

  )
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

  const tables = 
  [
    Table([t.faq.table1row1, t.faq.table1row2, t.faq.table1row3], [t.faq.table1text1, t.faq.table1text2, t.faq.table1text3], Array.from({ length: 3 }, () => useState(false))), 
    Table([t.faq.table2row1, t.faq.table2row2], [t.faq.table2text1, t.faq.table2text2], Array.from({ length: 2 }, () => useState(false))), 
    Table([t.faq.table3row1, t.faq.table3row2, t.faq.table3row3, t.faq.table3row4], [t.faq.table3text1, t.faq.table3text2, t.faq.table3text3, t.faq.table3text4], Array.from({ length: 4 }, () => useState(false))),
    Table([t.faq.table4row1], [t.faq.table4text1], [useState(false)])
  ]
  
  const [currentTable, setCurrentTable] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="py-[200px] font-['NeueHaasDisplayRoman'] flex flex-col items-center">

      {/*Header*/}
      <div className="w-full ">
        <p className=" text-center text-cerise text-[50px] sm:text-[100px] font-['NeueHaasDisplayRoman'] w-full">
          {" "}
          {t.faq.header}
        </p>
        <p className=" text-center text-cerise text-[50px] sm:text-[100px] font-['NeueHaasDisplayRoman'] w-full">
          {" "}
          FAQ
        </p>
      </div>
      {/*Header*/}
      
      {/*Carousel*/}
      <div className="mt-[150px]">
        <div id="carousel"
            className="px-[20px] sm:px-[80px] "
            > <img src={slides[currentSlide].url} className="min-w-[200px]"></img>
        </div>
        <div className="flex justify-center mt-[50px]">
          {slides.map((slide, index) => (
            <button
              key={index}
              className={`mx-2 w-5 h-5 bg-gray rounded-full cursor-pointer ${
                currentSlide === index ? "bg-slate-300" : ""
              }`}
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </div>
      </div>
      {/*Carousel*/}

      {/*Dropdown table*/}
      <div className="h-full min-w-[200px] max-w-[1200px] w-full mt-[100px] px-[30px]">
        {/*Dropdown buttons*/}
        <div className="h-[50px] bg-inherit flex flex-col sm:flex-row  justify-center items-center mb-[80px] px-[30px] sm:px-[0px] ">
          
          <div className="sm:w-full flex flex-row justify-center items-center">
              <div className={`${!(currentTable-0) ? 'brightness-100': 'brightness-75'} sm:w-full text-center h-[50px] mr-[20px] sm:mr-[40px] bg-slate-50 bg-opacity-20 border-[3px] border-cerise flex items-center justify-center cursor-pointer`} onClick={() => setCurrentTable(0)}>
                <p className="text-white text-[11px] sm:text-base break-words w-[100px] sm:w-auto"> {t.faq.box1}</p>
              </div>
              <div className={`${!(currentTable-2) ? 'brightness-100': 'brightness-75'} sm:w-full text-center h-[50px] mr-[0px] sm:mr-[40px] bg-slate-50 bg-opacity-20 border-[3px] border-cerise flex items-center justify-center cursor-pointer`} onClick={() => setCurrentTable(2)}>
                <p className="text-white text-[11px] sm:text-base break-words w-[100px] sm:w-auto"> {t.faq.box3}</p>
              </div>
          </div>

          <div className="sm:w-full flex flex-row justify-center items-center mt-[20px] sm:mt-[0px]">
              <div className={`${!(currentTable-1) ? 'brightness-100': 'brightness-75'} sm:w-full text-center h-[50px]  mr-[20px] sm:mr-[40px] bg-slate-50 bg-opacity-20 border-[3px] border-cerise flex items-center justify-center cursor-pointer`} onClick={() => setCurrentTable(1)}>
                <p className="text-white text-[11px] sm:text-base break-words w-[100px] sm:w-auto"> {t.faq.box2}</p>
              </div>
              <div className={`${!(currentTable-3) ? 'brightness-100': 'brightness-75'} sm:w-full text-center h-[50px] bg-slate-50 bg-opacity-20 border-[3px] border-cerise flex items-center justify-center cursor-pointer`} onClick={() => setCurrentTable(3)}>
                <p className="text-white text-[11px] sm:text-base break-words w-[100px] sm:w-auto"> {t.faq.box4}</p>
              </div>
          </div>
          {/*Dropdown buttons*/}
        </div>
        {tables[currentTable]}
      </div>
      {/*Dropdown table*/}
      
      {/*Product Catalog button*/}
      <button className="mt-[100px] h-[100px] w-[250px] bg-cerise rounded-[40px] border-cerise flex items-center justify-center px-[30px] flex-col">
        <a href="/downloadables/Product_Catalog.pdf" download="Product_Catalog" className="text-white text-[22px] text-center">{t.faq.download}</a>
        <div className="flex items-center">
          <span className="text-white text-[20px]">{t.faq.productCatalog}</span>
        </div>
      </button>
      {/*Product Catalog button*/}

    </div>
  );
}
