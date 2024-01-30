import Head from "next/head";
import "@/styles/globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { AppType } from "next/app";
import { api } from "@/utils/api";

const App: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/img/favicon.ico" />
        <title>D-Dagen 2024 | Konglig Datasektionens Arbetsmässodag</title>
      </Head>
      <Navbar />
      <div
        className="
          bg-[linear-gradient(rgba(17,12,48,0),rgba(238,42,123,0.88)),url('/img/bg.png')]
          bg-top
          bg-[length:160%] md:bg-[length:100vw]
          bg-blend-hue
          bg-repeat
          overflow-x-hidden
        "
        id="main-content"
      >
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  );
}

export default api.withTRPC(App);
