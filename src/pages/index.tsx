import { useRef } from "react";
import { useLocale } from "@/locales";
import { useEffect, useState, useContext } from "react";
import GridCollage from "@/components/GridCollage";
import { Countdown } from "@/components/Countdown";
import { useAnimation } from "@/utils/context";

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
        <div className="flex flex-col mx-auto max-w-[90%] ">
          <div className="relative lg:py-[150px] py-[75px]">
            <img
              className={`
                w-full absolute h-[290px] 
                transition-all ease-in-out
                ${ hasLoadedBefore ? 'duration-0': 'delay-[2000ms] duration-[1500ms]'}   
                ${ showPage ? "opacity-100" : "opacity-0" }
              `}
              src={t.locale == "sv" ? "/img/d-dagen-logo-24-sv.svg" : "/img/d-dagen-logo-24-en.svg"}
              alt="D-dagen Logo"
              ></img>
         </div>
          
          <div className={`
            mx-auto pt-[160px] md:mt-8
            transition-all ease-in-out
            ${ hasLoadedBefore ? 'duration-0': 'delay-[2500ms] duration-[1500ms]'}  
            ${ showPage ? "opacity-100" : "opacity-0" }
            `}>
              <Countdown />
          </div>
          
          <div className="hover:cursor-default pt-[80px] pb-[50px]">
            <h2
              className={`
              text-white text-4xl text-center 
              transition-all ease-in-out 
              ${ hasLoadedBefore ? 'duration-0': 'delay-[3000ms] duration-[2000ms]'}   
              ${ showPage ? "opacity-100" : "opacity-0"} 
              ${t.locale == "sv" ? "sm:ml-9" : "sm:ml-14"}
              `}
            >
              {t.home.stats.firstPart} | {t.home.stats.secondPart}
            </h2>
          </div>
            
          {/* Scroll Indicator */}
          <div className={`
            flex flex-col items-center pb-[100px] 
            transition-all ease-in
            ${ hasLoadedBefore ? 'duration-0': 'delay-[3500ms] duration-[500ms]'} 
            ${ showPage ? "opacity-100" : "opacity-0"}
            `}
          >
            <div
              className='absolute hover:cursor-pointer hover:scale-110 transition-transform w-10'
              onClick={scrollDown}
            >
              <img src="/img/skrollaner-indikator.svg" alt="Scroll Indicator" />
              
            </div>
          </div>

          {/* Grid Collage */}
          <div  className={` 
            transition-all ease-in-out
            ${ hasLoadedBefore ? 'duration-0': 'delay-[4000ms] duration-[1500ms] '}  
            ${showPage ? "opacity-100" : "opacity-0" }`
            }
          >
            <GridCollage
              t={t}
              home={true}
              scrollRef={scrollRef}
              rightImage={["\\img\\dda-bild.jpg", "Picture of DDA", "w-full absolute bottom-0 grayscale overflow-hidden"]}
              leftImage={["\\img\\foretagsrepresentant-bild.png", "Picture of company representative", "w-full absolute bottom-0 grayscale "]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
