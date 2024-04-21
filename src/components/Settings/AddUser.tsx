import Locale from "@/locales";
import { type Dispatch, useState, useEffect, type FormEvent } from "react";
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
  const defaultUser = new User(undefined, "", "", "", "");

  const [user, setUser] = useState(users[pos]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const setUserMutation = api.exhibitor.setUsers.useMutation();
  const deleteUserMutation = api.exhibitor.deleteUser.useMutation();

  function handleSubmission(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUserMutation.mutate({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      locale: t.locale,
    });
  }

  function deleteUserInDatabase() {
    const id = users[pos].id;
    if (!id) {
      setErrorMessage(t.exhibitorSettings.table.row1.section3.alerts.errorDeleteUserWithoutID);
      return;
    }
    deleteUserMutation.mutate({ id, locale: t.locale });
  }

  useEffect(() => {
    if (pos < users.length) setUser(users[pos]);
  }, [users, pos]);

  useEffect(() => {
    if (setUserMutation.data) {
      if (setUserMutation.data.ok) {
        if (setUserMutation.data.update)
          setUsers(
            users.map((u, i) => (i == 0 ? defaultUser : i == pos ? user : u))
          );
        else
          setUsers([
            ...users.map((u, i) => (i == 0 ? defaultUser : u)),
            { ...user, id: setUserMutation.data.id },
          ]);
        setEditState(undefined);
      } else {
        if (errorMessage == undefined)
          setErrorMessage(setUserMutation.data.error);
      }
      setUserMutation.reset();
    } else if (setUserMutation.isError) {
      setErrorMessage(t.error.unknown);
    }

    if (deleteUserMutation.data) {
      if (deleteUserMutation.data.ok) {
        setUsers(users.filter((u) => u.id != user.id));
        setEditState(undefined);
      } else {
        if (errorMessage == undefined)
          setErrorMessage(deleteUserMutation.data.error);
      }
      deleteUserMutation.reset();
    } else if (deleteUserMutation.isError) {
      setErrorMessage(t.error.unknown);
    }
  }, [
    setUserMutation.isSuccess,
    setUserMutation.isError,
    deleteUserMutation.isSuccess,
    deleteUserMutation.isError,
  ]);

  useEffect(() => {
    if (typeof errorMessage === "string") {
      setTimeout(() => {
        setErrorMessage(undefined);
      }, 3000);
    }
  }, [errorMessage]);

  return (
    <div className="flex flex-col items-center w-[80%] bg-black/25 border-2 border-yellow rounded-xl pb-8 mb-16 overflow-hidden">
      <form
        className="flex flex-col w-[90%] bg-transparent outline-none gap-7 mt-10"
        onSubmit={handleSubmission}
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
          required={false}
          fields={t.exhibitorSettings.fieldsAddContact}
        />

        <div className="flex flex-col max-sm:gap-y-4 sm:flex-row gap-x-8 mt-4 justify-center">
          <button type="button" onClick={deleteUserInDatabase}>
            <a className="block uppercase hover:scale-105 transition-transform  rounded-full text-white text-base font-normal px-8 py-2 max-lg:mx-auto w-max">
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
        {errorMessage && (
          <p className="text-red-500 font-bold text-border-black text-center">
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
}
