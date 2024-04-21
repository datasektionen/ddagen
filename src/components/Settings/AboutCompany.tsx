import Locale, {useLocale} from "@/locales";
import React from "react";
import {step} from "@/components/Settings/Step";

export function AboutCompany(){
  const t = useLocale();
  const content = <p className="text-white text-center mt-[25px]">
    {t.exhibitorSettings.start.info}
  </p>;

  return step(t.exhibitorSettings.start.about,-1,content,t);
}
