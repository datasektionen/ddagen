import Locale from "@/locales";
import { useState } from "react";

export default function CompanyMeetingOffer(
    {
        t,
        companyName,
        companyLogo,
        timeOptions,
    }: {
        t: Locale,
        companyName: string;
        companyLogo: string;
        timeOptions: number[];
    }
){
    const [time, setTime] = useState<string | null>(null);

    const times = ["10:00-10:30", "10:30-11:00", "11:00-11:30", "11:30-12:00", "12:00-12:30", "12:30-13:00",
                   "13:00-13:30", "13:30-14:00", "14:00-14:30", "14:30-15:00", "15:00-15:30", "15:30-16:00"]

    function displayTimeOptions(option: number){
        return <option id={option.toString()} key={option}>{times[option]}</option>;
    }

    function changeTime(evt: React.ChangeEvent<HTMLSelectElement>){
        const selectedIndex = evt.target.options.selectedIndex;
        const id = evt.target.options[selectedIndex].getAttribute('id');
        setTime(id);
    }

    return(
        <div className="w-[500px] rounded-2xl bg-white/20 backdrop-blur-md text-white pt-8 text-center overflow-hidden border-2 border-cerise">
            {companyName + t.students.companyMeeting.offerText}
            {/**Länk till företaget? */}
            <div className="flex justify-center mt-2">
                <img className="md:min-w-[120px] w-[200px] " src={companyLogo}></img>
            </div>
            <div>
                {t.students.companyMeeting.acceptDeclineText}
            </div> 
            <select onChange={changeTime} className="bg-cerise w-[120px] h-[30px]">
                <option value="">{t.students.companyMeeting.chooseOption}</option>
                {timeOptions.map(displayTimeOptions)}
            </select>
            <div className="flex justify-between ml-[80px] mr-[80px] mb-2">
                <img className="h-[50px]"
                     onClick={()=>{console.log("check " + time)}}
                     src="/img/check.png"/>
                <img className="h-[50px]"
                     onClick={()=>{console.log("cross")}} 
                     src="/img/cross.png"/>
            </div>
        </div>
    );
}
