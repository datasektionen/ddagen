import Locale from "@/locales";
import { api } from "@/utils/api";
import { EditUser } from "./EditUser";
import { AddUser } from "./AddUser";
import { useState, useEffect } from "react";
import { User } from "@/shared/Classes";
import { NextRouter } from "next/router";

export function UserDetails({ t, router }: { t: Locale; router: NextRouter }) {
  const defaultUser = new User(undefined, "", "", "", "");

  const [user, setUser] = useState<User>(defaultUser);
  const [users, setUsers] = useState<User[]>();
  const [editState, setEditState] = useState(false);

  const getUsers = api.exhibitor.getUsers.useQuery();
  const setUserMutation = api.exhibitor.setUsers.useMutation();
  const deleteUserMutation = api.exhibitor.deleteUser.useMutation();

  function setUserInDatabase() {
    if (user != defaultUser) {
      setUserMutation.mutate({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      });
      window.scrollTo(0, 0);
      router.reload();
    }
  }

  function deleteUserInDatabase() {
    if (user.id) {
      deleteUserMutation.mutate(user.id);
      window.scrollTo(0, 0);
      router.reload();
    }
  }

  useEffect(() => {
    if (!getUsers.isSuccess) return;
    setUsers(getUsers.data);
  }, [getUsers.isSuccess]);

  useEffect(() => {
    if (setUserMutation.data?.ok == false)
      alert(t.exhibitorSettings.table.row1.section3.addUserMessage);
    if (deleteUserMutation.data?.ok == false)
      alert(t.exhibitorSettings.table.row1.section3.deleteMessage);
  }, [setUserMutation, deleteUserMutation]);

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-center uppercase text-cerise text-4xl font-normal px-[10px] break-words mt-6 mb-8">
        {t.exhibitorSettings.table.row1.section3.header}
      </h1>
      {users &&
        users.map((u) => (
          <div className="w-full flex flex-col items-center">
            <EditUser
              t={t}
              user={u}
              setUser={setUser}
              editState={editState}
              setEditState={setEditState}
            />
          </div>
        ))}
      <AddUser
        t={t}
        user={user}
        setUser={setUser}
        defaultUser={defaultUser}
        editState={editState}
        setEditState={setEditState}
        setUserInDatabase={setUserInDatabase}
        deleteUserInDatabase={deleteUserInDatabase}
      />
    </div>
  );
}
