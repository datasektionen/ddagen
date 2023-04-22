import { InputField } from "@/components/InputField";
import { useLocale, type Locale } from "@/locales";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import type { ContactPerson } from "@prisma/client";

function ContactPerson({
  contact,
  t,
  remove,
  onSave,
  showRemove,
}: {
  contact?: ContactPerson;
  t: Locale;
  remove: () => void;
  onSave?: () => void;
  showRemove: boolean;
}) {
  const [name, setName] = useState(contact?.name ?? "");
  const [email, setEmail] = useState(contact?.email ?? "");
  const [phoneNumber, setPhoneNumber] = useState(contact?.phoneNumber ?? "");
  const [role, setRole] = useState(contact?.role ?? "");

  const [pendingChanges, setPendingChanges] = useState(contact?.id === undefined);
  const upsert = api.exhibitor.upsertContact.useMutation();

  return (
    <form
      className="flex flex-col gap-10 md:w-80"
      onSubmit={async (e) => {
        e.preventDefault();
        setPendingChanges(false);
        await upsert.mutateAsync({ name, email, phoneNumber, role });
        if (onSave) onSave();
      }}
    >
      <InputField
        type="text"
        value={name}
        setValue={v => { setName(v); setPendingChanges(true); }}
        name="contactName"
        fields={t.exhibitorSettings.fields}
        prefix={contact?.id}
      />
      <InputField
        type="email"
        value={email}
        setValue={v => { setEmail(v); setPendingChanges(true); }}
        name="contactEmail"
        fields={t.exhibitorSettings.fields}
        prefix={contact?.id}
      />
      <InputField
        type="text"
        value={phoneNumber}
        setValue={v => { setPhoneNumber(v); setPendingChanges(true); }}
        name="contactPhone"
        fields={t.exhibitorSettings.fields}
        prefix={contact?.id}
      />
      <InputField
        type="text"
        value={role}
        setValue={v => { setRole(v); setPendingChanges(true); }}
        name="contactRole"
        fields={t.exhibitorSettings.fields}
        prefix={contact?.id}
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
            value={t.exhibitorSettings.fields.saveContact}
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
          >{t.exhibitorSettings.fields.removeContact}</button>}
      </div>
    </form>
  );
}

export default function Exhibitor() {
  const t = useLocale();
  const trpc = api.useContext();

  const exhibitor = api.exhibitor.get.useQuery();
  const updateExhibitor = api.exhibitor.update.useMutation();
  const contacts = api.exhibitor.getContacts.useQuery();
  const removeContact = api.exhibitor.deleteContact.useMutation();

  const [pendingChanges, setPendingChanges] = useState(false);

  const [invoiceEmail, setInvoiceEmail] = useState("");
  const [description, setDescription] = useState("");
  const [extraChairs, setExtraChairs] = useState(0);
  const [extraTables, setExtraTables] = useState(0);
  const [extraDrinkCoupons, setExtraDrinkCoupons] = useState(0);
  const [extraRepresentativeSpots, setExtraRepresentativeSpots] = useState(0);

  const [addingContact, setAddingContact] = useState(false);

  const totalChairs = extraChairs + (exhibitor.data?.package?.chairs ?? 0);
  const totalTables = extraTables + (exhibitor.data?.package?.tables ?? 0);
  const totalDrinkCoupons = extraDrinkCoupons + (exhibitor.data?.package?.drinkCoupons ?? 0);
  const totalRepresentativeSpots = extraRepresentativeSpots + (exhibitor.data?.package?.representativeSpots ?? 0);

  const setNumber = (setter: (value: number) => void) => (value: string) => {
    const parsed = value === "" ? 0 : parseInt(value.replace(/[^0-9]/g, ""), 10);
    setter(parsed);
    setPendingChanges(true);
  };
  const setExtraChairsStr = setNumber(setExtraChairs);
  const setExtraTablesStr = setNumber(setExtraTables);
  const setExtraDrinkCouponsStr = setNumber(setExtraDrinkCoupons);
  const setExtraRepresentativeSpotsStr = setNumber(setExtraRepresentativeSpots);

  useEffect(() => {
    if (!exhibitor.isSuccess) return;

    setInvoiceEmail(exhibitor.data.invoiceEmail ?? "");
    setDescription(exhibitor.data.description ?? "");
    setExtraChairs(exhibitor.data.extraChairs);
    setExtraTables(exhibitor.data.extraTables);
    setExtraDrinkCoupons(exhibitor.data.extraDrinkCoupons);
    setExtraRepresentativeSpots(exhibitor.data.extraRepresentativeSpots);
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
      <h1 className="md:text-5xl mx-10 text-3xl text-cerise uppercase mb-14">Exhibitor Settings</h1>
      {exhibitor.isLoading && <p className="text-cerise font-bold">Loading...</p>}
      {exhibitor.isError && <p className="text-red-500 font-bold">Failed to load exhibitor data</p>}
      <h2 className="text-white font-bold text-3xl mb-10">{exhibitor.data?.package?.name}</h2>
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
        <InputField
          type="number"
          value={extraChairs.toString()}
          setValue={setExtraChairsStr}
          name="extraChairs"
          fields={t.exhibitorSettings.fields}
        />
        {exhibitor.data?.package?.chairs
          ? <p className="text-white relative -top-4">Total chair count: {totalChairs} ({exhibitor.data?.package?.chairs} from package)</p>
          : null}
        <InputField
          type="number"
          value={extraTables.toString()}
          setValue={setExtraTablesStr}
          name="extraTables"
          fields={t.exhibitorSettings.fields}
        />
        {exhibitor.data?.package?.tables
          ? <p className="text-white relative -top-4">Total table count: {totalTables} ({exhibitor.data?.package?.tables} from package)</p>
          : null}
        <InputField
          type="number"
          value={extraDrinkCoupons.toString()}
          setValue={setExtraDrinkCouponsStr}
          name="extraDrinkCoupons"
          fields={t.exhibitorSettings.fields}
        />
        {exhibitor.data?.package?.drinkCoupons
          ? <p className="text-white relative -top-4">Total drink coupon count: {totalDrinkCoupons} ({exhibitor.data?.package?.drinkCoupons} from package)</p>
          : null}
        <InputField
          type="number"
          value={extraRepresentativeSpots.toString()}
          setValue={setExtraRepresentativeSpotsStr}
          name="extraRepresentativeSpots"
          fields={t.exhibitorSettings.fields}
        />
        {exhibitor.data?.package?.representativeSpots
          ? <p className="text-white relative -top-4">Total representative count: {totalRepresentativeSpots} ({exhibitor.data?.package?.representativeSpots} from package)</p>
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
        <h2 className="text-cerise font-bold text-4xl mb-10">Contacts</h2>
        {contacts.data?.map(contact => <div key={contact.id}>
          <ContactPerson
            contact={contact}
            t={t}
            remove={() => removeContact.mutateAsync(contact.id).then(() => trpc.exhibitor.getContacts.invalidate())}
            showRemove={contacts.data?.length > 1}
          />
          <div className="h-10" />
        </div>)}
        {addingContact ? (
          <ContactPerson
            t={t}
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
    </div>
  </>;
}
