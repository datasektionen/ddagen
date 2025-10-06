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
      description: "Utforska de bästa IT-företagen på D-Dagen 2025 vid KTH. Hitta jobbmöjligheter, nätverka och utforska teknikens framtid.",
      url: "https://ddagen.se",
    },
    en: {
      title: "Scandinavia's Leading Tech Job Fair",
      description: "Discover top IT companies at D-Dagen 2025 at KTH. Find job opportunities, network, and explore the future of tech careers.",
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
          <div className="items-center relative">
            <img
              className={`
                mx-auto pt-[80px] sm:pt-[120px] lg:pt-[160px] mt-3 md:mt-3
                w-[90%] sm:w-[80%] md:w-[70%] lg:w-auto
                h-[200px] sm:h-[300px] md:h-[400px] lg:h-[450px]
                max-w-full
                object-contain
                transition-all ease-in-out
                ${ hasLoadedBefore ? 'duration-0': 'delay-[100ms] duration-[800ms]'}   
                ${ showPage ? "opacity-100" : "opacity-0" }
              `}
              src={showGif ? "/img/d-dagen-logo-2526.gif" : "/img/d-dagen-logo-static.png"} // Use static version first
              alt="D-dagen Logo"
              ></img>
          </div>
          
          <div className={`
            mx-auto pt-[40px] mt-2 md:mt-8
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
