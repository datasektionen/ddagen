import CompanyForm from "@/components/CompanyForm";
import { useLocale } from "@/locales";

export default function CTA() {
    const t = useLocale();

    return (
        <div>
            <p>{t.nav.companyForm}</p>
            <CompanyForm t={t} />
        </div>
    )
}
