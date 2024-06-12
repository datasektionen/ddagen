import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { Prisma } from "@prisma/client";
import { get } from "http";
import { create } from "domain";
import { Select } from "flowbite-react";

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
        //console.log("INPUT: ", input);

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

        if (!student) {
            student_body = {
                ugkthid: String(input_json.ugkthid),
                first_name: String(input_json.first_name) ?? "", 
                last_name: String(input_json.last_name) ?? "", 
                email: String(input_json.email) ?? "", 
                prefered_email: String(input_json.email) ?? "",
                study_year: parseInt(input_json.study_year) ?? 0, 
                summerJob: !!input_json.summerJob, 
                partTimeJob: !!input_json.partTimeJob, 
                internship: !!input_json.internship, 
                masterThesis: !!input_json.masterThesis, 
                fullTimeJob: !!input_json.fullTimeJob, 
                traineeProgram: !!input_json.traineeProgram, 
                cv: String(input_json.cv) ?? "", 
                linkedin_url: String(input_json.linkedin_url) ?? "", 
                github_url: String(input_json.github_url) ?? "", 
                other_link: String(input_json.other_link) ?? "", 
                personal_story: String(input_json.personal_story) ?? "",
                company_meeting_interests: JSON.stringify([]),
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
                    first_name: input_json.first_name ?? student.first_name,
                    last_name: input_json.last_name ?? student.last_name,
                    email: input_json.email ?? student.email,
                    prefered_email: input_json.prefered_email ?? student.prefered_email,
                    study_year: input_json.study_year ?? student.study_year,
                    summerJob: input_json.summerJob ?? student.summerJob,
                    partTimeJob: input_json.partTimeJob ?? student.partTimeJob,
                    internship: input_json.internship ?? student.internship,
                    masterThesis: input_json.masterThesis ?? student.masterThesis,
                    fullTimeJob: input_json.fullTimeJob ?? student.fullTimeJob,
                    traineeProgram: input_json.traineeProgram ?? student.traineeProgram,
                    cv: input_json.cv ?? student.cv,
                    linkedin_url: input_json.linkedin_url ?? student.linkedin_url,
                    github_url: input_json.github_url ?? student.github_url,
                    other_link: input_json.other_link ?? student.other_link,
                    personal_story: input_json.personal_story ?? student.personal_story,
                    //company_meeting_interests: student.company_meeting_interests,
                },
            });
        }

        return student; // Return the updated or newly created student
    }),
    getData: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input })=>{
        //console.log("INPUT: ", input)
        const student = await ctx.prisma.students.findUnique({
            where: {
                ugkthid: input,
            },
        });
        //console.log("STUDENT FROM DB", student)
        if (student === null) return false
        
        return student
        
    }),
    getCompaniesWithMeetings: publicProcedure // get all companies that have student meetings
    .mutation(async ({ ctx })=>{
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
        
        const result = data.map((company: any) => {
            return {
                id: company.id,
                name: company.name,
                description: company.description,
                logo: company.logoWhite?.toString('base64') ?? "", // add default image of the bowtie
            }
        });
        
        return result;
    }),

    getCompanyMeetingInterests: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input })=>{
        const student = await ctx.prisma.students.findUnique({
            where: {
                ugkthid: input,
            },
            select: {
                company_meeting_interests: true,
            }
        });

        if (!student) return [];

        return student.company_meeting_interests ?? [];    
    }),

    updateCompanyInterests: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input })=>{
        
        console.log("INPUT for updating company interests: ", input);

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

        if (!student) return;

        // Update the student's company meeting interests
        const result = await ctx.prisma.students.update({
            where: {
                ugkthid: input_json.ugkthid
            },
            data: {
                company_meeting_interests: input_json.company_meeting_interests.map((interest: string) => interest),
            }
        });
   
        return result;
    }),

    getInterestedCompanies: publicProcedure // Get the companies that are interested in specific student
    .input(z.string())  // student id
    .mutation(async ({ ctx, input })=>{
        const companies = await ctx.prisma.exhibitor.findMany({
            // filter companies that can have meeting with specific student
            select: {
                id: true,
                name: true,
            }
        });

        return companies;
    }),

    getCompanyMeetings: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }: any)=>{
        const student = await ctx.prisma.students.findUnique({
            where: {
                ugkthid: input,
            }
        });

        if (!student) return [];

        const meetings = await ctx.prisma.meetings.findMany({
            where: {
                studentId: student.id,
            },
            select: {
                exhibitorId: true,
                studentId: true,
                timeslot: true,
            }
        });
        
        if (!meetings) return [];
        
        //meetings.filter((meeting: any) => meeting.timeSlot === -1);
        console.log("Meetings : ", meetings);
        const companyMeetings = await Promise.all(meetings.map(async (meeting: any) => {
            // find available timeslots
            const timeSlots = await ctx.prisma.meetings.findMany({
                where: {
                    exhibitorId: meeting.exhibitorId,
                },
                select: {
                    timeslot: true,
                }
            }); 

            const timeSlotsArray = timeSlots.map((timeSlot: any) => timeSlot.timeslot);
            
            const availableTimeSlots = [1,2,3,4,5,6,7,8,9,10,11,12].filter((timeSlot) => !timeSlotsArray.includes(timeSlot));
            console.log("Available time slots: ", availableTimeSlots.length);

            const companyData = await ctx.prisma.exhibitor.findUnique({
                where: {
                    id: meeting.exhibitorId,
                },
                select: {
                    name: true,
                    logoWhite: true,
                    description: true,
                }
            });

            return {
                exhibitorId: meeting.exhibitorId,
                studentId: meeting.studentId,
                name: companyData.name,
                logo: companyData.logoWhite?.toString('base64') ?? "",
                desciption: companyData.description,
                timeOptions: availableTimeSlots,
                timeslot: meeting.timeslot,
            }
        }));
        return companyMeetings;
    }),

    studentAcceptMeeting: publicProcedure
        .input(z.string())
        .mutation(async ({ ctx, input }: any ) => {
            input = JSON.parse(input);
            const meetings = await ctx.prisma.meetings.findMany({ 
                where: {
                    studentId: input.studentId,
                    exhibitorId: input.exhibitorId,
                },
                select: {
                    id: true,
                }
            });
            if (meetings.length !== 1) return {ok: false, type: "failed"};
            // Validate that the company has not already accepted a meeting at that time
            const existingMeeting = await ctx.prisma.meetings.findMany({
                where: {
                    exhibitorId: input.exhibitorId,
                    timeslot: input.timeSlot,
                }
            });
            console.log("Existing MEETINGs: ", existingMeeting);
            if (existingMeeting.length > 0) return {ok: false, type: "failed"};
            
            await ctx.prisma.meetings.update({
                where: {
                    id: meetings[0].id
                },
                data: {
                    timeslot: input.timeSlot,
                }
            });
    
            return {ok: true, type: "accepted"};
        }),

    studentDeclineMeeting: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }: any)=>{
        const meeting = await ctx.prisma.meetings.findFirst({
            where: {
                studentId: input.studentId,
                exhibitorId: input.exhibitorId,
            },
            select: {
                id: true,
            }
        });

        if (!meeting) return;
        await ctx.prisma.meetings.delete({
            where: {
                id: meeting.id
            }
        });

        // also update the interests for the student
        const student = await ctx.prisma.students.findUnique({
            where: {
                id: input.studentId,
            },
            select: {
                company_meeting_interests: true,
            }
        });

        if (!student) return;

        const companyMeetingInterests = JSON.parse(student.company_meeting_interests);
        const index = companyMeetingInterests.indexOf(input.exhibitorId);
        if (index > -1) {
            companyMeetingInterests.splice(index, 1);
        }

        await ctx.prisma.students.update({
            where: {
                id: input.studentId,
            },
            data: {
                company_meeting_interests: JSON.stringify(companyMeetingInterests),
            }
        });

        return {ok: true, type: "declined"};
    }),
        
});