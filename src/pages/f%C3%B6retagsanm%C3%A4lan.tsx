import CompanyForm from "@/components/CompanyForm";
import { type Locale, useLocale } from "@/locales";
import { useState } from "react";

function NoMoreRegistrations({ t }: { t: Locale }) {
  return (
    <div className="flex flex-col items-center text-center pt-[200px] pb-40 mx-auto">
      <h1 className="uppercase text-center text-3xl md:text-5xl mb-14 font-medium text-cerise">
        {t.companyForm.title}
      </h1>
      <p className="max-w-[350px] w-2/3 text-[#a7a7a7]">
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
      <h2 className="text-lg text-white w-2/3 uppercase mb-5">
        {t.postCompanyForm.subtitle}
      </h2>
      <p className="max-w-[350px] w-2/3 text-[#a7a7a7] mb-10">
        {t.postCompanyForm.text}{" "}
        <a
          href="mailto:sales@ddagen.se"
          className="text-cerise hover:underline"
        >
          sales@ddagen.se
        </a>
        . {t.postCompanyForm.textContinuation}
      </p>

      <a
        href="mailto:sales@ddagen.se"
        className="
        bg-cerise transition-transform hover:scale-110
        text-white font-bold uppercase
        py-2 px-4 rounded-full
      "
      >
        {t.postCompanyForm.contact}
      </a>
    </div>
  );
}

export default function ExhibitorRegistration() {
  const t = useLocale();
  const acceptRegistrations = false;

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
