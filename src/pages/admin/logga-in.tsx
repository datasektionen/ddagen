import { InputField } from "@/components/InputField";
import { useLocale } from "@/locales";
import { api } from "@/utils/api";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Submit } from "../logga-in";

export default function AdminLogin() {
  const t = useLocale();
  const router = useRouter();
  const locale = t.locale;
  const trpc = api.useContext();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();

  const startLogin = api.admin.startLogin.useMutation({
    onSuccess: (data) => {
      console.log(data);
      if (data?.url === undefined) {
        return
      }

      console.log(data);
      window.location.href = data.url;
    }
  });

  const finishLogin = api.admin.finishLogin.useMutation();
  const getIsLoggedIn = api.admin.isLoggedIn.useQuery(undefined, {
    onSuccess: (data) => {
      setIsLoggedIn(data);
    },
  });

  // Redirect if already logged in
  useEffect(() => {
    if (!getIsLoggedIn.isSuccess) return;
    if (isLoggedIn == true) router.push("/admin/sales");
  }, [isLoggedIn]);

  useEffect(() => {
    if (finishLogin.data?.ok) {
      router.push("/admin/sales");
      trpc.admin.invalidate();
    }
  }, [finishLogin]);

  useEffect(() => {
    if (typeof router.query.code === "string"){
      finishLogin.mutate({ current_url: window.location.href });
    }
  }, [router.query.code]);

  return (
    <>
      <Head>
          <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="mx-auto flex flex-col items-center text-center mb-20">
        <h1 className="text-cerise pt-[110px] lg:pt-[140px] mb-16 text-5xl font-medium uppercase">
          {t.login.title}
        </h1>
        <form
          className="flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            startLogin.mutate({ subpath: router.asPath.split('?')[0] });
          }}
        >
          <Submit value={t.login.confirm} loading={startLogin.isLoading} />
        </form>
        {startLogin.error && (
          <p className="text-red-500 font-bold mt-6">{t.error.unknown}</p>
        )}
        {finishLogin.error && (
          <p className="text-red-500 font-bold mt-6">{t.error.unknown}</p>
        )}
      </div>
    </>
  );
}
