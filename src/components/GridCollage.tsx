import Link from "next/link";
import type Locale from "@/locales";
import { MutableRefObject } from "react";

export default function GridCollage({
  t,
  home,
  scrollRef,
  rightImage,
  leftImage,
}: {
  t: Locale;
  home: boolean;
  scrollRef: MutableRefObject<HTMLInputElement | null>;
  rightImage: [string, string, string];
  leftImage: [string, string, string];
}) {
  return (
    <div
      ref={scrollRef}
      className="flex flex-col items-center justify-center py-12 xs:mx-auto mb-16 max-w-5xl "
    >
      <div
        className="lg:grid lg:grid-rows-[repeat(28,minmax(auto,1fr))] lg:grid-cols-[repeat(32,minmax(auto,1fr))] font-light lg:pb-4 
                              max-lg:border-white/80 max-lg:border-[12px] bg-white/80 max-lg:border-solid rounded-xl overflow-hidden"
      > {/* Top rounding managed here */}
        
       

        {/* Top Left */}
        {home ? (
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
        ) : (
          <div className="lg:col-[3/18] lg:row-[3/15] bg-white z-40">
            <div className="sm:p-8 p-6 text-xl drop-shadow-md overflow-hidden">
              <h2 className="uppercase text-cerise font-semibold text-4xl mt-8 mb-4 px-2">
                {t.forCompanies.aboutFair}
              </h2>
              <p className="px-2 mb-6 font-light">{t.forCompanies.fairText1}</p>
              <p className="max-lg:hidden px-2 mb-8 font-light">{t.forCompanies.fairText2}</p>
              <button className="max-lg:hidden">
                <a
                  className="block hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base font-medium px-6 py-2 max-lg:mx-auto w-max"
                  href={t.faq.catalogPath}
                >
                  {t.faq.productCatalog}
                </a>
              </button>
            </div>
          </div>
        )}

        {/* Top Right */}
        <div className="lg:col-[17/30] lg:row-[2/10] max-lg:h-[650px] max-md:h-[500px] max-sm:h-[400px] overflow-clip
        ">
          <div className="mix-blend-color h-full " />
          <div className="relative">
            <img
              src={rightImage[0]}
              alt={rightImage[1]}
              className={rightImage[2]}
            />
          </div>
        </div>

        <div className="lg:hidden bg-white/80 h-[160px]" />

        {/* Bottom Left */}
        <div className="lg:col-[3/17] lg:row-[16/25] max-lg:h-[650px] max-md:h-[500px] max-sm:h-[400px] bg-white/40 overflow-hidden">
          <div className="mix-blend-color bg-[#060606] h-full" />
          <div className="relative ">
            <img
              src={leftImage[0]}
              alt={leftImage[1]}
              className={leftImage[2]}
            />
          </div>
        </div>

        {/* Bottom Right */}
        <div className="lg:col-[16/30] lg:row-[19/26] text-center lg:text-left z-40">
          <div className="bg-cerise lg:p-8 p-6 drop-shadow-md overflow-hidden">
            <h2 className="font-black text-[rgb(9,14,47)] lg:text-2xl xl:text-[1.9rem] text-2xl pb-3">
              {home ? t.home.representative : t.forCompanies.interestedTitle}
            </h2>
            <p className="pb-8 text-[#110C30] md:text-lg xl:text-2xl text-xl font-light">
              {home
                ? t.home.representativeDescription
                : t.forCompanies.interestedText}
            </p>
            <Link
              className="block hover:scale-105 transition-transform  rounded-full text-cerise font-medium px-6 py-2 max-lg:mx-auto w-max"
              href="/företagsanmälan"
            >
              {home ? t.home.representativeButton : t.forCompanies.formButton}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
