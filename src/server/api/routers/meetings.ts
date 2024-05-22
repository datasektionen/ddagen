import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { Prisma } from "@prisma/client";
import { get } from "http";

export const meetingRouter = createTRPCRouter({    
    get: publicProcedure // get all companies that have student meetings
    .query(async ({ ctx })=>{
     
    }),
    createMeeting: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input })=>{        
        await ctx.prisma.meetings.create({
            data: {
                studentId: JSON.parse(input).studentId,
                exhibitorId: JSON.parse(input).exhibitorId,
                timeslot: 0,
            },
        });
        return {ok: true};
    }),
    deleteMeeting: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input })=>{
        try{
            const meeting = await ctx.prisma.meetings.findFirst({
                where: {
                    studentId: JSON.parse(input).studentId,
                    exhibitorId: JSON.parse(input).exhibitorId,
                },
            });
            if (!meeting) return;
            await ctx.prisma.meetings.delete({
                where: {
                    id: meeting.id
                }
            });
            return {ok: true};
        } catch (e){
            return {ok: false};
        }
    }),
    studentAcceptMeeting: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input })=>{
        // Find empty timeslot
        const timeslots = await ctx.prisma.meetings.findMany({
            select: {
                timeslot: true
            }
        })

        let timeslot_array = [];
        for (let i = 0; i < timeslots.length; i++) timeslot_array.push(timeslots[i].timeslot);

        let new_timeslot = 0;
        timeslot_array = timeslots.map(timeslot => timeslot.timeslot);

        const calculateNewTimeslot = (timeslot_array: number[]) =>{
            timeslot_array.sort();
            for (let i = 0; i < timeslot_array.length; i++) {
                if (timeslot_array[i] !== i) {
                    console.log(timeslot_array[i], i)
                    return i;
                }
            }
            return timeslot_array.length;
        }

        new_timeslot = calculateNewTimeslot(timeslots.map(timeslot => timeslot.timeslot));

        const meeting = await ctx.prisma.meetings.findFirst({
            where: {
                studentId: JSON.parse(input).studentId,
                exhibitorId: JSON.parse(input).exhibitorId,
            },
        });
        if (!meeting) return;
        await ctx.prisma.meetings.update({
            where: {
                id: meeting.id
            },
            data: {
                timeslot: new_timeslot,
            }
        });
        return {ok: true};
    }),
});