import { useLocale } from "@/locales";
import React, { useState } from "react";

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

  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="h-[1500px]  py-[200px] font-['NeueHaasDisplayRoman'] flex flex-col items-center">
      {/*Header*/}
      <div className="w-full ">
        <p className=" text-center text-cerise text-[50px] font-['NeueHaasDisplayRoman'] w-full">
          {" "}
          EXHIBITOR
        </p>
        <p className=" text-center text-cerise text-[50px] font-['NeueHaasDisplayRoman'] w-full">
          {" "}
          FAQ
        </p>
      </div>
      {/*Header*/}
      
      {/*Carousel*/}
      <div className="mt-[100px]">
        <div className="h-[400px] w-[1000px]">
          <div
            id="carousel"
            className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
            style={{ backgroundImage: `url(${slides[currentSlide].url})` }}
          ></div>
        </div>
        <div className="flex justify-center mt-[50px]">
          {slides.map((slide, index) => (
            <button
              key={index}
              className={`mx-2 w-5 h-5 bg-black rounded-full cursor-pointer ${
                currentSlide === index ? "bg-blue-500" : ""
              }`}
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </div>
      </div>
      {/*Carousel*/}
    </div>
  );
}
