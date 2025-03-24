import React from "react";
import Locale from "@/locales";
import { TextInput } from "@/components/Company/TextInput";
import { AdminSelectField } from "../AdminSelectField";

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
            <div className="w-full flex flex-col lg:flex-row gap-8 mt-8 mb-20 lg:px-24 flex-wrap items-center justify-center">
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
              <div className="self-start">
                <AdminSelectField
                    name="billingMethodText"
                    fields={{billingMethodText: t.exhibitorSettings.table.row5.section1.billingMethodText}}
                    options={t.exhibitorSettings.table.row5.section1.billingMethods}
                    values={t.exhibitorSettings.table.row5.section1.billingMethods}
                    value={billingMethod}
                    setValue={setBillingMethod}
                    />
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
                  disabled={true}
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
