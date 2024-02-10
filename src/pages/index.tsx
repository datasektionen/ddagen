import { useRef } from "react";
import { useLocale } from "@/locales";
import { useEffect, useState } from "react";
import GridCollage from "@/components/GridCollage";
import { Countdown } from "@/components/Countdown";

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
        <div className="flex flex-col mx-auto max-w-[100%]">
          <div className="relative lg:py-[150px] py-[75px]">
            <img
              className={`absolute w-full h-[290px] transition-all duration-[1500ms] ease-in-out ${
                showLogo ? "opacity-100" : "opacity-0"
              }`}
              src={
                t.locale == "sv"
                ? "/img/d-dagen-logo-24-sv.svg"
                : "/img/d-dagen-logo-24-en.svg"
              }
              alt="D-dagen Logo"
              />
         </div>
          
          <div className="mx-auto pt-[160px]">
            <Countdown />
          </div>
          
          <div className="pt-[80px] pb-[50px] hover:cursor-default">
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
              <div className="slowme w-20 h-20"></div>
            </div>
          </div>

          {/* Grid Collage */}
          <GridCollage
            t={t}
            home={true}
            scrollRef={scrollRef}
            rightImage={["\\img\\dda-bild.jpg", "Picture of DDA", "absolute bottom-0 w-full grayscale overflow-hidden"]}
            leftImage={["\\img\\foretagsrepresentant-bild.png", "Picture of company representative", "absolute bottom-0 w-full grayscale"]}
          />
        </div>
      </div>
    </>
  );
}
