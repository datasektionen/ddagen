import { useEffect, useState } from 'react'
import { api } from "@/utils/api";


const set_cookies = (loginToken: string) => {
    document.cookie = `login_token=${loginToken};max-age=86400;`;
};

export default function LoggedInPage() {

    const inputData = api.student.inputData.useMutation();
    const studentVerify = api.student.verify.useMutation();
    const studentGetData = api.student.getData.useMutation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [ugkthid, setUgkthid] = useState("");
    
    const [studentAccoundExists, setStudentAccoundExists] = useState(false);

    // variables from verify, used to prefill the form for students
    let email = "";
    let first_name = "";
    let last_name = "";

    const update_user = (input: any)=>{
        inputData.mutateAsync(JSON.stringify(input))
        .then((res) =>{
            console.log(res)
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
                email = res_json.email;
                first_name = res_json.first_name;
                last_name = res_json.last_name;
                setUgkthid(res_json.ugkthid);
                update_user({
                    "ugkthid": res_json.ugkthid,
                    "email": res_json.email,
                    "first_name": res_json.first_name,
                    "last_name": res_json.last_name
                })
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
            
            console.log("RESPONSE: ", res);
        });

    }, [isLoggedIn, ugkthid]);


    return isLoggedIn? (
        <div className="h-screen flex flex-col justify-center items-center">
            <p className="text-green-500">
                You are logged in! :)
            </p>
            {
                studentAccoundExists? 
                <p className="text-white" >your account exists!</p>
                :
                <p className="text-white" >Create your account</p>
            }            
        </div>
        ) : (
        <p className="h-screen flex items-center justify-center text-red-500">
            You are not logged in! :)
        </p>
    )
}