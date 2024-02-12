import Link from "next/link";
import { useRef } from "react";
import { useLocale } from "@/locales";
import login from "@/utils/login"


export default function ForStudents() {
  const t = useLocale();
  const scrollRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="w-full h-full">
      <div className="flex flex-col mx-auto items-center max-w-[80%]">
        <h1 className="uppercase text-center text-cerise pt-[200px] mb-36 text-5xl font-medium">
          {t.forStudents.title}
        </h1>
        <div
          ref={scrollRef}
          className="flex flex-col items-center justify-center py-12 mx-auto mb-16 max-w-5xl"
        >
          <div
            className="lg:grid lg:grid-rows-[repeat(19,minmax(auto,1fr))] lg:grid-cols-[repeat(32,minmax(auto,1fr))] font-light lg:pb-12 
                      max-lg:border-white/80 max-lg:border-[12px] max-lg:border-solid lg:bg-white/80"
          >
            <div className="lg:col-[3/20] lg:row-[3/12] bg-white z-40">
              <div className="sm:p-8 p-6 text-xl drop-shadow-md overflow-hidden">
                <h2 className="uppercase text-cerise font-semibold text-4xl mt-8 mb-4 px-2">
                  {t.forStudents.aboutFair}
                </h2>
                <p className="px-2 mb-6 font-light">
                  {t.forStudents.fairText1}
                </p>
                <p className="px-2 mb-8 font-light">
                  {t.forStudents.fairText2}
                </p>
              </div>
            </div>
            {/* Top Right */}
            <div className="lg:col-[17/33] lg:row-[1/7]">
              <div className="mix-blend-color bg-[#060606]" />
              <div className="relative">
                <img
                  src={"/img/for-students-image-1.png"}
                  alt={"Nymble"}
                  className="w-full grayscale"
                />
              </div>
            </div>
            <div className="lg:hidden h-[160px] bg-white/80" />
            {/* Bottom Left */}
            <div className="lg:col-[3/17] lg:row-[14/25]">
              <div className="mix-blend-color bg-[#060606]" />
              <div className="relative">
                <img
                  src="/img/for-students-image-2.png"
                  alt="Students working"
                  className="w-full grayscale"
                />
              </div>
            </div>

            {/* Bottom Right */}
            <div className="lg:col-[16/30] lg:row-[13/26] text-center lg:text-left z-40">
              <div className="bg-cerise lg:p-8 p-6 drop-shadow-md overflow-hidden">
                <h2 className="font-black text-[rgb(9,14,47)] lg:text-xl xl:text-[1.9rem] text-2xl pb-3 drop-shadow-md">
                  {t.forStudents.companyMeetings}
                </h2>
                <p className="pb-8 text-[#110C30] md:text-md text-xl font-light">
                  {t.forStudents.companyMeetingsText}
                </p>
                <Link
                  className="block uppercase text-sm hover:scale-105 transition-transform bg-white rounded-full text-cerise font-medium px-10 py-2 max-lg:mx-auto w-max"
                  href="https://kontaktsamtal.ddagen.se/"
                  target="_blank"
                >
                  {t.forStudents.companyMeetingsButton}
                </Link>
                <p 
                    className="block uppercase text-sm hover:scale-105 transition-transform bg-white rounded-full text-cerise font-medium px-10 py-2 max-lg:mx-auto w-max" 
                    onClick={()=>window.location.href = "https://login.datasektionen.se/login?callback=http://localhost:3000/logged_in?login_token="}
                >
                  Logga in
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
