import { use, useContext, useEffect, useState } from 'react'
import { api } from "@/utils/api";
import CompanyMeetingOffer from "@/components/Student/CompanyMeetingOffer";
import { useLocale } from "@/locales";
import StudentInfo from '@/components/Student/Info';
import { CheckMark } from '@/components/CheckMark';
import { addImageDetails } from '@/shared/addImageDetails';
import { Table } from "@/components/Table";

import { useRouter } from 'next/navigation';
import { hasLoadedBeforeContext } from "@/utils/context";


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

const set_cookies = (loginToken: string) => {
    document.cookie = `login_token=${loginToken};max-age=86400;`;
};

export default function LoggedInPage() {
    const router = useRouter();
    const t = useLocale();
    const hasLoadedBefore = useContext(hasLoadedBeforeContext);
    
    const studentVerify = api.student.verify.useMutation();
    const updateInterests = api.student.updateCompanyInterests.useMutation();
    const createStudent = api.student.inputData.useMutation();
    const getData = api.student.getData.useMutation();
    
    const getCompanyWithMeetings = api.student.getCompaniesWithMeetings.useMutation();
    const getCompanyMeetingInterests = api.student.getCompanyMeetingInterests.useMutation();

    const getCompanyMeetingOffers = api.student.getCompanyMeetings.useMutation();

    const getInterestedCompanies = api.student.getInterestedCompanies.useMutation();


    const [companiesWithMeeting, setCompaniesWithMetting] = useState<Company[]>([]);
    const [selectedCompanies, setSelectedCompanies] = useState<SelectedCompanies>({});

    const [companyMeetings, setCompanyMeetings] = useState<InterestedCompany[]>([]);

    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const [ugkthid, setugkthid] = useState<string>("");

    useEffect(()=>{
        // log in the user if not logged in
        if (!isLoggedIn && !document.cookie.includes("login_token")){
            window.location.href = `https://login.datasektionen.se/login?callback=${window.location.href.replace(/^(https?:\/\/[^\/]+).*/, '$1')}/student?login_token=`
        }
    }, [isLoggedIn])
    
    useEffect(() => {
        //router.push("/förstudenter"); // remove when page should be available
        const params: URLSearchParams = new URL(window.location.href).searchParams;

        let loginToken: string = params.get('login_token') || "";

        // If no login_token in url, check if login token in cookies
        if ((!loginToken || loginToken === "null") && document.cookie.includes("login_token")) {
            const match = document.cookie.toString().match(/login_token=([^;]*)/);
            if (match !== null) {
                loginToken = match[1];
            }
        }

        if (!loginToken || loginToken === "null") {
            console.log("URL not complete: LoginToken=", loginToken,);
            return;
        }
        
        
        studentVerify.mutateAsync(loginToken)
        .then((res) =>{
            if (res){
                // update prefill variables
                const res_json = JSON.parse(res);
                setugkthid(res_json.ugkthid);
                set_cookies(loginToken);
                setIsLoggedIn(res? true:false);
                
                getData.mutateAsync(res_json.ugkthid)
                .then((res) => {
                    if (res) {
                        console.log("Student exists");
                    } else {
                        createStudent.mutateAsync(
                            JSON.stringify({
                                ugkthid: res_json.ugkthid,
                                first_name: res_json.first_name,
                                last_name: res_json.last_name,
                                email: res_json.emails,
                                study_year: 0,
                            })
                        );
                    }
                });

                getCompanyWithMeetings.mutateAsync().then((res) => {
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

                getCompanyMeetingInterests.mutateAsync(res_json.ugkthid)
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

               

                getCompanyMeetingOffers.mutateAsync(res_json.ugkthid)
                .then((res) => {
                    setCompanyMeetings(res);
                });
            }
        });
        
    }, []);
    
    function handleSelection(company: Company){
        const newValues = {...selectedCompanies, [company.id] : !selectedCompanies[company.id]};
        setSelectedCompanies(newValues);
        const keys = Object.keys(newValues).filter((key) => newValues[key] === true);
        updateInterests.mutateAsync(JSON.stringify({company_meeting_interests: keys, ugkthid: ugkthid, exhibitorId: company.id}));
    }
        
    function StudentView(){
        

        function renderCompany(company: Company){

            return <div key={company.name} className={`w-[500px] rounded-2xl bg-white/20 backdrop-blur-md text-white pt-8 m-4 text-center overflow-hidden border-2 ${selectedCompanies[company.id] ? 'border-yellow' : 'border-cerise'}`}>
            <div className='flex items-center justify-center'>
                <CheckMark name={"check"} checked={selectedCompanies[company.id]} onClick={()=>{handleSelection(company)}}/>
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
            return <div key={meeting.name+"-meeting"} className="flex justify-center mt-[15px] mb-[15px]">
                <CompanyMeetingOffer 
                    t={t} 
                    studentId={meeting.studentId}
                    companyId={meeting.exhibitorId}
                    companyName={meeting.name}
                    companyLogo={meeting.logo} 
                    timeOptions={meeting.timeOptions}
                    currentTimeSlot={meeting.timeslot}
                />
            </div>;
        }


        return <div>
            <div className="mx-auto flex flex-col items-center py-20 cursor-default h-full min-w-[200px] max-w-[1200px] w-full mt-8 px-[20px] min-[450px]:px-[60px] min-[704px]:px-[60px]">
                {Table(
                        [t.exhibitorSettings.header,],
                        [],
                        [<><StudentInfo t={t} id={ugkthid}/></>,]
                )}
            </div>
        
            <h2 className="mt-12 text-3xl text-center text-white">{t.students.companyInterests.header}</h2>
            <h2 className="mt-4 mb-12 text-xl text-center text-white">{t.students.companyInterests.description}</h2>
            <div className="flex flex-col lg:flex-row items-center flex-wrap justify-center gap-8">
            {!getCompanyWithMeetings.data ? <div className='text-white'> ... </div>:
                companiesWithMeeting.map(renderCompany)
            }
            </div>
            
            <h2 className="mt-[100px] text-3xl text-center text-white mb-8">{t.students.offersTitle}</h2>
            <div className="flex flex-row flex-wrap items-center justify-center gap-8 mb-32">
                {companyMeetings.map(renderOffer)}
            </div>  
            </div>;
    }


    return isLoggedIn && hasLoadedBefore? ( 
            <StudentView/> 
        ) : (

        <p className="h-screen flex items-center justify-center text-white">
            Loading...
        </p>
    )
}
