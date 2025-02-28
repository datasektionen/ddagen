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
    ];
  },
}
export default config;
