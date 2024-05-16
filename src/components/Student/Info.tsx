import Locale from "@/locales";
import { Dispatch, useEffect, useState } from "react";
import UploadCV from "./UploadCV";
import { CheckMark } from "../CheckMark";
import { InputField } from "../InputField";

export default function StudentInfo(
    {
        t,
        user,
        setUser,
        saveHandler,
    }: {
        t: Locale;
        user: {
          ugkthid: string;
          first_name: string;
          last_name: string;
          email: string;
          prefered_email: string;
          cv: string;
          study_year: number;
          summerJob: boolean;
          partTimeJob: boolean;
          internship: boolean;
          masterThesis: boolean;
          traineeProgram: boolean;
          fullTimeJob: boolean;
          company_meeting_interests: string[];
      };
        setUser: Dispatch<{
          ugkthid: string;
          first_name: string;
          last_name: string;
          email: string;
          prefered_email: string;
          cv: string;
          study_year: number;
          summerJob: boolean;
          partTimeJob: boolean;
          internship: boolean;
          masterThesis: boolean;
          traineeProgram: boolean;
          fullTimeJob: boolean;
          company_meeting_interests: string[];
        }>;
        saveHandler: (input: any) => void;
    },
) {
  
  const [saved, setSaved] = useState(false);
  
  const job = t.exhibitorSettings.table.row1.section2.jobs;
  const jobs = [{str:job.summer, checked:user.summerJob, set:(val:boolean)=>{setUser({...user,summerJob:val})}},
               {str:job.partTime, checked:user.partTimeJob, set:(val:boolean)=>{setUser({...user, partTimeJob:val})}},
                {str:job.internship, checked:user.internship, set:(val:boolean)=>{setUser({...user,internship:val})}}];
  const other = t.exhibitorSettings.table.row1.section2.other;
  const others = [{str:other.thesis, checked:user.masterThesis, set:(val:boolean)=>{setUser({...user, masterThesis:val})}},
                 {str:other.trainee, checked:user.traineeProgram, set:(val:boolean)=>{setUser({...user, traineeProgram:val})}},
                  {str:other.fullTime, checked:user.fullTimeJob, set:(val:boolean)=>{setUser({...user,fullTimeJob:val})}}];
  

  function alternative(alternative:{str: string; checked: boolean; set: Dispatch<boolean>;}){
    return <div key={alternative.str} className="flex">
                <p className="text-white mr-[5px]">{alternative.str}</p>  
                <CheckMark name={alternative.str}
                           checked={alternative.checked} 
                           onClick={()=>{alternative.set(!alternative.checked)}} 
                           onChange={()=>{}}/>
            </div>;
  }

  function YearChecks(){
    function check(year: number){
      function changeYear(){
        setUser({ ...user, study_year: year });
      }

      return <div key={year} className="flex ml-[10px]">
              <p className="text-slate-400 text-medium mr-[5px]">{year}</p>
              <CheckMark name={year.toString()} checked={user.study_year === year} onClick={changeYear}/>
            </div>
    }
    
    const years = [1,2,3,4,5];

    return <div className="flex">
            {years.map(check)}
           </div>
  }

    return (
        <div className="relative mt-[100px] w-[90%] lg:w-[50%] mb-12 bg-white/20 border-2 border-cerise rounded-xl overflow-hidden">
          <div className="flex flex-col items-center w-full p-4">

            <h1 className="text-white text-center text-3xl mt-[10px] mb-[10px]">{t.students.info.header}</h1>
            <form 
                className="flex flex-col w-[90%] bg-transparent justify-center outline-none gap-7 mt-10"
                onSubmit={(e)=>{
                  e.preventDefault();
                  saveHandler(user)
                }}
                key="form"
                >
              <InputField
                key="firstName"
                type="name"
                name="firstName"
                value={user.first_name}
                required={true}
                setValue={(name) => {setUser({ ...user, first_name: name })}}
                fields={t.students.info}
                />

              <InputField
                key="lastName"
                type="name"
                name="lastName"
                value={user.last_name}
                required={true}
                setValue={(name) => {setUser({ ...user, last_name: name })}}
                fields={t.students.info}
                />

              <div>
                <label htmlFor="year"  
                className="text-slate-400 font-medium
                cursor-text uppercase
                md:text-md text-lg">
                  {t.students.info.year}
                </label>
                <YearChecks/>
              </div>


              <InputField
                  key={"email"}
                  type="email"
                  name="email"
                  value={user.prefered_email}
                  required={false}
                  setValue={(name) => {setUser({ ...user, prefered_email: name })}}
                  fields={t.students.info}
                />
    
              <div>
                <label htmlFor="role"
                  className="
                  text-slate-400 font-medium
                  cursor-text uppercase
                  md:text-md text-lg ">
                  {t.students.info.cv}:
                </label>
                <UploadCV setFile={(value)=>{setUser({...user, cv:value})}}/>
              </div>

              <h2 className="text-white text-center text-3xl mt-[10px] mb-[10px]">{t.students.interests.header}</h2>
              <div className="flex justify-between mt-[10px] ml-[40px] mr-[40px]">
                  {jobs.map(alternative)}
              </div>
              <div className="flex justify-between mt-[10px] mb-[10px] ml-[40px] mr-[40px]">
                {others.map(alternative)} 
              </div>

              <div className="justify-center flex flex-col mt-[40px]">
                <button type="submit" className="mt-4 mb-4 mx-2 flex justify-center">
                  <a className="block hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base font-medium px-6 py-2 max-lg:mx-auto w-max">
                    {t.students.info.save}
                  </a>
                </button>
                <p className="text-white self-center">
                  {saved? (!user.first_name ? t.students.info.addFirstName : !user.last_name ?  t. students.info.addLastName : !user.study_year ? t.students.info.addYear : "") : ""}
                </p>
              </div>
            </form>
          </div>
        </div>
      );
}