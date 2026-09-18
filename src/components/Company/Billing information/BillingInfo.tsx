import React from "react";
import Locale from "@/locales";
import { InputField } from "../InputField";

export default function BillingInfo(
    {
        t,
        physicalAddress,
        setPhysicalAddress,
        billingMethod,
        setBillingMethod,
        organizationNumber,
        setOrganizationNumber,
        email,
        setEmail,
        saveHandler,
    }: {
        t: Locale;
        physicalAddress: string;
        setPhysicalAddress: React.Dispatch<React.SetStateAction<string>>;
        billingMethod: string;
        setBillingMethod: React.Dispatch<React.SetStateAction<string>>;
        organizationNumber: string;
        setOrganizationNumber: React.Dispatch<React.SetStateAction<string>>;
        email: string;
        setEmail: React.Dispatch<React.SetStateAction<string>>;
        saveHandler: () => void;
    }

) {
    const billingFields = {
      physicalAddress: t.exhibitorSettings.table.row5.section1.physicalAddress,
      organizationNumber: t.exhibitorSettings.table.row5.section1.organizationNumber,
      email: t.exhibitorSettings.table.row5.section1.email,
    };

    return (
        <div className="w-full flex flex-col items-center">
            <h2 className="uppercase text-cerise text-2xl md:text-4xl font-normal px-[10px] break-words w-full text-center pt-4">
                {t.exhibitorSettings.table.row5.section1.header}
            </h2>
            <p className="text-white mb-4 font-normal text-base mt-4">
                {t.exhibitorSettings.table.row5.section1.info}
            </p>
            <div className="flex flex-col items-center w-[80%] bg-black/25 border-2 border-cerise rounded-xl pt-6 pb-8 mb-16 overflow-hidden">
              <form className="flex flex-col w-[90%] bg-transparent outline-none gap-10 mt-10">
                {/* Physical Address */}
                <InputField
                  type="text"
                  name="physicalAddress"
                  value={physicalAddress}
                  setValue={(value) => setPhysicalAddress(value)}
                  fields={billingFields}
                />

                {/* Billing Method */}
                <div className="relative">
                  <div className="flex gap-8">
                    {t.exhibitorSettings.table.row5.section1.billingMethods?.map((method: string) => (
                      <label key={method} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="billingMethod"
                          value={method}
                          checked={billingMethod === method}
                          onChange={(e) => setBillingMethod(e.target.value)}
                          className="w-5 h-5 accent-cerise cursor-pointer peer"
                        />
                        <span className="text-white text-base">
                          {method}
                        </span>
                      </label>
                    ))}
                  </div>
                  <label className="transform transition-all absolute top-0 left-0 -translate-y-full font-normal uppercase md:text-sm text-xs text-white">
                    {t.exhibitorSettings.table.row5.section1.billingMethodText}
                  </label>
                </div>

                {/* Organization Number */}
                {organizationNumber?.[0] != '0' && (
                  <InputField
                    type="text"
                    name="organizationNumber"
                    value={organizationNumber}
                    setValue={(value) => setOrganizationNumber(value)}
                    fields={billingFields}
                  />
                )}

                {/* Email */}
                <InputField
                  type="email"
                  name="email"
                  value={email}
                  setValue={(value) => setEmail(value)}
                  fields={billingFields}
                />

                {/* Save Button */}
                <div className="flex justify-center mt-4">
                  <button
                    type="button"
                    className="uppercase hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base font-normal px-8 py-2 max-lg:mx-auto w-max"
                    onClick={saveHandler}
                  >
                    {t.exhibitorSettings.table.row1.section2.save}
                  </button>
                </div>
              </form>
            </div>
        </div>
    );
}
