import { api } from "@/utils/api";
import { useLocale } from "@/locales";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { InputField } from "@/components/InputField";
import Head from "next/head";
import ExhibitorLayout from "@/shared/exhibitorLayout";
import { CompanyDataTable } from "@/components/Company/CompanyDataTable";
import { getOrderColumns } from "@/components/Company/Admin/ExtraOrderColumns";
import { ExtraOrderAccepted, ExtraOrderAction, ExtraOrderHistory, ExtraOrderItem, ExtraOrderRequest } from "@/shared/Classes";
import { cn } from "@/utils/utils";
import { Select } from "@/components/Select";

// TODO hook the next button to the save features
// Maby break save changes into a separate steps for each page
// Add Logic to figure out saved state

export type ExtraOrderType = "chair"
  | "table"
  | "drink_tickets_alc"
  | "drink_tickets_alc_free"
  | "meal_ticket"
  | "banquette_ticket";

type ExtraOrderDetail = {
  name: {
    sv: string;
    en: string;
  },
  price_per_unit: number;
  dropdown?: boolean;
}

export const extraOrderDetails: Record<string, ExtraOrderDetail> = {
  "table": {
    name: {
      sv: "Ståbord",
      en: "Standing Table"
    },
    price_per_unit: 500,
    dropdown: true
  },
  "chair": {
    name: {
      sv: "Stol",
      en: "Chair"
    },
    price_per_unit: 250,
    dropdown: true
  },
  "drink_tickets_alc": {
    name: {
      sv: "Dryckesbiljetter (3 st) (alkohol)",
      en: "Drink coupons (x3) (w. alcohol)"
    },
    price_per_unit: 300,
    dropdown: true
  },
  "drink_tickets_alc_free": {
    name: {
      sv: "Dryckesbiljetter (3 st) (alkoholfri)",
      en: "Drink coupons (x3) (non-alcoholic)"
    },
    price_per_unit: 300,
    dropdown: true
  },
  "meal_ticket": {
    name: {
      sv: "Matbiljett (inkl. lunch & frukost)",
      en: "Meal ticket (incl. lunch & breakfast)"
    },
    price_per_unit: 450,
    dropdown: false
  }
  ,
  "banquette_ticket": {
    name: {
      sv: "Banquettebiljett",
      en: "Ticket to the dinner & after-party"
    },
    price_per_unit: 2000,
    dropdown: false
  }
}

const extraOrderActionDetails: Record<ExtraOrderAction, {
  en: string;
  sv: string;
  color: string;
}> = {
  "CREATED_REQUEST": {
    sv: "Skapad förfrågan",
    en: "Created request",
    color: "#FFFF00"
  },
  "CANCELED_REQUEST": {
    sv: "Avbruten förfrågan",
    en: "Canceled request",
    color: "#FF0000"
  },
  "ACCEPTED_REQUEST": {
    sv: "Accepterad förfrågan",
    en: "Accepted request",
    color: "#00FF00"
  },
  "UPDATED_ORDER": {
    sv: "Uppdaterad order",
    en: "Updated order",
    color: "#FFFF00"
  },
  "CANCELED_ORDER": {
    sv: "Avbruten order",
    en: "Canceled order",
    color: "#FF0000"
  },
  "CREATED_ORDER": {
    sv: "Skapad order",
    en: "Created order",
    color: "#00FF00"
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
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [addItem, setAddItem] = useState<boolean>(false);

  const [itemType, setItemType] = useState<ExtraOrderType>("table");
  const [itemAmount, setItemAmount] = useState<string>("1");

  const [accepted, setAccepted] = useState<ExtraOrderAccepted[]>([]);
  const [requested, setRequested] = useState<ExtraOrderRequest[]>([]);
  const [history, setHistory] = useState<ExtraOrderHistory[]>([]);

  const getName = api.exhibitor.getName.useQuery();
  const getIsLoggedIn = api.account.isLoggedIn.useQuery(undefined, {
    onSuccess: (data: any) => {
      setIsLoggedIn(data.ok);
      console.log("IS ADMIN?", data);
      setIsAdmin(data.isAdmin);
    },
  });

  // Manage login
  useEffect(() => {
    if (!getIsLoggedIn.isSuccess) return;
    //if (isLoggedIn == false) router.push("/logga-in");
  }, [isLoggedIn]);

  
  const handleAcceptRequest = (request_id: string) => {
    console.log("ACCEPT REQUEST WITH ID", request_id);
    if(!isAdmin)return;
    const rq = requested.find(x => x.id == request_id)
    if(!rq)return;

    setRequested(l => l.filter(x => x.id != request_id));
    setAccepted(l => ([
      ...l,
      rq
    ]));
    setHistory(l => ([
      ...l,
      {
        id: crypto.randomUUID(),
        item: rq.item,
        action: "ACCEPTED_REQUEST",
        person: {
          name: "",
          is_admin: isAdmin
        },
        created_at: new Date
      },
    ]))
  }

  const handleCancelRequest = (request_id: string) => {
    console.log("CANCEL REQUEST WITH ID", request_id);

    const rq = requested.find(x => x.id == request_id)
    if(!rq)return;

    setRequested(l => l.filter(x => x.id != request_id));
    setHistory(l => ([
      ...l,
      {
        id: crypto.randomUUID(),
        item: rq.item,
        action: "CANCELED_REQUEST",
        person: {
          name: "",
          is_admin: isAdmin
        },
        created_at: new Date
      },
    ]))
  }

  const acceptedColumns = getOrderColumns({
    t: t
  });

  const requestedColumns = getOrderColumns({
    t: t,
    onAccept: isAdmin ? handleAcceptRequest : undefined,
    onCancel: handleCancelRequest
  });

  const historyColumns = getOrderColumns({
    t: t,
    showAction: true,
    showPerson: true
  });


  const handleAddItem = () => {
    if(!itemType)return;
    if(!(parseInt(itemAmount ?? 0) > 0))return;

    const nextItem: ExtraOrderItem = {
      id: crypto.randomUUID(),
      type: itemType,
      amount: parseInt(itemAmount ?? 0),
      price_per_unit: extraOrderDetails[itemType].price_per_unit
    };

    setRequested(l => ([
      ...l,
      {
        id: crypto.randomUUID(),
        item: nextItem
      }
    ]));

    setHistory(l => ([
      ...l,
      {
        id: crypto.randomUUID(),
        item: nextItem,
        action: "CREATED_REQUEST",
        person: {
          name: "",
          is_admin: isAdmin
        },
        created_at: new Date
      },
    ]));

    setAddItem(false);
  }

  const pricePerUnit = itemType ? extraOrderDetails[itemType].price_per_unit : "-";
  const totalPrice = parseInt(itemAmount ?? 0) > 0 && pricePerUnit != "-" ? parseInt(itemAmount ?? 0) * pricePerUnit : "-"

  console.log("REQUESTED", requested);
  const dropdownEntries = Object.entries(extraOrderDetails).filter(([_k, v]) => v.dropdown == true);

  return(
    <>
      <ExhibitorLayout>
        <div className="flex flex-col gap-8 sm:ml-8 flex-1 text-white">
          {addItem &&
            <div className="flex flex-1 flex-col items-center bg-black/25 border-2 border-cerise rounded-xl pt-6 pb-10 overflow-hidden">
              <form className="flex flex-col w-[90%] bg-transparent outline-none gap-4">
                <div className="flex justify-between items-end flex-1">
                  <h2 className="text-2xl text-white font-medium">Lägg till extrabeställning</h2>
                </div>
                <div className="flex items-end gap-4">
                  <div className="flex flex-col flex-1 max-w-xs">
                    <h4 className="text-slate-400 peer-focus:text-cerise font-medium uppercase md:text-sm text-[9px]">
                      {t.admin.extraOrders.itemFields.type}:
                    </h4>
                    <Select
                      name="type"
                      values={dropdownEntries.map(([k, _v]) => k)}
                      options={dropdownEntries.map(([_k, v]) => v.name[t.locale])}
                      value={itemType}
                      setValue={setItemType}
                      />
                  </div>
                  <div className="flex flex-col flex-2 max-w-[120px]">
                    <InputField
                      name="amount"
                      value={itemAmount}
                      type="number"
                      setValue={(v: string) => v?.length == 0 || parseInt(v) >= 0 ? setItemAmount(v) : null}
                      //fields={{ companyName: "Företagsnamn" }}
                      fields={{ amount: t.admin.extraOrders.itemFields.amount }}
                      />
                  </div>
                  <div className="flex flex-col flex-2 w-fit items-end">
                    <h4 className="text-slate-400 font-medium uppercase md:text-sm text-[9px]">
                      {t.admin.extraOrders.itemFields.price_per_unit}:
                    </h4>
                    <div className="flex h-8 items-center">
                      <p className="text-white md:text-sm text-[9px]">{pricePerUnit} kr</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end flex-1">
                    <h4 className="text-white font-medium uppercase md:text-sm text-[9px]">
                      {t.admin.extraOrders.itemFields.total_price}:
                    </h4>
                    <div className="flex h-8 items-center">
                      <p className="text-white md:text-base text-sm">{totalPrice} kr</p>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-start gap-2 mt-4">
                  <button
                    type="button"
                    className={cn(
                      "uppercase hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base font-normal px-8 py-2 max-lg:mx-auto w-max",
                      "disabled:text-slate-400 disabled:cursor-not-allowed disabled:hover:scale-100"
                    )}
                    disabled={!(parseInt(itemAmount ?? 0) > 0)}
                    onClick={() => handleAddItem()}
                  >
                    {t.admin.extraOrders.addItem.submit}
                  </button>
                  <button
                    type="button"
                    className="bg-transparent border-[1px] border-white py-1.5 px-3 rounded-full text-center hover:scale-105 transition-transform text-white uppercase"
                    onClick={() => setAddItem(false)}
                  >
                    {t.admin.extraOrders.addItem.cancel}
                  </button>
                </div>
              </form>
            </div>
          }
          <div className={cn("flex flex-col gap-2 ", addItem ? "opacity-60 pointer-events-none" : "")}>
            <div className="flex justify-between items-end flex-1">
              <h2 className="text-2xl text-white font-medium">{t.admin.extraOrders.sections.accepted.title}</h2>
              <button className="bg-cerise py-2.5 px-4 rounded-full text-center hover:scale-105 transition-transform text-white uppercase" onClick={() => setAddItem(true)}>
                Lägg till
              </button>
            </div>
            <div className="flex flex-1">
              <CompanyDataTable
                t={t}
                columns={acceptedColumns}
                data={accepted.map(x => ({
                  ...x.item,
                  id: x.id,
                  type: extraOrderDetails?.[x.item.type]?.name?.[t.locale]
                }))}
                />
            </div>
            <div className="flex justify-end">
              <p className="text-sm text-white">{t.admin.extraOrders.sections.accepted.disclaimer} <a href="mailto:sales@ddagen.se" className="text-yellow hover:underline">sales@ddagen.se</a></p>
            </div>
          </div>

          <div className={cn("flex flex-col gap-2 ", addItem ? "opacity-60 pointer-events-none" : "")}>
            <div className="flex justify-between items-end flex-1">
              <h2 className="text-2xl text-white font-medium">{t.admin.extraOrders.sections.requested.title}</h2>
            </div>
            <div className="flex flex-1">
              <CompanyDataTable
                t={t}
                columns={requestedColumns}
                data={requested.map(x => ({
                  ...x.item,
                  id: x.id,
                  type: extraOrderDetails?.[x.item.type]?.name?.[t.locale]
                }))}
                />
            </div>
          </div>

          <div className={cn("flex flex-col gap-2 ", addItem ? "opacity-60 pointer-events-none" : "")}>
            <div className="flex justify-between items-end flex-1">
              <h2 className="text-2xl text-white font-medium">{t.admin.extraOrders.sections.history.title}</h2>
            </div>
            <div className="flex flex-1">
              <CompanyDataTable
                t={t}
                columns={historyColumns}
                data={history.sort((a, b) => (b?.created_at?.getTime() ?? 0) - (a?.created_at?.getTime() ?? 0)).map(x => ({
                  ...x.item,
                  id: x.id,
                  person: x.person,
                  action: x.action ? extraOrderActionDetails[x.action]?.[t.locale] : undefined,
                  actionColor: x.action ? extraOrderActionDetails[x.action]?.color : undefined,
                  type: extraOrderDetails?.[x.item.type]?.name?.[t.locale]
                }))}
                />
            </div>
          </div>
        </div>
      </ExhibitorLayout>
    </>
  );
}
