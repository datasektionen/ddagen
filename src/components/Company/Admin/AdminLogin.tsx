/*
import Locale from "@/locales";
import { useEffect, useState } from "react";
import { InputField } from "@/components/InputField";
import { Submit } from "@/pages/logga-in";
import { api } from "@/utils/api";
import { useRouter } from "next/router";


export function AdminLogin({
  t,
  login,
}: {
  t: Locale;
  login: (password: string) => Promise<string | undefined>;
}) {
  const router = useRouter();
  const locale = t.locale;
  const trpc = api.useContext();

  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  const [state, setState] = useState<"email" | "code">("email");

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
      login("ok");
    },
  });

  // Redirect if already logged in
  useEffect(() => {
    if (!getIsLoggedIn.isSuccess) return;
    if (isLoggedIn == true){
      login("ok");
      //router.push("/utst%C3%A4llare");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (finishLogin.data?.ok) {
      //router.push("/utställare");
      login("ok");
      trpc.admin.invalidate();
    }
  }, [finishLogin]);

  useEffect(() => {
    if (typeof router.query.code === "string") {
      setState("code");
      setCode(router.query.code);
      finishLogin.mutate({ current_url: window.location.href, exhibitorId: "" });
    }
  }, [router.query.code]);

  return (
    <>
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
*/

/*export function AdminLogin({
  t,
  login,
}: {
  t: Locale;
  login: (password: string) => Promise<string | undefined>;
}) {
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  function Submit({ value }: { value: string }) {
    return (
      <input
        type="submit"
        value={value}
        className="
          bg-cerise transition-transform hover:scale-110 focus:scale-110
          focus:outline-none text-white uppercase w-fit mx-auto py-2 px-10
          rounded-full cursor-pointer disabled:cursor-wait disabled:grayscale
        "
      />
    );
  }

  return (
    <div className="mx-auto flex flex-col items-center text-center mb-40">
      <h1 className="text-cerise pt-[200px] mb-16 text-5xl font-medium uppercase">
        {t.admin.login.title}
      </h1>

      <form
        className="flex flex-col gap-12 min-w-[325px]"
        onSubmit={async (e) => {
          e.preventDefault();
          setError("");
          setError(await login(password) ?? "");
        }}
      >
        <div className="py-4 px-4 rounded-lg bg-darkblue bg-opacity-90">
          <InputField
            name="password"
            value={password}
            type="password"
            autoComplete="current-password"
            setValue={setPassword}
            fields={{ password: t.admin.login.password }}
            />
        </div>
        <Submit value={t.login.confirm} />
      </form>
      {error && (
        <p className="text-red-500 font-bold mt-6">{error}</p>
      )}
    </div>
  );
}
*/