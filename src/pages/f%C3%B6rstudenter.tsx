import { useLocale } from "@/locales";

export default function Students() {
    const t = useLocale();

    return (
        <div>
            <p>{t.nav.forStudents}</p>
        </div>
    )
}
