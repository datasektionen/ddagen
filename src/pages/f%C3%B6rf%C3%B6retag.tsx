import { useLocale } from "@/locales";
import ImageTextSection from "@/components/ImageTextSection";
import Link from "next/link";
import { NextSeo } from 'next-seo';

export default function ForCompanies() {
  const t = useLocale();

  const seoContent = {
    sv: {
      title: "För Företag - Träffa IT-studenter & Hitta Framtidens Talanger",
      description: "D-Dagen är KTH Datasektionens årliga arbetsmarknadsdag där företag möter framtidens IT-talanger. Delta den 9 oktober på KTH Campus Valhallavägen och nätverka med civilingenjörsstudenter inom data och IT. Upptäck våra företagspaket och avsluta dagen med en exklusiv bankett. ",
      url: "https://ddagen.se/förföretag",
    },
    en: {
      title: "For Companies - Meet IT Students & Recruit Top Talent",
      description: "D-Dagen is KTH's annual career fair where companies connect with future IT professionals. Join us on October 9 at KTH Campus Valhallavägen to network with top engineering students in computer science and IT. Explore our company packages and end the day with an exclusive banquet.",
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
        <div className="flex flex-col mx-auto items-center max-w-[90%] lg:max-w-full">
          <h1 className="uppercase text-center text-cerise pt-[110px] lg:pt-[140px] mb-4 text-5xl font-medium">
            {t.forCompanies.title}
          </h1>

          {/* Section of D-Dagen Info */}
          <ImageTextSection
            t={t}
            leftSideImage={true}
            imageProps={{src: "/img/ff3.webp", alt: "People talking"}}
            className={`mt-[10px] lg:mt-[30px] mb-[20px] lg:mb-[40px]`}
            >
              <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl max-w-xl">
                {t.forCompanies.aboutFair}
              </h2>
              <p className="text-white text-base sm:text-lg pt-4 max-w-xl">{t.forCompanies.fairText1}</p>
              <p className="text-white text-base sm:text-lg pt-4 max-w-xl">{t.forCompanies.fairText2}</p>
              <button className="mt-6">
                  <a
                    className="block hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base font-medium px-6 py-2 max-lg:mx-auto w-max"
                    href={t.faq.catalogPath}
                  >
                    {t.faq.productCatalog}
                  </a>
              </button>
          </ImageTextSection>

          {/* Section of packages */}
          <div className={`flex flex-col w-full 
              lg:text-center justify-center items-center
              mt-[20px] sm:mt-[60px] mb-[20px] sm:mb-[50px]
              bg-[rgba(11,15,36,0)]`}>

              {/* Text Section */}
              <div className="flex flex-col max-w-2xl bg-[rgba(15,20,45,0.75)] py-4 rounded-lg">
                <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl">
                  {t.forCompanies.companyPackages.title}
                </h2>
                <p className="text-white text-base sm:text-lg pt-2">
                  {t.forCompanies.companyPackages.text}
                  <br />
                  {t.forCompanies.companyPackages.text2}
                  <a className='text-yellow' href='mailto:sales@ddagen.se'>sales@ddagen.se</a>
                </p>
              </div>

              {/* Product Cards Section */}
              <div className={`flex flex-col sm:flex-row flex-wrap
                  w-full max-w-[90vw] lg:max-w-5xl mx-auto
                  mt-4 sm:mt-8`}>

                  { /* LOOP THROUGH ALL 4 CARDS (className sets the border color) */
                    t.forCompanies.companyPackages.packages.map((companyPackage, i) => 
                      <div className={`basis-1 sm:basis-1/2 lg:basis-1/3 
                          flex flex-col flex-wrap
                          rounded-lg px-1
                          justify-center
                          mt-2 lg:mt-0`} key={i}>
                          {/* 
                            SPAN TO PRE INCLUDE DYNAMICALLY RENDERED BORDERS AND BACKGROUNDS
                            IF CUSTOM COLOR IS NOT SHOWING UP, RENDER IT HERE
                          */}
                          <span className="absolute w-0 h-0 border-gold border-0 bg-gold"></span>
                          
                          
                          <div className={`flex flex-col justify-between
                            bg-[#01061E] rounded-lg h-full
                            py-8 px-8 text-left relative ${companyPackage.className ?? ""}`}>

                            { 
                              // REMOVED
                              
                              /* DISCOUNT ICON TOP RIGHT (className sets the background color)

                              companyPackage.discount && 
                              <div className={`flex flex-col justify-center items-center
                                  absolute top-0 right-0 translate-y-[-35%] translate-x-[35%]
                                  w-10 h-10 rounded-full 
                                  text-white text-base font-medium ${companyPackage.discount.className}`}
                                  >
                                {companyPackage.discount.amount}
                              </div>
                            */}
                            
                            {/* CARD TEXT */}
                            <div className="flex flex-col">
                              <h3 className="text-white text-lg sm:text-xl lg:text-xl">{companyPackage.title}</h3>
                              <ul className="list-disc text-white font-light ml-3 mt-1">
                                { /* LOOP THROUGH ALL BULLET POINTS */
                                  companyPackage.bulletPoints.map((bulletPoint, i) => 
                                    <li key={i}>
                                      <p className={`text-white text-base leading-[1.75rem] ${companyPackage.boldFirstPoint && i == 0 && "font-medium"}`}>{bulletPoint}</p>
                                    </li>
                                  )
                                }
                              </ul>
                            </div>
                            <div>
                              <ul className="list-disc text-slate-400 font-light ml-3 mt-4">
                                { /* LOOP THROUGH ALL DISCLAIMER BULLET POINTS */
                                  companyPackage.disclaimers.map((disclaimer, i) => 
                                    <li key={i}>
                                      <p className="text-slate-400 text-base">{disclaimer}</p>
                                    </li>
                                  )
                                }
                              </ul>
                            </div>
                          </div>
                      </div>
                    )
                  }
              </div>
          </div>

          {/* Section of D-Dagen Info */}
          <ImageTextSection
            t={t}
            leftSideImage={false}
            imageProps={{src: "/img/ff4.webp", alt: "People talking"}}
            className={`mt-[20px] lg:mt-[60px] mb-[30px] lg:mb-[40px]`}
            >
              <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl max-w-xl">
                {t.forCompanies.interestedTitle}
              </h2>
              <p className="text-white text-base sm:text-lg pt-4 mb-6 max-w-xl">{t.forCompanies.interestedText}</p>
              <Link
                className="block hover:scale-105 transition-transform  rounded-full text-cerise bg-white font-medium px-6 py-2 max-lg:mx-auto w-max"
                href="/företagsanmälan"
              >
                {t.forCompanies.formButton}
              </Link>
          </ImageTextSection>
        </div>
      </div>
    </>
  );
}
