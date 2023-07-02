import Locale from "@/locales";
import { Dispatch, useState, useEffect } from "react";
import { InputField } from "./InputField";
import { User } from "@/shared/Classes";
import { api } from "@/utils/api";

export function AddUser({
  t,
  pos,
  users,
  setUsers,
  editState,
  setEditState,
}: {
  t: Locale;
  pos: number;
  users: User[];
  setUsers: Dispatch<User[]>;
  editState: undefined | string;
  setEditState: Dispatch<undefined | string>;
}) {
  const [user, setUser] = useState(users[pos]);

  const setUserMutation = api.exhibitor.setUsers.useMutation();
  const deleteUserMutation = api.exhibitor.deleteUser.useMutation();

  function handle_submission(e: any) {
    e.preventDefault();
    setUserMutation.mutate({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      locale: t.locale,
    });
    setEditState(undefined);
  }

  function deleteUserInDatabase() {
    deleteUserMutation.mutate({ id: users[pos].id, locale: t.locale });
    setEditState(undefined);
  }

  useEffect(() => {
    if (pos < users.length) setUser(users[pos]);
  }, [users, pos]);

  useEffect(() => {
    if (setUserMutation.data) {
      if (!setUserMutation.data.ok) alert(setUserMutation.data.error);
      else if (setUserMutation.data.ok && setUserMutation.data.update)
        setUsers(
          users.map((u, i) =>
            i == 0 ? new User(undefined, "", "", "", "") : i == pos ? user : u
          )
        );
      else
        setUsers([
          ...users.map((u, i) =>
            i == 0 ? new User(undefined, "", "", "", "") : u
          ),
          { ...user, id: setUserMutation.data.id },
        ]);
      setUserMutation.reset();
    }

    if (deleteUserMutation.data) {
      if (!deleteUserMutation.data.ok) alert(deleteUserMutation.data.error);
      else setUsers(users.filter((u) => u.id != user.id));
      deleteUserMutation.reset();
    }
  }, [setUserMutation.isSuccess, deleteUserMutation.isSuccess]);

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
            setUser({ ...user, name: name });
          }}
          fields={t.exhibitorSettings.fieldsAddContact}
        />
        <InputField
          type="tel"
          name="phone"
          value={user.phone}
          setValue={(phone) => {
            setUser({ ...user, phone: phone });
          }}
          fields={t.exhibitorSettings.fieldsAddContact}
        />
        <InputField
          type="email"
          name="email"
          value={user.email}
          setValue={(email) => {
            setUser({ ...user, email: email });
          }}
          fields={t.exhibitorSettings.fieldsAddContact}
        />
        <InputField
          type="text"
          name="role"
          value={user.role}
          setValue={(role) => {
            setUser({ ...user, role: role });
          }}
          fields={t.exhibitorSettings.fieldsAddContact}
        />

        <div className="flex flex-row gap-x-8 mt-4 justify-center">
          <button type="button" onClick={deleteUserInDatabase}>
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
