import { api } from "@/utils/api";
import { useLocale } from "@/locales";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { InputField } from "@/components/InputField";
import Head from "next/head";
import ExhibitorLayout from "@/shared/exhibitorLayout";

// TODO hook the next button to the save features
// Maby break save changes into a separate steps for each page
// Add Logic to figure out saved state

export default function ExhibitorFAQ({
    children
} : {
    children: React.ReactElement
}) {
  const t = useLocale();
  const router = useRouter();

  // States
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  
  const getName = api.exhibitor.getName.useQuery();
  const getIsLoggedIn = api.account.isLoggedIn.useQuery(undefined, {
    onSuccess: (data: any) => {
      setIsLoggedIn(data);
    },
  });

  // Manage login
  useEffect(() => {
    if (!getIsLoggedIn.isSuccess) return;
    //if (isLoggedIn == false) router.push("/logga-in");
  }, [isLoggedIn]);

  
  return(
    <>
      <ExhibitorLayout>
        <div className="flex flex-col gap-2">
            <h2 className="uppercase text-cerise text-2xl md:text-4xl font-normal px-[10px] break-words w-full text-center pt-4">
                {t.admin.faq.header}
            </h2>
            <p className="text-white text-center text-lg">{t.admin.faq.comingSoon}</p>
            <p className="text-white text-center">
              {t.admin.faq.contact}
              <a href="mailto:sales@ddagen.se" className="text-yellow hover:underline">sales@ddagen.se</a>
            </p>
        </div>
      </ExhibitorLayout>
    </>
  );
}
