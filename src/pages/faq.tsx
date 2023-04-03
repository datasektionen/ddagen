import { useLocale } from "@/locales";
import React, { useState } from "react";

function Table1(stateAction: Array<[boolean, React.Dispatch<React.SetStateAction<boolean>>]>){

  const t = useLocale()

  return(
  <div className="mt-[50px]">

    <button onClick={() => stateAction[0][1](!stateAction[0][0])} className="pl-[20px] text-left text-white h-[55px] w-full bg-slate-50 bg-opacity-20 border-[3px] border-cerise"> {t.faq.table1row1}</button>
    {stateAction[0][0] ? (
    <div className="pl-[20px] h-[200px] sm:h-[100px] bg-gray bg-opacity-50 border-[1px] border-cerise flex items-center">
    <p className="text-white">{t.faq.table1text1}</p>
    </div>) : null}

    <button onClick={() => stateAction[1][1](!stateAction[1][0])} className="pl-[20px] text-left text-white h-[55px] w-full bg-slate-50 bg-opacity-20 border-[3px] border-cerise">{t.faq.table1row2}</button>
    {stateAction[1][0] ? (
    <div className="pl-[20px] h-[100px] bg-gray bg-opacity-50 border-[1px] border-cerise flex items-center">
    <p className="text-white">{t.faq.table1text2}</p>
    </div>) : null}

    <button onClick={() => stateAction[2][1](!stateAction[2][0])} className="pl-[20px] text-left text-white h-[55px] w-full bg-slate-50 bg-opacity-20 border-[3px] border-cerise">{t.faq.table1row3}</button>
    {stateAction[2][0] ? (
    <div className="pl-[20px] h-[130px] sm:h-[100px] bg-gray bg-opacity-50 border-[1px] border-cerise flex items-center">
    <p className="text-white">{t.faq.table1text3}</p>
    </div>) : null}

</div>)
}

function Table2(stateAction: Array<[boolean, React.Dispatch<React.SetStateAction<boolean>>]>){

  const t = useLocale()

  return(
  <div className="mt-[50px]">

    <button onClick={() => stateAction[0][1](!stateAction[0][0])} id="accordion" className="pl-[20px] text-left text-white h-[85px] sm:h-[55px] w-full bg-slate-50 bg-opacity-20 border-[3px] border-cerise"> {t.faq.table2row1}</button>
    {stateAction[0][0] ? (
    <div className="pl-[20px] h-[150px] sm:h-[100px] bg-gray bg-opacity-50 border-[1px] border-cerise flex items-center ">
    <p className="text-white">{t.faq.table2text1_1} <a className="text-cerise" href="mailto:sales@ddagen.se">sales@ddagen.se</a> {t.faq.table2text1_2}</p>
    </div>) : null}

    <button onClick={() => stateAction[1][1](!stateAction[1][0])} id="accordion" className="pl-[20px] text-left text-white h-[120px] sm:h-[55px] w-full bg-slate-50 bg-opacity-20 border-[3px] border-cerise">{t.faq.table2row2}</button>
    {stateAction[1][0] ? (
    <div className="pl-[20px] h-[200px] sm:h-[100px] bg-gray bg-opacity-50 border-[1px] border-cerise flex items-center">
    <p className="text-white">{t.faq.table2text2}</p>
    </div>) : null}

</div>)
}

function Table3(stateAction: Array<[boolean, React.Dispatch<React.SetStateAction<boolean>>]>){

  const t = useLocale()

  return(
  <div className="mt-[50px]">

    <button onClick={() => stateAction[0][1](!stateAction[0][0])} id="accordion" className="pl-[20px] text-left text-white h-[55px] w-full bg-slate-50 bg-opacity-20 border-[3px] border-cerise"> {t.faq.table3row1}</button>
    {stateAction[0][0] ? (
    <div className="pl-[20px] h-[140px] sm:h-[100px] bg-gray bg-opacity-50 border-[1px] border-cerise flex items-center ">
    <p className="text-white">{t.faq.table3text1_1} <a href={t.url.forCompany} target="blank" className="underline text-cerise">  {t.url.forCompany} </a>{t.faq.table3text1_2} <a className="text-cerise" href="mailto:sales@ddagen.se">sales@ddagen.se</a></p>
    </div>) : null}

    <button onClick={() => stateAction[1][1](!stateAction[1][0])} id="accordion" className="pl-[20px] text-left text-white h-[85px] sm:h-[55px] w-full bg-slate-50 bg-opacity-20 border-[3px] border-cerise">{t.faq.table3row2}</button>
    {stateAction[1][0] ? (
    <div className="pl-[20px] h-[260px] sm:h-[150px] bg-gray bg-opacity-50 border-[1px] border-cerise flex items-center">
    <p className="text-white">{t.faq.table3text2_1} <a href={t.url.companyForm} target="blank" className="underline text-cerise"> {t.url.companyForm}</a></p>
    </div>) : null}

    <button onClick={() => stateAction[2][1](!stateAction[2][0])} id="accordion" className="pl-[20px] text-left text-white h-[55px] w-full bg-slate-50 bg-opacity-20 border-[3px] border-cerise">{t.faq.table3row3}</button>
    {stateAction[2][0] ? (
    <div className="pl-[20px] h-[100px] bg-gray bg-opacity-50 border-[1px] border-cerise flex items-center">
    <p className="text-white">{t.faq.table3text3} <a className="text-cerise" href="mailto:ansvarig@ddagen.se">ansvarig@ddagen.se</a></p>
    </div>) : null}

    <button onClick={() => stateAction[3][1](!stateAction[3][0])} id="accordion" className="pl-[20px] text-left text-white h-[85px] sm:h-[55px] w-full bg-slate-50 bg-opacity-20 border-[3px] border-cerise">{t.faq.table3row4}</button>
    {stateAction[3][0] ? (
    <div className="pl-[20px] h-[110px] sm:h-[100px] bg-gray bg-opacity-50 border-[1px] border-cerise flex items-center ">
    <p className="text-white">{t.faq.table3text4} <a className="text-cerise" href="mailto:sales@ddagen.se">sales@ddagen.se</a></p>
    </div>) : null}
</div>)
}

function Table4(stateAction: Array<[boolean, React.Dispatch<React.SetStateAction<boolean>>]>){
  const t = useLocale()
  return(
  <div className="mt-[50px]">

    <button onClick={() => stateAction[0][1](!stateAction[0][0])} id="accordion" className="pl-[20px] text-left text-white h-[130px] sm:h-[55px] w-full bg-slate-50 bg-opacity-20 border-[3px] border-cerise"> {t.faq.table4row1}</button>
    {stateAction[0][0] ? (
    <div className="pl-[20px] h-[350px] sm:h-[100px] bg-gray bg-opacity-50 border-[1px] border-cerise flex items-center ">
    <p className="text-white">{t.faq.table4text1} <a className="text-cerise" href="mailto:alexandre.moch@ddagen.se">alexandre.moch@ddagen.se</a></p>
    </div>) : null}
    
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

  const tables = [Table1([useState(false), useState(false), useState(false)]), Table2([useState(false), useState(false)]), Table3([useState(false), useState(false), 
  useState(false), useState(false)]), Table4([useState(false)])]
  
  const [currentTable, setCurrentTable] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const Tst = tables[0]

  return (
    <div className="py-[200px] font-['NeueHaasDisplayRoman'] flex flex-col items-center">

      {/*Header*/}
      <div className="w-full ">
        <p className=" text-center text-cerise text-[50px] sm:text-[100px] font-['NeueHaasDisplayRoman'] w-full">
          {" "}
          EXHIBITOR
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
          <span className="text-white text-[22px]">{t.faq.productCatalog}</span>
        </div>
      </button>
      {/*Product Catalog button*/}

    </div>
  );
}
