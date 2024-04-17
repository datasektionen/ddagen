import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { Exhibitor, Preferences } from "@/shared/Classes";
import * as pls from "@/utils/pls";

export const adminRouter = createTRPCRouter({
    getExhibitors: publicProcedure
        .input(z.string())
        .mutation(async ({ input, ctx }) => {
            if (!(await pls.checkApiKey("read-exhibitors", input)))
                return "invalid-password";

            const exhibitors = await ctx.prisma.exhibitor.findMany();
            return exhibitors.map(
                (exhibitor) =>
                    new Exhibitor(
                        exhibitor.id,
                        exhibitor.name,
                        exhibitor.organizationNumber,
                        exhibitor.invoiceEmail,
                        exhibitor.logoWhite?.toString("base64"),
                        exhibitor.logoColor?.toString("base64"),
                        exhibitor.description,
                        exhibitor.package,
                        exhibitor.packageTier,
                        exhibitor.extraTables,
                        exhibitor.extraChairs,
                        exhibitor.extraDrinkCoupons,
                        exhibitor.extraRepresentativeSpots,
                        exhibitor.totalBanquetTicketsWanted,
                        exhibitor.jobOfferId,
                        exhibitor.customTables,
                        exhibitor.customChairs,
                        exhibitor.customDrinkCoupons,
                        exhibitor.customRepresentativeSpots,
                        exhibitor.customBanquetTicketsWanted
                    )
            );
        }),
    getAllFoodPreferences: publicProcedure
        .input(z.string())
        .mutation(async ({ input, ctx }) => {
            if (!(await pls.checkApiKey("read-exhibitors", input)))
                return "invalid-password";

            const foodPreferences = await ctx.prisma.foodPreferences.findMany();
            return foodPreferences.map(
                (preference) =>
                    new Preferences(
                        preference.id,
                        preference.name,
                        preference.value,
                        preference.comment,
                        preference.type,
                        preference.exhibitorId
                    )
            );
        }),
    login: publicProcedure
        .input(
            z.object({
                password: z.string(),
                exhibitorId: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            if (!(await pls.checkApiKey("write-exhibitors", input.password)))
                return "invalid-password";

            const session = await ctx.prisma.session.create({
                data: { exhibitorId: input.exhibitorId },
            });

            ctx.res.setHeader(
                "Set-Cookie",
                `session=${session.id}; Path=/; HttpOnly; SameSite=Lax; Secure`
            );
        }),
    logout: publicProcedure.mutation(async ({ ctx }) => {
        if (ctx.session) {
            await ctx.prisma.session.delete({ where: { id: ctx.session.id } });
            ctx.res.setHeader(
                "Set-Cookie",
                `session=; Path=/; HttpOnly; SameSite=Lax; Secure`
            );
        }
        return { status: ctx.session ? true : false };
    }),
});
