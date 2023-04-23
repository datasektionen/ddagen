import { createTRPCRouter } from "@/server/api/trpc";
import { exhibitorRouter } from "@/server/api/routers/exhibitor";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  exhibitor: exhibitorRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
