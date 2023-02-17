import { useLocale } from "@/locales";

export default function About() {
    const t = useLocale();

    return (
        <div>
            <p>{t.about}</p>
        </div>
    )
}
