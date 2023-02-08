import en from "@/locales/en";
import sv from "@/locales/sv";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'sv' ? sv : en;
  
  return (
    <div>
      <p>Hello World!</p>
      <p>{t.home}</p>
    </div>
  )
}
