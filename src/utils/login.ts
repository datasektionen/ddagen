import { env } from "@/env.mjs";

const login = async ()=>{

    let url = "https://login.datasektionen.se/login?callback=http://localhost:3000/f%C3%B6rstudenter"

    url = "https://login.datasektionen.se/login?callback=http://cashflow.datasektionen.se/login/"

    try {
        const res = await fetch(url, {
            mode: "no-cors",
            method: "GET",
        });
        if (!res.ok) {
            console.log(res)
        }

        console.log("Successfull login! :)")
      } catch (e) {
        console.error(e);
        throw e;
      }


}

export default login