import Locale from "@/locales";
import { api } from "@/utils/api";
import { useState, useEffect, Dispatch } from "react";
import { InputField } from "@/components/InputField";

export function AdminLogin({
  t,
  setIsLoggedIn,
}: {
  t: Locale;
  setIsLoggedIn: Dispatch<boolean>;
}) {
  const confirmSalesAdmin = api.account.confirmSalesAdmin.useMutation();

  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (confirmSalesAdmin.data == true) setIsLoggedIn(true);
    else if (confirmSalesAdmin.data == false) setError(true);
  }, [confirmSalesAdmin]);

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
        onSubmit={(e) => {
          e.preventDefault();
          confirmSalesAdmin.mutate({ username: username, password: password });
        }}
      >
        <InputField
          name="username"
          value={username}
          type="text"
          setValue={setUsername}
          fields={{ username: t.admin.login.username }}
        />
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
