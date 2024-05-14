import Locale from "@/locales";
import { Dispatch, useState } from "react";
import UploadCV from "./UploadCV";
import { CheckMark } from "../CheckMark";
import { InputField } from "../InputField";

export default function StudentInfo(
    {
        t,
        user,
        setUser,
        interests,
        setInterests,
        saveHandler,
    }: {
        t: Locale;
        user: {
          first_name: string;
          last_name: string;
          kth_email: string;
          email: string;
          cv: string;
          year: number;
      };
        setUser: Dispatch<{
          first_name: string;
          last_name: string;
          kth_email: string;
          email: string;
          cv: string;
          year: number;
        }>;
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
        saveHandler: (input: any) => void;
    },
) {
  //const [user, setUser] = useState({first_name:userInfo.first_name, last_name:userInfo.last_name, email:userInfo.email, year:userInfo.year, cv:userInfo.cv})
  const [saved, setSaved] = useState(false);
  //const [cv, setCv] = useState<string>("");
//

  //const [jobOffers, setJobOffers] = useState<boolean[]>({summer:interests.summer, partTime:interests.partTime, internship:interests.internship, thesis:interests.thesis, trainee:interests.trainee, fullTime:interests.fullTime});
  
  const [summer, setSummer] = useState<boolean>(interests.summer);
  const [partTime, setPartTime] = useState<boolean>(interests.partTime);
  const [internship, setInternship] = useState<boolean>(interests.internship);
//
  const [thesis, setThesis] = useState<boolean>(interests.thesis);
  const [trainee, setTrainee] = useState<boolean>(interests.trainee);
  const [fullTime, setFullTime] = useState<boolean>(interests.fullTime);
//
  const job = t.exhibitorSettings.table.row1.section2.jobs;
  const jobs = [{str:job.summer, checked:summer, set:setSummer}, {str:job.partTime, checked:partTime, set:setPartTime}, {str:job.internship, checked:internship, set:setInternship}];
  const other = t.exhibitorSettings.table.row1.section2.other;
  const others = [{str:other.thesis, checked:thesis, set:setThesis}, {str:other.trainee, checked:trainee, set:setTrainee}, {str:other.fullTime, checked:fullTime, set:setFullTime}];

  /*function saveInfo(){
    if(user.first_name && user.last_name && user.year){
      setUser({first_name:user.first_name, last_name:user.last_name, kth_email:user.kth_email, email:user.email, cv:cv, year:user.year});
      setInterests({summer:summer, partTime:partTime, internship:internship, thesis:thesis, trainee:trainee, fullTime:fullTime});
    }else{
      setSaved(true);
    }
  }*/

  function alternative(alternative:{str: string; checked: boolean; set: Dispatch<boolean>;}){
    return <div key={alternative.str} className="flex">
                <p className="text-white mr-[5px]">{alternative.str}</p>  
                <CheckMark name={alternative.str}
                           checked={alternative.checked} 
                           onClick={function func(){alternative.set(!alternative.checked)}} 
                           onChange={function func(){}}/>
            </div>;
}

  function YearChecks(){
    function check(year: number){
      function changeYear(){
        setUser({ ...user, year: year });
      }

      return <div key={year} className="flex ml-[10px]">
              <p className="text-slate-400 text-medium mr-[5px]">{year}</p>
              <CheckMark name={year.toString()} checked={user.year === year} onClick={changeYear}/>
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
                //onSubmit={saveInfo}
                >
              <InputField
                type="text"
                name="firstName"
                value={user.first_name}
                required={true}
                setValue={(name) => {setUser({ ...user, first_name: name })}}
                fields={t.students.info}
                />

              <InputField
                type="text"
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
                  type="text"
                  name="email"
                  value={user.email}
                  required={false}
                  setValue={(name) => {setUser({ ...user, email: name })}}
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

              <div className="justify-center flex flex-col">
                <button type="submit" className="mt-4 mb-4 mx-2 flex">
                  <a className="block hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base font-medium px-6 py-2 max-lg:mx-auto w-max">
                    {t.students.info.save}
                  </a>
                </button>
                <p className="text-white self-center">
                  {saved? (!user.first_name ? t.students.info.addFirstName : !user.last_name ?  t. students.info.addLastName : !user.year ? t.students.info.addYear : "") : ""}
                </p>
              </div>

            </form>
          </div>
          
          <h2 className="text-white text-center text-3xl mt-[10px] mb-[10px]">{t.students.interests.header}</h2>
          <div className="flex justify-between mt-[10px] ml-[40px] mr-[40px]">
              {jobs.map(alternative)}
          </div>
          <div className="flex justify-between mt-[10px] mb-[10px] ml-[40px] mr-[40px]">
            {others.map(alternative)} 
          </div>
            

          <div className="flex justify-center">
            <button onClick={()=>{}} className="mt-4 mb-4 mx-2 flex">
              <a className="block hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base font-medium px-6 py-2 max-lg:mx-auto w-max">
                {t.students.info.save}
              </a>
            </button>
            <p className="text-white self-center">
              {saved? (!user.first_name ? t.students.info.addFirstName : !user.last_name ?  t. students.info.addLastName : !user.year ? t.students.info.addYear : "") : ""}
            </p>
          </div>
          
        </div>
      );
}