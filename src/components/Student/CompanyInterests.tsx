import Locale from "@/locales";
import { Dispatch, useEffect, useState } from "react";
import { CheckMark } from "../CheckMark";
import { api } from "@/utils/api";
import { addImageDetails } from "@/shared/addImageDetails";

interface Company{
    id: string;
    name: string;
    description: string;
    logo: string;
}

interface User{
    company_meeting_interests: string[];
    
}

export default function CompanyInterests(
    {
        t,
        user,
        company,
    
    }: {
        t: Locale;
        user: {
            company_meeting_interests: string[];
        };
        company: Company;
    }
){

    function saveInterests(){
        //inputCompanyInterests(companies);
    }

    return (<div className="w-[500px] rounded-2xl bg-white/20 backdrop-blur-md text-white pt-8 m-4 text-center overflow-hidden border-2 border-cerise">
            <h2 className="text-xl pb-4">
                {company.name}
            </h2>
            {/**Länk till företaget? */}
            <div className="flex justify-center mt-2">
                <img className="md:min-h-[120px] h-[200px] " src={addImageDetails(company.logo)}></img>
            </div>
            <p className="text-left p-4">
                {company.description}
            </p> 
            {
                /* 
                
            <select onChange={changeTime} className="bg-cerise w-[120px] h-[30px]">
                <option value="">{t.students.companyMeeting.chooseOption}</option>
                {timeOptions.map(displayTimeOptions)}
            </select>
                */
            }
            <div className="flex justify-between ml-[80px] mr-[80px] mb-2">
                <CheckMark name={"check"} />
                 </div>
        </div>)

    /*return(
        <div className="w-90 lg:w-50  rounded-2xl bg-white/20 backdrop-blur-md text-white pt-8 text-center overflow-hidden border-2 border-cerise">
            <h2 className="text-white text-center text-3xl mt-[10px] mb-[10px]">{t.students.companyInterests.header}</h2>
            {companies.map((opt: any)=>{ return displayCompanyOption(opt)})}
            <div className="flex justify-center">
                <button onClick={saveInterests} className="mt-4 mb-4 mx-2 flex">
                <a className="block hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base font-medium px-6 py-2 max-lg:mx-auto w-max">
                    {t.students.info.save}
                </a>
                </button>
            </div>
        </div>
    );*/
}