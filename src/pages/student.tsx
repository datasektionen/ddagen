import { use, useEffect, useState } from 'react'
import { api } from "@/utils/api";
import CompanyMeetingOffer from "@/components/Student/CompanyMeetingOffer";
import { useLocale } from "@/locales";
import StudentInfo from '@/components/Student/Info';
import { CheckMark } from '@/components/CheckMark';
import { addImageDetails } from '@/shared/addImageDetails';

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
    id: string;
    name: string;
    logo: string;
    timeOptions: number[];
}

const set_cookies = (loginToken: string) => {
    document.cookie = `login_token=${loginToken};max-age=86400;`;
};

export default function LoggedInPage() {
    
    const t = useLocale();
    
    const studentVerify = api.student.verify.useMutation();
    const updateInterests = api.student.updateCompanyInterests.useMutation();
    const createStudent = api.student.inputData.useMutation();
    const getData = api.student.getData.useMutation();

    const getCompanyWithMeetings = api.student.getCompaniesWithMeetings.useMutation();
    const getCompanyMeetingInterests = api.student.getCompanyMeetingInterests.useMutation();

    const getInterestedCompanies = api.student.getInterestedCompanies.useMutation();

    const [companiesWithMeeting, setCompaniesWithMetting] = useState<Company[]>([]);
    const [selectedCompanies, setSelectedCompanies] = useState<SelectedCompanies>({});

    const [interestedCompanies, setInterestedCompanies] = useState<InterestedCompany[]>([]);
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [ugkthid, setugkthid] = useState<string>("");


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
                    const newSelectedCompanies = Object.fromEntries(res.map((company) => {
                        return [company, true];
                    }));
                    setSelectedCompanies({...selectedCompanies, ...newSelectedCompanies});
                    
                }).
                catch((err) => {
                    console.log("Error in getCompanyMeetingInterests: ", err);
                });

                getInterestedCompanies.mutateAsync(res_json.ugkthid)
                .then((res) =>{
                    const result = res.map((company): InterestedCompany =>{
                        return {
                            id:company.id,
                            name:company.name,
                            logo:"/img/omegapoint_logo.svg", // change to company.logo
                            timeOptions:[6,7,8],             // update to company.timeOptions
                        }
                    });
                    setInterestedCompanies(result);
                });
            }
        });
        
    }, []);
    
    function handleSelection(company: Company){
        const newValues = {...selectedCompanies, [company.id] : !selectedCompanies[company.id]};
        setSelectedCompanies(newValues);
        const keys = Object.keys(newValues).filter((key) => newValues[key] === true);
        updateInterests.mutateAsync(JSON.stringify({company_meeting_interests: keys, ugkthid: ugkthid}));
    }
        
    function StudentView(){
        

        function renderCompany(company: Company){
            return <div key={company.name} className="w-[500px] rounded-2xl bg-white/20 backdrop-blur-md text-white pt-8 m-4 text-center overflow-hidden border-2 border-cerise">
            <h2 className="text-xl pb-4">
                {company.name}
            </h2>
            {/**Länk till företaget? */}
            <div className="flex justify-center mt-2">
                <img className="md:min-h-[120px] h-[200px]" src={addImageDetails(company.logo)}></img>
            </div>
            <p className="text-left p-4">
                {company.description}
            </p> 
          
            <div className="flex justify-between ml-[80px] mr-[80px] mb-2">
                <CheckMark name={"check"} checked={selectedCompanies[company.id]} onClick={()=>{handleSelection(company)}}/>
            </div>
        </div>
        }

        function renderOffer(company: InterestedCompany){
            return <div key={company.name} className="flex justify-center mt-[15px] mb-[15px]">
                <CompanyMeetingOffer t={t} 
                                    studentId={ugkthid}
                                    companyId={company.id}
                                    companyName={company.name}
                                    companyLogo={company.logo} 
                                    timeOptions={company.timeOptions}/>
            </div>;
        }


        return <div>
                    <div className="flex items-center justify-center">
                        <StudentInfo t={t} id={ugkthid}/>
                    </div>
                
                    <h2 className="mt-[40px] mb-[40px] text-3xl text-center text-white">{t.students.companyInterests.header}</h2>
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
                    {!getCompanyWithMeetings.data ? <div className='text-white'>Inga företag</div>:
                       companiesWithMeeting.map(renderCompany)
                    }
                    </div>
                    
                    <h2 className="mt-[100px] text-3xl text-center text-white">{t.students.offersTitle1 + interestedCompanies.length + t.students.offersTitle2}</h2>
                    <div className="grid lg:grid-cols-2 grid-cols-1">
                        {interestedCompanies.map(renderOffer)}
                    </div>  
                </div>;
    }


    return isLoggedIn? ( 
            <StudentView/> 
        ) : (
        <p className="h-screen flex items-center justify-center text-red-500">
            You are not logged in! :)
        </p>
    )
}
