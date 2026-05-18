import React from "react";
import Locale from "@/locales";

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
    return (
        <>
            <h2 className="uppercase text-cerise text-2xl md:text-4xl font-normal px-[10px] break-words w-full text-center pt-4">
                {t.exhibitorSettings.table.row5.section1.header}
            </h2>
            <div className="w-full flex flex-col gap-8 mt-8 mb-20 items-center justify-center">
              <div className="border-2 border-cerise rounded-3xl bg-black/25 p-12 w-full max-w-2xl">
                <div className="flex flex-col gap-8">
                  {/* Physical Address */}
                  <div className="flex flex-col gap-2">
                    <label className="text-white text-lg font-normal tracking-wider">
                      {t.exhibitorSettings.table.row5.section1.physicalAddress}
                    </label>
                    <input
                      type="text"
                      value={physicalAddress}
                      onChange={(e) => setPhysicalAddress(e.target.value)}
                      placeholder={t.exhibitorSettings.table.row5.section1.placeholderTextPhysicalAddress}
                      className="bg-transparent border-b-2 border-white text-white placeholder:text-gray-400 focus:outline-none focus:border-cerise transition-colors pb-2"
                    />
                  </div>

                  {/* Billing Method */}
                  <div className="flex flex-col gap-4">
                    <label className="text-white text-lg font-normal tracking-wider">
                      {t.exhibitorSettings.table.row5.section1.billingMethodText}
                    </label>
                    <div className="flex gap-8 ml-2">
                      {t.exhibitorSettings.table.row5.section1.billingMethods?.map((method: string) => (
                        <label key={method} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="billingMethod"
                            value={method}
                            checked={billingMethod === method}
                            onChange={(e) => setBillingMethod(e.target.value)}
                            className="w-5 h-5 accent-cerise cursor-pointer"
                          />
                          <span className="text-white text-base">
                            {method}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Organization Number */}
                  {organizationNumber?.[0] != '0' && (
                    <div className="flex flex-col gap-2">
                      <label className="text-white text-lg font-normal tracking-wider">
                        {t.exhibitorSettings.table.row5.section1.organizationNumber}
                      </label>
                      <input
                        type="text"
                        value={organizationNumber}
                        onChange={(e) => setOrganizationNumber(e.target.value)}
                        placeholder={t.exhibitorSettings.table.row5.section1.placeholderTextOrganizationNumber}
                        className="bg-transparent border-b-2 border-white text-white placeholder:text-gray-400 focus:outline-none focus:border-cerise transition-colors pb-2"
                      />
                    </div>
                  )}

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="text-white text-lg font-normal tracking-wider">
                      {t.exhibitorSettings.table.row5.section1.email}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.exhibitorSettings.table.row5.section1.placeholderTextEmail}
                      className="bg-transparent border-b-2 border-white text-white placeholder:text-gray-400 focus:outline-none focus:border-cerise transition-colors pb-2"
                    />
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-center pt-8">
                    <button
                      className="uppercase bg-cerise rounded-full text-white text-base font-normal px-16 py-3 hover:scale-105 transition-transform"
                      onClick={saveHandler}
                    >
                      {t.exhibitorSettings.table.row1.section2.save}
                    </button>
                  </div>
                </div>
              </div>
            </div>

    </>
    );
}
