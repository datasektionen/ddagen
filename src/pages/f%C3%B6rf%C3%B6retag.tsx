import { useLocale } from "@/locales";
import Link from "next/link";

export default function Companies() {
    const t = useLocale()

    return (
        <div className="bg-slate-700 flex h-min-screen flex-col items-center">
            <h1 className="text-cerise my-32 text-3xl">För Företag</h1>
            <div className="grid grid-cols-2 gap-y-16 bg-white/50 w-4/5 h-30 text-slate-700 py-16 px-8 mb-32">
                <div className="bg-white p-8 m-auto">
                    <h2 className="uppercase text-cerise font-bold text-2xl pb-4">Om Mässan</h2>
                    <p>D-Dagen är Datasektionens årliga arbetsmarknadsdag. Det är ett heldagsevent där företag och studenter verksamma inom data och IT får en möjlighet att knyta kontakter och lära känna varandra. Detta skapar goda möjligheter för en mer direkt och personlig kontakt mellan företagsrepresentanter och studenter.</p>
                    <p className="pt-4">I år hålls mässan 11 oktober i THS kårhus, Nymble, som ligger på Drottning Kristinas väg 15-19 på KTH Campus Valhallavägen. Under dagen kommer det finnas en lounge för utställare, och på kvällen anordnas en bankett för att avsluta dagen.</p>
                </div>
                <div className="flex m-auto"><img className="bg-black "src="\img\for-companies-pic1.svg" alt="picture of people talking" /></div>
                <div className="flex m-auto mb-16"><img className="bg-black "src="\img\for-companies-pic2.svg" alt="picture of people talking" /></div>
                <div className="bg-cerise text-black p-8 mt-auto right-0 w-min-54">
                    <h2 className="font-bold text-2xl pb-4">Intresserad?</h2>
                    <p className="pb-8">Är du intresserad av att ställa ut på D-dagen och knyta kontagt med tusentals studenter inom Data och IT? Klicka här nedan för att göra en intresseanmälan!</p>
                    <Link className="bg-white p-2.5 rounded-full text-cerise" href="/företagsanmälan">{t.nav.companyForm}</Link>
                </div>
            </div>
        </div>
    )
}
