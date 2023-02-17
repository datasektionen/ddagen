import { useLocale } from "@/locales";

export default function Home() {
    const t = useLocale();

    return (
        <div>
            <p>Hello World!</p>
            <p>{t.home}</p>
        </div>
    )
}
