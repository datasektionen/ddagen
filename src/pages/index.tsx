import { useRef } from "react";
import { useLocale } from "@/locales";
import { useEffect, useState, useContext } from "react";
import { Countdown } from "@/components/Countdown";
import { useAnimation } from "@/utils/context";
import StatsSection from "@/components/StatsSection";
import ImageTextSection from "@/components/ImageTextSection";
import Link from "next/link";

export default function Home() {
  const t = useLocale();
  const scrollRef = useRef<HTMLInputElement | null>(null);

  function scrollDown() {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  const [showPage, setShowLogo] = useState(false);
  const { isAnimationDone } = useAnimation();
  const hasLoadedBefore = isAnimationDone; 
  useEffect(() => {
    setShowLogo(true);
  }, []);


  return (
    <>
      <div className="w-full h-full">
        <div className="flex flex-col mx-auto max-w-[90%] lg:max-w-[100%] ">
          <div className="relative lg:py-[150px] py-[75px]">
            <img
              className={`
                w-full absolute h-[290px] 
                transition-all ease-in-out
                ${ hasLoadedBefore ? 'duration-0': 'delay-[300ms] duration-[800ms]'}   
                ${ showPage ? "opacity-100" : "opacity-0" }
              `}
              src={t.locale == "sv" ? "/img/d-dagen-logo-jubileum-25-sv.svg" : "/img/d-dagen-logo-jubileum-25-en.svg"}
              alt="D-dagen Logo"
              ></img>
         </div>
          
          <div className={`
            mx-auto pt-[160px] mt-8 md:mt-8
            transition-all ease-in-out
            ${ hasLoadedBefore ? 'duration-0': 'delay-[300ms] duration-[800ms]'}  
            ${ showPage ? "opacity-100" : "opacity-0" }
            `}>
              <Countdown />
          </div>
          
          <div className="hover:cursor-default pt-[40px] pb-[50px]">
            <h2
              className={`
              text-white text-4xl text-center 
              transition-all ease-in-out 
              ${ hasLoadedBefore ? 'duration-0': 'delay-[300ms] duration-[800ms]'}   
              ${ showPage ? "opacity-100" : "opacity-0"} 
              ${t.locale == "sv" ? "sm:ml-9" : "sm:ml-14"}
              `}
            >
              {t.home.info.firstPart} | {t.home.info.secondPart} | {t.home.info.thirdPart}
            </h2>
          </div>
            
          {/* Scroll Indicator */}
          <div className={`
            flex flex-col items-center pb-[100px] 
            transition-all ease-in
            ${ hasLoadedBefore ? 'duration-0': 'delay-[300ms] duration-[500ms]'} 
            ${ showPage ? "opacity-100" : "opacity-0"}
            `}
            ref={scrollRef}
          >
            <div
              className='absolute hover:cursor-pointer hover:scale-110 transition-transform w-10'
              onClick={scrollDown}
            >
              <img src="/img/skrollaner-indikator.svg" alt="Scroll Indicator" />
              
            </div>
          </div>

          {/* Section of stats */}
          <div className={`
            bg-verydarkblue bg-opacity-75 w-full py-4 flex px-[5vw] relative
            transition-all ease-in-out
            ${ hasLoadedBefore ? 'duration-0': 'delay-[300ms] duration-[800ms]'}  
            ${ showPage ? "opacity-100" : "opacity-0" }
            `}>
              <StatsSection t={t} />
          </div>

          {/* Section of DDAs */}
          <ImageTextSection
            t={t}
            imageProps={{src: "/img/projectGroup/g_dda.jpg", alt: "Picture of DDA", className: ""}}
            className={`mt-[80px] lg:mt-[110px] mb-[30px] lg:mb-[40px]
            transition-all ease-in-out
            ${ hasLoadedBefore ? 'duration-0': 'delay-[300ms] duration-[800ms]'}  
            ${ showPage ? "opacity-100" : "opacity-0" }`}
            >
              <h2 className="text-white text-2xl sm:text-2xl lg:text-3xl max-w-xl">
                {t.home.introFirstBlock}
              </h2>
              <p className="text-white text-base font-light sm:text-lg pt-4 max-w-xl">{t.home.introSecondBlock}</p>
              <p className="text-white text-base font-light sm:text-lg pt-4 max-w-xl">{t.home.introThirdBlock}</p>
              <p className="text-white text-xl lg:text-2xl pt-4 max-w-xl">{t.home.introSignOff}</p>
              <p className="text-white text-base font-light sm-text-lg max-w-xl">{t.home.introDDA}</p>
          </ImageTextSection>

          {/* Section of Representatives */}
          <ImageTextSection
            t={t}
            leftSideImage={false}
            imageOverOnMobile={true}
            imageProps={{src: "/img/foretagsrepresentant-bild.png", alt: "Picture of company representative", className: "bg-slate-300"}}
            className={`mt-[40px] lg:mt-[70px] mb-[110px] lg:mb-[140px]
            transition-all ease-in-out
            ${ hasLoadedBefore ? 'duration-0': 'delay-[300ms] duration-[800ms]'}  
            ${ showPage ? "opacity-100" : "opacity-0" }`}
            >
              <h2 className="text-white text-2xl sm:text-2xl lg:text-3xl max-w-xl">
                {t.home.representative}
              </h2>
              <p className="text-white text-light sm:text-lg pt-4 max-w-xl pb-8">
                {t.home.representativeDescription}
              </p>
              <Link
                className="block hover:scale-105 transition-transform  rounded-full text-cerise bg-white font-medium px-6 py-2 max-lg:mx-auto w-max"
                href="/företagsanmälan"
              >
                {t.home.representativeButton}
              </Link>
          </ImageTextSection>
        </div>
      </div>
    </>
  );
}
