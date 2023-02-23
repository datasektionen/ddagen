import { useLocale } from "@/locales";

export default function Companies() {
    const t = useLocale()

    return (
        <div className="bg-slate-700 flex h-min-screen flex-col items-center">
            <h1 className="text-cerise my-32 text-3xl">För Företag</h1>
            <div className="grid grid-cols-2 bg-white/50 w-4/5 h-30 text-slate-700 py-16 px-8">
                <div>
                    <h2 className="uppercase">Om Mässan</h2>
                    <p>D-Dagen är Datasektionens årliga arbetsmarknadsdag. Det är ett heldagsevent där företag och studenter verksamma inom data och IT får en möjlighet att knyta kontakter och lära känna varandra. Detta skapar goda möjligheter för en mer direkt och personlig kontakt mellan företagsrepresentanter och studenter.</p>
                    <p>I år hålls mässan 11 oktober i THS kårhus, Nymble, som ligger på Drottning Kristinas väg 15-19 på KTH Campus Valhallavägen. Under dagen kommer det finnas en lounge för utställare, och på kvällen anordnas en bankett för att avsluta dagen.</p>
                </div>
                <div>helo2</div>
                <div>helo3</div>
                <div>helo4</div>
            </div>
            <p>{t.nav.forCompanies}</p>
        </div>
    )
}
