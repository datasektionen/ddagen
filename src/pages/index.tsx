import { useRef } from "react";
import { useLocale } from "@/locales";
import { useEffect, useState } from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import { Countdown } from "@/components/Countdown";

export default function Home() {
  const t = useLocale();

  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    setShowLogo(true);
  }, []);

  return (
    <>

      <div className="w-full h-full ">
        <div className="flex flex-col mx-auto max-w-[75%]">
          <div className="relative lg:py-[100px] py-[75px]">
            <img
              className={`absolute w-full h-[290px] transition-all duration-[1500ms] ease-in-out ${
                showLogo ? "opacity-100" : "opacity-0"
              }`}
              src="/img/d-dagen-logo.svg"
              alt="D-dagen Logo"
            />
          </div>

          <h1 className="text-white text-base lg:text-6xl pl-[30px] lg:pl-[100px] pt-[90px] lg:pt-[120px]">{t.landingpage.date}</h1>

          <div className="mx-auto pt-[60px] lg:pt-[30px]">
            <Countdown />
          </div>

          <div>
            <h2 className="text-white text-base lg:text-xl text-center transition-all duration-[4000ms]">
              {t.landingpage.underConstruction}
            </h2>
          </div>


          <div className="pt-[10px] flex justify-center">
            <Link className="w-10/12 lg:w-1/3 max-auto bg-cerise py-2.5 rounded-full text-center hover:scale-105 transition-transform"
                  href="/2023/">
              <h2 className="text-white text-2xl lg:text-4xl text-center transition-all duration-[4000ms]">
                {t.landingpage.y2023}
              </h2>
            </Link>
          </div>


          {/* Scroll Indicator */}
          <div className="flex flex-col items-center pb-[200px]">
          </div>


        </div>
      </div>
    </>
  );
}
