import CompanyForm from "@/components/CompanyForm";
import { type Locale, useLocale } from "@/locales";
import { useState } from "react";

function RegistrationConfirmation({ t }: { t: Locale["postCompanyForm"] }) {
  return (
    <div className="mx-auto flex flex-col items-center text-center py-40">
      <h1 className="md:max-w-2xl md:text-5xl mx-10 text-3xl text-cerise uppercase mb-20">{t.title}</h1>
      <h2 className="text-lg text-white w-2/3 uppercase mb-5">{t.subtitle}</h2>
      <p className="max-w-[350px] w-2/3 text-[#a7a7a7] mb-14">{t.text} <a href="mailto:sales@ddagen.se" className="text-cerise hover:underline">sales@ddagen.se</a>. {t.textContinuation}</p>

      <a href="mailto:sales@ddagen.se" className="
        bg-cerise transition-transform hover:scale-110
        text-white font-bold uppercase
        py-2 px-4 rounded-full
      ">{t.contact}</a>
    </div>
  );
}

export default function ExhibitorRegistration() {
  const t = useLocale();

  const [registationDone, setRegistationDone] = useState(false);

  if (registationDone) {
    return <RegistrationConfirmation t={t.postCompanyForm} />;
  } else {
    return <CompanyForm t={t} onRegistationDone={() => setRegistationDone(true)} />;
  }
}
