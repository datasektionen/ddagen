import { Dispatch, useState } from "react";
import { CheckMark } from "../CheckMark";
import Locale from "@/locales";

export default function Interests(
    {
        t,
        interests,
        setInterests,
        
    }: {
        t: Locale;
        interests: {
            summer: boolean;
            partTime: boolean;
            internship: boolean;
            thesis: boolean;
            trainee: boolean;
            fullTime: boolean;
        };
        setInterests: Dispatch<{
                            summer: boolean;
                            partTime: boolean;
                            internship: boolean;
                            thesis: boolean;
                            trainee: boolean;
                            fullTime: boolean;
                        }>;
    }
) {

    const [summer, setSummer] = useState<boolean>(interests.summer);
    const [partTime, setPartTime] = useState<boolean>(interests.partTime);
    const [internship, setInternship] = useState<boolean>(interests.internship);

    const [thesis, setThesis] = useState<boolean>(interests.thesis);
    const [trainee, setTrainee] = useState<boolean>(interests.trainee);
    const [fullTime, setFullTime] = useState<boolean>(interests.fullTime);

    const job = t.exhibitorSettings.table.row1.section2.jobs;
    const jobs = [{str:job.summer, checked:summer, set:setSummer}, {str:job.partTime, checked:partTime, set:setPartTime}, {str:job.internship, checked:internship, set:setInternship}];
    const other = t.exhibitorSettings.table.row1.section2.other;
    const others = [{str:other.thesis, checked:thesis, set:setThesis}, {str:other.trainee, checked:trainee, set:setTrainee}, {str:other.fullTime, checked:fullTime, set:setFullTime}];

    function alternative(alternative:{str: string; checked: boolean; set: Dispatch<boolean>;}){
        return <div key={alternative.str} className="flex">
                    <p className="text-white mr-[5px]">{alternative.str}</p>  
                    <CheckMark name={alternative.str}
                               checked={alternative.checked} 
                               onClick={function func(){alternative.set(!alternative.checked)}} 
                               onChange={function func(){}}/>
                </div>;
    }

    function saveInterests(){
        setInterests({summer:summer, partTime:partTime, internship:internship, thesis:thesis, trainee:trainee, fullTime:fullTime});
    }

  return (
    <div className="relative mt-[100px] w-[60%] mb-12 bg-white/20 border-2 border-cerise rounded-xl overflow-hidden">
        <h1 className="text-white text-center text-3xl mt-[10px] mb-[10px]">{t.students.interests.header}</h1>
        <div className="flex justify-between mt-[10px] ml-[40px] mr-[40px]">
            {jobs.map(alternative)}
        </div>
        <div className="flex justify-between mt-[10px] mb-[10px] ml-[40px] mr-[40px]">
           {others.map(alternative)} 
        </div>
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

