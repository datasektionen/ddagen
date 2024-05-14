import Locale from "@/locales";
import { Dispatch, useEffect, useState } from "react";
import { CheckMark } from "../CheckMark";
import { api } from "@/utils/api";

export default function CompanyInterests(
    {
        t,
    }: {
        t: Locale;
    }
){
    const inputCompanyInterests = api.student.inputCompanyInterests.useMutation();
    const companyMeeting = api.student.getCompanyMeetings.useQuery();
    
    const [companies, setCompanies] = useState<{}[]>([]);
    useEffect(()=>{
        if(!companyMeeting.data) return;
        console.log("COMPANY MEETING: ", companyMeeting.data);
        const data = companyMeeting.data;
        setCompanies(data)

    },[companyMeeting]);



    function displayCompanyOption(company: {id:string,name:string,description:string,logo:string}){
        function changeChecked(){
            if(companies.includes(company.id)){
                // Remove from interests
                setCompanies([...companies].filter(function removeInterest(interestId){return interestId !== company.id }));
            }else{
                 // Add to interests
                 setCompanies([...companies,company.id])
            }
        }
        return (<div key={company.id} className="flex items-center border-t-2 border-white pt-[10px] pb-[10px]">
                    <CheckMark name={company.name} checked={companies.includes(company.id)} onClick={changeChecked}/>
                    <div className="ml-[10px]">
                        {company.name}
                    </div>
                    <img className="md:min-w-[120px] w-[60px] ml-[10px]" src={company.logo}></img>
                    <div className="ml-[10px]">
                        {company.description}
                    </div>
                </div>);
    }

    function saveInterests(){
        //setCompanyInterests(companies); Broken
    }

    return(
        <div className="w-[900px] rounded-2xl bg-white/20 backdrop-blur-md text-white pt-8 text-center overflow-hidden border-2 border-cerise">
            <h1 className="text-white text-center text-3xl mt-[10px] mb-[10px]">{t.students.companyInterests.header}</h1>
            {companies.map(displayCompanyOption)}
            <div className="flex justify-center">
                <button onClick={saveInterests} className="mt-4 mb-4 mx-2 flex">
                <a className="block hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base font-medium px-6 py-2 max-lg:mx-auto w-max">
                    {t.students.info.save}
                </a>
                </button>
            </div>
        </div>
    );
}