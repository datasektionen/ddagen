import Locale from "@/locales";
import { Dispatch, ReactNode, useEffect, useState } from "react";
import UploadCV from "./UploadCV";
import { CheckMark } from "../CheckMark";
import { InputField } from "../InputField";
import { api } from "@/utils/api";

interface User{
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
}

export default function StudentInfo(
    {
        t,
        id,
    }: {
        t: Locale;
        id: string;
    },
) {
  const [user, setUser] = useState<User | null>(null);
  const studentGetData = api.student.getData.useMutation();

  useEffect(() => {
    studentGetData.mutateAsync(id)
    .then((result)=>{
        if (result) {
            const newUser : User = {...user,
              ugkthid:result.ugkthid,
              first_name:result.first_name,
              last_name:result.last_name,
              email:result.email,
              prefered_email:result.prefered_email,
              study_year:result.study_year,
              summerJob:result.summerJob,
              partTimeJob:result.partTimeJob,
              internship:result.internship,
              masterThesis:result.masterThesis,
              fullTimeJob:result.fullTimeJob,
              traineeProgram:result.traineeProgram,
              cv:result.cv,
            };
            setUser(newUser);
        } 
    });
}, []);

  const inputData = api.student.inputData.useMutation();
  const [saved, setSaved] = useState(false);

  const section = t.exhibitorSettings.table.row1.section2;
  
  function wrapCheckMark(name: string, checkMark: ReactNode){
    return <div key={name} className="flex">
                <p className="text-white mr-[5px]">{name}</p>  
                {checkMark}
            </div>;
  }

  function YearChecks(){
    function check(year: number){
      return user && (<div key={year} className="flex ml-[10px]">
                      <p className="text-slate-400 text-medium mr-[5px]">{year}</p>
                      <CheckMark name={year.toString()} checked={user.study_year === year} onClick={()=>{setUser({...user, study_year: year})}}/>
                    </div>)
    }
    const years = [1,2,3,4,5];
    return <div className="flex">
            {years.map(check)}
           </div>
    }

    function saveHandlerFunc(data: User){
      inputData.mutateAsync(JSON.stringify(data))
      .then((res) =>{
        setSaved(true);
        setTimeout(()=>{setSaved(false)}, 2000);
      })
      .catch((err) => {
        setSaved(false);
      });
      
    }

    return user && (
          <div className="flex flex-col items-center w-full p-4">

            <h1 className="text-cerise text-center text-3xl mt-[10px] mb-[10px]">{t.students.info.header}</h1>
            <form 
                className="flex flex-col w-[90%] bg-transparent justify-center outline-none gap-7 mt-10"
                onSubmit={(e)=>{
                  e.preventDefault(); 
                  saveHandlerFunc(user)
                }}
                key="form"
                >

              <InputField
                type="text"
                name="firstName"
                value={user.first_name}
                required={true}
                setValue={(name) => {
                  setUser({ ...user, first_name: name });
                }}
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
                md:text-sm text-[9px]">
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
                  md:text-sm text-[9px] ">
                  {t.students.info.cv}:
                </label>
                <UploadCV t={t} file={user.cv} setFile={(value)=>{setUser({...user, cv:value})}}/>
              </div>

              <h2 className="text-cerise text-center text-3xl mt-[10px] mb-[10px]">{t.students.interests.header}</h2>
              <div className="flex flex-col md:flex-row justify-between mt-[10px] ml-[40px] mr-[40px] gap-4">
                {wrapCheckMark(section.jobs.summer, <CheckMark name={section.jobs.summer} checked={user.summerJob} onClick={()=>{setUser({...user, summerJob:!user.summerJob})}}/>)}
                {wrapCheckMark(section.jobs.partTime, <CheckMark name={section.jobs.partTime} checked={user.partTimeJob} onClick={()=>{setUser({...user, partTimeJob:!user.partTimeJob})}}/>)}
                {wrapCheckMark(section.jobs.internship, <CheckMark name={section.jobs.internship} checked={user.internship} onClick={()=>{setUser({...user,internship:!user.internship})}}/>)}
              </div>
              <div className="flex flex-col md:flex-row justify-between mt-[10px] mb-[10px] ml-[40px] mr-[40px] gap-4">
                {wrapCheckMark(section.other.thesis, <CheckMark name={section.other.thesis} checked={user.masterThesis} onClick={()=>{setUser({...user, masterThesis:!user.masterThesis})}}/>)}
                {wrapCheckMark(section.other.trainee, <CheckMark name={section.other.trainee} checked={user.traineeProgram} onClick={()=>{setUser({...user, traineeProgram:!user.traineeProgram})}}/>)}
                {wrapCheckMark(section.other.fullTime, <CheckMark name={section.other.fullTime} checked={user.fullTimeJob} onClick={()=>{setUser({...user,fullTimeJob:!user.fullTimeJob})}}/>)}
              </div>

              <div className="justify-center flex flex-col mt-[40px]">
                <button type="submit" className="mt-4 mb-4 mx-2 flex justify-center">
                  <a className="block hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base font-medium px-6 py-2 max-lg:mx-auto w-max">
                    {t.students.info.save}
                  </a>
                </button>
                <p className="text-white self-center">
                  {saved? (!user.first_name ? t.students.info.addFirstName : !user.last_name ?  t. students.info.addLastName : !user.study_year ? t.students.info.addYear : "Saved") : ""}
                 
                </p>
                <p className="font-bold text-md ">*{t.students.info.subHeader} </p>
              </div>
            </form>
          </div>
      );
}