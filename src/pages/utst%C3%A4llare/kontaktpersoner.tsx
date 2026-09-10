import { api } from "@/utils/api";
import { useLocale } from "@/locales";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import ExhibitorLayout from "@/shared/exhibitorLayout";
import { UserDetails } from "@/components/Company/User/UserDetails";

export default function ExhibitorPeople() {
  const t = useLocale();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const getIsLoggedIn = api.account.isLoggedIn.useQuery(undefined, {
    onSuccess: (data: any) => {
      setIsLoggedIn(data);
    },
  });

  useEffect(() => {
    if (!getIsLoggedIn.isSuccess) return;
    //if (isLoggedIn == false) router.push("/logga-in");
  }, [isLoggedIn]);

  return(
    <>
      <Head>
        <title>Kontaktpersoner</title>
      </Head>
      <ExhibitorLayout>
        <UserDetails t={t} />
      </ExhibitorLayout>
    </>
  );
}
