import { api } from "@/utils/api";
import { useLocale } from "@/locales";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { InputField } from "@/components/InputField";
import Head from "next/head";

// TODO hook the next button to the save features
// Maby break save changes into a separate steps for each page
// Add Logic to figure out saved state

export default function ExhibitorLayout({
    children
} : {
    children: React.ReactElement
}) {
  const t = useLocale();
  /*
  const router = useRouter();
  // States
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [editState, setEditState] = useState<boolean>(false);
  const setNameMutation = api.exhibitor.setName.useMutation();

  const getName = api.exhibitor.getName.useQuery();
  const getIsLoggedIn = api.account.isLoggedIn.useQuery(undefined, {
    onSuccess: (data: any) => {
      setIsLoggedIn(data);
    },
  });

  // Manage login
  useEffect(() => {
    if (!getIsLoggedIn.isSuccess) return;
    if (isLoggedIn == false) router.push("/logga-in");
  }, [isLoggedIn]);

  useEffect(() => {
    if(!getName.isSuccess) return;
    setName(getName.data.name)
  }, [getName.data]);

  async function editCompanyName() {
    if (editState) {
      await setNameMutation.mutateAsync(name);
    }
    setEditState(!editState);
  }
  */
  return(
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="xl:w-[1200px] lg:w-[1000px] w-full">

      </div>
      <div className="mx-auto flex flex-col items-center py-40 cursor-default bg-darkblue bg-opacity-75">
        {/*Header*/}
        <h1 className="uppercase text-cerise text-3xl md:text-5xl font-medium text-center px-[10px] break-words">
          {t.exhibitorSettings.header}
        </h1>
        <div className="flex flex-row items-center gap-4 mt-4">
        {/*}
        <div className="flex flex-row items-center gap-4 mt-4">
            <h2 className="text-white text-xl pt-2">
                {editState ? <InputField
                value={name}
                name="companyName"
                fields={t.exhibitorSettings.fields}
                setValue={setName}
                />
                :
                name}
            </h2>
            <a
            className={`hover:cursor-pointer ${
                editState
                ? "block uppercase hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base font-normal mt-4 px-8 py-2 max-lg:mx-auto w-max"
                : "hover:scale-105 transition-transform bg-editIcon bg-white bg-[length:30px_30px] w-[33px] h-[33px] bg-no-repeat bg-origin-content mt-4 pl-1 pb-1 rounded-md"
                }`}
                onClick={editCompanyName}
                >{editState && t.exhibitorSettings.table.row1.section2.save}</a>
            </div>
            */}
        </div>
        {children}
      </div>
    </>
  );
}
