import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db";
import * as pls from "@/utils/pls";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") return res.status(405).end();

    const apiKey = req.headers["authorization"];
    if (apiKey == undefined) return res.status(400).end();
    if (!(await pls.checkApiKey("read-registrations", apiKey))) {
        return res.status(402).end();
    }

    const exhibitors = await prisma.exhibitor.findMany({
        include: {
            jobOffers: true,
        },
    });

    res.setHeader("Content-Type", "application/json");
    res.end(
        JSON.stringify(
            exhibitors.map((e) => ({
                name: e.name,
                organizationNumber: e.organizationNumber,
                invoiceEmail: e.invoiceEmail,
                description: e.description,
                package: e.package,
                extraTables: e.extraTables,
                extraChairs: e.extraChairs,
                extraDrinkCoupons: e.extraDrinkCoupons,
                extraRepresentativeSpots: e.extraRepresentativeSpots,
                totalBanquetTicketsWanted: e.totalBanquetTicketsWanted,
                jobOfferId: e.jobOffers,
                customTables: e.customTables,
                customChairs: e.customChairs,
                customDrinkCoupons: e.customDrinkCoupons,
                customRepresentativeSpots: e.customRepresentativeSpots,
                customBanquetTicketsWanted: e.customBanquetTicketsWanted,
            }))
        )
    );
}