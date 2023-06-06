import Locale from "@/locales";
import { useState } from "react";

export function EditContact({ t }: { t: Locale }) {
  const [editState, setEditState] = useState(false);
  // Should be removed and fed into the function
  const [name, setName] = useState("Anders Andersson");
  const [phoneNumber, setPhoneNumber] = useState("07012345567");
  const [email, setEmail] = useState("anders.anderssson@företag.se");
  const [role, setRole] = useState("Art director");

  return (
    <div className="relative w-[80%] py-5 px-3 mt-6 mb-12 bg-white/40 border-2 border-white/70 rounded-xl">
      <table>
        <tbody
          className={`text-lg [&>tr>td]:text-right [&>tr>td>label]:font-normal [&>tr>td>label]:text-[#555555] 
                        [&>tr>td>input]:bg-transparent [&>tr>td>input]:outline-none [&>tr>td>input]:w-[250px] 
                        [&>tr>td>input]:ml-2 [&>tr>td>input]:font-light
                        ${
                          editState
                            ? "[&>tr>td>input]:border-b-2 [&>tr>td>input]:border-solid [&>tr>td>input]:border-white [&>tr>td>input]:mb-2"
                            : ""
                        }
                         `}
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
                value={name}
                disabled={!editState}
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
                value={phoneNumber}
                disabled={!editState}
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
                value={email}
                disabled={!editState}
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
                value={role}
                disabled={!editState}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="absolute right-2 top-2">
        <button
          className={`${
            editState ? "bg-editIcon" : "bg-editIcon"
          } + bg-white bg-[length:30px_30px] w-[33px] h-[33px] bg-no-repeat bg-origin-content 
                pl-1 pb-1 rounded-md hover:scale-105 transition-transform`}
          onClick={() => {
            setEditState(!editState);
          }}
        />
      </div>
    </div>
  );
}
