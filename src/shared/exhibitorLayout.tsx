import { api } from "@/utils/api";
import { useLocale } from "@/locales";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { InputField } from "@/components/InputField";
import Head from "next/head";
import Link from "next/link";

// TODO hook the next button to the save features
// Maby break save changes into a separate steps for each page
// Add Logic to figure out saved state

const exhibitorNav = [
  {
    text: "Översikt",
    url: "/utställare/"
  },
  {
    text: "Företagsinformation",
    url: "/utställare/info"
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
    text: "Biljetter",
    url: "/utställare/biljetter"
  },
  {
    text: "Extrabeställningar",
    url: "/utställare/extra"
  },
  {
    text: "FAQ",
    url: "/utställare/faq"
  },
]

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
      <div className="xl:w-[1200px] lg:w-[1000px] w-full mx-auto">
        <div className="mx-auto flex flex-col items-center py-40 cursor-default bg-darkblue bg-opacity-75">
          {/*Header*/}
          <h1 className="uppercase text-cerise text-3xl md:text-5xl font-medium text-center px-[10px] break-words">
            {t.exhibitorSettings.header}
          </h1>
          <div className="flex w-full flex-row items-center gap-4 mt-4">
            <div className="flex flex-col gap-2 min-w-xs">
              {exhibitorNav.map(((navItem, i) => (
                <div className="w-full" key={i}>
                  <Link href={navItem.url} className="text-lg font-medium text-white hover:text-cerise">
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
