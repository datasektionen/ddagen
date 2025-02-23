import CompanyForm from "@/components/CompanyForm";
import { type Locale, useLocale } from "@/locales";
import { useState } from "react";

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

  return (
    <>
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
