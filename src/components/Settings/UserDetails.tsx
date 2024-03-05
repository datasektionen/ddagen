import Locale from "@/locales";
import { api } from "@/utils/api";
import { EditUser } from "./EditUser";
import { AddUser } from "./AddUser";
import { useState, useEffect } from "react";
import { User } from "@/shared/Classes";

export function UserDetails({ t }: { t: Locale }) {
  const defaultUser = new User(undefined, "", "", "", "");

  const getUsers = api.exhibitor.getUsers.useQuery();

  const [pos, setPos] = useState(0);
  const [users, setUsers] = useState([defaultUser]);
  const [editState, setEditState] = useState<undefined | string>(undefined);

  useEffect(() => {
    setPos(0);
  }, [users]);

  useEffect(() => {
    if (!getUsers.isSuccess) return;
    setUsers([defaultUser].concat(getUsers.data));
  }, [getUsers.isSuccess]);

  return (
    <div className="w-full flex flex-col items-center">
      {users.slice(1).map((user, pos) => (
        <div className="w-full flex flex-col items-center" key={user.email}>
          <EditUser
            t={t}
            pos={pos + 1}
            users={users}
            setPos={setPos}
            editState={editState}
            setEditState={setEditState}
          />
        </div>
      ))}
      <AddUser
        t={t}
        pos={pos}
        users={users}
        setUsers={setUsers}
        editState={editState}
        setEditState={setEditState}
      />
    </div>
  );
}
