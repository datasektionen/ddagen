import Locale from "@/locales";
import { Dispatch } from "react";
import { User } from "@/shared/Classes";

export function EditUser({
  t,
  pos,
  users,
  setPos,
  editState,
  setEditState,
}: {
  t: Locale;
  pos: number;
  users: User[];
  setPos: Dispatch<number>;
  editState: undefined | string;
  setEditState: Dispatch<undefined | string>;
}) {
  return (
    <div className="relative w-[80%] py-5 px-3 mb-12 bg-black/25 border-solid border-yellow border-2 rounded-xl overflow-hidden ">
      <table>
        <tbody
          className="text-lg [&>tr>td]:text-right [&>tr>td>label]:font-normal [&>tr>td>label]:text-white
                      [&>tr>td>input]:bg-transparent [&>tr>td>input]:outline-none [&>tr>td>input]:w-[250px]
                      [&>tr>td>input]:ml-2 [&>tr>td>input]:font-light"
        >
          <tr>
            <td>
              <label htmlFor="name">
                {t.exhibitorSettings.fieldsAddContact.name}:
              </label>
            </td>
            <td>
              <input
                type="text"
                name="name"
                value={users[pos].name}
                disabled={true}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="phoneNumber">
                {t.exhibitorSettings.fieldsAddContact.phone}:
              </label>
            </td>
            <td>
              <input
                type="text"
                name="phoneNumber"
                value={users[pos].phone}
                disabled={true}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="email">
                {t.exhibitorSettings.fieldsAddContact.email}:
              </label>
            </td>
            <td>
              <input
                type="text"
                name="email"
                value={users[pos].email}
                disabled={true}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="role">
                {t.exhibitorSettings.fieldsAddContact.role}:
              </label>
            </td>
            <td>
              <input
                type="text"
                name="role"
                value={users[pos].role}
                disabled={true}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="absolute right-2 top-2">
        <button
          className={`${
            editState == users[pos].id ? "hidden" : "bg-editIcon bg-white"
          } bg-[length:30px_30px] w-[33px] h-[33px] bg-no-repeat bg-origin-content
              pl-1 pb-1 rounded-md hover:scale-105 transition-transform`}
          onClick={() => {
            setPos(pos);
            setEditState(users[pos].id);
          }}
        />
      </div>
    </div>
  );
}
