import Locale from "@/locales";
import { Dispatch } from "react";
import { InputField } from "./InputField";
import { User } from "./Classes";

export function AddContact({
  t,
  user,
  setUser,
  editState,
  setEditState,
}: {
  t: Locale;
  user: User;
  setUser: Dispatch<User>;
  editState: boolean;
  setEditState: Dispatch<boolean>;
}) {
  return (
    <div className="flex flex-col items-center w-[80%] bg-white/40 border-2 border-white/70 rounded-xl pb-8 mb-16">
      <form className="flex flex-col w-[90%] bg-transparent outline-none gap-7 my-8">
        <InputField
          type="text"
          name="name"
          value={editState ? user.name : ""}
          setValue={(name) => {
            setUser(new User(name, user.phoneNumber, user.email, user.role));
          }}
          fields={t.exhibitorSettings.fieldsAddContact}
        />
        <InputField
          type="text"
          name="phoneNumber"
          value={editState ? user.phoneNumber : ""}
          setValue={(phoneNumber) => {
            setUser(new User(user.name, phoneNumber, user.email, user.role));
          }}
          fields={t.exhibitorSettings.fieldsAddContact}
        />
        <InputField
          type="text"
          name="email"
          value={editState ? user.email : ""}
          setValue={(email) => {
            setUser(new User(user.name, user.phoneNumber, email, user.role));
          }}
          fields={t.exhibitorSettings.fieldsAddContact}
        />
        <InputField
          type="text"
          name="role"
          value={editState ? user.role : ""}
          setValue={(role) => {
            setUser(new User(user.name, user.phoneNumber, user.email, role));
          }}
          fields={t.exhibitorSettings.fieldsAddContact}
        />
      </form>

      <div className="flex flex-row gap-x-8">
        <button>
          <a
            className="block uppercase hover:scale-105 transition-transform bg-[#A7A7A7] rounded-full text-white text-base font-normal px-8 py-2 max-lg:mx-auto w-max"
            href=""
          >
            {t.exhibitorSettings.table.row1.section3.remove}
          </a>
        </button>
        <button
          onClick={() => {
            setEditState(false);
          }}
        >
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
