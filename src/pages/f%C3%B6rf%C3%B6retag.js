import en from "@/locales/en";
import sv from "@/locales/sv";
import { useRouter } from "next/router";

export default function Companies() {
    const router = useRouter();
    const t = router.locale === 'sv' ? sv : en;

    return (
        <div>
            <p>For Företag</p>
        </div>
    )
}