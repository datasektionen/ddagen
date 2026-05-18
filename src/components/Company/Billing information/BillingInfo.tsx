import React from "react";
import Locale from "@/locales";
import { TextInput } from "@/components/Company/TextInput";

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
            <div className="w-full flex flex-col gap-8 mt-8 mb-20 lg:px-24 items-center justify-center">
              <div className="">
                <TextInput
                    description={physicalAddress}
                    name="Address"
                    setDescription={setPhysicalAddress}
                    textAbove={t.exhibitorSettings.table.row5.section1.physicalAddress}
                    placeHolderText={
                      t.exhibitorSettings.table.row5.section1.placeholderTextPhysicalAddress
                    }
                    />
              </div>
              <div className="flex flex-col items-center gap-5">
                <label className="text-xl font-normal text-white tracking-wider">
                  {t.exhibitorSettings.table.row5.section1.billingMethodText}
                </label>
                <div className="flex gap-8">
                  {t.exhibitorSettings.table.row5.section1.billingMethods?.map((method: string) => (
                    <label key={method} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="billingMethod"
                        value={method}
                        checked={billingMethod === method}
                        onChange={(e) => setBillingMethod(e.target.value)}
                        className="w-6 h-6 accent-cerise cursor-pointer"
                      />
                      <span className="text-white text-lg">
                        {method}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
                {organizationNumber?.[0] != '0' && <div>
                <TextInput
                  description={organizationNumber}
                  name="organizationNumber"
                  setDescription={setOrganizationNumber}
                  textAbove={t.exhibitorSettings.table.row5.section1.organizationNumber}
                  placeHolderText={
                    t.exhibitorSettings.table.row5.section1.placeholderTextOrganizationNumber
                  }
                  
                />
                </div>}
                <div>
                <TextInput
                  description={email}
                  name="email"
                  setDescription={setEmail}
                  textAbove={t.exhibitorSettings.table.row5.section1.email}
                  placeHolderText={
                    t.exhibitorSettings.table.row5.section1.placeholderTextEmail
                  }
                />
                </div>
                <div className="w-full flex justify-center">
                  <button
                    className="block uppercase hover:scale-105 transition-transform
                      bg-cerise rounded-full text-white text-base font-normal
                      px-16 py-2 max-lg:mx-auto w-max"
                    onClick={saveHandler}
                  >
                    {t.exhibitorSettings.table.row1.section2.save}
                  </button>
                </div>
                </div>
                
    </>
    );
}
