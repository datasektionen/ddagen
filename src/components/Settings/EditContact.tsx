import Locale from "@/locales";
import { Dispatch } from "react";
import { User } from "../../shared/Classes";

export function EditContact({
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
    <div className="relative w-[80%] py-5 px-3 mt-6 mb-12 bg-white/40 border-2 border-white/70 rounded-xl">
      <table>
        <tbody
          className="text-lg [&>tr>td]:text-right [&>tr>td>label]:font-normal [&>tr>td>label]:text-[#555555] 
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
                value={user.name}
                disabled={true}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="phoneNumber">
                {t.exhibitorSettings.fieldsAddContact.phoneNumber}:
              </label>
            </td>
            <td>
              <input
                type="text"
                name="phoneNumber"
                value={user.phoneNumber}
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
                value={user.email}
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
                value={user.role}
                disabled={true}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="absolute right-2 top-2">
        <button
          className={`${
            editState ? "hidden" : "bg-editIcon bg-white"
          } bg-[length:30px_30px] w-[33px] h-[33px] bg-no-repeat bg-origin-content 
              pl-1 pb-1 rounded-md hover:scale-105 transition-transform`}
          onClick={() => {
            setEditState(true);
            setUser(user);
          }}
        />
      </div>
    </div>
  );
}
