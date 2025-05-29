import { useRef } from "react";
import { useLocale } from "@/locales";
import { useEffect } from "react";
import { NextSeo } from 'next-seo';
import ImageTextSection from "@/components/ImageTextSection";

export default function ForStudents() {
  const t = useLocale();
  const scrollRef = useRef<HTMLInputElement | null>(null);

  const dayStaffAplicationOpen = false;
  const dayStaffAplicationLink = "https://docs.google.com/forms/d/e/1FAIpQLSfRBriKZYXWZCssxv2Z-fsFPzPnTmfd6-gUvqtzNNgWsEV2bQ/viewform";

  const seoContent = {
    sv: {
      title: "För Studenter - Träffa IT-företag & Skapa Karriärmöjligheter",
      description: "D-Dagen är Datasektionens årliga arbetsmarknadsdag för IT- och datastudenter vid KTH. Delta den 9 oktober på KTH Campus Valhallavägen och nätverka med ledande företag inom techbranschen. Boka kontaktsamtal, få karriärtips och engagera dig som dagspersonal för unika möjligheter!",
      url: "https://ddagen.se/förstudenter",
    },
    en: {
      title: "For Students - Meet Top IT Companies & Boost Your Career",
      description: "D-Dagen is the annual career fair for IT and computer science students at KTH. Join us on October 9 at KTH Campus Valhallavägen to connect with leading tech companies, book one-on-one career meetings, and explore job opportunities. Get involved as event staff for valuable experience and networking!",
      url: "https://ddagen.se/en/förstudenter",
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
        <div className="flex flex-col mx-auto items-center max-w-[90%]">
          <h1 className="uppercase text-center text-cerise pt-[110px] lg:pt-[140px] mb-16 text-5xl font-medium">
            {t.forStudents.title}
          </h1>

          {/* Section of D-Dagen Info */}
          <ImageTextSection
            t={t}
            leftSideImage={true}
            imageProps={{src: "/img/ff3.webp", alt: "People talking"}}
            className={`mt-[10px] lg:mt-[30px] mb-[20px] lg:mb-[40px]`}
            >
              <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl max-w-xl">
                {t.forStudents.aboutFair}
              </h2>
              <p className="text-white text-base sm:text-lg pt-4 max-w-xl">{t.forStudents.fairText1}</p>
              <p className="text-white text-base sm:text-lg pt-4 max-w-xl">{t.forStudents.fairText2}</p>
          </ImageTextSection>


          {/* Section of Representatives */}
          <ImageTextSection
            t={t}
            leftSideImage={false}
            imageOverOnMobile={true}
            imageProps={{src: "/img/ddagen-massa-foretag.png", alt: "Picture of ddagen exhibition day"}}
            className={`mt-[40px] lg:mt-[70px] mb-[110px] lg:mb-[140px]`}
            >
              <h2 className="text-white text-2xl sm:text-2xl lg:text-3xl max-w-xl">
                {t.forStudents.companyMeetings}
              </h2>
              <p className="text-white text-light sm:text-lg pt-4 max-w-xl pb-8">
                {t.forStudents.tempCompanyMeetingsText}
              </p>
              {/*<Link
                className="block hover:scale-105 transition-transform  rounded-full text-cerise bg-white font-medium px-6 py-2 max-lg:mx-auto w-max"
                href="/student"
              >
                {t.home.representativeButton}
              </Link>*/}
          </ImageTextSection>


          {/* Section of Day Staff */}
          <ImageTextSection
            t={t}
            leftSideImage={true}
            imageProps={{src: "/img/ff3.webp", alt: "People talking"}}
            className={`mt-[10px] lg:mt-[30px] mb-[20px] lg:mb-[40px]`}
            >
              <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl max-w-xl">
                {t.forStudents.dayStaffTitle}
              </h2>
              <p className="text-white text-base sm:text-lg pt-4 max-w-xl">
                {t.forStudents.dayStaffText}
              </p>
                {dayStaffAplicationOpen ?
                  <div className="flex justify-center pb-[30px]">
                    <a href={dayStaffAplicationLink}
                      className="block uppercase text-sm hover:scale-105 transition-transform bg-white rounded-full text-cerise font-medium px-10 py-2 cursor-pointer">
                      {t.forStudents.dayStaffApply}
                    </a>
                  </div>
                :
                  <p className="pb-8 text-center text-yellow font-medium md:text-md text-xl font-light">
                    {t.forStudents.dayStaffApplicationOpens}
                  </p>
                }
          </ImageTextSection>

          <div
            ref={scrollRef}
            className="flex flex-col items-center justify-center py-12 mx-auto mb-16 max-w-5xl"
          >
            <div
              className="lg:grid lg:grid-rows-[repeat(19,minmax(auto,1fr))] lg:grid-cols-[repeat(32,minmax(auto,1fr))] font-light lg:pb-12 
                        max-lg:border-white/80 max-lg:border-[12px] max-lg:border-solid lg:bg-white/80 rounded-xl"
            >
              <div className="lg:col-[3/18] lg:row-[3/12] bg-white z-40">
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
              <div className="lg:col-[17/30] lg:row-[2/8]">
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
                    {t.forStudents.tempCompanyMeetingsText}
                  </p>
                  {/*
                  <Link href="/student" 
                    className="block uppercase text-sm hover:scale-105 transition-transform bg-white rounded-full text-cerise font-medium px-10 py-2 max-lg:mx-auto w-max cursor-pointer">
                      { t.forStudents.companyMeetingsButton}
                  
                  </Link>
                  */}
                </div>
              </div>
              
              {/* Day Staff Text */}
              <div className="lg:col-[3/17] lg:row-[26/39] text-center lg:text-left z-40">
                <div className="bg-cerise lg:p-8 p-6 drop-shadow-md overflow-hidden">
                  <h2 className="font-black text-[rgb(9,14,47)] lg:text-xl xl:text-[1.9rem] text-2xl pb-3 drop-shadow-md">
                    {t.forStudents.dayStaffTitle}
                  </h2>
                  <p className="pb-8 text-[#110C30] md:text-md text-xl font-light">
                    {t.forStudents.dayStaffText}
                  </p>
                  {dayStaffAplicationOpen ?
                    <div className="flex pt-6 pb-[30px]">
                      <a href={dayStaffAplicationLink}
                        className="block uppercase text-sm hover:scale-105 transition-transform bg-white rounded-full text-cerise font-medium px-10 py-2 cursor-pointer">
                        {t.forStudents.dayStaffApply}
                      </a>
                    </div>
                  :
                    <p className="pt-6 pb-8 text-yellow font-medium md:text-md text-xl font-light">
                      {t.forStudents.dayStaffApplicationOpens}
                    </p>
                }
                </div>
              </div>
              {/* Day Staff Image */}
              <div className="lg:col-[16/30] lg:row-[25/37]">
                <div className="mix-blend-color bg-[#060606]" />
                <div className="relative -mt-10"> {/* Adjust the margin-top to move the image higher */}
                  <img
                    src="/img/dagspersonal.jpg"
                    alt="Dagspersonal"
                    className="w-full grayscale"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}