import Link from "next/link";
import { useRef } from "react";
import { useLocale } from "@/locales";
import { useEffect, useState } from "react";

export default function Home() {
  const t = useLocale();
  const scrollRef = useRef<HTMLInputElement | null>(null);

  function scrollDown() {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    setShowLogo(true);
  }, []);

  return (
    <>
      <div className="w-full h-full">
        <div className="flex flex-col mx-auto max-w-[75%]">
          <div className="relative lg:py-[150px] py-[75px]">
            <img
              className={`absolute w-full h-[290px] transition-all duration-[1500ms] ease-in-out ${
                showLogo ? "opacity-100" : "opacity-0"
              }`}
              src={
                t.locale == "sv"
                  ? "/img/d-dagen-logo-sv.svg"
                  : "/img/d-dagen-logo-en.svg"
              }
              alt="D-dagen Logo"
            />
          </div>
          <div className="pt-[200px] pb-[50px] hover:cursor-default">
            <h2
              className={
                `
            text-white text-4xl text-center transition-all duration-[4000ms] ease-in-out ${
              showLogo ? "opacity-100" : "opacity-0"
            }
                ` + (t.locale == "sv" ? "sm:ml-9" : "sm:ml-14") 
              }
            >
              {t.home.stats.firstPart} | {t.home.stats.secondPart}
            </h2>
          </div>

          {/* Scroll Indicator */}
          <div className="flex flex-col items-center pb-[100px]">
            <div
              className="absolute hover:cursor-pointer hover:scale-110 transition-transform w-10"
              onClick={scrollDown}
            >
              <img src="/img/skrollaner-indikator.svg" alt="Scroll Indicator" />
            </div>
          </div>

          {/* Grid Collage */}
            <div
              ref={scrollRef}
              className="flex flex-col items-center py-12 mx-auto mb-16 max-w-5xl"
            >
              <div className="lg:grid lg:grid-rows-[repeat(28,minmax(auto,1fr))] lg:grid-cols-[repeat(32,minmax(auto,1fr))] font-light lg:pb-12 
                              max-lg:border-white/80 max-lg:border-[12px] max-lg:border-solid">
               
                {/* Left */}
                <div className="lg:col-[1/17] lg:row-[1/3] bg-white/80"/>
                <div className="lg:col-[1/3] lg:row-[3/15] bg-white/80"/>
                <div className="lg:col-[1/18] lg:row-[15/16] bg-white/80"/>
                <div className="lg:col-[1/3] lg:row-[16/28] bg-white/80"/>
                <div className="lg:col-[3/16] lg:row-[25/28] bg-white/80"/>

                {/* Right */}
                <div className="lg:col-[18/33] lg:row-[10/19] bg-white/80"/>
                <div className="lg:col-[17/18] lg:row-[16/19] bg-white/80"/>
                <div className="lg:col-[30/33] lg:row-[19/28] bg-white/80"/>
                <div className="lg:col-[16/30] lg:row-[25/28] bg-white/80"/>

                {/* Top Left */}
                <div className="lg:col-[3/18] lg:row-[3/15] bg-white z-40">
                  <div className="sm:p-8 p-6 lg:text-lg xl:text-2xl text-xl drop-shadow-md overflow-hidden">
                    <p className="first-letter:text-8xl xl:first-letter:text-8xl first-letter:text-cerise first-letter:font-black first-letter:float-left first-letter:mr-1">
                      {t.home.introFirstBlock}
                    </p>
                    <p>{t.home.introSecondBlock}</p>
                    <br />
                    <p>{t.home.introSignOff}</p>
                    <p className="text-sm">{t.home.introDDA}</p>
                  </div>
                </div>

                {/* Top Right */}
                <div className="lg:col-[17/33] lg:row-[1/10] max-lg:h-[650px] max-md:h-[500px] max-sm:h-[400px] bg-white/40">
                  <div className="mix-blend-color bg-[#060606] h-full" />
                  <div className="relative">
                    <img 
                      src="\img\dda-bild.png" 
                      alt="Picture of DDA"
                      className="absolute bottom-0 w-full"
                    />
                  </div>
                </div>

                <div className="lg:hidden bg-white/80 h-[160px]" />

                {/* Bottom Left */}
                <div className="lg:col-[3/17] lg:row-[16/25] max-lg:h-[650px] max-md:h-[500px] max-sm:h-[400px] bg-white/40">
                  <div className="mix-blend-color bg-[#060606] h-full" />
                  <div className="relative">
                    <img 
                      src="\img\foretagsrepresentant-bild.png"
                      alt="Picture of DDA"
                      className="absolute bottom-0 w-full object-cover"
                    />
                  </div>
                </div>

                {/* Bottom Right */}
                <div className="lg:col-[16/30] lg:row-[19/26] text-center lg:text-left z-40">
                  <div className="bg-cerise lg:p-8 p-6 drop-shadow-md overflow-hidden">
                    <h2 className="font-black text-[#090E2F] lg:text-2xl xl:text-[1.9rem] text-2xl pb-3">
                      {t.home.representative}
                    </h2>
                    <p className="pb-8 text-[#110C30] md:text-lg xl:text-2xl text-xl font-light">
                      {t.home.representativeDescription}
                    </p>
                    <Link
                      className="block hover:scale-105 transition-transform bg-white rounded-full text-cerise font-medium px-6 py-2 max-lg:mx-auto w-max"
                      href="/företagsanmälan"
                    >
                      {t.home.representativeButton}
                    </Link>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
