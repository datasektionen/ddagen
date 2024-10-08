import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { Prisma } from "@prisma/client";
import sendEmail from "@/utils/send-email";
import { getLocale } from "@/locales";
import { send } from "process";

// This is not a gud solution, but for now here we gooo! :-)
const times = [ "10:00-10:30", "10:30-11:00", "11:00-11:30", "11:30-12:00", "12:00-12:30", "12:30-13:00",
                "13:00-13:30", "13:30-14:00", "14:00-14:30", "14:30-15:00", "15:00-15:30", "15:30-16:00"]

const companyLocationMap = {
    "5020109681":{
        name: "Länsförsäkringar",
        room: "Grupprum 0"
    },
    "5568548514": {
        name: "Grebban Design AB",
        room: "Grupprum 2"
    },
    "2021002627": {
        name: "Sveriges Riksdag",
        room: "Grupprum 3"
    },
    "5565756227": {
        name: "Netlight Consulting AB",
        room: "Grupprum 4"
    },
    "2021004284": {
        name: "Svenska kraftnät",
        room: "Grupprum 5"
    },
    "5164111683": {
        name: "Nordea",
        room: "Grupprum 6"
    },
    "0206042251": {
        name: "KTH",
        room: "Doshi Room"
    },
    "0205174790": {
        name: "KTH",
        room: "Grupprum 69"
    },
}

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
        //console.log(input);
        
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
            console.log("Should create a new student")
            const student_body = {
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
                has_cv: input_json.cv != null ?  true : false, 
                linkedin_url: "",//String(input_json.linkedin_url) ?? "", 
                github_url: "",//String(input_json.github_url) ?? "", 
                other_link: "",//String(input_json.other_link) ?? "", 
                personal_story: "",//String(input_json.personal_story) ?? "",
                company_meeting_interests: JSON.stringify([]),
            } as Prisma.StudentsCreateInput;
            // If no user exists, create a new user with default values
            try {
                const res = await ctx.prisma.students.create({
                    data: student_body,
                });

                if(res) console.log("Student created")
                
            } catch (error) {
                console.error("Error creating student", error);
            }    
        }
        else{
            // If user exists, update the existing user data with new values
            if(student.cv != null) console.log("Student has CV")
            console.log(input_json.cv)
            //console.log("data:",input_json.ugkthid)

            const regular_data = await ctx.prisma.students.update({
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
                    //company_meeting_interests: student.company_meeting_interests,
                },
            });

            // we sepearate the cv from the rest of the data because it is gimmicky
            const cv_data = await ctx.prisma.students.update({
                where: {
                    ugkthid: input_json.ugkthid
                },
                data: {
                    cv: input_json.cv ?? student.cv,
                    has_cv: input_json.cv != null ? true : false,
                },
            });
            //return {regular_data, cv_data}
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

        if (!student) return false;

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

            const exhibitorsTimeSlots = await ctx.prisma.exhibitor.findUnique({
                where: {
                    id: meeting.exhibitorId,
                },
                select: {
                    meetingTimeSlots: true,
                }
            }).then((data: {meetingTimeSlots: number[]}) => data?.meetingTimeSlots ?? []);

            console.log(exhibitorsTimeSlots)
            const timeSlotsArray = timeSlots.map((timeSlot: any) => timeSlot.timeslot);
            
            const availableTimeSlots = exhibitorsTimeSlots.filter((timeSlot: number) => !timeSlotsArray.includes(timeSlot));
  

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

        if (existingMeeting.length > 0) return {ok: false, type: "failed"};
        
        // check that student doesnt have the time already booked
        const existingStudentMeeting = await ctx.prisma.meetings.findMany({
            where: {
                studentId: input.studentId,
                timeslot: input.timeSlot,
            }
        });

        if (existingStudentMeeting.length > 0) return {ok: false, type: "failed"};

        // here a mail should be sent to the student and the company @ilmal and the email should simplay say, a meeting between x (student) and y (company) has been book at time z        
        await ctx.prisma.meetings.update({
            where: {
                id: meetings[0].id
            },
            data: {
                timeslot: input.timeSlot,
            }
        });

        const meeting = await ctx.prisma.meetings.findUnique({
            where: {
                id: meetings[0].id
            },
        });


        const student = await ctx.prisma.students.findUnique({
            where: {
                id: input.studentId,
            },
            select: {
                first_name: true,
                last_name: true,
                email: true,
            }
        });
        
        if (!student) return;

        const exhibitor = await ctx.prisma.exhibitor.findUnique({
            where: {
                id: input.exhibitorId,
            },
        });

        if (!exhibitor) return;    

        // change to "locale" if We want multiple languages
        const t = getLocale("en");

        const time = times[meeting.timeslot - 1]
        const location = companyLocationMap[exhibitor.organizationNumber as keyof typeof companyLocationMap]?.room ?? "If you see this instead of a room, please contact the sales@ddagen.se";
        
        await ctx.prisma.user.findMany({
            where: {
                exhibitorId: input.exhibitorId,
            },
            select: {
                email: true,
            }
        }).then((data: any)=> {
            data.forEach((user: any) => {
                sendEmail(
                    user.email,
                    t.meeting_email.meeting_completed_to_company.subject(
                        student.first_name,
                        student.last_name,
                        exhibitor.name
                    ),
                    t.meeting_email.meeting_completed_to_company.body(
                        student.first_name,
                        student.last_name,
                        exhibitor.name,
                        time,
                        location,
                    ),
                    "sales@ddagen.se"
                );
            });
        }).catch((error: any) => {
            console.error("Error sending email to company", error);
            sendEmail(
                "viktorrn@datasektionen.se",
                "Error sending email to company",
                "Error sending email to company, on student accept meeting: \n" + JSON.stringify(error) + 
                "\n\n\nStudent: " + JSON.stringify(student) +
                "\nExhibitor: " + JSON.stringify(exhibitor),
            );
        });
        

        sendEmail(
            student.email,
            t.meeting_email.meeting_completed_to_student.subject(
                student.first_name,
                student.last_name,
                exhibitor.name
            ),
            t.meeting_email.meeting_completed_to_student.body(
                student.first_name,
                student.last_name,
                exhibitor.name,
                time,
                location,
            ),
            "sales@ddagen.se"
            );

        return {ok: true, type: "accepted"};
    }),

    studentDeclineMeeting: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }: any)=>{
        input = JSON.parse(input);

        const meeting = await ctx.prisma.meetings.findFirst({
            where: {
                studentId: input.studentId,
                exhibitorId: input.exhibitorId,
            },
            select: {
                id: true,
                timeslot: true,
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
                company_meeting_declined: true,
                first_name: true,
                last_name: true,
                email: true,
            }
        });

        if (!student) return;

        const companyMeetingInterests = student.company_meeting_interests;
        const companyMeetingDeclined = student.company_meeting_declined;
        const index = companyMeetingInterests.indexOf(input.exhibitorId);
        const declinedCompany = companyMeetingInterests[index];

        if (index > -1) {
            companyMeetingInterests.splice(index, 1);
        } 

        await ctx.prisma.students.update({
            where: {
                id: input.studentId,
            },
            data: {
                company_meeting_interests: companyMeetingInterests,
                company_meeting_declined: [...companyMeetingDeclined, declinedCompany],
            }
        });

        // change to "locale" if We want multiple languages
        const t = getLocale("en");

        // send mail to company
        await ctx.prisma.user.findMany({
            where: {
                exhibitorId: input.exhibitorId,
            },
            select: {
                email: true,
            }
        }).then((data: any)=> {
            data.forEach((user: any) => {
                if(meeting.timeslot == -1){
                    sendEmail(
                        user.email,
                        t.meeting_email.meeting_declined_by_student.subject(
                            student.first_name,
                            student.last_name,
                        ),
                        t.meeting_email.meeting_declined_by_student.body(
                            student.first_name,
                            student.last_name,
                        ),
                        "sales@ddagen.se"
                        );
                } else {
                    sendEmail(
                        user.email,
                        t.meeting_email.meeting_deleted_by_student.subject(
                            student.first_name,
                            student.last_name,
                        ),
                        t.meeting_email.meeting_deleted_by_student.body(
                            student.first_name,
                            student.last_name,
                        ),
                        "sales@ddagen.se"
                        );
                }
            });
        }).catch((error: any) => {
            console.error("Error sending email to company", error);
            sendEmail(
                "viktorrn@datasektionen.se",
                "Error sending email to company",
                "Error sending email to company, on student accept meeting: \n" + JSON.stringify(error) + 
                "\n\n\nStudent: " + JSON.stringify(student) +
                "\nExhibitor: " + JSON.stringify(input.exhibitorId),
            );
        });

        if(meeting.timeslot == -1) {
            sendEmail(
                student.email,
                t.meeting_email.meeting_declined_by_student.subject(
                    student.first_name,
                    student.last_name,
                ),
                t.meeting_email.meeting_declined_by_student.body(
                    student.first_name,
                    student.last_name,
                ),
                "sales@ddagen.se"
                );
        } else {
            sendEmail(
                student.email,
                t.meeting_email.meeting_deleted_by_student.subject(
                    student.first_name,
                    student.last_name,
                ),
                t.meeting_email.meeting_deleted_by_student.body(
                    student.first_name,
                    student.last_name,
                ),
                "sales@ddagen.se"
                );
        }
        
          

        return {ok: true, type: "declined"};
    }),
        
});
