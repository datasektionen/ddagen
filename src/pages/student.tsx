import { use, useEffect, useState } from 'react'
import { api } from "@/utils/api";
import CompanyMeetingOffer from "@/components/Student/CompanyMeetingOffer";
import { useLocale } from "@/locales";
import StudentInfo from '@/components/Student/Info';
import CompanyInterests from '@/components/Student/CompanyInterests';

interface Company{
    id: string;
    name: string;
    description: string;
    logo: string;
}

const set_cookies = (loginToken: string) => {
    document.cookie = `login_token=${loginToken};max-age=86400;`;
};

export default function LoggedInPage() {
    
    const t = useLocale();
    
    const studentVerify = api.student.verify.useMutation();
    const inputData = api.student.inputData.useMutation();
    const studentGetData = api.student.getData.useMutation();
    
    const inputCompanyInterests = api.student.inputCompanyInterests.useMutation();
    const companyWithMeetings = api.student.getCompaniesWithMeetings.useQuery();
    
    const [companies, setCompanies] = useState<Company[]>([]);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [studentAccoundExists, setStudentAccoundExists] = useState(false);

    
    const [user, setUser] = useState<{
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

    }>({
        ugkthid: "",
        first_name: "",
        last_name: "",
        email: "",
        prefered_email: "",
        cv: "",
        study_year: 0,
        summerJob: false, 
        partTimeJob: false, 
        internship: false, 
        masterThesis: false, 
        traineeProgram: false,
        fullTimeJob: false,
        company_meeting_interests: []
    });

    const update_user = (input: any)=>{ 
        //this is the save handler
        inputData.mutateAsync(JSON.stringify(input))
        .then((res) =>{
            // provied save feedback
            console.log("Saved: ", res);
        });
    }

    useEffect(()=>{
        // log in the user if not logged in
        if (!isLoggedIn && !document.cookie.includes("login_token")){
            window.location.href = `https://login.datasektionen.se/login?callback=${window.location.href.replace(/^(https?:\/\/[^\/]+).*/, '$1')}/student?login_token=`
        }
    }, [isLoggedIn])
    
    useEffect(() => {
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
                studentGetData.mutateAsync(res_json.ugkthid)
                .then((result)=>{
                    if (result) {
                        setUser({...user,
                            ugkthid:result.ugkthid,
                            first_name:result.first_name,
                            last_name:result.last_name,
                            study_year:result.study_year,
                            summerJob:result.summerJob,
                            partTimeJob:result.partTimeJob,
                            internship:result.internship,
                            masterThesis:result.masterThesis,
                            fullTimeJob:result.fullTimeJob,
                            traineeProgram:result.traineeProgram,
                            cv:result.cv,
                            company_meeting_interests:result.company_meeting_interests
                        });
                    } else {
                        setUser({...user,
                            ugkthid:res_json.ugkthid,
                            first_name: res_json.first_name,
                            last_name: res_json.last_name,
                            email: res_json.kth_email, // Add the missing kth_email property
                        });
                        update_user(user);
                    }
                });
                
            }
            setIsLoggedIn(res? true:false);
            set_cookies(loginToken);
        });
    }, []);

  

    useEffect(()=>{
        if(!companyWithMeetings.data) return;
        setCompanies(companyWithMeetings.data);
    },[companyWithMeetings]);

    function StudentView(){
        // Test companies
        const companies2 = [
            {name: "Omenga Point", logo: "/img/omegapoint_logo.svg", timeOptions: [{id:0, time:"09:00-09:30"}, {id:1, time:"10:00-10:30"}]},
            {name: "Ericsson", logo: "/img/omegapoint_logo.svg", timeOptions: [{id:2, time:"11:30-12:00"}, {id:3, time:"10:00-10:30"}]},
            {name: "Mpya", logo: "/img/omegapoint_logo.svg", timeOptions: [{id:4, time:"09:00-09:30"}, {id:5, time:"10:00-10:30"}]},
            {name: "Cygni", logo: "/img/omegapoint_logo.svg", timeOptions: [{id:6, time:"09:00-09:30"}]}
        ];


        function renderOffer(company: { name: string; logo: string; timeOptions: { id: number; time: string; }[]; }){
            return <div key={company.name} className="flex justify-center mt-[15px] mb-[15px]">
                <CompanyMeetingOffer t={t} 
                                    companyName={company.name}
                                    companyLogo={company.logo} 
                                    timeOptions={company.timeOptions}/>
            </div>;
        }

        return <div>
                    <div className="flex items-center justify-center">
                        <StudentInfo t={t} user={user} setUser={setUser} saveHandler={update_user}/>
                    </div>
                    <div className="flex items-center justify-center">
                        <CompanyInterests t={t} companies={companies} setCompanies={setCompanies} user={user} />
                    </div>
                    <h2 className="mt-[100px] text-3xl text-center text-white">{t.students.offersTitle1 + companies2.length + t.students.offersTitle2}</h2>
                    <div className="grid lg:grid-cols-2 grid-cols-1">
                        {companies2.map(renderOffer)}
                    </div>  
                </div>;
    }


    return isLoggedIn? ( <StudentView/>
        /**<div className="h-screen flex flex-col justify-center items-center">
            <p className="text-green-500">
                You are logged in! :)
            </p>
            { 
                studentAccoundExists? 
                <p className="text-white" >your account exists!</p>
                :
                <p className="text-white" >Create your account</p>
            }            
        </div>*/
        ) : (
        <p className="h-screen flex items-center justify-center text-red-500">
            You are not logged in! :)
        </p>
    )
}
