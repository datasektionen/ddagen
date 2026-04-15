import { useRef } from "react";
import { useLocale } from "@/locales";
import { useEffect, useState, useContext } from "react";
import { Countdown } from "@/components/Countdown";
import { useAnimation } from "@/utils/context";
import { NextSeo } from 'next-seo';
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

  const [showGif, setShowGif] = useState(false);
  const [showStaticFirst, setShowStaticFirst] = useState(true);

  useEffect(() => {
    // Show static image first
    setShowStaticFirst(true);
    
    // After delay, switch to GIF
    const timer = setTimeout(() => {
      setShowGif(true);
      setShowStaticFirst(false);
    }, 2000); // 2 second delay before GIF starts

    return () => clearTimeout(timer);
  }, []);
  
  const seoContent = {
    sv: {
      title: "Skandinaviens Ledande Teknikmässa",
      description: "Utforska de bästa IT-företagen på D-Dagen vid KTH. Hitta jobbmöjligheter, nätverka och utforska teknikens framtid.",
      url: "https://ddagen.se",
    },
    en: {
      title: "Scandinavia's Leading Tech Job Fair",
      description: "Discover top IT companies at D-Dagen at KTH. Find job opportunities, network, and explore the future of tech careers.",
      url: "https://ddagen.se/en",
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
      <div className="w-full h-full">
        <div className="flex flex-col mx-auto max-w-[90%] lg:max-w-[100%] ">
          <div className="hover:cursor-default pt-[40px] pb-[10px] mx-auto">
            <h5 className="text-xl text-cerise font-medium text-center mt-[150px]">{t.home.introBrand}</h5>
            <h2
              className={`
              text-white text-6xl text-center
              max-w-[870px]
              mt-[12px]
              transition-all ease-in-out 
              ${ hasLoadedBefore ? 'duration-0': 'delay-[300ms] duration-[800ms]'}   
              ${ showPage ? "opacity-100" : "opacity-0"} 
              ${t.locale == "sv" ? "sm:ml-9" : "sm:ml-14"}
              `}
            >
              {t.home.introTitle}
              {/*
              <br />
              {t.home.info.firstPart} | {t.home.info.secondPart} | {t.home.info.thirdPart}
              */}
              
            </h2>
          </div>

          {/* Countdown wrapper */}
          <div className={`
            mx-auto pt-[0px] mt-2 md:mt-8
            transition-all ease-in-out
            ${ hasLoadedBefore ? 'duration-0': 'delay-[300ms] duration-[800ms]'}  
            ${ showPage ? "opacity-100" : "opacity-0" }
            `}>
              <Countdown />
          </div>

          {/* Button wrapper (separat div) */}
          <div className="flex justify-center mt-8">
            <Link
              className="bg-cerise py-2.5 px-6 rounded-full text-white text-center hover:scale-105 transition-transform"
              href="/företagsanmälan"
            >
              {t.home.exhibitButton}
            </Link>
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
            imageProps={{src: "/img/ddagen-massa-foretag.png", alt: "Picture of ddagen exhibition day"}}
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
