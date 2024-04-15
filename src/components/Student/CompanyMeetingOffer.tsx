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
        companyName: string,
        companyLogo: string,
        timeOptions: {
            id: number,
            time: string,
        }[],
    }
){
    const [time, setTime] = useState(null);

    function displayTimeOptions(option: {id:number,time:string}){
        return <option id={option.id} key={option.id}>{option.time}</option>;
    }

    function changeTime(evt){
        var selectedIndex = evt.target.options.selectedIndex;
        var id = evt.target.options[selectedIndex].getAttribute('id');
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
                     onClick={function click(){console.log("check " + time)}}
                     src="/img/check.png"/>
                <img className="h-[50px]"
                     onClick={function click(){console.log("cross")}} 
                     src="/img/cross.png"/>
            </div>
        </div>
    );
}
