import Locale from "@/locales";
import { useEffect, useRef, useState } from "react";
import { InputField } from "@/components/InputField";
import { CheckMarkField } from "@/components/CheckMarkField";
import { SelectField } from "@/components/SelectField";

import { ExhibitorInfo } from "@/shared/Classes";
import { api } from "@/utils/api";

export function AddExhibitorForm({
  t,
  addExhibitor,
  exhibitorsInterests,
  closeModal,
}: {
  t: Locale;
  addExhibitor: (exhibitor: ExhibitorInfo) => Promise<string | undefined>;
  exhibitorsInterests: ExhibitorInfo[];
  closeModal: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

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

  const [exhibitorInterestValue, setExhibitorInterestValue] = useState<number>(-1);


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

  function handleOverlayClick(event: React.MouseEvent) {
    if (modalRef.current === event.target) {
      closeModal();
    }
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
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-lg z-50"
      ref={modalRef}
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-slate-200 bg-opacity-100 w-[325px] sm:w-[500px] max-h-[80vh] overflow-y-auto pb-5 flex flex-col rounded-3xl z-50`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="relative py-[25px] justify-center flex flex-row">
          <button
            className="absolute top-5 right-3 w-[50px] h-[50px] flex items-center justify-center"
            onClick={closeModal}
          >
            <div className="absolute h-[50px] w-[5px] bg-white rounded-md rotate-45"></div>
            <div className="absolute h-[50px] w-[5px] bg-white rounded-md -rotate-45"></div>
          </button>
          <div className="px-5 mt-5">
            <h2 className="text-black mb-8 text-3xl font-medium uppercase">
              {t.admin.addCompany.addCompanyButton}
            </h2>

            <form
              className="flex flex-col gap-12 min-w-[325px] max-w-[375px] text-black"
              onSubmit={async (e) => {
                e.preventDefault();
                setError("");
                setError(await addExhibitor(createExhibitor()) ?? "");
              }}
            >
              {
              exhibitorsInterests.length > 0 &&
              <SelectField
                name="exhibitorInterest"
                options={["", ...exhibitorsInterests.map((exhibitor) => exhibitor.companyName)]}
                values={[-1, ...exhibitorsInterests.map((_, i) => i)]}
                value={exhibitorInterestValue}
                setValue={(value: number) => {
                  setExhibitorInterestValue(value);
                  if(value == -1){
                    setCompanyName("");
                    setOrganizationNumber("");
                    setContactPerson("");
                    setTelephoneNumber("");
                    setEmail("");
                    return;
                  }
                  const selectedExhibitor = exhibitorsInterests[value];
                  if (selectedExhibitor) {
                    setCompanyName(selectedExhibitor.companyName);
                    setOrganizationNumber(selectedExhibitor.organizationNumber);
                    setContactPerson(selectedExhibitor.contactPerson);
                    setTelephoneNumber(selectedExhibitor.telephoneNumber);
                    setEmail(selectedExhibitor.email);
                  }
                }}
                fields={{ exhibitorInterest: t.admin.addCompany.addExhibitorForm.exhibitorInterest }}
              />
              }
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
                values={t.packages.name.map((_, i) => i)}
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
        </div>
      </div>
    </div>
  );
}
