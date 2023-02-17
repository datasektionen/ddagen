import Link from "next/link";
import en from "@/locales/en";
import sv from "@/locales/sv";
import { useRouter } from "next/router";

export default function Companies() {
    const router = useRouter();
    const t = router.locale === 'sv' ? sv : en;
    

    return (
        <div className="flex items-center flex-col">
            <div className="flex flex-col justify-center text-center w-screen h-screen bg-white bg-foretagBanner bg-cover bg-center bg-no-repeat">
                <h1 className="text-4xl text-white uppercase">80+ FÖRETAG 2022</h1>
                <p className="text-white uppercase">DATASEKTIONEN  VID KTH:S  ARBETSMARKNADSDAG</p>
            </div>
            <div className="flex items-center flex-col text-center m-12">
                <h2 className="text-cerise text-2xl mb-6 uppercase">INFORMATION OM MÄSSAN</h2>
                <p className="w-4/5 md:w-3/5">D-Dagen är Datasektionens årliga arbetsmarknadsdag. Det är ett heldagsevent där företag och studenter verksamma inom data och IT får en möjlighet att knyta kontakter och lära känna varandra. Detta skapar goda möjligheter för en mer direkt och personlig kontakt mellan företagsrepresentanter och studenter.</p>
            </div>
            <div className="text-center m-12">
                <h2 className="text-cerise text-2xl mb-6 uppercase">ANMÄLAN TILL MÄSSAN</h2>
                <p className="mb-8">BLAH BLAH BLAH BLAH</p>
                <Link
                    className="bg-cerise-strong p-2.5 rounded-full uppercase text-white"
                    href="/företagsanmälan"
                >Företagsanmälan</Link>
            </div>
        </div>
    )
}