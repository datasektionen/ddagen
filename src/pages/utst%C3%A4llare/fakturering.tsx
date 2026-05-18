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

export default function ExhibitorBilling({
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
        <>
            <h2 className="text-white">Billing</h2>
        </>
      </ExhibitorLayout>
    </>
  );
}
