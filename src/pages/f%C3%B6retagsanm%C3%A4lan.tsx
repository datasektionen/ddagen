import CompanyForm from "@/components/CompanyForm";
import { type Locale, useLocale } from "@/locales";
import { useState } from "react";
import { NextSeo } from 'next-seo';

function NoMoreRegistrations({ t }: { t: Locale }) {
  return (
    <div className="flex flex-col items-center text-center pt-[200px] pb-40 mx-auto">
      <h1 className="uppercase text-center text-3xl md:text-5xl mb-14 font-medium text-cerise">
        {t.companyForm.title}
      </h1>
      <p className="max-w-[350px] w-2/3 text-[#a7a7a7] p-2 rounded-lg bg-darkblue bg-opacity-90">
        {t.companyForm.noMoreRegistrations}
      </p>
    </div>
  );
}

function RegistrationConfirmation({ t }: { t: Locale }) {
  return (
    <div className="flex flex-col items-center text-center pt-[200px] pb-40 mx-auto">
      <h1 className="uppercase text-center text-3xl md:text-5xl mb-14 font-medium text-cerise">
        {t.companyForm.title}
      </h1>
      <div className="p-2 rounded-lg bg-darkblue bg-opacity-90 flex flex-col items-center">
        <h2 className="text-lg text-white w-2/3 uppercase mb-5">
          {t.postCompanyForm.subtitle}
        </h2>
        <p className="max-w-[350px] w-2/3 text-[#a7a7a7] sm:text-left">
          {t.postCompanyForm.text}{" "}
          <a
            href="mailto:sales@ddagen.se"
            className="text-cerise hover:underline"
          >
            sales@ddagen.se
          </a>
          . {t.postCompanyForm.textContinuation}
        </p>
      </div>

      <a
        href="mailto:sales@ddagen.se"
        className="
        bg-cerise transition-transform hover:scale-110
        text-white font-bold uppercase
        py-2 px-4 mt-8 rounded-full
      "
      >
        {t.postCompanyForm.contact}
      </a>
    </div>
  );
}

export default function ExhibitorRegistration() {
  const t = useLocale();
  const acceptRegistrations = true;

  const [registationDone, setRegistationDone] = useState(false);

  const seoContent = {
    sv: {
      title: "Företagsanmälan - Anmäl Ert Företag Till Mässan",
      description: "Är ditt företag intresserat av att delta på D-Dagen 2025? Anmäl er till Sveriges största arbetsmarknadsmässa för IT- och datastudenter! Fyll i företagsanmälan och bli en del av D-Dagen den 9 oktober på KTH Campus Valhallavägen.",
      url: "https://ddagen.se/företagsanmälan",
    },
    en: {
      title: "Exhibitor Registration - Register Your Company for the Fair",
      description: "Is your company interested in participating in D-Dagen 2025? Register for Sweden's largest career fair for IT and computer science students! Fill out the exhibitor registration form and join us on October 9 at KTH Campus Valhallavägen.",
      url: "https://ddagen.se/en/företagsanmälan",
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
      {acceptRegistrations ? (
        registationDone ? (
          <RegistrationConfirmation t={t} />
        ) : (
          <CompanyForm
            t={t}
            onRegistationDone={() => setRegistationDone(true)}
          />
        )
      ) : (
        <NoMoreRegistrations t={t} />
      )}
    </>
  );
}
