import { useEffect, useState } from 'react'


const set_cookies = (loginToken: string) => {
    document.cookie = `login_token=${loginToken};max-age=604800;`;
};

const logged_in = ()=>{

    const api_key = process.env.LOGIN_API_KEY

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const params: URLSearchParams = new URL(window.location.href).searchParams;

        let loginToken: string = params.get('login_token') || "";

        // If no login_token in url, check if login token in cookies
        if (!loginToken && document.cookie.includes("login_token")) {
            const match = document.cookie.toString().match(/login_token=([^;]*)/);
            if (match !== null) {
                loginToken = match[1];
            }
        }


        if (!loginToken || loginToken === "null" || !api_key) {
            console.log("URL not complete");
            return;
        }

        const url = `https://login.datasektionen.se/verify/${loginToken}?api_token=${api_key}`

        // console.log("URL: ", url);

        // Verify login_token and update cookies if login_token is correct
        fetch(url, {
            method: "GET",
            mode: 'no-cors',
        })
        .then((res) => {
            console.log(res.status);
            if (res.status === 200) {
                console.log("verification successful");
                setIsLoggedIn(true);
                set_cookies(loginToken);
            } else {
                console.log("verify was not successful");
                setIsLoggedIn(false);
            }
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

export default logged_in