import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { AppProps } from "next/app";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <div
        className="
        bg-[linear-gradient(rgba(17,12,48,0),rgba(238,42,123,0.88)),url('/img/bg.png')]
        bg-top bg-no-repeat
        bg-[length:160%] md:bg-[length:100vw]
        bg-blend-hue
      "
      >
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  );
}
