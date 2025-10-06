import Locale from "@/locales";
import { Exhibitor } from "@/shared/Classes";

import { useRef, useState } from "react";
import { InputField } from "../InputField";

export function UpdateIndustryTypeForm({
    t, 
    exhibitor,
    closeModal,
    setIndustryType,
    setShowIndustryTypeForm
} : {
    t: Locale;
    exhibitor: Exhibitor;
    closeModal: () => void;
    setIndustryType: (z: string, industryType: string) => void;
    setShowIndustryTypeForm: (a: boolean) => void;
}) {
    const modalRef = useRef<HTMLDivElement>(null);

    const [error, setError] = useState("");

    const [industryTypeString, setIndustryTypeString] = useState<string>(exhibitor?.industryType ?? "");

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
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50"
        ref={modalRef}
        onClick={handleOverlayClick}
      >
        <div
          className={`flex bg-slate-200 bg-opacity-100 w-[325px] sm:w-[500px] max-h-[80vh] overflow-y-auto pb-5 flex-col rounded-3xl z-50`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex relative py-[25px] justify-center flex-row focus:outline-none focus:ring-0">
            <button
              className="absolute top-5 right-3 w-[50px] h-[50px] flex items-center justify-center"
              onClick={closeModal}
            >
              <div className="absolute h-[50px] w-[5px] bg-white rounded-md rotate-45"></div>
              <div className="absolute h-[50px] w-[5px] bg-white rounded-md -rotate-45"></div>
            </button>
            <div className="flex flex-col px-5 mt-5">
              <h2 className="text-black mb-8 text-3xl font-medium uppercase">
                {"Set industrytype for " + exhibitor.name}
              </h2>
  
              <form
                className="flex flex-col gap-10 w-full max-w-[455px] text-black"
                onSubmit={(e) => {
                    setShowIndustryTypeForm(false);
                    e.preventDefault();

                  setIndustryType(
                    exhibitor.id,
                    industryTypeString
                  )
                }}
              >
                  <h3 className="text-lg font-medium mt-2">{t.exhibitorSettings.fieldsUpdateIndustryType.name}</h3>
                  <div className="flex flex-col gap-3">
                    <InputField
                    type="text"
                    name="name"
                    value={industryTypeString}
                    setValue={setIndustryTypeString}
                    fields={{name: t.exhibitorSettings.fieldsUpdateIndustryType.industryType}}
                    dark={true}
                    />
                  </div>
                <Submit value={t.admin.sales.header.specialOrders.specialOrderSave} />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
}