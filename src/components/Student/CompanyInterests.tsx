import Locale from "@/locales";
import { Dispatch, useState } from "react";
import { CheckMark } from "../CheckMark";

export default function CompanyMeetingOffer(
    {
        t,
        companies,
        companyInterests,
        setCompanyInterests,
    }: {
        t: Locale;
        companies:{
            id:string;
            name:string;
            description:string;
            logo:string;
        }[];
        companyInterests: string[];
        setCompanyInterests: Dispatch<string[]>;
    }
){
    const [interests, setInterests] = useState<string[]>(companyInterests);

    function displayCompanyOption(company: {id:string,name:string,description:string,logo:string}){
        function changeChecked(){
            if(interests.includes(company.id)){
                // Remove from interests
                setInterests([...interests].filter(function removeInterest(interestId){return interestId !== company.id }));
            }else{
                 // Add to interests
                 setInterests([...interests,company.id])
            }
        }
        return (<div key={company.id} className="flex items-center border-t-2 border-white pt-[10px] pb-[10px]">
                    <CheckMark name={company.name} checked={interests.includes(company.id)} onClick={changeChecked}/>
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
        setCompanyInterests(interests);
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