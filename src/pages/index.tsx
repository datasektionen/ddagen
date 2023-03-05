import Link from "next/link";
import { useRef } from "react";
import { useLocale } from "@/locales";

export default function Home() {
  const t = useLocale();
  const scrollRef = useRef<HTMLInputElement | null>(null);

  function scrollDown() {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <div className="w-full h-full font-['NeueHaasDisplayRoman']">
        <div className="flex flex-col mx-auto max-w-[75%]">
          <div className="relative lg:py-[150px] py-[75px]">
            <img
              className="absolute w-full h-[290px]"
              src={
                t.locale == "sv"
                  ? "/img/d-dagen-logo-sv.svg"
                  : "/img/d-dagen-logo-en.svg"
              }
              alt="D-dagen Logo"
            />

            {/* <h1 className="absolute text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.25)] text-5xl">
              11 OKTOBER 2023
            </h1> */}
          </div>

          <div className="pt-[200px] pb-[50px] hover:cursor-default">
            <h2
              className={
                `
            text-white font-['NeueHaasDisplay'] text-4xl text-center
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
            className="flex flex-col items-center py-12 mb-16"
          >
            <div className="md:grid md:grid-rows-[repeat(26,minmax(auto,1fr))] md:grid-cols-[repeat(32,minmax(auto,1fr))] max-md:p-2 bg-white/80 w-full max-w-5xl">
              {/* Top Left */}
              <div className="md:col-[3/20] md:row-[3/15] z-40">
                <div className="bg-white sm:p-8 p-6 md:w-[90%] md:text-lg xl:text-2xl text-xl drop-shadow-md overflow-hidden">
                  <p className="first-letter:text-6xl xl:first-letter:text-7xl first-letter:text-cerise first-letter:font-['NeueHaasDisplayBlack'] first-letter:float-left first-letter:mr-1">
                    {t.home.introFirstBlock}
                  </p>
                  <p>{t.home.introSecondBlock}</p>
                  <br />
                  <p>{t.home.introSignOff}</p>
                  <p className="text-sm">{t.home.introDDA}</p>
                </div>
              </div>

              {/* Top Right */}
              <div className="md:col-[17/33] md:row-[1/10]">
                <div className="bg-black/50 max-h-full">
                  <img src="\img\dda-bild.png" alt="Picture of DDA" />
                </div>
              </div>

              {/* Bottom Left */}
              <div className="md:col-[3/17] md:row-[16/25] max-md:mt-40">
                <div className="bg-black/50 max-h-full">
                  <img
                    src="\img\foretagsrepresentant-bild.png"
                    alt="Picture of people talking"
                  />
                </div>
              </div>

              {/* Bottom Right */}
              <div className="md:col-[16/30] md:row-[18/26] md:text-justify text-center z-40">
                <div className="bg-cerise lg:p-8 p-6 drop-shadow-md overflow-hidden">
                  <h2 className="font-bold text-[#090E2F] md:text-2xl xl:text-[2rem] text-2xl pb-3 font-['NeueHaasDisplayBlack']">
                    {t.home.representative}
                  </h2>
                  <p className="pb-8 text-[#110C30] md:text-xl xl:text-2xl text-xl">
                    {t.home.representativeDescription}
                  </p>
                  <Link
                    className="bg-white p-2.5 rounded-full text-cerise font-['NeueHaasDisplayMedium']"
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
