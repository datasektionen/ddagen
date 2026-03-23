import { InputField } from "@/components/InputField";
import { useLocale } from "@/locales";
import { api } from "@/utils/api";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Submit({ value, loading }: { value: string; loading: boolean }) {
  return (
    <input
      type="submit"
      disabled={loading}
      value={value}
      className="
        bg-cerise transition-transform hover:scale-110 focus:scale-110
        focus:outline-none text-white uppercase w-fit mx-auto py-2 px-10
        rounded-full cursor-pointer disabled:cursor-wait disabled:grayscale
      "
    />
  );
}

export default function Login() {
  const t = useLocale();
  const router = useRouter();
  const locale = t.locale;
  const trpc = api.useContext();

  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  const [state, setState] = useState<"email" | "code">("email");

  const startLogin = api.account.startLogin.useMutation({
    onSuccess: (data) => {
      console.log(data);
      if (data?.url === undefined) {
        return
      }

      console.log(data);
      window.location.href = data.url;
    }
  });

  const finishLogin = api.account.finishLogin.useMutation();
  const getIsLoggedIn = api.account.isLoggedIn.useQuery(undefined, {
    onSuccess: (data) => {
      setIsLoggedIn(data);
    },
  });

  // Redirect if already logged in
  useEffect(() => {
    if (!getIsLoggedIn.isSuccess) return;
    if (isLoggedIn == true) router.push("/utst%C3%A4llare");
  }, [isLoggedIn]);

  useEffect(() => {
    if (finishLogin.data?.ok) {
      router.push("/utställare");
      trpc.account.invalidate();
    }
  }, [finishLogin]);

  useEffect(() => {
    if (typeof router.query.code === "string") {
      setState("code");
      setCode(router.query.code);
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
