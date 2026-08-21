import { api } from "@/utils/api";
import { useLocale } from "@/locales";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { InputField } from "@/components/InputField";
import Head from "next/head";
import Link from "next/link";
import { cn } from "@/utils/utils";

// TODO hook the next button to the save features
// Maby break save changes into a separate steps for each page
// Add Logic to figure out saved state

const exhibitorNav = {
  sv: [
    {
      text: "Översikt",
      url: "/utställare/"
    },
    {
      text: "Företagsinformation",
      url: "/utställare/info"
    },
    {
      text: "Jobberbjudanden",
      url: "/utställare/jobbannonser"
    },
    {
      text: "Kontaktpersoner",
      url: "/utställare/kontaktpersoner"
    },
    {
      text: "Fakturering",
      url: "/utställare/fakturering"
    },
    {
      text: "Matbiljetter",
      url: "/utställare/matbiljetter"
    },
    {
      text: "Banquetten",
      url: "/utställare/banquetten"
    },
    {
      text: "Extrabeställningar",
      url: "/utställare/extra"
    },
    {
      text: "FAQ",
      url: "/utställare/faq"
    },
  ],
  en: [
    {
      text: "Overview",
      url: "/utställare/"
    },
    {
      text: "Company information",
      url: "/utställare/info"
    },
    {
      text: "Job offers",
      url: "/utställare/jobbannonser"
    },
    {
      text: "Contact persons",
      url: "/utställare/kontaktpersoner"
    },
    {
      text: "Billing",
      url: "/utställare/fakturering"
    },
    {
      text: "Meal tickets",
      url: "/utställare/matbiljetter"
    },
    {
      text: "Banquet",
      url: "/utställare/banquetten"
    },
    {
      text: "Extra orders",
      url: "/utställare/extra"
    },
    {
      text: "FAQ",
      url: "/utställare/faq"
    },
  ],
}

export default function ExhibitorLayout({
    children
} : {
    children: React.ReactElement
}) {
  const t = useLocale();
  const router = useRouter();
  const trpc = api.useContext();

  function normalizePath(path: string) {
    return decodeURIComponent(path).replace(/\/$/, "") || "/";
  }

  const currentPath = normalizePath(router.asPath.split("?")[0]);
  
  const [name, setName] = useState<string>("");
  const [editNameState, setEditNameState] = useState<boolean>(false);

  // States
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const logout = api.admin.logout.useMutation();

  const getName = api.exhibitor.getName.useQuery();
  const setNameMutation = api.exhibitor.setName.useMutation();


  const getIsLoggedIn = api.account.isLoggedIn.useQuery(undefined, {
    onSuccess: (data: any) => {
      setIsLoggedIn(data.ok);
      setIsAdmin(data.isAdmin);
    },
  });

  useEffect(() => {
    //console.log("IS LOGGED IN?", getIsLoggedIn.isSuccess)
    if (!getIsLoggedIn.isSuccess) return;
    if (!isLoggedIn){
      //console.log("IS NOT LOGGED IN, HANDLE LOG OUT")
      handleLogout();
      return;
    }
  }, [getIsLoggedIn.isSuccess, isLoggedIn]);

  const handleLogout = () => {
    //console.log("CALL LOGOUT")
    logout.mutate();
  }

  useEffect(() => {
    //console.log("LOG OUT IS SUCCESS?", logout.isSuccess);
    if (logout.isSuccess && logout.data.status) {
      trpc.account.invalidate();
      router.push("/logga-in");
    }
  }, [logout.isSuccess]);


  useEffect(() => {
    if(!getName.isSuccess) return;
    setName(getName.data.name)
  }, [getName.data]);


  async function editCompanyName() {
    if (editNameState) {
      await setNameMutation.mutateAsync(name);
    }
    setEditNameState(!editNameState);
  }

  const allowNameEdit = false;

  if (!getIsLoggedIn.isSuccess) return null;

  return(
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="xl:w-[1200px] lg:w-[1000px] w-full mx-auto my-36">
        <div className="mx-auto flex flex-1 flex-col items-start py-40 cursor-default bg-darkblue bg-opacity-75">
          {/*Header*/}
          <div className="flex flex-1 w-full flex-col sm:flex-row justify-between items-end">
            <div className="flex flex-col gap-2">
              {isAdmin ?
                <div className="flex flex-row items-center gap-4 mb-2">
                  <h2 className="text-white text-xl" >
                    {editNameState ? <InputField
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
                    editNameState
                    ? "block uppercase hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base font-normal px-8 py-2 max-lg:mx-auto w-max"
                    : "hover:scale-105 transition-transform bg-editIcon bg-white bg-[length:30px_30px] w-[33px] h-[33px] bg-no-repeat bg-origin-content pl-1 pb-1 rounded-md"
                    }`}
                    onClick={editCompanyName}
                    >{editNameState && t.exhibitorSettings.table.row1.section2.save}
                  </a>
                </div>
                :
                <div>
                  <h2 className="text-white text-2xl font-medium" >
                  {name}
                  </h2>
                </div>
              }
              <h1 className="uppercase text-cerise text-3xl md:text-5xl font-medium break-words">
                {t.exhibitorSettings.header}
              </h1>
            </div>
            <div className="flex flex-row items-center gap-4 mb-2">
              <button
                className={cn(
                  "bg-transparent border-[1px] border-white rounded-full text-center hover:scale-105 transition-transform text-white uppercase",
                  "py-1.5 px-3 text-sm",
                  "sm:py-2.5 sm:px-4 sm:text-base"
                )}
                onClick={handleLogout}>
                {t.exhibitorSettings.logoutButton}
              </button>
            </div>
          </div>
          <div className="flex w-full flex-row items-start gap-8 mt-12">
            <div className="flex flex-col gap-2 min-w-xs self-start">
              {exhibitorNav[t.locale].map(((navItem, i) => (
                <div className="w-full" key={i}>
                  <Link
                    href={navItem.url}
                    aria-current={currentPath === normalizePath(navItem.url) ? "page" : undefined}
                    className={`text-lg font-medium transition-colors hover:text-cerise ${
                      currentPath === normalizePath(navItem.url)
                        ? "text-cerise"
                        : "text-white"
                    }`}
                  >
                    {navItem.text}
                  </Link>
                </div>
              )))}
            </div>
            <div className="flex-1">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
