import { useLocale } from "@/locales";

export default function Contact() {
  const t = useLocale();

  return (
    <div className="py-[150px] flex flex-col items-center">
      
        <h1 className="text-cerise  text-4xl font-medium uppercase">
          {t.contact.header}
        </h1>
     
        <h1 className="mt-[200px] text-cerise  text-3xl font-normal uppercase">
          {t.contact.subheader1}
        </h1>
        <p className="w-[500px] mt-5 text-white">{t.contact.p1}</p>
        <h1 className="mt-[200px] text-cerise  text-3xl font-normal uppercase">
          {t.contact.subheader2}
        </h1>
        <div className="mt-[50px] flex flex-col">
            <div className="flex flex-row"></div>
            <div className="flex flex-row"></div>
        </div>

      <div></div>
    </div>
  );
}
