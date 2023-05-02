import { useLocale } from "@/locales";
import Link from "next/link";

export default function ForCompanies() {
  const t = useLocale()

  return (
    <div className="
      flex w-full flex-col items-center
      mb-10
    ">
      <h1 className="text-cerise pt-[200px] mb-36 text-5xl font-medium uppercase">{t.forCompanies.title}</h1>
      <main className="
        mx-8 p-2 md:p-0 bg-[#d9d9d9b9] flex flex-col md:gap-5
        max-w-5xl
      ">
        <div className="grid md:grid-cols-2 md:pb-20">
          <section className="bg-white flex flex-col relative md:top-20 md:left-20">
            <h2 className="uppercase text-cerise font-semibold text-4xl mt-8 mb-4 px-5">{t.forCompanies.aboutFair}</h2>
            <p className="px-5 mb-6">{t.forCompanies.fairText1}</p>
            <img className="md:hidden my-5 bg-[#000b]" src="/img/ff1.webp" alt="People talking" />
            <p className="mb-8 px-5">{t.forCompanies.fairText2}</p>
            <div className="px-5 pb-[50px] flex justify-center md:justify-start">
            <a href={t.faq.catalogPath} target="blank" className= "">
              <button className="mt-[0px] h-[50px] w-[220px] bg-cerise rounded-[40px] border-cerise flex items-center justify-center px-[30px] flex-col hover:scale-105 transition-transform">
                <div className="flex items-center">
                  <span className="text-white font-medium">
                    {t.faq.productCatalog}
                  </span>
                </div>
              </button>
            </a>
            </div>
          </section>

          <img className="hidden md:block bg-[#000b]" src="/img/ff1.webp" alt="People talking" />
          
        </div>

        <section className="mt-12 grid md:grid-cols-2 md:p-20 md:place-items-end">
          <h2 className="
            md:hidden font-bold text-5xl text-darkblue mb-2
          ">{t.forCompanies.interestedTitle}</h2>
          <img className="bg-gray relative bg-[#000b] md:left-8 md:-top-8" src="/img/ff2.webp" alt="People talking" />
          <section className="bg-cerise p-6 z-10">
            <h2 className="
              hidden md:block font-bold text-4xl text-darkblue mb-2
            ">{t.forCompanies.interestedTitle}</h2>
            <p className="pb-8">{t.forCompanies.interestedText}</p>
            <Link className="
              hover:scale-105 transition-transform bg-white py-3 px-4 rounded-full text-cerise font-medium uppercase
              w-max block mx-auto md:mx-0 mb-6
            " href="/företagsanmälan">{t.forCompanies.formButton}</Link>
          </section>
        </section>
      </main>
    </div>
  )
}
