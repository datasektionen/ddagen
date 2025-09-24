import Locale from "@/locales";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { addImageDetails } from "@/shared/addImageDetails";


export default function CompanyMeetingOffer(
    {
        t,
        studentId,
        companyId,
        companyName,
        companyLogo,
        timeOptions,
        currentTimeSlot,
        removeMeeting,
        removeTimeSlot,
    }: {
        t: Locale,
        studentId: string;
        companyId: string;
        companyName: string;
        companyLogo: string;
        timeOptions: number[];
        currentTimeSlot: number;
        removeMeeting: (id: string)=>void;
        removeTimeSlot: (id: number)=>void;
    }
){
    interface Status{
        ok: boolean;
        type: string;
    }

    const acceptMeeting = api.student.studentAcceptMeeting.useMutation();
    const declineMeeting = api.student.studentDeclineMeeting.useMutation();

    const [time, setTime] = useState<number>(-1);
    const [status, setStatus] = useState<Status|undefined>(undefined);
    const [chosenTimeSlot, setChosenTimeSlot] = useState<number>(currentTimeSlot);

    const [wasDeleted, setWasDeleted] = useState<boolean>(false);
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    

    const times = [
        "10:00-10:15", "10:15-10:30", "10:30-10:45", "10:45-11:00",
        "11:00-11:15", "11:15-11:30", "11:30-11:45", "11:45-12:00",
        "12:00-12:15", "12:15-12:30", "12:30-12:45", "12:45-13:00",
        "13:00-13:15", "13:15-13:30", "13:30-13:45", "13:45-14:00",
        "14:00-14:15", "14:15-14:30", "14:30-14:45", "14:45-15:00",
        "15:00-15:15", "15:15-15:30", "15:30-15:45", "15:45-16:00"
    ];
    
    const timeOptionsCopy = [-1, ...timeOptions];

    function displayTimeOptions(option: number){
        if(option == -1) return <option key={option}> {"Select Time"} </option>;
        return <option id={option.toString()} key={option}>{times[option-1]}</option>;
    }

    function changeTime(evt: React.ChangeEvent<HTMLSelectElement>){
        const selectedIndex = evt.target.options.selectedIndex;
        const id = evt.target.options[selectedIndex].getAttribute('id');
        if(id == null) {setTime(-1); return;}
        setTime(Number(id));
    }


    async function acceptOffer(){
        if(time == -1) return;
        const timeThatWasSelected = time;
        acceptMeeting.mutateAsync(
            JSON.stringify({
                studentId: studentId, 
                exhibitorId: companyId, 
                timeSlot: time
            })
            ).then((response: any)=>{
                setChosenTimeSlot(timeThatWasSelected);
                removeTimeSlot(timeThatWasSelected);
                //setStatus({ok: true, type: "accepted"});
                
                // set timeout to remove the status message after 5 seconds
                window.location.reload();
            }).catch((error)=>{
                setChosenTimeSlot(-1);
                console.log(error)
                setStatus({ok: false, type: "failed"});
                setTimeout(()=>{
                    window.location.reload();
                    setStatus(undefined)
                }, 3000);
        });
    }

    async function declineOffer(){
        declineMeeting.mutateAsync(
            JSON.stringify({
                studentId: studentId, 
                exhibitorId: companyId
            })
        ).then((response: any)=>{
            setStatus({ok: true, type: "declined"});
            setStatus(undefined); 
            setWasDeleted(true);
            removeMeeting(companyId);
            window.location.reload();
        }).catch((error)=>{
            console.log(error)

            setStatus({ok: false, type: "failed"});
            setTimeout(()=>{
                setStatus(undefined)
                window.location.reload();
            }, 3000);

        });
    }

    const statusMessage = (status: Status|undefined) => {
        if(status == undefined) return null;
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
            return <p>{t.students.companyMeeting.status.failed}</p>;
        }
    }



    return(
        wasDeleted ? <></> :
        <div className="w-[500px] rounded-2xl bg-white/20 backdrop-blur-md text-white pt-8 text-center overflow-hidden border-2 border-cerise">
            <h3 className="text-xl pb-4">
                {companyName}
            </h3>
            <div className="flex justify-center mt-2">
                <img className="md:min-w-[120px] w-[200px] " src={
                    addImageDetails(companyLogo)
                    }></img>
            </div>

            {/* Either we should confirm a decline or manage meeting */}
            { confirmDelete ? <>
                <div className="flex flex-col w-full content-center ">
                    <div className="flex flex-col py-4">
                        <h3 className="text-lg">{t.students.companyMeeting.confirmDelete}</h3>
                        <p> {t.students.companyMeeting.cancelWarning} </p>
                    </div>
                        <div className="flex justify-center gap-32 m-4">
                        <img className="h-[50px] cursor-pointer hover:scale-110 transition duration-100 ease-in-out"
                            onClick={declineOffer}
                            src="/img/check.png"/>
                        <img className="h-[50px] cursor-pointer hover:scale-110 transition duration-100 ease-in-out"
                            onClick={()=>{setConfirmDelete(false)}} 
                            src="/img/cross.png"/>
                    </div>
                </div>
                </> : <>
                    { chosenTimeSlot == -1 ? <>
                        {/* If the meeting has not been accepted */}
                        
                        <p> {t.students.companyMeeting.offerText}</p>
                        {/**Länk till företaget? */}
                        <div> {t.students.companyMeeting.acceptDeclineText} </div> 
                        { /** If there are no more times left to choose from */
                            timeOptions.length == 0 ?  
                            <p>
                                {t.students.companyMeeting.noTimesLeft}
                            </p> : <>
                                <label htmlFor="options" className="text-white pr-4">{t.students.companyMeeting.chooseOption}</label>
                                <select id="options" onChange={changeTime} className="bg-cerise w-[120px] h-[30px] mt-4">
                                    {(timeOptionsCopy).map(displayTimeOptions)}
                                </select>
                            </> 
                        }
                        <div className="flex justify-center gap-32 m-4">
                            {/* If a time has been selected */}
                            {time != -1 && <> 
                                <img className="h-[50px] cursor-pointer hover:scale-110 transition duration-100 ease-in-out"
                                    onClick={acceptOffer}
                                    src="/img/check.png"/>
                                <img className="h-[50px] cursor-pointer hover:scale-110 transition duration-100 ease-in-out"
                                    onClick={()=>setConfirmDelete(true)} 
                                    src="/img/cross.png"/>
                            </>
                            }
                        </div>
                    </> : <>
                    {/* If the meeting has been accepted */}
                        <p className="text-md"> {t.students.companyMeeting.meetingTimeText} </p>
                        <p className="text-md "> {t.students.companyMeeting.acceptedTime} {times[chosenTimeSlot-1]} </p>
                        <div className="flex flex-row justify-center">
                            <button onClick={()=>{setConfirmDelete(true)}} className="mt-4 mb-4 mx-2 flex justify-center">
                                <a className="block hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base font-medium px-6 py-2 max-lg:mx-auto w-max">
                                    {t.students.companyMeeting.cancelMeeting}
                                </a>
                            </button>
                        </div>  
                    </>}
                    {statusMessage(status)}
                </>
            }
        </div>
    );
}
