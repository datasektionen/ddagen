import { useLocale } from "@/locales";
import { NextSeo } from 'next-seo';
import parse from "html-react-parser";
import ImageTextSection from "@/components/ImageTextSection";
import Link from "next/link";

export default function StudentMeetings() {
  const t = useLocale();

  const seoContent = {
    sv: {
      title: "Kontaktsamtal - Möten mellan student och företag",
      description:
        "Kontaktsamtal på D-Dagen ger studenter möjlighet att träffa företag enskilt för att diskutera karriärmöjligheter. Läs mer om hur processen går till och hur du som student eller företag kan delta.",
      url: "https://ddagen.se/kontaktsamtal",
    },
    en: {
      title: "Student Meetings - One-on-One Sessions with Companies",
      description:
        "Student meetings at D-Dagen give students the opportunity to meet with companies one-on-one and discuss career opportunities. Learn more about the process and how to participate as a student or company.",
      url: "https://ddagen.se/en/kontaktsamtal",
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
      <div className="pb-[150px] flex flex-col items-center ">
        <div className=" xl:w-[1200px] lg:w-[1000px] w-full ">
          <h1 className="text-cerise text-5xl pt-[110px] lg:pt-[140px] mb-8 font-medium uppercase text-center ">
            {t.studentmeetings.header}
          </h1>
        <ImageTextSection
            t={t}
            leftSideImage={true}
            imageProps={{src: "/img/ddagen2024/ddagen-exhibitors.jpg", alt: "D-Dagen Utställare"}}
            className={`mt-[10px] lg:mt-[30px] mb-[30px] lg:mb-[40px]`}
            >
              <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl max-w-xl">
                {t.studentmeetings.subheader1}
              </h2>
              <p className="text-white text-base sm:text-lg pt-4 mb-6 max-w-xl">{t.studentmeetings.p1}</p>
          </ImageTextSection>

          <div className="flex flex-col gap-4 justify-center mt-[90px] lg:mt-[110px] max-w-[1025px] mx-auto">
            <h2 className="text-cerise text-2xl lg:text-4xl font-bold uppercase text-center w-auto p-2">
              {t.studentmeetings.subheader2}
            </h2>
            <p className="text-white mt-[0px] text-lg px-6">{t.studentmeetings.p2}</p>
            <ul className="list-disc ml-8 px-6">
              {t.studentmeetings.bulletpoints.map((s, i) =>
                <li key={i} className="text-white mt-[0px] text-lg">{parse(s)}</li> 
              )}
            </ul>
            <p className="text-white mt-[0px] text-lg px-6">{t.studentmeetings.p3.split("\n").map((x,i) => 
                <span key={i}>{x} <br /></span>
              )}
            </p>
          </div>


          {/* Section of CTA studentmeetings */}
          <ImageTextSection
            t={t}
            leftSideImage={false}
            imageProps={{src: "/img/ff4.webp", alt: "People talking"}}
            className={`mt-[60px] lg:mt-[110px] mb-[30px] lg:mb-[40px]`}
            >
              <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl max-w-xl">
                {t.studentmeetings.subheader3}
              </h2>
              <p className="text-white text-base sm:text-lg pt-4 mb-6 max-w-xl">{t.studentmeetings.p4}</p>
              <Link
                className="block hover:scale-105 transition-transform  rounded-full text-cerise bg-white font-medium px-6 py-2 w-max"
                href="/student"
              >
                {t.studentmeetings.cta}
              </Link>
          </ImageTextSection>
        </div>
      </div>
    </>
  );
}
