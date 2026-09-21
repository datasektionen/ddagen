import { InputField } from "@/components/InputField";
import { useLocale } from "@/locales";
import { api } from "@/utils/api";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export function Submit({ value, loading, className }: { value: string; loading: boolean, className?: string }) {
  return (
    <input
      type="submit"
      disabled={loading}
      value={value}
      className={`
        bg-cerise transition-transform hover:scale-110 focus:scale-110
        focus:outline-none text-white uppercase w-fit mx-auto py-2 px-10
        rounded-full cursor-pointer disabled:cursor-wait disabled:grayscale
        ${className}
      `}
    />
  );
}

export default function Login() {
  const t = useLocale();
  const router = useRouter();
  const trpc = api.useContext();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [accountType, setAccountType] = useState<"company">();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSetCode = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    if (numericValue.length <= 6) {
      setCode(numericValue);
    }
  }

  const getIsLoggedIn = api.account.isLoggedIn.useQuery(undefined, {
    onSuccess: (data) => {
      if (data?.ok) {
        router.push(data.isAdmin ? "/admin/sales" : "/utställare");
      }
    },
  });

  const requestOtp = api.account.requestOtp.useMutation({
    onSuccess: () => {
      setStep("otp");
      setErrorMsg("");
    },
    onError: () => setErrorMsg(t.error?.unknown || "An error occurred."),
  });

  const verifyOtp = api.account.verifyOtp.useMutation({
    onSuccess: (data) => {
      if (data.error) {
        setErrorMsg(data.error === "invalidCode" ? "Invalid code." : "Code expired or too many attempts.");
        return;
      }
      trpc.account.invalidate();
      router.push(data.isAdmin ? "/admin/sales" : "/utställare");
    },
    onError: () => setErrorMsg(t.error?.unknown || "An error occurred."),
  });

  // Keep OIDC as a fallback/alternative option if required
  const startOidcLogin = api.account.startLogin.useMutation({
    onSuccess: (data) => {
      if (data?.url) window.location.href = data.url;
    }
  });

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="mx-auto flex flex-col items-center text-center mb-20 max-w-md w-full px-4">
        <h1 className="text-cerise pt-[110px] lg:pt-[140px] mb-4 text-5xl font-medium uppercase">
          {t.login.title}
        </h1>

        {!accountType ? (
          <p className="w-full mb-8 text-left text-white">
            {t.login.paragraph}
          </p>
        ) : (
          <p className="w-full mb-8 text-left text-white">{t.login.companyParagraph}</p>
        )}

        {!accountType && (
          <div className="flex justify-center gap-6 sm:gap-10">
            <button
              type="button"
              disabled={startOidcLogin.isLoading}
              onClick={() => startOidcLogin.mutate({ subpath: router.asPath.split('?')[0] })}
              className="flex h-40 w-40 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-cerise text-center transition-transform hover:scale-105 focus:scale-105 focus:outline-none sm:h-44 sm:w-44"
            >
              <img src="/icons/user-round-key.svg" alt="" className="h-16 w-16 brightness-0 invert" />
              <span className="text-xl text-white">Student</span>
            </button>
            <button
              type="button"
              onClick={() => setAccountType("company")}
              className="flex h-40 w-40 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-cerise text-center transition-transform hover:scale-105 focus:scale-105 focus:outline-none sm:h-44 sm:w-44"
            >
              <img src="/icons/building-complex.svg" alt="" className="h-16 w-16 brightness-0 invert" />
              <span className="text-xl text-white">Company</span>
            </button>
          </div>
        )}

        {accountType === "company" && step === "email" && (
          <form
            className="flex flex-col gap-6 w-full"
            onSubmit={(e) => {
              e.preventDefault();
              if (email) requestOtp.mutate({ email });
            }}
          >
            <InputField
              name="email"
              type="email"
              value={email}
              setValue={setEmail}
              fields={{ email: t.admin.login.email }}
              required
            />
            <Submit value={t.admin.login.otpSendButton} loading={requestOtp.isLoading} />
            
            <div className="mt-8 text-sm text-slate-300 flex flex-col pt-8">
               <p>Or sign in as a KTH Student</p>
               <button 
                 type="button"
                 onClick={() => startOidcLogin.mutate({ subpath: router.asPath.split('?')[0] })}
                 className="text-cerise w-fit mx-auto p-2 underline hover:text-white transition-colors"
               >
                 KTH Student Login
               </button>
            </div>
          </form>
        )}

        {accountType === "company" && step === "otp" && (
          <form
            className="flex flex-col gap-6 w-full"
            onSubmit={(e) => {
              e.preventDefault();
              if (code.length === 6) verifyOtp.mutate({ email, code });
            }}
          >
            <p className="text-white mb-2">{t.admin.login.otpSentDescription} <b>{email}</b>.</p>
            <InputField
              name="otp"
              type="text"
              value={code}
              setValue={handleSetCode}
              fields={{ otp: t.admin.login.otp }}
              required
            />
            <Submit value="Verify & Log In" loading={verifyOtp.isLoading} />
            
            <button
              type="button"
              className="text-sm text-white underline mt-4"
              onClick={() => { setStep("email"); setCode(""); }}
            >
              {t.admin.login.otpCancelButton}
            </button>
          </form>
        )}

        {errorMsg && <p className="text-red-500 font-bold mt-6">{errorMsg}</p>}
      </div>
    </>
  );
}