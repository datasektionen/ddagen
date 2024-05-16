import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { Prisma } from "@prisma/client";
import { get } from "http";

export const studentRouter = createTRPCRouter({    
    verify: publicProcedure
    .input(z.string())
    .mutation(async ({ input })=>{
        const url = `https://login.datasektionen.se/verify/${input}?api_key=${process.env.LOGIN_API_KEY}`
        try {
            const response = await fetch(url, {
                method: "GET",
            });

            if (response.status !== 200) {
                console.log("verify was not successful");
                return false;
            } 

            console.log("verification successful");
            return await response.text() 

        } catch (error) {
            console.error("Error during verification:", error);
            return false;
        }
    }),
    inputData: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
        let student_body: Prisma.StudentsCreateInput
        console.log("INPUT: ", input);

        const input_json = JSON.parse(input);
        // Check for required inputs:
        if (!input_json.ugkthid) {
            console.log("The user id is required");
            return;
        }

        // Find the student by ugkthid
        let student = await ctx.prisma.students.findUnique({
            where: {
                ugkthid: input_json.ugkthid
            }
        });

        console.log("STUDENT: ", student)

        if (!student) {
            student_body = {
                ugkthid: String(input_json.ugkthid),
                first_name: String(input_json.first_name) || "", 
                last_name: String(input_json.last_name) || "", 
                email: String(input_json.email) || "", 
                prefered_email: String(input_json.prefered_email) || "",
                study_year: parseInt(input_json.study_year) || 0, 
                summerJob: !!input_json.summerJob, 
                partTimeJob: !!input_json.partTimeJob, 
                internship: !!input_json.internship, 
                masterThesis: !!input_json.masterThesis, 
                fullTimeJob: !!input_json.fullTimeJob, 
                traineeProgram: !!input_json.traineeProgram, 
                cv: String(input_json.cv) || "", 
                linkedin_url: String(input_json.linkedin_url) || "", 
                github_url: String(input_json.github_url) || "", 
                other_link: String(input_json.other_link) || "", 
                personal_story: String(input_json.personal_story) || "",
                company_meeting_interests: JSON.stringify(input_json.company_meeting_interests) || "[]",
            }
            // If no user exists, create a new user with default values
            await ctx.prisma.students.create({
                data: student_body,
            });
        }
        else{
            // If user exists, update the existing user data with new values
            student = await ctx.prisma.students.update({
                where: {
                    ugkthid: input_json.ugkthid
                },
                data: {
                    first_name: input_json.first_name || student.first_name,
                    last_name: input_json.last_name || student.last_name,
                    email: input_json.email || student.email,
                    prefered_email: input_json.prefered_email || student.prefered_email,
                    study_year: input_json.study_year || student.study_year,
                    summerJob: input_json.summerJob || student.summerJob,
                    partTimeJob: input_json.partTimeJob || student.partTimeJob,
                    internship: input_json.internship || student.internship,
                    masterThesis: input_json.masterThesis || student.masterThesis,
                    fullTimeJob: input_json.fullTimeJob || student.fullTimeJob,
                    traineeProgram: input_json.traineeProgram || student.traineeProgram,
                    cv: input_json.cv || student.cv,
                    linkedin_url: input_json.linkedin_url || student.linkedin_url,
                    github_url: input_json.github_url || student.github_url,
                    other_link: input_json.other_link || student.other_link,
                    personal_story: input_json.personal_story || student.personal_story,
                    company_meeting_interests: input_json.company_meeting_interests || student.company_meeting_interests,
                },
            });
        }

        return student; // Return the updated or newly created student
    }),
    getData: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input })=>{
        // console.log("INPUT: ", input)
        const student = await ctx.prisma.students.findUnique({
            where: {
                ugkthid: input,
            },
        });
        if (student === null) return false
        
        //console.log("STUDENT FROM DB", student)
        return student
        
    }),
    getCompaniesWithMeetings: publicProcedure // get all companies that have student meetings
    .query(async ({ ctx })=>{
        const data = await ctx.prisma.exhibitor.findMany({
            where: {
                studentMeetings: 1,
            },
            select: {
                id: true,
                name: true,
                description: true,
                logoWhite: true,
            }
        });


        const result = data.map((company) => {
            return {
                id: company.id,
                name: company.name,
                description: company.description,
                logo: company.logoWhite?.toString('base64') || "", // add default image of the bowtie
            }
        });
        
        return result;
    }),

    inputCompanyInterests: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input })=>{
        // input is ugkthid and company organisation number
        const input_json = JSON.parse(input);
        // Check for required inputs:
        if (!input_json.ugkthid) {
            console.log("The user id is required");
            return;
        }
        if (!input_json.company) {
            console.log("The company interests are required");
            return;
        }

        const student = await ctx.prisma.students.findUnique({
            where: {
                ugkthid: input_json.ugkthid
            },
            
        });
        if (!student) return;
        
        // parse each element of array to string
        const current_interests: string[] = student.company_meeting_interests.map((company: any) => company.toString()) || [];
        const new_interests = [...current_interests, input_json.company];

        await ctx.prisma.students.update({
            where: {
                ugkthid: input_json.ugkthid
            },
            data: {
                company_meeting_interests: JSON.stringify(new_interests)
            }
        });

        return;
    }),

    deleteCompanyInterests: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input })=>{
        // input is ugkthid and company organisation number
        const input_json = JSON.parse(input);
        // Check for required inputs:
        if (!input_json.ugkthid) {
            console.log("The user id is required");
            return;
        }
        if (!input_json.company) {
            console.log("The company interests are required");
            return;
        }

        const student = await ctx.prisma.students.findUnique({
            where: {
                ugkthid: input_json.ugkthid
            },
            
        });
        if (!student) return;
        
        const current_interests = student.company_meeting_interests.map((company: any) => company.toString());
        const new_interests: String[] = current_interests.filter((interest: String) => interest !== input_json.company);

        await ctx.prisma.students.update({
            where: {
                ugkthid: input_json.ugkthid
            },
            data: {
                company_meeting_interests: JSON.stringify(new_interests)
            }
        });

        return;
    })
});