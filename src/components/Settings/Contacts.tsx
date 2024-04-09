import {useLocale} from "@/locales";
import {step} from "@/components/Settings/Step";
import React from "react";
import {UserDetails} from "@/components/Settings/UserDetails";

export function Contacts(){
  const t = useLocale();
  const content = <UserDetails t={useLocale()} />;
  return step(t.exhibitorSettings.step2.title, 2,content,t);
}
