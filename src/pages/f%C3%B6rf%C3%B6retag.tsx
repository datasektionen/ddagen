import { useLocale } from "@/locales";

export default function Companies() {
    const t = useLocale()

    return (
        <div>
            <p>{t.nav.forCompanies}</p>
        </div>
    )
}
