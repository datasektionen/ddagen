import { useLocale } from "@/locales";
import React, { useState } from "react";

function Table1(){
  const t = useLocale()
  return(
  <div className="mt-[50px]">

    <button id="accordion" className="pl-[20px] text-left text-white h-[55px] w-full bg-slate-50 bg-opacity-20 border-[3px] border-cerise"> {t.faq.table1row1}</button>
    <div className="pl-[20px] h-[70px] bg-gray bg-opacity-50 border-[1px] border-cerise flex items-center ">
    <p className="text-white">{t.faq.table1text1}</p>
    </div>

    <button id="accordion" className="pl-[20px] text-left text-white h-[55px] w-full bg-slate-50 bg-opacity-20 border-[3px] border-cerise">{t.faq.table1row1}</button>
    <div className="pl-[20px] h-[70px] bg-gray bg-opacity-50 border-[1px] border-cerise flex items-center">
    <p className="text-white">{t.faq.table1text2}</p>
    </div>

    <button id="accordion" className="pl-[20px] text-left text-white h-[55px] w-full bg-slate-50 bg-opacity-20 border-[3px] border-cerise">{t.faq.table1row1}</button>
    <div className="pl-[20px] h-[70px] bg-gray bg-opacity-50 border-[1px] border-cerise flex items-center">
    <p className="text-white">{t.faq.table1text3}</p>
    </div>

</div>)
}

function Table2(){
  const t = useLocale()
  return(
  <div className="mt-[50px]">

    <button id="accordion" className="pl-[20px] text-left text-white h-[55px] w-full bg-slate-50 bg-opacity-20 border-[3px] border-cerise"> {t.faq.table2row1}</button>
    <div className="pl-[20px] h-[70px] bg-gray bg-opacity-50 border-[1px] border-cerise flex items-center ">
    <p className="text-white">{t.faq.table2text1}</p>
    </div>

    <button id="accordion" className="pl-[20px] text-left text-white h-[55px] w-full bg-slate-50 bg-opacity-20 border-[3px] border-cerise">{t.faq.table2row2}</button>
    <div className="pl-[20px] h-[70px] bg-gray bg-opacity-50 border-[1px] border-cerise flex items-center">
    <p className="text-white">{t.faq.table2text2}</p>
    </div>

</div>)
}

function Table3(){
  const t = useLocale()
  return(
  <div className="mt-[50px]">

    <button id="accordion" className="pl-[20px] text-left text-white h-[55px] w-full bg-slate-50 bg-opacity-20 border-[3px] border-cerise"> {t.faq.table3row1}</button>
    <div className="pl-[20px] h-[70px] bg-gray bg-opacity-50 border-[1px] border-cerise flex items-center ">
    <p className="text-white">{t.faq.table3text1}</p>
    </div>

    <button id="accordion" className="pl-[20px] text-left text-white h-[55px] w-full bg-slate-50 bg-opacity-20 border-[3px] border-cerise">{t.faq.table3row2}</button>
    <div className="pl-[20px] h-[70px] bg-gray bg-opacity-50 border-[1px] border-cerise flex items-center">
    <p className="text-white">{t.faq.table3text2}</p>
    </div>

    <button id="accordion" className="pl-[20px] text-left text-white h-[55px] w-full bg-slate-50 bg-opacity-20 border-[3px] border-cerise">{t.faq.table3row3}</button>
    <div className="pl-[20px] h-[70px] bg-gray bg-opacity-50 border-[1px] border-cerise flex items-center">
    <p className="text-white">{t.faq.table3text3}</p>
    </div>

    <button id="accordion" className="pl-[20px] text-left text-white h-[55px] w-full bg-slate-50 bg-opacity-20 border-[3px] border-cerise">{t.faq.table3row4}</button>
    <div className="pl-[20px] h-[70px] bg-gray bg-opacity-50 border-[1px] border-cerise flex items-center">
    <p className="text-white">{t.faq.table3text4}</p>
    </div>

</div>)
}

function Table4(){
  const t = useLocale()
  return(
  <div className="mt-[50px]">

    <button id="accordion" className="pl-[20px] text-left text-white h-[55px] w-full bg-slate-50 bg-opacity-20 border-[3px] border-cerise"> {t.faq.table4row1}</button>
    <div className="pl-[20px] h-[70px] bg-gray bg-opacity-50 border-[1px] border-cerise flex items-center ">
    <p className="text-white">{t.faq.table4text1}</p>
    </div>

</div>)
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

  const tables = [Table1, Table2, Table3, Table4]
  const [currentTable, setCurrentTable] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const Tst = tables[0]

  return (
    <div className="py-[200px] font-['NeueHaasDisplayRoman'] flex flex-col items-center">

      {/*Header*/}
      <div className="w-full ">
        <p className=" text-center text-cerise text-[100px] font-['NeueHaasDisplayRoman'] w-full">
          {" "}
          EXHIBITOR
        </p>
        <p className=" text-center text-cerise text-[100px] font-['NeueHaasDisplayRoman'] w-full">
          {" "}
          FAQ
        </p>
      </div>
      {/*Header*/}
      
      {/*Carousel*/}
      <div className="mt-[150px]">
        <div className="h-[400px] w-[1000px]">
          <div
            id="carousel"
            className="w-full h-full  bg-center bg-cover duration-500"
            style={{ backgroundImage: `url(${slides[currentSlide].url})` }}
          ></div>
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

      {/*Dropdown buttons*/}
      <div className="h-full w-[1000px] mt-[100px]">
        <div className="h-[50px] bg-inherit flex flex-row justify-center items-center">
              <div className="h-full w-[220px] mr-[40px] bg-slate-50 bg-opacity-20 border-[3px] border-cerise flex items-center justify-center cursor-pointer" onClick={() => setCurrentTable(0)}>
              
                <p className="text-white"> {t.faq.box1}</p>
              </div>
              <div className="h-full w-[220px] mr-[40px] bg-slate-50 bg-opacity-20 border-[3px] border-cerise flex items-center justify-center cursor-pointer" onClick={() => setCurrentTable(1)}>
                <p className="text-white"> {t.faq.box2}</p>
              </div>
              <div className="h-full w-[220px] mr-[40px] bg-slate-50 bg-opacity-20 border-[3px] border-cerise flex items-center justify-center cursor-pointer" onClick={() => setCurrentTable(2)}>
                <p className="text-white"> {t.faq.box3}</p>
              </div>
              <div className="h-full w-[220px]  bg-slate-50 bg-opacity-20 border-[3px] border-cerise flex items-center justify-center cursor-pointer" onClick={() => setCurrentTable(3)}>
                <p className="text-white"> {t.faq.box4}</p>
              </div>
        </div>
        {tables[currentTable]()}
      </div>
      {/*Dropdown table*/}

    </div>
  );
}
