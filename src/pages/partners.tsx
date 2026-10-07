import { useLocale } from "@/locales";
import { NextSeo } from "next-seo";
import ImageTextSection from "@/components/ImageTextSection";

export default function Partners() {
  const t = useLocale();

  const kthAiSocietyLink = "https://kthais.com";

  const seoContent = {
    sv: {
      title: "Partners - Samarbetspartners | D-Dagen",
      description:
        "Läs mer om D-Dagens samarbetspartners, däribland KTH AI Society, samt våra gemensamma event och aktiviteter.",
      url: "https://ddagen.se/partners",
    },
    en: {
      title: "Partners - Our Collaborators | D-Dagen",
      description:
        "Learn more about D-Dagen's partners, including KTH AI Society, and explore our joint events and activities.",
      url: "https://ddagen.se/en/partners",
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
          description,
        }}
        additionalMetaTags={[
          {
            name: "robots",
            content: "index, follow",
          },
        ]}
      />
      <div className="w-full h-full">
        <div className="flex flex-col mx-auto items-center max-w-[90%]">
          <h1 className="uppercase text-center text-cerise pt-[110px] lg:pt-[140px] mb-0 text-5xl font-medium">
            {t.partners.title}
          </h1>

          {/* Section 1: KTH AI Society (Image left, text right) */}
          <ImageTextSection
            t={t}
            leftSideImage={true}
            imageProps={{
              src: "/img/partners/kth-ai-society.png",
              alt: "KTH AI Society",
            }}
            className="mt-[10px] lg:mt-[30px] mb-[20px] lg:mb-[40px]"
          >
            <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl max-w-xl">
              {t.partners.kthAiSocietyTitle}
            </h2>
            <p className="text-white text-base sm:text-lg pt-4 max-w-xl">
              {t.partners.kthAiSocietyText}
            </p>
            <button className="mt-6">
              <a
                className="block hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base uppercase font-medium px-6 py-2 max-lg:mx-auto w-max"
                href={kthAiSocietyLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.partners.kthAiSocietyButton}
              </a>
            </button>
          </ImageTextSection>

          {/* Section 2: Joint Events (Text left, image right) */}
          <ImageTextSection
            t={t}
            leftSideImage={false}
            imageProps={{
              src: "/img/ddagen2024/ddagen-exhibitors.jpg",
              alt: "D-Dagen Events",
            }}
            className="mt-[10px] lg:mt-[30px] mb-[20px] lg:mb-[40px]"
          >
            <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl max-w-xl">
              {t.partners.eventsTitle}
            </h2>
            <p className="text-white text-base sm:text-lg pt-4 max-w-xl">
              {t.partners.eventsText}
            </p>
            <button className="mt-6">
              <a
                className="block hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base uppercase font-medium px-6 py-2 max-lg:mx-auto w-max"
                href="/event"
              >
                {t.partners.eventsButton}
              </a>
            </button>
          </ImageTextSection>
        </div>
      </div>
    </>
  );
}