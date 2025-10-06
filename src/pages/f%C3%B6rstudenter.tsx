import { useRef } from "react";
import { useLocale } from "@/locales";
import { useEffect } from "react";
import { NextSeo } from 'next-seo';
import ImageTextSection from "@/components/ImageTextSection";

export default function ForStudents() {
  const t = useLocale();
  const scrollRef = useRef<HTMLInputElement | null>(null);

  const dayStaffAplicationOpen = true;
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
          <h1 className="uppercase text-center text-cerise pt-[110px] lg:pt-[140px] mb-4 text-5xl font-medium">
            {t.forStudents.title}
          </h1>
          <div className="flex flex-row items-center justify-center mt-[50px] px-5">
            <p className="text-white w-[300px] sm:w-[600px] text-center">
              {t.forStudents.guideText}
            </p>
          </div>
          <div>
            <button className="mt-6">
              <a
                className="block hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base uppercase font-medium px-6 py-2 max-lg:mx-auto w-max"
                href={t.forStudents.guidePath}
              >
                {t.forStudents.guideButtonText}
              </a>
            </button>
          </div>
          <ImageTextSection
            t={t}
            leftSideImage={true}
            imageProps={{ src: "/img/ddagen2024/ddagen-entry-balloons.jpg", alt: "D-Dagen entry balloons" }}
            className={`mt-[10px] lg:mt-[30px] mb-[20px] lg:mb-[40px]`}
          >
            <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl max-w-xl">
              {t.forStudents.aboutFair}
            </h2>
            <p className="text-white text-base sm:text-lg pt-4 max-w-xl">{t.forStudents.fairText1}</p>
            <p className="text-white text-base sm:text-lg pt-4 max-w-xl">{t.forStudents.fairText2}</p>
            <button className="mt-6">
              <a
                className="block hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base uppercase font-medium px-6 py-2 max-lg:mx-auto w-max"
                href={"/event"}
              >
                {t.forStudents.eventPageButton}
              </a>
            </button>
          </ImageTextSection>

          <ImageTextSection
            t={t}
            leftSideImage={false}
            imageProps={{ src: "/img/ddagen2024/ddagen-staff-balloons.jpg", alt: "D-Dagen day staff balloons" }}
            className={`mt-[10px] lg:mt-[30px] mb-[20px] lg:mb-[40px]`}
          >
            <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl max-w-xl">
              {t.forStudents.dayStaffTitle}
            </h2>
            <p className="text-white text-base sm:text-lg pt-4 max-w-xl">{t.forStudents.dayStaffText}</p>
            <button className="mt-6">
              <a
                className="block hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base uppercase font-medium px-6 py-2 max-lg:mx-auto w-max"
                href={"https://forms.gle/5mLBmCeh1Zv3Y7Ds5"}
                target="_blank"
              >
                {t.forStudents.dayStaffApply}
              </a>
            </button>
          </ImageTextSection>

          {/* Section of D-Dagen Info */}
          <ImageTextSection
            t={t}
            leftSideImage={true}
            imageProps={{ src: "/img/ddagen2024/ddagen-exhibitors.jpg", alt: "D-Dagen exhibitors" }}
            className={`mt-[20px] lg:mt-[60px] mb-[30px] lg:mb-[40px]`}
          >
            <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl max-w-xl">
              {t.forStudents.companyMeetings}
            </h2>
            <p className="text-white text-base sm:text-lg pt-4 mb-6 max-w-xl">{t.forStudents.tempCompanyMeetingsText}</p>
            <button className="mt-6">
              <a
                className="block hover:scale-105 transition-transform border-cerise border-2 bg-transparent rounded-full text-cerise text-base uppercase font-medium px-6 py-2 max-lg:mx-auto w-max"
                href={"/kontaktsamtal"}
              >
                {t.forStudents.companyMeetingsPageButton}
              </a>
            </button>
          </ImageTextSection>

          <ImageTextSection
            t={t}
            leftSideImage={false}
            imageProps={{ src: "/img/ddagen2024/banquette-dinner.jpg", alt: "Panel discussions" }}
            className={`mt-[20px] lg:mt-[60px] mb-[30px] lg:mb-[40px]`}
          >
            <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl max-w-xl">
              {t.forStudents.panelDiscussionsTitle}
            </h2>
            <p className="text-white text-base sm:text-lg pt-4 mb-6 max-w-xl">{t.forStudents.panelDiscussionsText}</p>
          </ImageTextSection>

          {/* Section of D-Dagen Info */}
          <ImageTextSection
            t={t}
            leftSideImage={true}
            imageProps={{ src: "/img/ddagen2024/banquette-dinner.jpg", alt: "Banquette Dinner" }}
            className={`mt-[20px] lg:mt-[60px] mb-[30px] lg:mb-[40px]`}
          >
            <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl max-w-xl">
              {t.forStudents.banquetTitle}
            </h2>
            <p className="text-white text-base sm:text-lg pt-4 mb-6 max-w-xl">{t.forStudents.banquetText}</p>
            <button className="mt-6">
              <a
                className="block hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base uppercase font-medium px-6 py-2 max-lg:mx-auto w-max"
                href={"/banquette"}
                target="_blank"
              >
                {t.forStudents.banquetButton}
              </a>
            </button>
          </ImageTextSection>
        </div>
      </div>
    </>
  );
}