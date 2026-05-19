import { api } from "@/utils/api";
import { useLocale } from "@/locales";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { InputField } from "@/components/InputField";
import Head from "next/head";
import ExhibitorLayout from "@/shared/exhibitorLayout";
import { CompanyDataTable } from "@/components/Company/CompanyDataTable";
import { getOrderColumns } from "@/components/Company/Admin/ExtraOrderColumns";
import { ExtraOrderItem } from "@/shared/Classes";
import { cn } from "@/utils/utils";
import { Select } from "@/components/Select";

// TODO hook the next button to the save features
// Maby break save changes into a separate steps for each page
// Add Logic to figure out saved state

export type ExtraOrderType = "chair" | "table";
type ExtraOrderDetail = {
  name: {
    sv: string;
    en: string;
  },
  price_per_unit: number;
}

const extraOrderDetails: Record<ExtraOrderType, ExtraOrderDetail> = {
  "chair": {
    name: {
      sv: "Stol",
      en: "Chair"
    },
    price_per_unit: 49
  },
  "table": {
    name: {
      sv: "Bord",
      en: "Table"
    },
    price_per_unit: 219
  },
}

export default function ExhibitorExtra({
    children
} : {
    children: React.ReactElement
}) {
  const t = useLocale();
  const router = useRouter();

  // States
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [addItem, setAddItem] = useState<boolean>(false);

  const [itemType, setItemType] = useState<ExtraOrderType>();
  const [itemAmount, setItemAmount] = useState<string>("1");

  const getName = api.exhibitor.getName.useQuery();
  const getIsLoggedIn = api.account.isLoggedIn.useQuery(undefined, {
    onSuccess: (data: any) => {
      setIsLoggedIn(data);
    },
  });

  // Manage login
  useEffect(() => {
    if (!getIsLoggedIn.isSuccess) return;
    //if (isLoggedIn == false) router.push("/logga-in");
  }, [isLoggedIn]);

  
  const extraOrderColumns = getOrderColumns({

  });

  const extraOrderRequests: ExtraOrderItem[] = [{
    type: "A",
    amount: 1,
    price_per_unit: 30,
    id: "test"
  }]

  return(
    <>
      <ExhibitorLayout>
        <div className="flex flex-col gap-8 sm:ml-8 flex-1 text-white">
          {addItem &&
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-end flex-1">
                <h2 className="text-2xl text-white font-medium">Lägg till extrabeställning</h2>
                <button className="bg-transparent border-[1px] border-white py-2.5 px-4 rounded-full text-center hover:scale-105 transition-transform text-white uppercase" onClick={() => setAddItem(false)}>
                  Avbryt
                </button>
              </div>
              <div className="flex items-end">
                <div className="flex flex-col flex-1">
                  <h4>Typ:</h4>
                  <Select
                    name="type"
                    values={Object.keys(extraOrderDetails)}
                    options={Object.values(extraOrderDetails).map(x => x.name.sv)}
                    value={itemType}
                    setValue={setItemType}
                    />
                </div>
                <div className="flex flex-col flex-2">
                  <h4>Antal:</h4>
                  <InputField
                    name="companyName"
                    value={itemAmount}
                    type="number"
                    setValue={setItemAmount}
                    //fields={{ companyName: "Företagsnamn" }}
                    fields={{ companyName: t.admin.addCompany.addExhibitorForm.companyName }}
                    />
                </div>
                <div className="flex flex-col flex-2">
                </div>
              </div>
            </div>
          }
          <div className={cn("flex flex-col gap-2 ", addItem ? "opacity-60 pointer-events-none" : "")}>
            <div className="flex justify-between items-end flex-1">
              <h2 className="text-2xl text-white font-medium">Extrabeställningar</h2>
              <button className="bg-cerise py-2.5 px-4 rounded-full text-center hover:scale-105 transition-transform text-white uppercase" onClick={() => setAddItem(true)}>
                Lägg till
              </button>
            </div>
            <div className="flex flex-1">
              <CompanyDataTable
                columns={extraOrderColumns}
                data={[]}
                />
            </div>
            <div className="flex justify-end">
              <p className="text-sm text-white">Vill du ändra nuvarande extrabeställningar? Kontakta <a href="mailto:sales@ddagen.se" className="text-yellow hover:underline">sales@ddagen.se</a></p>
            </div>
          </div>

          <div className={cn("flex flex-col gap-2 ", addItem ? "opacity-60 pointer-events-none" : "")}>
            <div className="flex justify-between items-end flex-1">
              <h2 className="text-2xl text-white font-medium">Pågående förfrågningar</h2>
            </div>
            <div className="flex flex-1">
              <CompanyDataTable
                columns={extraOrderColumns}
                data={extraOrderRequests}
                />
            </div>
          </div>
        </div>
      </ExhibitorLayout>
    </>
  );
}
