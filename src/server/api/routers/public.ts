import {
    createTRPCRouter,
    publicProcedure,
  } from "@/server/api/trpc";
  import { Exhibitor } from "@/shared/Classes";
  
  export const publicRouter = createTRPCRouter({
    getExhibitors: publicProcedure.mutation(async ({ ctx }) => {
  
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
              exhibitor.extraTables,
              exhibitor.extraChairs,
              exhibitor.extraDrinkCoupons,
              exhibitor.extraRepresentativeSpots,
              exhibitor.totalBanquetTicketsWanted,
              exhibitor.jobOfferId
            )
        );
    }),
  });