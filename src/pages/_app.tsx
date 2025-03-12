import Head from "next/head";
import "@/styles/globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useRef, useEffect } from "react";
import type { AppType } from "next/app";
import { api } from "@/utils/api";
import { AnimationProvidor, ModalContextProvider } from "@/utils/context";
import { useRouter } from 'next/router';
import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";
import { useLocale } from "@/locales";

const App: AppType = ({ Component, pageProps }) => {
  const router = useRouter();
  const t = useLocale();

  // Define alternate language links
  const locales = ['sv', 'en'];
  const hreflangs = locales.map(lang => ({
    rel: 'alternate',
    hrefLang: lang,
    href: `https://ddagen.se${lang === 'sv' ? '' : `/${lang}`}`,
  }));

  return (
    <>
      <DefaultSeo {...SEO} />
      <Head>
        <link rel="icon" href="/img/favicon.ico" />
        {/* Hreflang meta tags for SEO */}
        {hreflangs.map(({ rel, hrefLang, href }) => (
          <link key={hrefLang} rel={rel} hrefLang={hrefLang} href={href} />
        ))}
        {/* Canonical URL to avoid duplicate content */}
        <link rel="canonical" href={`https://ddagen.se${t.locale === 'sv' ? '' : `/${t.locale}`}`} />
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