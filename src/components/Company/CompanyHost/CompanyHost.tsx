import React from "react";
import Locale from "@/locales";

export default function CompanyHost(
    {
        t,
        companyHostName,
        companyHostNumber,
        companyHostEmail
    }: {
        t: Locale;
        companyHostName: string;
        companyHostNumber: string;
        companyHostEmail: string;
    }

) {
    return (
        <>
            <h2 className="uppercase text-cerise text-2xl md:text-4xl font-normal px-[10px] break-words w-full text-center pt-4">
                {t.admin.sales.header.companyHost.name}
            </h2>
            <div className="w-full flex flex-col lg:flex-row gap-8 mt-8 mb-20 lg:px-24 flex-wrap items-center justify-center">
                {(companyHostName || companyHostEmail || companyHostNumber) ? 
                    <div className="flex flex-col">
                        <b>{t.admin.sales.header.companyHost.companyHostName}</b>
                        {companyHostName}
                        <b>{t.admin.sales.header.companyHost.companyHostEmail}</b>
                        {companyHostEmail}
                        <b>{t.admin.sales.header.companyHost.companyHostNumber}</b>
                        {companyHostNumber}
                    </div>
                        :
                    <b>{t.admin.sales.header.companyHost.empty}</b>
                }   
            </div>
        </>
    );
}
