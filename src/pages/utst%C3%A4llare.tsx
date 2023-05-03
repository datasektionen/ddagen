import { InputField } from "@/components/InputField";
import { useLocale, type Locale } from "@/locales";
import { api } from "@/utils/api";
import React, { Fragment, useEffect, useState } from "react";
import type { User } from "@prisma/client";
import { getPackage } from "@/utils/packages";

export default function Exhibitor() {
  const t = useLocale();
  const trpc = api.useContext();

  const exhibitor = api.exhibitor.get.useQuery();
  const updateExhibitor = api.exhibitor.update.useMutation();
  const contacts = api.exhibitor.getContacts.useQuery();
  const removeContact = api.exhibitor.deleteContact.useMutation();
  const setLogo = api.exhibitor.setLogo.useMutation();
  const logoWhite = api.exhibitor.logo.useQuery("white");

  const [pendingChanges, setPendingChanges] = useState(false);
  const [logoLoading, setLogoLoading] = useState(false);

  const [invoiceEmail, setInvoiceEmail] = useState("");
  const [description, setDescription] = useState("");
  const [extraChairs, setExtraChairs] = useState(0);
  const [extraTables, setExtraTables] = useState(0);
  const [extraDrinkCoupons, setExtraDrinkCoupons] = useState(0);
  const [extraRepresentativeSpots, setExtraRepresentativeSpots] = useState(0);
  const [totalBanquetTicketsWanted, setTotalBanquetTicketsWanted] = useState(0);

  const [addingContact, setAddingContact] = useState(false);

  const pkg = exhibitor.data?.package ? getPackage(t, exhibitor.data.package) : null;

  const totalChairs = extraChairs + (pkg?.chairs ?? 0);
  const totalTables = extraTables + (pkg?.tables ?? 0);
  const totalDrinkCoupons = extraDrinkCoupons + (pkg?.drinkCoupons ?? 0);
  const totalRepresentativeSpots = extraRepresentativeSpots + (pkg?.representativeSpots ?? 0);

  const setNumber = (setter: (value: number) => void) => (value: string) => {
    const parsed = value === "" ? 0 : parseInt(value.replace(/[^0-9]/g, ""), 10);
    setter(parsed);
    setPendingChanges(true);
  };
  const setExtraChairsStr = setNumber(setExtraChairs);
  const setExtraTablesStr = setNumber(setExtraTables);
  const setExtraDrinkCouponsStr = setNumber(setExtraDrinkCoupons);
  const setExtraRepresentativeSpotsStr = setNumber(setExtraRepresentativeSpots);
  const setExtraBanquetTicketsStr = setNumber(setTotalBanquetTicketsWanted);

  useEffect(() => {
    if (!exhibitor.isSuccess) return;

    setInvoiceEmail(exhibitor.data.invoiceEmail ?? "");
    setDescription(exhibitor.data.description ?? "");
    setExtraChairs(exhibitor.data.extraChairs);
    setExtraTables(exhibitor.data.extraTables);
    setExtraDrinkCoupons(exhibitor.data.extraDrinkCoupons);
    setExtraRepresentativeSpots(exhibitor.data.extraRepresentativeSpots);
    setTotalBanquetTicketsWanted(exhibitor.data.totalBanquetTicketsWanted);
  }, [exhibitor.isSuccess]);

  function update() {
    updateExhibitor.mutate({
      invoiceEmail,
      description,
      extraChairs,
      extraTables,
      extraDrinkCoupons,
      extraRepresentativeSpots,
    });
    setPendingChanges(false);
  }

  return <>
    <div className="mx-auto flex flex-col items-center text-center py-40">
      <h1 className="md:text-5xl mx-10 text-3xl text-cerise mb-14">{exhibitor.data?.name}</h1>
      {exhibitor.isLoading && <p className="text-cerise font-bold">Loading...</p>}
      {exhibitor.isError && <p className="text-red-500 font-bold">Failed to load exhibitor data</p>}
      {pkg && <>
        <h2 className="text-white font-bold text-3xl">{pkg.name}</h2>
        <ul className="text-white mb-14 text-start list-disc">
          {pkg.extra.map(extra =>
            <li key={extra}>{extra}</li>
          )}
        </ul>
      </>}
      <form className="flex flex-col gap-6 md:w-96" onSubmit={(e) => { e.preventDefault(); update(); }}>
        <InputField
          type="email"
          value={invoiceEmail}
          setValue={v => { setInvoiceEmail(v); setPendingChanges(true); }}
          name="invoiceEmail"
          fields={t.exhibitorSettings.fields}
        />
        <InputField
          type="text"
          value={description}
          setValue={v => { setDescription(v); setPendingChanges(true); }}
          name="description"
          fields={t.exhibitorSettings.fields}
          required={false}
        />
        <div className="text-center">
          <input
            type="file"
            name="logo"
            accept="image/svg+xml"
            className="text-white mb-3"
            onChange={(e) => {
              if (!e.target.files) return;
              setLogoLoading(true);
              const reader = new FileReader();
              reader.readAsDataURL(e.target.files[0]);
              reader.onloadend = () => {
                if (typeof reader.result === "string") {
                  console.log(reader.result.split(",")[0]);
                  const logo = reader.result.split(",")[1];
                  setLogo.mutateAsync({ b64data: logo, kind: "white" })
                    .then(() => setLogoLoading(false))
                    .then(() => trpc.exhibitor.logo.invalidate());
                }
              };
            }}
          />
          {logoLoading && <p>...</p>}
        </div>
        {logoWhite.isSuccess && logoWhite.data && <img src={"data:image/svg+xml;base64," + logoWhite.data} className="w-72 place-self-center" />}
        <InputField
          type="number"
          value={extraChairs.toString()}
          setValue={setExtraChairsStr}
          name="extraChairs"
          fields={t.exhibitorSettings.fields}
        />
        {pkg?.chairs
          ? <p className="text-white relative -top-4">Total chair count: {totalChairs} ({pkg.chairs} from package)</p>
          : null}
        <InputField
          type="number"
          value={extraTables.toString()}
          setValue={setExtraTablesStr}
          name="extraTables"
          fields={t.exhibitorSettings.fields}
        />
        {pkg?.tables
          ? <p className="text-white relative -top-4">Total table count: {totalTables} ({pkg.tables} from package)</p>
          : null}
        <InputField
          type="number"
          step={10}
          value={extraDrinkCoupons.toString()}
          setValue={setExtraDrinkCouponsStr}
          name="extraDrinkCoupons"
          fields={t.exhibitorSettings.fields}
        />
        {pkg?.drinkCoupons
          ? <p className="text-white relative -top-4">Total drink coupon count: {totalDrinkCoupons} ({pkg.drinkCoupons} from package)</p>
          : null}
        <InputField
          type="number"
          value={extraRepresentativeSpots.toString()}
          setValue={setExtraRepresentativeSpotsStr}
          name="extraRepresentativeSpots"
          fields={t.exhibitorSettings.fields}
        />
        {pkg?.representativeSpots
          ? <p className="text-white relative -top-4">Total representative count: {totalRepresentativeSpots} ({pkg.representativeSpots} from package)</p>
          : null}
        <InputField
          type="number"
          value={totalBanquetTicketsWanted.toString()}
          setValue={setExtraBanquetTicketsStr}
          name="totalBanquetTicketsWanted"
          fields={t.exhibitorSettings.fields}
        />
        {pkg?.banquetTickets
          ? <p className="text-white relative -top-4">Guaranteed spots: {pkg.banquetTickets}</p>
          : null}
        {pendingChanges ?
          <input
            type="submit"
            disabled={exhibitor.isLoading}
            value="Save"
            className="
              bg-cerise transition-transform hover:scale-110 focus:scale-110 focus:outline-none
              text-white font-bold uppercase
              py-2 px-4 rounded-full cursor-pointer disabled:cursor-wait disabled:grayscale
            "
          /> : updateExhibitor.isSuccess ?
            <p className="text-white">Saved ✅</p> :
            updateExhibitor.isError ?
              <p className="text-white">Failed to save ❌</p>
              : null
        }
      </form>
      <section>
        <h2 className="text-cerise font-bold text-4xl mb-10">{t.exhibitorSettings.contacts}</h2>
        {contacts.data?.map(user => <React.Fragment key={user.id}>
          <ContactPerson
            user={user}
            t={t.exhibitorSettings}
            remove={() => removeContact.mutateAsync(user.id).then(() => trpc.exhibitor.getContacts.invalidate())}
            showRemove={contacts.data?.length > 1}
          />
          <div className="h-10" />
        </React.Fragment>)}
        {addingContact ? (
          <ContactPerson
            t={t.exhibitorSettings}
            remove={() => setAddingContact(false)}
            onSave={() => { setAddingContact(false); trpc.exhibitor.getContacts.invalidate(); }}
            showRemove={true}
          />
        ) :
          <button
            onClick={() => setAddingContact(true)}
            className="text-white text-lg mt-4"
          >Add contact</button>
        }
      </section>
      <Allergies type="representative" maxCount={totalRepresentativeSpots} />
      <Allergies type="banquet" maxCount={totalBanquetTicketsWanted} />
    </div>
  </>;
}

function Allergies({
  type,
  maxCount,
}: {
  type: "representative" | "banquet";
  maxCount: number;
}) {
  const t = useLocale().exhibitorSettings;
  const trpc = api.useContext();

  const foodSpecs = api.exhibitor.getFoodSpecifications.useQuery(type);
  const upsertSpec = api.exhibitor.upsertFoodSpecification.useMutation();
  const removeSpec = api.exhibitor.deleteFoocSpecification.useMutation();

  const [newAllergyValue, setNewAllergyValue] = useState("");
  const [newAllergyComment, setNewAllergyComment] = useState("");

  const allergyCount = foodSpecs.data?.length ?? 0;

  return (
    <section>
      <h2 className="text-cerise font-bold text-3xl my-10">{
        type === "representative"
          ? t.representativesAllergies
          : t.banquetAllergies
      }</h2>
      <div className="
        grid text-white gap-3 text-lg place-items-start
        grid-cols-[1fr_1fr_auto_auto] mb-3
      ">
        <p className="font-bold">{t.fields.allergyValue}</p>
        <p className="font-bold">{t.fields.allergyComment}</p>
        <div></div>
        <div></div>
        {foodSpecs.data?.map(allergy => <Fragment key={allergy.id}>
          <p>{allergy.value}</p>
          <p>{allergy.comment}</p>
          <button
            className="
              bg-cerise
              text-white font-bold uppercase text-sm
              py-2 px-4 rounded-full cursor-pointer disabled:cursor-wait disabled:grayscale
            "
            disabled={newAllergyValue !== "" || newAllergyComment !== "" || allergyCount > maxCount}
            onClick={() => removeSpec.mutateAsync(allergy.id)
              .then(() => trpc.exhibitor.getFoodSpecifications.invalidate())
              .then(() => setNewAllergyValue(allergy.value))
              .then(() => setNewAllergyComment(allergy.comment))}
          >{t.editAllergy}</button>
          <button
            className="
              bg-cerise
              text-white font-bold uppercase text-sm
              py-2 px-4 rounded-full cursor-pointer disabled:cursor-wait disabled:grayscale
            "
            onClick={() => removeSpec.mutateAsync(allergy.id)
              .then(() => trpc.exhibitor.getFoodSpecifications.invalidate())}
          >{t.removeAllergy}</button>
        </Fragment>)}
      </div>
      {allergyCount >= maxCount ? null :
        <form className="flex gap-3 justify-center mt-6">
          <InputField
            type="text"
            value={newAllergyValue}
            setValue={setNewAllergyValue}
            name="allergyValue"
            fields={t.fields}
            prefix={type}
          />
          <InputField
            type="text"
            value={newAllergyComment}
            setValue={setNewAllergyComment}
            name="allergyComment"
            fields={t.fields}
            prefix={type}
          />
          <input
            type="submit"
            disabled={newAllergyValue === ""}
            value="Add"
            className="
              bg-cerise transition-transform hover:scale-110 focus:scale-110 focus:outline-none
              text-white font-bold uppercase
              py-2 px-4 rounded-full cursor-pointer disabled:cursor-wait disabled:grayscale
            "
            onClick={(e) => {
              e.preventDefault();
              upsertSpec.mutateAsync({ value: newAllergyValue, comment: newAllergyComment, type }).then(() => {
                setNewAllergyValue("");
                setNewAllergyComment("");
                trpc.exhibitor.getFoodSpecifications.invalidate(type);
              });
            }}
          />
        </form>}
      {allergyCount > maxCount && <p className="text-orange-500 font-bold text-center mt-3">{t.tooManyAllergies}</p>}
    </section>
  );
}

function ContactPerson({
  user,
  t,
  remove,
  onSave,
  showRemove,
}: {
  user?: User;
  t: Locale["exhibitorSettings"];
  remove: () => void;
  onSave?: () => void;
  showRemove: boolean;
}) {
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [role, setRole] = useState(user?.role ?? "");

  const [pendingChanges, setPendingChanges] = useState(user?.id === undefined);
  const upsert = api.exhibitor.upsertContact.useMutation();

  return (
    <form
      className="flex flex-col gap-10 md:w-80"
      onSubmit={async (e) => {
        e.preventDefault();
        setPendingChanges(false);
        await upsert.mutateAsync({ name, email, phone, role });
        if (onSave) onSave();
      }}
    >
      <InputField
        type="text"
        value={name}
        setValue={v => { setName(v); setPendingChanges(true); }}
        name="contactName"
        fields={t.fields}
        prefix={user?.id}
      />
      <InputField
        type="email"
        value={email}
        setValue={v => { setEmail(v); setPendingChanges(true); }}
        name="contactEmail"
        fields={t.fields}
        prefix={user?.id}
      />
      <InputField
        type="text"
        value={phone}
        setValue={v => { setPhone(v); setPendingChanges(true); }}
        name="contactPhone"
        fields={t.fields}
        prefix={user?.id}
      />
      <InputField
        type="text"
        value={role}
        setValue={v => { setRole(v); setPendingChanges(true); }}
        name="contactRole"
        fields={t.fields}
        prefix={user?.id}
        required={false}
      />
      <div className="flex justify-around">
        {pendingChanges ?
          <input
            type="submit"
            className="
              bg-cerise transition-transform hover:scale-110 focus:scale-110 focus:outline-none
              text-white font-bold uppercase
              py-2 px-4 rounded-full cursor-pointer disabled:cursor-wait disabled:grayscale
            "
            value={t.fields.saveContact}
          /> :
          <p className="text-white">Saved ✅</p>}
        {showRemove &&
          <button
            type="button"
            onClick={remove}
            className="
              bg-cerise transition-transform hover:scale-110 focus:scale-110 focus:outline-none
              text-white font-bold uppercase
              py-2 px-4 rounded-full cursor-pointer disabled:cursor-wait disabled:grayscale
            "
          >{t.fields.removeContact}</button>}
      </div>
    </form>
  );
}
