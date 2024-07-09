import { createTRPCRouter } from "@/server/api/trpc";
import { exhibitorRouter } from "@/server/api/routers/exhibitor";
import { accountRouter } from "@/server/api/routers/account";
import { adminRouter } from "@/server/api/routers/admin";
import { studentRouter } from "@/server/api/routers/student";
import { meetingRouter } from "@/server/api/routers/meetings";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    exhibitor: exhibitorRouter,
    account: accountRouter,
    admin: adminRouter,
    student: studentRouter,
    meeting: meetingRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
