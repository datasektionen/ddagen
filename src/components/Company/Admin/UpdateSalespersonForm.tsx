import Locale from "@/locales";
import { Exhibitor } from "@/shared/Classes";
import { useRef, useState } from "react";
import { InputField } from "../InputField";

export function UpdateSalespersonForm({
  t,
  exhibitor,
  closeModal,
  setSalesperson,
  setShowUpdateSalespersonForm,
}: {
  t: Locale;
  exhibitor: Exhibitor;
  closeModal: () => void;
  setSalesperson: (exhibitorId: string, salesperson: string) => void;
  setShowUpdateSalespersonForm: (value: boolean) => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [salesperson, setSalespersonValue] = useState(exhibitor.salesperson);

  function handleOverlayClick(event: React.MouseEvent) {
    if (modalRef.current === event.target) {
      closeModal();
    }
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50"
      ref={modalRef}
      onClick={handleOverlayClick}
    >
      <div className="flex bg-slate-200 bg-opacity-100 w-[325px] sm:w-[500px] max-h-[80vh] overflow-y-auto pb-5 flex-col rounded-3xl z-50">
        <div className="flex relative py-[25px] justify-center flex-row">
          <button
            type="button"
            className="absolute top-5 right-3 w-[50px] h-[50px] flex items-center justify-center"
            onClick={closeModal}
          >
            <div className="absolute h-[50px] w-[5px] bg-white rounded-md rotate-45" />
            <div className="absolute h-[50px] w-[5px] bg-white rounded-md -rotate-45" />
          </button>
          <div className="flex flex-col px-5 mt-5">
            <h2 className="text-black mb-8 text-3xl font-medium uppercase">
              {t.admin.sales.header.salesperson} - {exhibitor.name}
            </h2>
            <form
              className="flex flex-col gap-10 w-full max-w-[455px] text-black"
              onSubmit={(event) => {
                event.preventDefault();
                setShowUpdateSalespersonForm(false);
                setSalesperson(exhibitor.id, salesperson);
              }}
            >
              <InputField
                type="email"
                name="salesperson"
                value={salesperson}
                setValue={setSalespersonValue}
                fields={{ salesperson: t.admin.sales.header.salesperson }}
                dark={true}
                required
              />
              <input
                type="submit"
                value={t.admin.sales.header.specialOrders.specialOrderSave}
                className="bg-cerise transition-transform hover:scale-110 focus:scale-110 focus:outline-none text-white uppercase w-fit py-2 px-10 rounded-full cursor-pointer disabled:cursor-wait disabled:grayscale"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
