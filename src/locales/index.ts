import { useRouter } from "next/router";
import en from "./en"
import sv from "./sv"

export type Locale = typeof en | typeof sv;

export default Locale;

export function useLocale() {
  const router = useRouter();
  const { locale } = router;
  return locale === "en" ? en : sv;
}

export function getLocale(locale: "en" | "sv") {
  return locale === "en" ? en : sv;
}
