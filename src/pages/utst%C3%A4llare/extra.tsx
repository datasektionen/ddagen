import { api } from "@/utils/api";
import { useLocale } from "@/locales";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { InputField } from "@/components/InputField";
import Head from "next/head";
import ExhibitorLayout from "@/shared/exhibitorLayout";
import { CompanyDataTable } from "@/components/Company/CompanyDataTable";
import { getOrderColumns } from "@/components/Company/Admin/ExtraOrderColumns";
import { ExtraOrderAccepted, ExtraOrderAction, ExtraOrderHistory, ExtraOrderRequest, Package } from "@/shared/Classes";
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
  | "banquette_ticket"
  | "sponsored_post"
  | "talent_pool"
  ;

type ExtraOrderDetail = {
  price_per_unit: number;
  dropdown?: boolean;
}

export const extraOrderDetails: Record<string, ExtraOrderDetail> = {
  "table": {
    price_per_unit: 500,
    dropdown: true
  },
  "chair": {
    price_per_unit: 250,
    dropdown: true
  },
  "drink_tickets_alc": {
    price_per_unit: 300,
    dropdown: true
  },
  "drink_tickets_alc_free": {
    price_per_unit: 300,
    dropdown: true
  },
  "talent_pool": {
    price_per_unit: 10000,
    dropdown: true
  },
  "sponsored_post": {
    price_per_unit: 6000,
    dropdown: true
  },
  "meal_ticket": {
    price_per_unit: 450,
    dropdown: false
  },
  "banquette_ticket": {
    price_per_unit: 2000,
    dropdown: false
  }
}

const extraOrderActionColors: Record<ExtraOrderAction, string> = {
  CREATED_REQUEST: "#FFFF00",
  CANCELED_REQUEST: "#FF0000",
  ACCEPTED_REQUEST: "#00FF00",
  UPDATED_REQUEST: "#FFFF00",
  UPDATED_ORDER: "#FFFF00",
  CANCELED_ORDER: "#FF0000",
  CREATED_ORDER: "#00FF00",
};

export default function ExhibitorExtra({
    children
} : {
    children: React.ReactElement
}) {
  const t = useLocale();
  const router = useRouter();
  const trpc = api.useContext();

  // States
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [addItem, setAddItem] = useState<boolean>(false);
  const [editingItemId, setEditingItemId] = useState<string>();
  const [editMode, setEditMode] = useState<boolean>(false);

  const [itemType, setItemType] = useState<ExtraOrderType>("table");
  const [itemAmount, setItemAmount] = useState<string>("1");
  const [itemPricePerUnit, setItemPricePerUnit] = useState<string>(String(extraOrderDetails.table.price_per_unit));

  const createOrderRequest = api.exhibitor.createOrderRequest.useMutation({ onSuccess: () => trpc.exhibitor.getOrders.invalidate() });
  const acceptOrderRequest = api.exhibitor.acceptOrderRequest.useMutation({
    onSuccess: () => {
      trpc.exhibitor.getOrders.invalidate();
      trpc.exhibitor.getFoodPreferences.invalidate("Representative");
      trpc.exhibitor.getFoodPreferences.invalidate("Banquet");
    },
  });
  const cancelOrderRequest = api.exhibitor.cancelOrderRequest.useMutation({ onSuccess: () => trpc.exhibitor.getOrders.invalidate() });
  const cancelOrder = api.exhibitor.cancelOrder.useMutation({ onSuccess: () => trpc.exhibitor.getOrders.invalidate() });
  const updateOrder = api.exhibitor.updateOrder.useMutation({ onSuccess: () => trpc.exhibitor.getOrders.invalidate() });

  const { data: ordersData, isLoading } = api.exhibitor.getOrders.useQuery();
  const { data: packageData } = api.exhibitor.getPackage.useQuery();
  const { data: banquetPreferences } = api.exhibitor.getFoodPreferences.useQuery("Banquet");
  const { data: representativePreferences } = api.exhibitor.getFoodPreferences.useQuery("Representative");

  const requested = ordersData?.requests ?? [];
  const history = ordersData?.history.filter((el) => el.action !== "UPDATED_REQUEST") ?? [];
  const accepted = Array.from(
    new Map(
      (ordersData?.history.filter((el) =>
        el.action === "ACCEPTED_REQUEST" ||
        el.action === "UPDATED_ORDER" ||
        el.action === "CANCELED_ORDER"
      ).filter((el) =>
        el.item.type !== "meal_ticket" && el.item.type !== "banquette_ticket"
      ) ?? [])
        .map((entry) => [entry.item.id, entry] as const)
    ).values()
  ).filter((entry) => entry.action !== "CANCELED_ORDER");

  const exhibitorPackage = packageData
    ? new Package(t, packageData.packageTier)
    : undefined;

  if (exhibitorPackage && packageData) {
    exhibitorPackage.addCustomOrders(
      packageData.customTables,
      packageData.customChairs,
      packageData.customDrinkCoupons,
      packageData.customRepresentativeSpots,
      packageData.customBanquetTicketsWanted,
      0
    );
  }

  const extraMealTicketCount = Math.max(
    0,
    (representativePreferences?.length ?? 0) - (exhibitorPackage?.mealCoupons ?? 0)
  );
  const extraBanquetteTicketCount = Math.max(
    0,
    (banquetPreferences?.length ?? 0) - (exhibitorPackage?.banquetTickets ?? 0)
  );

  const acceptedExtraOrders = [
    ...accepted,
    ...(extraMealTicketCount > 0
      ? [{
          item: {
            id: "extra-meal-tickets",
            type: "meal_ticket",
            amount: extraMealTicketCount,
            price_per_unit: extraOrderDetails.meal_ticket.price_per_unit,
          },
          readOnly: true,
        }]
      : []),
    ...(extraBanquetteTicketCount > 0
      ? [{
          item: {
            id: "extra-banquette-tickets",
            type: "banquette_ticket",
            amount: extraBanquetteTicketCount,
            price_per_unit: extraOrderDetails.banquette_ticket.price_per_unit,
          },
          readOnly: true,
        }]
      : []),
  ];

  const getName = api.exhibitor.getName.useQuery();
  const { data: user } = api.account.getUser.useQuery();
  const getIsLoggedIn = api.account.isLoggedIn.useQuery(undefined, {
    onSuccess: (data: any) => {
      setIsLoggedIn(data.ok);
      //console.log("IS ADMIN?", data);
      setIsAdmin(data.isAdmin);
    },
  });

  // Manage login
  useEffect(() => {
    if (!getIsLoggedIn.isSuccess) return;
    //if (isLoggedIn == false) router.push("/logga-in");
  }, [isLoggedIn]);

  const handleAcceptRequest = (request_id: string) => {
    //console.log("ACCEPT REQUEST WITH ID", request_id);
    if (!isAdmin) return;

    acceptOrderRequest.mutateAsync(request_id);
  }

  const handleCancelRequest = (request_id: string) => {
    //console.log("CANCEL REQUEST WITH ID", request_id);

    cancelOrderRequest.mutateAsync(request_id);
  }

  const handleCancelOrder = (itemId: string) => {
    cancelOrder.mutateAsync(itemId);
  }

  const acceptedColumns = getOrderColumns({
    t: t,
    onCancel: isAdmin && editMode ? handleCancelOrder : undefined,
    onEdit: isAdmin && editMode ? (itemId: string) => {
      const order = acceptedExtraOrders.find((entry) => entry.item.id === itemId);
      if (!order) return;

      setEditingItemId(order.item.id);
      setItemType(order.item.type as ExtraOrderType);
      setItemAmount(String(order.item.amount));
      setItemPricePerUnit(String(order.item.price_per_unit));
    } : undefined
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
    if(!itemType) return;
    if(!(parseInt(itemAmount ?? 0) > 0)) return;

    createOrderRequest.mutateAsync({
      type: itemType,
      amount: parseInt(itemAmount ?? 0),
      price_per_unit: extraOrderDetails[itemType].price_per_unit
    });

    setAddItem(false);
  }

  const handleEditItem = () => {
    if (!editingItemId || !(parseInt(itemAmount ?? 0) > 0)) return;

    updateOrder.mutate({
      itemId: editingItemId,
      type: itemType,
      amount: parseInt(itemAmount),
      price_per_unit: parseFloat(itemPricePerUnit),
    });

    setEditingItemId(undefined);
    setEditMode(false);
  }

  const pricePerUnit = editingItemId
    ? parseFloat(itemPricePerUnit)
    : itemType
      ? extraOrderDetails[itemType].price_per_unit
      : "-";
  const totalPrice = parseInt(itemAmount ?? 0) > 0 && pricePerUnit != "-" && !Number.isNaN(pricePerUnit)
    ? parseInt(itemAmount ?? 0) * pricePerUnit
    : "-";

  const dropdownEntries = Object.entries(extraOrderDetails).filter(([_k, v]) => v.dropdown == true);

  return(
    <>
      <ExhibitorLayout>
        <div className="flex flex-col gap-8 sm:ml-8 flex-1 text-white">
          {(addItem || editingItemId) &&
            <div className="flex flex-1 flex-col items-center bg-black/25 border-2 border-cerise rounded-xl pt-6 pb-10 overflow-hidden">
              <form className="flex flex-col w-[90%] bg-transparent outline-none gap-4">
                <div className="flex justify-between items-end flex-1">
                      <h2 className="text-2xl text-white font-medium">
                        {editingItemId ? t.admin.extraOrders.addItem.editTitle : t.admin.extraOrders.addItem.title}
                      </h2>
                </div>
                <div className="flex items-end gap-4">
                  <div className="flex flex-col flex-1 max-w-xs">
                    <h4 className="text-slate-400 peer-focus:text-cerise font-medium uppercase md:text-sm text-[9px]">
                      {t.admin.extraOrders.itemFields.type}:
                    </h4>
                    <Select
                      name="type"
                      values={dropdownEntries.map(([k, _v]) => k)}
                      options={dropdownEntries.map(([k]) => t.admin.extraOrders.itemNames[k as ExtraOrderType])}
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
                    {editingItemId ? (
                      <InputField
                        name="price_per_unit"
                        value={itemPricePerUnit}
                        type="number"
                        setValue={(value: string) => value.length === 0 || parseFloat(value) >= 0 ? setItemPricePerUnit(value) : null}
                        fields={{ price_per_unit: t.admin.extraOrders.itemFields.price_per_unit }}
                      />
                    ) : (
                      <div className="flex h-8 items-center">
                        <p className="text-white md:text-sm text-[9px]">{pricePerUnit} {t.admin.extraOrders.currency}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end flex-1">
                    <h4 className="text-white font-medium uppercase md:text-sm text-[9px]">
                      {t.admin.extraOrders.itemFields.total_price}:
                    </h4>
                    <div className="flex h-8 items-center">
                      <p className="text-white md:text-base text-sm">{totalPrice} {t.admin.extraOrders.currency}</p>
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
                    disabled={!(parseInt(itemAmount ?? 0) > 0) || (Boolean(editingItemId) && !(parseFloat(itemPricePerUnit) > 0))}
                    onClick={() => editingItemId ? handleEditItem() : handleAddItem()}
                  >
                    {editingItemId ? t.admin.extraOrders.addItem.saveEdit : t.admin.extraOrders.addItem.submit}
                  </button>
                  <button
                    type="button"
                    className="bg-transparent border-[1px] border-white py-1.5 px-3 rounded-full text-center hover:scale-105 transition-transform text-white uppercase"
                    onClick={() => {
                      setAddItem(false);
                      setEditingItemId(undefined);
                    }}
                  >
                    {t.admin.extraOrders.addItem.cancel}
                  </button>
                </div>
              </form>
            </div>
          }
          <div className={cn("flex flex-col gap-2 ", addItem || editingItemId ? "opacity-60 pointer-events-none" : "")}>
            <div className="flex justify-between items-end flex-1">
              <h2 className="text-2xl text-white font-medium">{t.admin.extraOrders.sections.accepted.title}</h2>
              <div className="flex items-center gap-2">
                {isAdmin &&
                  <button className="bg-transparent border border-cerise py-2.5 px-4 rounded-full text-center hover:scale-105 transition-transform text-white uppercase" onClick={() => setEditMode((value) => !value)}>
                    {t.admin.extraOrders.addItem.edit}
                  </button>
                }
                <button className="bg-cerise py-2.5 px-4 rounded-full text-center hover:scale-105 transition-transform text-white uppercase" onClick={() => setAddItem(true)}>
                  {t.admin.extraOrders.addItem.button}
                </button>
              </div>
            </div>
            <div className="flex flex-1">
              <CompanyDataTable
                t={t}
                columns={acceptedColumns}
                data={acceptedExtraOrders.map(x => ({
                  ...x.item,
                  id: x.item.id,
                  readOnly: (x as { readOnly?: boolean }).readOnly,
                  amount: x.item.amount ?? undefined,
                  price_per_unit: x.item.price_per_unit == null ? undefined : Number(x.item.price_per_unit),
                  type: t.admin.extraOrders.itemNames[x.item.type as ExtraOrderType]
                }))}
                />
            </div>
            <div className="flex justify-end">
              <p className="text-sm text-white">{t.admin.extraOrders.sections.accepted.disclaimer} <a href="mailto:sales@ddagen.se" className="text-yellow hover:underline">sales@ddagen.se</a></p>
            </div>
          </div>

          <div className={cn("flex flex-col gap-2 ", addItem || editingItemId ? "opacity-60 pointer-events-none" : "")}>
            <div className="flex justify-between items-end flex-1">
              <h2 className="text-2xl text-white font-medium">{t.admin.extraOrders.sections.requested.title}</h2>
            </div>
            <div className="flex flex-1">
              <CompanyDataTable
                t={t}
                columns={requestedColumns}
                data={requested.map(x => ({
                  ...x.item,
                  id: x.item.id,
                  price_per_unit: x.item.price_per_unit == null ? undefined : Number(x.item.price_per_unit),
                  type: t.admin.extraOrders.itemNames[x.item.type as ExtraOrderType]
                }))}
                />
            </div>
          </div>
          
          {isAdmin &&
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
                    amount: x.item.amount ?? undefined,
                    person: { email: x.person_email },
                    //person: x.person,
                    price_per_unit: x.item.price_per_unit == null ? undefined : Number(x.item.price_per_unit),
                    action: x.action ? t.admin.extraOrders.actionLabels[x.action] : undefined,
                    actionColor: x.action ? extraOrderActionColors[x.action] : undefined,
                    type: t.admin.extraOrders.itemNames[x.item.type as ExtraOrderType]
                  }))}
                  />
              </div>
            </div>
          }
        </div>
      </ExhibitorLayout>
    </>
  );
}
