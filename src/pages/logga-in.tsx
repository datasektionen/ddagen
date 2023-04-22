import { InputField } from "@/components/InputField";
import { useLocale } from "@/locales";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Login() {
  const t = useLocale();
  const router = useRouter();
  const locale = t.locale;

  const [state, setState] = useState<"email" | "code">("email");

  const [email, setEmail] = useState("");
  const login = api.account.login.useMutation();

  const [code, setCode] = useState("");
  const confirmationCode = api.account.confirmationCode.useMutation();

  useEffect(() => {
    if (login.data?.ok) {
      setState("code");
    }
  }, [login]);

  useEffect(() => {
    if (confirmationCode.data?.ok) {
      router.replace("/"); // TODO: go to account page
    }
  }, [confirmationCode]);

  useEffect(() => {
    if (typeof router.query.code === "string") {
      setState("code");
      setCode(router.query.code);
      confirmationCode.mutate(router.query.code);
    }
  }, [router.query.code]);

  return (
    <div className="mx-auto flex flex-col items-center text-center py-40">
      <h1 className="md:max-w-2xl md:text-5xl mx-10 text-3xl text-cerise uppercase mb-14">{t.login.title}</h1>
      {state === "email" ? <>
        <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); login.mutate({ email, locale }); }}>
          <InputField
            name="email"
            value={email}
            type="email"
            setValue={setEmail}
            fields={{ email: t.login.email }}
          />
          <p className="text-white max-w-xs">{t.login.emailText}</p>
          <input
            type="submit"
            disabled={login.isLoading}
            value={t.login.confirm}
            className="
              bg-cerise transition-transform hover:scale-110 focus:scale-110 focus:outline-none
              text-white font-bold uppercase
              py-2 px-4 rounded-full cursor-pointer disabled:cursor-wait disabled:grayscale
            "
          />
        </form>
        {login.data?.error && (
          <p className="text-red-500 font-bold mt-6">{t.error[login.data.error]}</p>
        )}
        {login.error && (
          <p className="text-red-500 font-bold mt-6">{t.error.unknown}</p>
        )}
      </> : <>
        <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); confirmationCode.mutate(code); }}>
          <InputField
            name="code"
            value={code}
            type="text"
            setValue={setCode}
            fields={{ code: t.login.confirmationCode }}
            class="w-96"
          />
          <p className="text-white max-w-xs">{t.login.confirmationCodeText}</p>
          <input
            type="submit"
            disabled={confirmationCode.isLoading}
            value={t.login.confirm}
            className="
              bg-cerise transition-transform hover:scale-110 focus:scale-110 focus:outline-none
              text-white font-bold uppercase
              py-2 px-4 rounded-full cursor-pointer disabled:cursor-wait disabled:grayscale
            "
          />
        </form>
        {confirmationCode.data?.error && (
          <p className="text-red-500 font-bold mt-6">{t.error[confirmationCode.data.error]}</p>
        )}
        {confirmationCode.error && (
          <p className="text-red-500 font-bold mt-6">{t.error.unknown}</p>
        )}
      </>}
    </div>
  );
}
