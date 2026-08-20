import { api } from "@/utils/api";
import { useLocale } from "@/locales";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { InputField } from "@/components/InputField";
import Head from "next/head";
import ExhibitorLayout from "@/shared/exhibitorLayout";

// TODO hook the next button to the save features
// Maby break save changes into a separate steps for each page
// Add Logic to figure out saved state

export default function ExhibitorOverview({
    children
} : {
    children: React.ReactElement
}) {
  const t = useLocale();
  const router = useRouter();
  const trpc = api.useContext();

  // States
  const [name, setName] = useState<string>("");

  const getName = api.exhibitor.getName.useQuery();

  useEffect(() => {
    if(!getName.isSuccess) return;
    setName(getName.data.name)
  }, [getName.data]);

  return(
    <>
      <ExhibitorLayout>
        <div className="flex flex-col gap-2">
            <h2 className="uppercase text-cerise text-2xl md:text-4xl font-normal px-[10px] break-words w-full text-center pt-4">
                {name}
            </h2>
            <p className="text-white text-center">Fill out your company information</p>
        </div>
      </ExhibitorLayout>
    </>
  );
}
