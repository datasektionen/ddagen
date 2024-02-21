import { useEffect, useState } from 'react'
import { api } from "@/utils/api";


const set_cookies = (loginToken: string) => {
    document.cookie = `login_token=${loginToken};max-age=604800;`;
};

export default function LoggedInPage() {

    const studentVerify = api.studentLogin.verify.useMutation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const params: URLSearchParams = new URL(window.location.href).searchParams;

        let loginToken: string = params.get('login_token') || "";

        // If no login_token in url, check if login token in cookies
        if ((!loginToken || loginToken === "null") && document.cookie.includes("login_token")) {
            console.log("Checking cookies!")
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
            setIsLoggedIn(res)
            set_cookies(loginToken)
        });
   
    }, []);

    return (
        <>
        {
            isLoggedIn?
            <p className="h-screen flex items-center justify-center text-green-500">
                You are logged in! :)
            </p>
            :
            <p className="h-screen flex items-center justify-center text-red-500">
                You are not logged in! :)
            </p>
        }
        </>
    )
}
