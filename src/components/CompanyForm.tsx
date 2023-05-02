import { type FormEvent, useState } from "react";
import type Locale from "@/locales";
import { api } from "@/utils/api";
import { validateOrganizationNumber } from "@/shared/validateOrganizationNumber";

function InputField({
  name,
  type = "text",
  pattern,
  value,
  setValue,
  t,
}: {
  name: keyof Locale["companyForm"]["fields"];
  type?: React.HTMLInputTypeAttribute;
  pattern?: string;
  value: string;
  setValue: (value: string, element: HTMLInputElement) => void;
  t: Locale;
}) {
  return (
    <div className="my-16 relative">
      <input
        required
        placeholder=" "
        type={type}
        pattern={pattern}
        className="
          w-full py-2 px-1 leading-tight
          bg-transparent appearance-none
          text-slate-400
          border-0 border-b-2 border-red-500 valid:border-slate-400
          placeholder-shown:border-slate-400 focus:border-cerise
          focus:outline-none
          peer
        "
        id={name}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value, e.target)}
      />
      <label
        htmlFor={name}
        className="
          transform transition-all absolute top-0 left-0 -translate-y-full
          text-slate-400 peer-focus:text-cerise font-medium
          peer-focus:-translate-y-full peer-placeholder-shown:translate-y-0
          cursor-text autofill:bg-transparent uppercase
          md:peer-placeholder-shown:text-lg md:text-sm md:peer-focus:text-sm
          peer-placeholder-shown:text-xs text-[9px] peer-focus:text-[9px]
        "
      >
        {t.companyForm.fields[name]}:
      </label>
    </div>
  );
}

export default function CompanyForm({
  t,
  onRegistationDone,
}: {
  t: Locale;
  onRegistationDone: () => void;
}) {
  const register = api.exhibitor.register.useMutation();

  const [companyName, setCompanyName] = useState("");
  const [organizationNumber, setOrganizationNumber] = useState("");
  const [email, setEmail] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  async function addCompanyDocument(e: FormEvent) {
    e.preventDefault();
    register.mutate({
      companyName,
      organizationNumber,
      email,
      contactPerson,
      phoneNumber,
      locale: t.locale,
    });
  }

  if (register.isSuccess && register.data.ok) onRegistationDone();

  function trySetOrganizationNumber(value: string, element: HTMLInputElement) {
    value = value.replace(/[^0-9- ]/g, "");

    const res = validateOrganizationNumber(value);
    if ("error" in res) {
      element.setCustomValidity(t.error[res.error]);
    } else {
      element.setCustomValidity("");
    }

    setOrganizationNumber(value);
  }

  return (
    <div className="w-full flex flex-col justify-center items-center pt-[200px] pb-40">
      <h1 className="text-center text-3xl md:text-5xl font-medium text-cerise uppercase">
        {t.companyForm.title}
      </h1>
      <p className="text-center min-w-[100px] max-w-[400px] w-full text-white mt-10"> {t.companyForm.description}</p>
      <form
        className="bg-transparent w-3/5 mt-12"
        onSubmit={addCompanyDocument}
      >
        <InputField
          name="name"
          value={companyName}
          setValue={setCompanyName}
          t={t}
        />
        <InputField
          name="organizationNumber"
          value={organizationNumber}
          setValue={trySetOrganizationNumber}
          t={t}
        />
        <InputField
          name="email"
          type="email"
          value={email}
          setValue={setEmail}
          t={t}
        />
        <InputField
          name="contactPerson"
          value={contactPerson}
          setValue={setContactPerson}
          t={t}
        />
        <InputField
          name="phoneNumber"
          type="tel"
          value={phoneNumber}
          setValue={setPhoneNumber}
          t={t}
        />

        <div className="flex flex-col items-center justify-between">
          <input
            type="submit"
            disabled={register.isLoading}
            value={t.companyForm.confirm}
            className="
              bg-cerise transition-transform hover:scale-110 focus:scale-110 focus:outline-none
              text-white font-bold uppercase
              py-2 px-4 rounded-full cursor-pointer disabled:cursor-wait disabled:grayscale
            "
          />
        </div>
        {register.data?.error == "duplicate-email" ? (
          <div className="flex items-center flex-col gap-3">
            <p className="text-red-500 mt-5">
              {t.error.duplicateEmail}
            </p>
          </div>
        ) : register.data?.error == "send-email" ? (
          <div className="flex items-center flex-col gap-3">
            <p className="text-red-500 mt-5">
              {t.error.exhibitorRegistrationEmail}
            </p>
            <button onClick={onRegistationDone} className="
              text-center bg-cerise transition-transform hover:scale-110 focus:scale-110 focus:outline-none
              text-white font-bold uppercase py-2 px-4 rounded-full cursor-pointer
            ">
              {t.companyForm.ignoreError}
            </button>
          </div>
        ) : register.error ? (
          <p className="text-red-500 text-center mt-5">
            {t.error.exhibitorRegistration}{" "}
            <a
              href={
                "mailto:sales@ddagen.se?body=" +
                encodeURIComponent(
                  `Namn: ${companyName}.\n` +
                  `Organisationsnummer: ${organizationNumber}.\n` +
                  `E-post: ${email}.\n` +
                  `Kontaktperson: ${contactPerson}.\n` +
                  `Telefonnummer: ${phoneNumber}.\n`
                )
              }
              className="text-cerise hover:underline"
            >
              sales@ddagen.se
            </a>
          </p>
        ) : null}
      </form>
    </div>
  );
}
