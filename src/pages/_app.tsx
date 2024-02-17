import Head from "next/head";
import "@/styles/globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { AppType } from "next/app";
import { api } from "@/utils/api";

const App: AppType = ({ Component, pageProps }) => {
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
