import Head from "next/head";
import "@/styles/globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useRef, useEffect } from "react";
import type { AppType } from "next/app";
import { api } from "@/utils/api";
import { AnimationProvidor, ModalContextProvider } from "@/utils/context";
import { useRouter } from 'next/router';

const App: AppType = ({ Component, pageProps }) => {
  const router = useRouter();

  function addMetaJsonLd(){
    return {
      __html: `{
        "@context": "https://schema.org",
        "@type": "Website",
        "url": "https://ddagen.se/",
        "name": "D-Dagen",
      }`
    }
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/img/favicon.ico" />
        <title>D-Dagen 2024 | Konglig Datasektionens Arbetsmässodag</title>
        <meta key="desc" name="description" content="Explore D-Dagen 2024 at KTH, Stockholm's leading tech job fair connecting computer science students with top Nordic IT companies for career opportunities, networking, and industry insights."/>
        <meta key="keywords" name="keywords" content="D-Dagen 2024, Computer Science Job Fair, KTH Royal Institute of Technology, Nordic Tech Career Event, IT and CS Student Recruitment, Stockholm Technology Networking, Engineering Career Opportunities, Datasektionen, THS Student Chapter, Future Tech Employment"/>
        <meta key="charSet" charSet="UTF-8" />
        <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1.0"/>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addMetaJsonLd()}
          key="jsonld"
        />
      </Head>
      <AnimationProvidor>
        <Navbar/>
      </AnimationProvidor>
        <div
          className="
            overflow-x-hidden
            relative
          "
          id="main-content"
        >
          <div className="absolute w-full h-full z-[-2] bg-[#0F142D]"></div>
          <div className="absolute w-full h-full z-[-1] 
              bg-[url('/img/bg-spiral-mobile.png')] md:bg-[url('/img/bg-spiral-desktop.png')] bg-blend-hue bg-repeat-y
              bg-[length:100%] md:bg-[length:50vw]"></div>
          <ModalContextProvider>
            <Component  {...pageProps} />
          </ModalContextProvider>
        </div>
      {router.pathname !== '/karta' && <Footer />}
    </>
  );
}

export default api.withTRPC(App);