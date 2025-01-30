import Locale from "@/locales";
import { useState } from "react";
import { InputField } from "@/components/InputField";
import { CheckMarkField } from "@/components/CheckMarkField";
import { SelectField } from "@/components/SelectField";

import { ExhibitorInfo } from "@/shared/Classes";

export function AddExhibitorForm({
  t,
  addExhibitor,
}: {
  t: Locale;
  addExhibitor: (exhibitor: ExhibitorInfo) => Promise<string | undefined>;
}) {
  const [error, setError] = useState("");
  
  const [companyName, setCompanyName] = useState("");
  const [organizationNumber, setOrganizationNumber] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [packageTier, setPackageTier] = useState<number>(0);
  const [studentMeetings, setStudentMeetings] = useState<number>(0);
  const [sendEmailToExhibitor, setSendEmailToExhibitor] = useState<boolean>(false);
  const [mapPosition, setMapPosition] = useState(0);
  const [meetingTimeSlots, setMeetingTimeSlots] = useState<number[]>([]);

  const handlePackageTier = (value: number) => {
    setPackageTier(value);
  }

  function createExhibitor() {
    return new ExhibitorInfo(
      companyName,
      organizationNumber,
      contactPerson,
      telephoneNumber,
      email,
      Number(packageTier),
      Number(studentMeetings),
      Boolean(sendEmailToExhibitor),
      Number(mapPosition),
      meetingTimeSlots,
    );
  }

  function Submit({ value }: { value: string }) {
    return (
      <input
        type="submit"
        value={value}
        className="
          bg-cerise transition-transform hover:scale-110 focus:scale-110
          focus:outline-none text-white uppercase w-fit py-2 px-10
          rounded-full cursor-pointer disabled:cursor-wait disabled:grayscale
        "
      />
    );
  }

  return (
    <div className="flex flex-col mb-10">
      <h3 className="text-cerise mb-8 text-2xl font-medium uppercase">
        {t.admin.addCompany.addCompanyButton}
      </h3>

      <form
        className="flex flex-col gap-12 min-w-[325px] max-w-[375px]"
        onSubmit={async (e) => {
          e.preventDefault();
          setError("");
          setError(await addExhibitor(createExhibitor()) ?? "");
        }}
      >
        <InputField
          name="companyName"
          value={companyName}
          type="text"
          setValue={setCompanyName}
          //fields={{ companyName: "Företagsnamn" }}
          fields={{ companyName: t.admin.addCompany.addExhibitorForm.companyName }}
        />
        <InputField
          name="organizationNumber"
          value={organizationNumber}
          type="text"
          setValue={setOrganizationNumber}
          //fields={{ organizationNumber: "Organisationsnummer" }}
          fields={{ organizationNumber: t.admin.addCompany.addExhibitorForm.organizationNumber }}
          />
        <InputField
          name="contactPerson"
          value={contactPerson}
          type="text"
          setValue={setContactPerson}
          //fields={{ contactPerson: "Kontaktperson" }}
          fields={{ contactPerson: t.admin.addCompany.addExhibitorForm.contactPerson }}
          />
        <InputField
          name="telephoneNumber"
          value={telephoneNumber}
          type="text"
          setValue={setTelephoneNumber}
          //fields={{ telephoneNumber: "Telefonnummer" }}
          fields={{ telephoneNumber: t.admin.addCompany.addExhibitorForm.telephoneNumber }}
          />
        <InputField
          name="email"
          value={email}
          type="text"
          setValue={setEmail}
          //fields={{ email: "E-post" }}
          fields={{ email: t.admin.addCompany.addExhibitorForm.email }}
          />
        <SelectField
          name="packageTier"
          //[ "Small","Medium","Large","Main Sponsor","Startup"],
          options={t.packages.name}
          //[0, 1, 2, 3, 4]
          values={t.packages.name.map((_,i) => i)}
          value={packageTier}
          setValue={handlePackageTier}
          //fields={{ packageTier: "Paket" }}
          fields={{ packageTier: t.admin.addCompany.addExhibitorForm.packageTier }}
          />
        <CheckMarkField
          name="sendEmailToExhibitor"
          checked={sendEmailToExhibitor}
          type="checkbox"
          onClick={() => setSendEmailToExhibitor(b => !b)}
          //fields={{ sendEmailToExhibitor: "Skicka e-post till utställare" }}
          fields={{ sendEmailToExhibitor: t.admin.addCompany.addExhibitorForm.sendEmailToExhibitor }}
          />
        {/*
        Not used fields: studentMeetings, mapPosition, meetingTimeSlots
        */}

        <Submit value={t.admin.addCompany.addCompanyButton} />
      </form>
      {error && (
        <p className="text-red-500 font-bold mt-6">{error}</p>
      )}
    </div>
  );
}
