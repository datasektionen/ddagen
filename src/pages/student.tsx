import { useEffect, useRef, useState } from 'react'
import { api } from "@/utils/api";
import CompanyMeetingOffer from "@/components/Student/CompanyMeetingOffer";
import { useLocale } from "@/locales";
import StudentInfo from '@/components/Student/Info';
import { CheckMark } from '@/components/CheckMark';
import { addImageDetails } from '@/shared/addImageDetails';
import { Table } from "@/components/Table";

import { useRouter } from 'next/router';
import { useModal } from '@/utils/context';
import Head from 'next/head';



interface Company{
    id: string;
    name: string;
    description: string;
    logo: string;
}

interface SelectedCompanies{
    [key: string]: boolean;
}

interface InterestedCompany{
    exhibitorId: string;
    studentId: string;
    name: string;
    description: string;
    logo: string;
    timeOptions: number[];
    timeslot: number;
}

export default function LoggedInPage() {
    const router = useRouter();
    const t = useLocale();

    
    const updateInterests = api.student.updateCompanyInterests.useMutation();
    const initializeStudent = api.student.initializeFromAccount.useMutation();
    const accountStatus = api.account.isLoggedIn.useQuery();
    const modal = useModal();
    const getCompanyWithMeetings = api.student.getCompaniesWithMeetings.useMutation();
    const getCompanyMeetingInterests = api.student.getCompanyMeetingInterests.useMutation();

    const getCompanyMeetingOffers = api.student.getCompanyMeetings.useMutation();

    const [companiesWithMeeting, setCompaniesWithMetting] = useState<Company[]>([]);
    const [selectedCompanies, setSelectedCompanies] = useState<SelectedCompanies>({});

    const [companyMeetings, setCompanyMeetings] = useState<InterestedCompany[]>([]);
  
    // login state
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [ugkthid, setugkthid] = useState<string>("");
    const [studentHasCV, setStudentHasCV] = useState<boolean>(false);
    const [loginError, setLoginError] = useState(false);
    const studentBootstrapStarted = useRef(false);

    const studentGetData = api.student.getData.useMutation();

    useEffect(() => {
        if (!accountStatus.isSuccess) return;

        const account = accountStatus.data;
        if (!account.ok) {
            void router.replace("/logga-in");
            return;
        }
        if (account.isAdmin) {
            void router.replace("/admin/sales");
            return;
        }
        if (account.hasExhibitorSession) {
            void router.replace("/utställare");
            return;
        }
        if (studentBootstrapStarted.current) return;

        studentBootstrapStarted.current = true;
        initializeStudent.mutateAsync()
            .then((student) => {
                setugkthid(student.ugkthid);
                setIsLoggedIn(true);
            })
            .catch((error) => {
                console.error("Failed to initialize student profile", error);
                setLoginError(true);
            });
    }, [accountStatus.data, accountStatus.isSuccess, initializeStudent, router]);
    
    useEffect(()=>{
        if (!ugkthid) return;

        studentGetData.mutateAsync(ugkthid)
        .then((result)=>{
            if (result) {

                setStudentHasCV(result.cv !== "" && result.cv !== 'undefined');
            } 
        });

        getCompanyWithMeetings.mutateAsync()
        .then((res) => {
            const result = res.map((company: any) => {
                return {
                    id: company.id,
                    name: company.name,
                    description: company.description,
                    logo: company.logo,
                }
            });
            setCompaniesWithMetting(result);

            const newSelectedCompanies = Object.fromEntries(result.map((company: any) => {
                return [company.id, false];
            }));
            setSelectedCompanies(newSelectedCompanies);
            
        });

        getCompanyMeetingInterests.mutateAsync(ugkthid)
        .then((res) => {
            if(!Array.isArray(res)) return;
            const newSelectedCompanies = Object.fromEntries(res.map((company: any) => {
                return [company, true];
            }));
            setSelectedCompanies({...selectedCompanies, ...newSelectedCompanies});
            
        }).
        catch((err) => {
            console.log("Error in getCompanyMeetingInterests: ", err);
        });

        getMeetingsOffers();
        //const interval = setInterval(getMeetingsOffers, 1000*10);

        return () => {
            //clearInterval(interval);
        };

    }, [ugkthid]);


    async function getMeetingsOffers(){
        if(ugkthid == "" || ugkthid == null) return;
        getCompanyMeetingOffers.mutateAsync(ugkthid)
                .then((res) => {
                    // Booked timeslots by student
                    const bookedTimeslotsSet = new Set();
                    res.forEach((company) => {
                        const timeslot = company.timeslot;
                        if (timeslot > 0) {
                            bookedTimeslotsSet.add(timeslot);
                        }
                    });

                    // Update timeOptions for each company, remove options already booked for other companies
                    const updatedMeetings = res.map((company) => {
                        const timeOptions = company.timeOptions;
                        const filteredTimeOptions = timeOptions.filter((time:number) => !bookedTimeslotsSet.has(time));
                        return { ...company, timeOptions: filteredTimeOptions };
                    });
                    setCompanyMeetings(updatedMeetings);
                });
    }

    function handleSelection(company: Company){
        const newValues = {...selectedCompanies, [company.id] : !selectedCompanies[company.id]};
        
        setSelectedCompanies(newValues);
        const keys = Object.keys(newValues).filter((key) => newValues[key] === true);
        updateInterests.mutateAsync(JSON.stringify({company_meeting_interests: keys, ugkthid: ugkthid, exhibitorId: company.id}))
        .then((res) => {
            if(res){
                modal.openModal(true, t.students.info.saved, 1500);
            }
        });
    }
    
    function removeMeeting(id:string){
        const newMeetings = companyMeetings.filter((meeting) => meeting.exhibitorId !== id);
        setCompanyMeetings(newMeetings);
    }

    function StudentView(){
        const deadline = new Date() > new Date("2026-10-07T17:00:00");

        function renderCompany(company: Company){
            return <div key={company.name} 
            className={
                `min-w-[200px] rounded-2xl bg-white/20 
                backdrop-blur-md text-white pt-8 m-4 
                text-center overflow-hidden border-2 
                ${selectedCompanies[company.id] ? 'border-yellow' : 'border-cerise'}`}
            >
            <div className='flex items-center justify-center'>
                {!deadline ? <CheckMark name={"check"} checked={selectedCompanies[company.id]} onClick={()=>{handleSelection(company)}}/> : ""}
                <h2 className='text-2xl ml-10'>{company.name}</h2>
            </div>

            <p className={`min-h-6 font-bold mt-6 ${selectedCompanies[company.id] ? 'text-yellow visible' : 'invisible'}`}>
                {t.students.companyInterests.checked1 + company.name + t.students.companyInterests.checked2}
            </p>

            
            <div className="flex justify-center mt-2">
                <img className="md:min-h-[120px] h-[200px]" src={
                    addImageDetails(company.logo)
                }></img>
            </div>
            <p className="text-center p-4">
                {company.description}
            </p> 
        </div>
        }

        function renderOffer(meeting: InterestedCompany){
            return <div key={meeting.name+"-meeting"} className="flex justify-center mt-[15px] mb-[15px] min-w-[240px] mx-8">
                <CompanyMeetingOffer 
                    key={meeting.name+"-meeting-offer"}
                    t={t} 
                    studentId={meeting.studentId}
                    companyId={meeting.exhibitorId}
                    companyName={meeting.name}
                    companyLogo={meeting.logo} 
                    timeOptions={meeting.timeOptions}
                    currentTimeSlot={meeting.timeslot}
                    removeMeeting={removeMeeting}
                    removeTimeSlot={(time:number) => {
                        const updatedCompany = companyMeetings.map((company) => {
                            return {...company, timeOptions: company.timeOptions.filter((t) => t !== time)};
                        });
                        setCompanyMeetings(updatedCompany);
                    }}
                />
            </div>;
        }


        return <div>
            <div className="mx-auto flex flex-col items-center py-20 cursor-default h-full min-w-[200px] max-w-[1200px] w-full mt-8 px-[20px] min-[450px]:px-[60px] min-[704px]:px-[60px]">
                {Table(
                        [t.students.info.mainHeader],
                        [],
                        [<><StudentInfo 
                            t={t} 
                            id={ugkthid}    
                            onSave={() => {
                                getMeetingsOffers(); // Refresh meetings after save
                            }}
                        /></>,],
                )}
            </div>
            
            {companyMeetings.length>0?
            <>
                <h2 className="text-cerise text-2xl md:text-4xl font-medium text-center pt-12">{t.students.offersTitle}</h2>
                <div className='w-100 flex items-center justify-center'>
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-2 max-w-[900px] justify-self-center">
                        {companyMeetings.map(renderOffer)}
                    </div>  
                </div>
            </>:<></>}
                
            { studentHasCV && <>
            
                <h2 className="text-cerise text-2xl md:text-4xl font-medium text-center pt-12">{!deadline ? t.students.companyInterests.header : t.students.companyInterests.deadlineHeader}</h2>
                <h2 className="mt-4 mb-12 text-xl text-center text-white">{!deadline ? t.students.companyInterests.description : ""}</h2>
                <h2 className="mt-4 mb-12 text-xl text-center text-white">{t.students.companyInterests.deadline}</h2>
                <div className='w-100 flex items-center justify-center'>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-32 place-items-center max-w-[900px] justify-self-center">
                        {!getCompanyWithMeetings.data ? <div className='text-white'> ... </div>:
                            (!deadline ? companiesWithMeeting.map(renderCompany) :
                                companiesWithMeeting.filter(comp => selectedCompanies[comp.id]).map(renderCompany))
                        }
                    </div>
                
                </div>
            </>}
            </div>
    }


    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            {loginError ? (
                <p className="h-screen flex items-center justify-center text-red-400">
                    {t.error.unknown}
                </p>
            ) : isLoggedIn ? ( 
                <StudentView/> 
            ) : (

            <p className="h-screen flex items-center justify-center text-white">
                Loading...
            </p>
            )}
        </>
    )
}
