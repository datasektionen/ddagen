import en from "@/locales/en";
import sv from "@/locales/sv";
import { useRouter } from "next/router";
import CompanyForm from "@/components/CompanyForm";


export default function CTA() {
    const router = useRouter();
    const t = router.locale === 'sv' ? sv : en;

    return (
        <div className="bg-webBackground bg-cover bg-center">
            <p>Företagsanmälan</p>
            <CompanyForm t={t} />
        </div>
    )
}