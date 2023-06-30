import Locale from "@/locales";
import { Dispatch } from "react";
import { InputField } from "./InputField";
import { User } from "@/shared/Classes";

export function AddUser({
  t,
  user,
  setUser,
  defaultUser,
  editState,
  setEditState,
  setUserInDatabase,
  deleteUserInDatabase,
}: {
  t: Locale;
  user: User;
  setUser: Dispatch<User>;
  defaultUser: User;
  editState: boolean;
  setEditState: Dispatch<boolean>;
  setUserInDatabase: () => void;
  deleteUserInDatabase: () => void;
}) {
  function handle_submission(e: any) {
    e.preventDefault();
    setEditState(false);
    setUserInDatabase();
    setUser(defaultUser);
  }
  return (
    <div className="flex flex-col items-center w-[80%] bg-white/40 border-2 border-white/70 rounded-xl pb-8 mb-16">
      <form
        className="flex flex-col w-[90%] bg-transparent outline-none gap-7 mt-10"
        onSubmit={handle_submission}
      >
        <InputField
          type="text"
          name="name"
          value={user.name}
          setValue={(name) => {
            setUser(new User(user.id, user.email, name, user.phone, user.role));
          }}
          fields={t.exhibitorSettings.fieldsAddContact}
        />
        <InputField
          type="tel"
          name="phone"
          value={user.phone}
          setValue={(phone) => {
            setUser(new User(user.id, user.email, user.name, phone, user.role));
          }}
          fields={t.exhibitorSettings.fieldsAddContact}
        />
        <InputField
          type="email"
          name="email"
          value={user.email}
          setValue={(email) => {
            setUser(new User(user.id, email, user.name, user.phone, user.role));
          }}
          fields={t.exhibitorSettings.fieldsAddContact}
        />
        <InputField
          type="text"
          name="role"
          value={user.role}
          setValue={(role) => {
            setUser(new User(user.id, user.email, user.name, user.phone, role));
          }}
          fields={t.exhibitorSettings.fieldsAddContact}
        />

        <div className="flex flex-row gap-x-8 mt-4 justify-center">
          <button onClick={deleteUserInDatabase}>
            <a className="block uppercase hover:scale-105 transition-transform bg-[#A7A7A7] rounded-full text-white text-base font-normal px-8 py-2 max-lg:mx-auto w-max">
              {t.exhibitorSettings.table.row1.section3.delete}
            </a>
          </button>
          <button type="submit">
            <a className="block uppercase hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base font-normal px-8 py-2 max-lg:mx-auto w-max">
              {editState
                ? t.exhibitorSettings.table.row1.section3.save
                : t.exhibitorSettings.table.row1.section3.add}
            </a>
          </button>
        </div>
      </form>
    </div>
  );
}
