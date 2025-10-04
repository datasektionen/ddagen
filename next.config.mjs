/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "sv"],
    defaultLocale: "sv",
  },
  output: "standalone",
  redirects: async () => {
    return [
      {
        source: "/signup",
        destination: "/en/företagsanmälan",
        permanent: true,
      },
      {
        source: "/login",
        destination: "/en/logga-in",
        permanent: true,
      },
      {
        source: "/foretagsanmalan",
        destination: "/en/företagsanmälan",
        permanent: true,
      },
      {
        source: "/forforetag",
        destination: "/en/förföretag",
        permanent: true,
      },
      {
        source: "/forstudenter",
        destination: "/en/förstudenter",
        permanent: true,
      },
      {
        source: "/utstallare",
        destination: "/en/utställare",
        permanent: true,
      },
      {
        source: "/banquette",
        destination: "https://tiki.datasektionen.se/events/36c2cf55-153a-4b61-a02f-64a90df88b89",
        permanent: true,
      },
    ];
  },
}
export default config;
