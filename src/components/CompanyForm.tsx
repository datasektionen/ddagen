import { type FormEvent, useState } from "react";
import firebase from "../../firebase/clientApp";
import type Locale from "@/locales";

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
          border-b-2 border-red-500 valid:border-slate-400
          placeholder-shown:border-slate-400 focus:border-cerise
          focus:outline-none focus:shadow-outline
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
  const db = firebase.firestore();

  const [companyName, setCompanyName] = useState("");
  const [organizationNumber, setOrganizationNumber] = useState("");
  const [email, setEmail] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<"db" | "email" | null>(null);

  async function addCompanyDocument(e: FormEvent) {
    e.preventDefault();
    let addedToDb = false;
    try {
      setLoading(true);
      await db.collection("exhibitor").add({
        companyName,
        organizationNumber,
        email,
        contactPerson,
        phoneNumber,
      });
      addedToDb = true;
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        body: JSON.stringify({
          companyName,
          organizationNumber,
          email,
          contactPerson,
          phoneNumber,
          locale: t.locale,
        }),
      });
      if (!res.ok) throw new Error(res.statusText);
    } catch (err) {
      console.error(err);
      return setError(addedToDb ? "email" : "db");
    } finally {
      setLoading(false);
    }
    onRegistationDone();
  }

  function trySetOrganizationNumber(value: string, element: HTMLInputElement) {
    value = value.replace(/[^0-9- ]/g, "");
    setOrganizationNumber(value);

    let numbers = value
      .split("")
      .filter((c) => !"- ".includes(c))
      .map((c) => parseInt(c));
    if (numbers.length !== 10) {
      element.setCustomValidity(t.companyForm.organizationNumberLength);
      return;
    }

    // https://sv.wikipedia.org/wiki/Luhn-algoritmen
    let checksum =
      numbers
        .map((x, i) => (i % 2 > 0 ? x : x < 5 ? x * 2 : x * 2 - 9))
        .reduce((a, b) => a + b, 0) % 10;
    if (checksum !== 0) {
      element.setCustomValidity(t.companyForm.organizationNumberChecksum);
      return;
    }

    element.setCustomValidity("");
  }

  return (
    <div className="w-full flex flex-col justify-center items-center py-40">
      <h1 className="text-3xl md:text-5xl text-cerise uppercase">
        {t.companyForm.title}
      </h1>

      <form
        method="post"
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
            disabled={loading}
            value={t.companyForm.confirm}
            className="
              bg-cerise transition-transform hover:scale-110 focus:scale-110 focus:outline-none
              text-white font-bold uppercase
              py-2 px-4 rounded-full cursor-pointer disabled:cursor-wait disabled:grayscale
            "
          />
        </div>
        {error == "db" ? (
          <p className="text-red-500 text-center mt-5">
            {t.companyForm.error.db}{" "}
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
        ) : error == "email" ? (
          <div className="flex items-center flex-col gap-3">
            <p className="text-red-500 mt-5">
              {t.companyForm.error.email}
            </p>
            <button onClick={onRegistationDone} className="
              text-center bg-cerise transition-transform hover:scale-110 focus:scale-110 focus:outline-none
              text-white font-bold uppercase py-2 px-4 rounded-full cursor-pointer
            ">
              {t.companyForm.error.continue}
            </button>
          </div>
        ) : null}
      </form>
    </div>
  );
}
