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
        companies,
        setCompanies,
    }: {
        t: Locale;
        user: {
            company_meeting_interests: string[];
        };
        companies: {}[];
        setCompanies: Dispatch<Company[]>;
    }
){
    /*const inputCompanyInterests = api.student.inputCompanyInterests.useMutation();
    const companyMeeting = api.student.getCompaniesWithMeetings.useQuery();
    
    const [companies, setCompanies] = useState<{}[]>([]);

    useEffect(()=>{
        if(!companyMeeting.data) return;
        setCompanies(companyMeeting.data)
    },[companyMeeting]);
*/


    function displayCompanyOption(company: Company){
        /*function changeChecked(){
            if(companies.includes(company.id)){
                // Remove from interests
                setCompanies([...companies].filter(function removeInterest(interestId){return interestId !== company.id }));
            }else{
                 // Add to interests
                 setCompanies([...companies,company.id])
            }
        }*/

        return (<div key={'name-'+company.name} className="flex items-center border-t-2 border-white pt-[10px] pb-[10px]">
                    <CheckMark key={'checkmark-'+company.name} name={company.name} checked={user.company_meeting_interests.includes(company.id)} onClick={()=>{}}/>
                    <div className="ml-[10px]">
                        {company.name}
                    </div>
                    <img className="md:min-w-[120px] w-[60px] ml-[10px]" src={addImageDetails(company.logo)}></img>
                    <div className="ml-[10px]">
                        {company.description}
                    </div>
                </div>);
    }

    function saveInterests(){
        //inputCompanyInterests(companies);
    }

    return(
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
    );
}