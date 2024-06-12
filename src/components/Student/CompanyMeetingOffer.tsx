import Locale from "@/locales";
import { useState } from "react";
import { api } from "@/utils/api";
import { addImageDetails } from "@/shared/addImageDetails";
import { set } from "zod";

export default function CompanyMeetingOffer(
    {
        t,
        studentId,
        companyId,
        companyName,
        companyLogo,
        timeOptions,
        currentTimeSlot,
    }: {
        t: Locale,
        studentId: string;
        companyId: string;
        companyName: string;
        companyLogo: string;
        timeOptions: number[];
        currentTimeSlot: number;
    }
){
    interface Status{
        ok: boolean;
        type: string;
    }

    const acceptMeeting = api.student.studentAcceptMeeting.useMutation();
    const declineMeeting = api.student.studentDeclineMeeting.useMutation();

    const [time, setTime] = useState<number | null>(1);
    const [status, setStatus] = useState<Status|undefined>(undefined);
    const [chosenTimeSlot, setChosenTimeSlot] = useState<number>(currentTimeSlot);

    const times = ["10:00-10:30", "10:30-11:00", "11:00-11:30", "11:30-12:00", "12:00-12:30", "12:30-13:00",
                   "13:00-13:30", "13:30-14:00", "14:00-14:30", "14:30-15:00", "15:00-15:30", "15:30-16:00"]

    function displayTimeOptions(option: number){
        return <option id={option.toString()} key={option}>{times[option-1]}</option>;
    }

    function changeTime(evt: React.ChangeEvent<HTMLSelectElement>){
        const selectedIndex = evt.target.options.selectedIndex;
        const id = evt.target.options[selectedIndex].getAttribute('id');
        setTime(Number(id));
    }

    async function acceptOffer(){
     const timeThatWasSelected = time;
     console.log("Time that was selected: ", timeThatWasSelected)
       acceptMeeting.mutateAsync(
        JSON.stringify({
            studentId: studentId, 
            exhibitorId: companyId, 
            timeSlot: time})
        ).then((response: any)=>{
            setChosenTimeSlot(timeThatWasSelected ?? -1);
            setStatus(response);
            // set timeout to remove the status message after 5 seconds
            setTimeout(()=>{setStatus(undefined)}, 5000);
        }).catch((error)=>{
            console.log(error)
            setStatus({ok: false, type: "failed"});
            setTimeout(()=>{setStatus(undefined)}, 5000);
        });
    }

    async function declineOffer(){
        declineMeeting.mutateAsync(
            JSON.stringify({
                studentId: studentId, 
                exhibitorId: companyId
            })
        ).then((response: any)=>{
            console.log("Response: ", response)
            setStatus(response);
            setTimeout(()=>{setStatus(undefined)}, 5000);
        }).catch((error)=>{
            console.log(error)
            setStatus({ok: false, type: "failed"});
            setTimeout(()=>{setStatus(undefined)}, 5000);

        });
    }

    const statusMessage = (status: Status|undefined) => {
        if(status == undefined) return (<></>);

        if (status.ok){
            switch(
                status.type
            ){
                case "accepted":
                    return <p>{t.students.companyMeeting.status.accepted}</p>;
                case "declined":
                    return <p>{t.students.companyMeeting.status.declined}</p>;
                default:
                    return <p>{t.students.companyMeeting.status.failed}</p>;
            }
        } else {
            return <p>{t.students.companyMeeting.status.failed}</p>
        }
    }

    return(
        <div className="w-[500px] rounded-2xl bg-white/20 backdrop-blur-md text-white pt-8 text-center overflow-hidden border-2 border-cerise">
            <h3 className="text-xl pb-4">
                {companyName}
            </h3>
            <div className="flex justify-center mt-2">
                <img className="md:min-w-[120px] w-[200px] " src={addImageDetails(companyLogo)}></img>
            </div>
            
            {  chosenTimeSlot == -1 ?  
            <>
                <p>
                    {t.students.companyMeeting.offerText}
                </p>
                {/**Länk till företaget? */}
                <div>
                    {t.students.companyMeeting.acceptDeclineText}
                </div> 
                {
                    timeOptions.length == 0 ? 
                    <p>{t.students.companyMeeting.noTimesLeft}</p> 
                    :
                    <>
                        <label htmlFor="options" className="text-white pr-4">{t.students.companyMeeting.chooseOption}</label>
                        <select id="options" onChange={changeTime} className="bg-cerise w-[120px] h-[30px] mt-4">
                            {timeOptions.map(displayTimeOptions)}
                        </select>
                    </> 
                }
                <div className="flex justify-center gap-32 m-4">
                    <img className="h-[50px] cursor-pointer hover:scale-110 transition duration-100 ease-in-out"
                        onClick={acceptOffer}
                        src="/img/check.png"/>
                    <img className="h-[50px] cursor-pointer hover:scale-110 transition duration-100 ease-in-out"
                        onClick={declineOffer} 
                        src="/img/cross.png"/>
                </div>
                {statusMessage(status)}
                
            </> : <>
                <p className="text-md">
                    {t.students.companyMeeting.meetingTimeText}
                </p>
                <p className="text-md ">
                    {t.students.companyMeeting.acceptedTime} {times[currentTimeSlot-1]}
                </p>

                <div className="flex flex-row justify-end py-4 pr-16">
                    <div className="flex flex-col  pr-4">
                        <h3 className="text-lg"> 
                            {t.students.companyMeeting.cancelMeeting}
                        </h3>
                        <p>
                            {t.students.companyMeeting.cancelWarning}
                        </p>
                    </div>
                    
                    <img className="h-[50px] cursor-pointer hover:scale-110 transition duration-100 ease-in-out"
                            onClick={declineOffer} 
                            src="/img/cross.png"/>
                </div>
                {statusMessage(status)}
            </>}

        </div>
    );
}
