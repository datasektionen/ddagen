import { z } from "zod";

/**
 * Specify your server-side environment variables schema here. This way you can ensure the app isn't
 * built with invalid env vars.
 *
 * These must be added as config options in dokku with `dokku config:set <app> VAR=...`
 */
const server = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  DATABASE_URL: z.string().url(),
  SPAM_API_KEY: z.string(),
  SPAM_URL: z.string().url(),
  EXPORT_TOKEN: z.string().min(24),
  IMPORT_TOKEN: z.string().min(24),
  DELETE_TOKEN: z.string().min(24),
  SALES_PASSWORD: z.string().min(24),
});

/**
 * Specify your client-side environment variables schema here. This way you can ensure the app isn't
 * built with invalid env vars. To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 *
 * These must be specified as build args in the Dockerfile and added with `dokku docker-options:add
 * <app> build "--build-arg NEXT_PUBLIC_CLIENTVAR=..."`
 */
const client = z.object({
  // NEXT_PUBLIC_CLIENTVAR: z.string().min(1),
});

/**
 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
 * middlewares) or client-side so we need to destruct manually.
 *
 * @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>}
 */
const processEnv = {
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  SPAM_API_KEY: process.env.SPAM_API_KEY,
  SPAM_URL: process.env.SPAM_URL,
  EXPORT_TOKEN: process.env.EXPORT_TOKEN,
  IMPORT_TOKEN: process.env.IMPORT_TOKEN,
  DELETE_TOKEN: process.env.DELETE_TOKEN,
  SALES_PASSWORD: process.env.SALES_ADMIN_PASSWORD,
  // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
};

// Don't touch the part below
// --------------------------

const merged = server.merge(client);

/** @typedef {z.input<typeof merged>} MergedInput */
/** @typedef {z.infer<typeof merged>} MergedOutput */
/** @typedef {z.SafeParseReturnType<MergedInput, MergedOutput>} MergedSafeParseReturn */

let env = /** @type {MergedOutput} */ (process.env);

if (!!process.env.SKIP_ENV_VALIDATION == false) {
  const isServer = typeof window === "undefined";

  const parsed = /** @type {MergedSafeParseReturn} */ (
    isServer
      ? merged.safeParse(processEnv) // on server we can validate all env vars
      : client.safeParse(processEnv) // on client we can only validate the ones that are exposed
  );

  if (parsed.success === false) {
    console.error(
      "❌ Invalid environment variables:",
      parsed.error.flatten().fieldErrors
    );
    throw new Error("Invalid environment variables");
  }

  env = new Proxy(parsed.data, {
    get(target, prop) {
      if (typeof prop !== "string") return undefined;
      // Throw a descriptive error if a server-side env var is accessed on the client
      // Otherwise it would just be returning `undefined` and be annoying to debug
      if (!isServer && !prop.startsWith("NEXT_PUBLIC_"))
        throw new Error(
          process.env.NODE_ENV === "production"
            ? "❌ Attempted to access a server-side environment variable on the client"
            : `❌ Attempted to access server-side environment variable '${prop}' on the client`
        );
      return target[/** @type {keyof typeof target} */ (prop)];
    },
  });
}

export { env };
