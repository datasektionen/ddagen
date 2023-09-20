import { InputField } from "@/components/InputField";
import { useLocale } from "@/locales";
import { api } from "@/utils/api";
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

  const startLogin = api.account.startLogin.useMutation();
  const finishLogin = api.account.finishLogin.useMutation();
  const getIsLoggedIn = api.account.isLoggedIn.useQuery(undefined, {
    onSuccess: (data) => {
      setIsLoggedIn(data);
    },
  });

  useEffect(() => {
    if (!getIsLoggedIn.isSuccess) return;
    if (isLoggedIn == true) router.push("/utst%C3%A4llare");
  }, [isLoggedIn]);

  useEffect(() => {
    if (startLogin.isSuccess) {
      setState("code");
    }
  }, [startLogin]);

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
      finishLogin.mutate(router.query.code);
    }
  }, [router.query.code]);

  return (
    <div className="mx-auto flex flex-col items-center text-center mb-40">
      <h1 className="text-cerise pt-[200px] mb-16 text-5xl font-medium uppercase">
        {t.login.title}
      </h1>
      {state === "email" ? (
        <>
          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              startLogin.mutate({ email, locale });
            }}
          >
            <InputField
              name="email"
              value={email}
              type="email"
              setValue={setEmail}
              fields={{ email: t.login.email }}
            />
            <p className="text-white max-w-xs">{t.login.emailText}</p>
            <Submit value={t.login.confirm} loading={startLogin.isLoading} />
          </form>
          {startLogin.error && (
            <p className="text-red-500 font-bold mt-6">{t.error.unknown}</p>
          )}
        </>
      ) : (
        <>
          <form
            className="flex flex-col gap-6 items-center"
            onSubmit={(e) => {
              e.preventDefault();
              finishLogin.mutate(code);
            }}
          >
            <InputField
              name="code"
              value={code}
              type="text"
              setValue={setCode}
              fields={{ code: t.login.confirmationCode }}
              class="w-96"
            />
            <p className="text-white max-w-xs">
              {t.login.confirmationCodeText1}
              <span className="font-bold">{email}</span>
              {t.login.confirmationCodeText2}
            </p>
            <Submit value={t.login.confirm} loading={finishLogin.isLoading} />
          </form>
          {finishLogin.data?.error && (
            <p className="text-red-500 font-bold mt-6">
              {t.error[finishLogin.data.error]}
            </p>
          )}
          {finishLogin.error && (
            <p className="text-red-500 font-bold mt-6">{t.error.unknown}</p>
          )}
        </>
      )}
    </div>
  );
}
