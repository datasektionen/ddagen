import Locale from "@/locales";
import { useState } from "react";
import { InputField } from "./InputField";

export function AddContact({ t }: { t: Locale }) {
  // Should be removed and fed into the function
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  return (
    <div className="flex flex-col items-center w-[80%] bg-white/40 border-2 border-white/70 rounded-xl pb-8 mb-16">
      <form className="flex flex-col w-[90%] bg-transparent outline-none gap-7 my-8">
        <InputField
          type="text"
          name="name"
          value={name}
          setValue={setName}
          fields={t.exhibitorSettings.fieldsAddContact}
        />
        <InputField
          type="text"
          name="phoneNumber"
          value={phoneNumber}
          setValue={setPhoneNumber}
          fields={t.exhibitorSettings.fieldsAddContact}
        />
        <InputField
          type="text"
          name="email"
          value={email}
          setValue={setEmail}
          fields={t.exhibitorSettings.fieldsAddContact}
        />
        <InputField
          type="text"
          name="role"
          value={role}
          setValue={setRole}
          fields={t.exhibitorSettings.fieldsAddContact}
        />
      </form>

      <div className="flex flex-row gap-x-8">
        <button>
          <a
            className="block uppercase hover:scale-105 transition-transform bg-[#A7A7A7] rounded-full text-white text-base font-normal px-8 py-2 max-lg:mx-auto w-max"
            href="#"
          >
            {t.exhibitorSettings.table.row1.section3.remove}
          </a>
        </button>
        <button>
          <a
            className="block uppercase hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base font-normal px-8 py-2 max-lg:mx-auto w-max"
            href="#"
          >
            {t.exhibitorSettings.table.row1.section3.save}
          </a>
        </button>
      </div>
    </div>
  );
}
