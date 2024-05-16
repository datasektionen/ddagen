import { use, useEffect, useState } from 'react'
import { api } from "@/utils/api";
import CompanyMeetingOffer from "@/components/Student/CompanyMeetingOffer";
import { useLocale } from "@/locales";
import StudentInfo from '@/components/Student/Info';
import CompanyInterests from '@/components/Student/CompanyInterests';


const set_cookies = (loginToken: string) => {
    document.cookie = `login_token=${loginToken};max-age=86400;`;
};

export default function LoggedInPage() {
    
    const t = useLocale();
    
    const studentVerify = api.student.verify.useMutation();
    const inputData = api.student.inputData.useMutation();
    const studentGetData = api.student.getData.useMutation();
    
    const [ugkthid, setUgkthid] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [studentAccoundExists, setStudentAccoundExists] = useState(false);
    
    
    const [user, setUser] = useState<{
        first_name: string;
        last_name: string;
        kth_email: string;
        email: string;
        cv: string;
        year: number;
    }>({
        first_name: "",
        last_name: "",
        kth_email: "",
        email: "",
        cv: "",
        year: 0
    });

    const update_user = (input: any)=>{ //this is the save handler
        inputData.mutateAsync(JSON.stringify(input))
        .then((res) =>{
            console.log(res)
        });
    }

    // useEffect(()=>{
    //     if (ugkthid === "") return
    //     inputCompanyInterests.mutateAsync(JSON.stringify({
    //             ugkthid: ugkthid,
    //             company: "5567037485"
    //     }))
    // }, [ugkthid])

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
            console.log("Checking cookies!");
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
                console.log("RESPONSE: ", res_json);
                setUser({
                    first_name: res_json.first_name,
                    last_name: res_json.last_name,
                    kth_email: res_json.kth_email, // Add the missing kth_email property
                    email: res_json.email,
                    year: res_json.year,
                    cv: res_json.cv
                });
                update_user(user);
            }
            setIsLoggedIn(res? true:false);
            set_cookies(loginToken);
        });
    }, []);

    useEffect(()=>{
        // Get student data, if not all data is fond in the database the response body will be false,
        // If response body is false, let the user fill out the information form
        if (ugkthid === "") return

        studentGetData.mutateAsync(ugkthid)
        .then((res)=>{
            if (!res) setStudentAccoundExists(false);
            
            //console.log("RESPONSE: ", res);
        });

    }, [isLoggedIn, ugkthid]);
    
    
    const [interests, setInterests] = useState<{
        summer: boolean;
        partTime: boolean;
        internship: boolean;
        thesis: boolean;
        trainee: boolean;
        fullTime: boolean;
    }>(
        {summer: false, partTime: false, internship: false, thesis: false, trainee: false,fullTime: false}
    );

    function StudentView(){
        // Test companies
        const companies = [
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
                        <StudentInfo t={t} user={user} setUser={setUser} interests={interests} setInterests={setInterests} saveHandler={update_user}/>
                    </div>
                    <div className="flex items-center justify-center">
                        <CompanyInterests t={t}/>
                    </div>
                    <h2 className="mt-[100px] text-3xl text-center text-white">{t.students.offersTitle1 + companies.length + t.students.offersTitle2}</h2>
                    <div className="grid lg:grid-cols-2 grid-cols-1">
                        {companies.map(renderOffer)}
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
