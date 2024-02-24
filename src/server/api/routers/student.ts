import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const studentRouter = createTRPCRouter({    
    verify: publicProcedure
    .input(z.string())
    .mutation(async ({ input })=>{

        const url = `https://login.datasektionen.se/verify/${input}?api_key=${process.env.LOGIN_API_KEY}`
        try {
            const response = await fetch(url, {
                method: "GET",
            });

            if (response.status === 200) {
                console.log("verification successful");
                return true;
            } else {
                console.log("verify was not successful");
                return false;
            }
        } catch (error) {
            console.error("Error during verification:", error);
            return false;
        }

    })

});