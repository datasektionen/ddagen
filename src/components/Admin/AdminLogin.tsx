import Locale from "@/locales";
import { useState } from "react";
import { InputField } from "@/components/InputField";

export function AdminLogin({
  t,
  login,
}: {
  t: Locale;
  login: (password: string) => Promise<boolean>;
}) {
  const [error, setError] = useState(false);
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
          if (!await login(password)) setError(true);
        }}
      >
        <InputField
          name="password"
          value={password}
          type="text"
          setValue={setPassword}
          fields={{ password: t.admin.login.password }}
        />
        <Submit value={t.login.confirm} />
      </form>
      {error && (
        <p className="text-red-500 font-bold mt-6">{t.error.unknown}</p>
      )}
    </div>
  );
}
