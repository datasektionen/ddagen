import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLocale } from "@/locales";

function NavLink({ href, children, "class": className, style }: { href: string, children: React.ReactNode, "class"?: string, style?: React.CSSProperties }) {
  const router = useRouter();

  return <Link
    className={(className ?? "") + " hover:text-cerise" + (router.pathname == encodeURI(href) ? " text-cerise" : "")}
    href={href}
    style={style}
  >{children}</Link>;
}

function Logo({ "class": className }: { "class"?: string }) {
  return (
    <Link href="/" className={"relative w-[102px] h-[35px] flex-shrink-0 " + (className ?? "")}>
      <img
        src="/img/fluga_cerise.svg"
        className="absolute w-3/4"
      />
      <img
        src="/img/logo-white-ageless_v2.svg"
        alt="D-Dagen logga"
        className="absolute w-full top-[16%] left-[1%]"
      />
      <p className="
        absolute bottom-0 right-0
        text-[65%] leading-none
      ">2023</p>
    </Link>
  );
}

function Group({ links }: { links: { href: string, text: string }[] }) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  const selected = links.some(l => router.pathname.startsWith(encodeURI(l.href)));
  const expanded = hovered || selected;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="lg:ml-10 flex flex-row relative"
    >
      <div
        style={{ height: 70 + links.length * 40 }}
        className={
          "hidden lg:block absolute " + (expanded
            ? "bg-[#666474] bg-opacity-60 rounded-md -top-[50px] -left-[20px] w-[calc(100%+40px)]"
            : "")
        }
      />
      {links.map(({ href, text }, i) => i == 0
        ? <NavLink class="z-10 pl-14 lg:pl-0 p-4" href={links[0].href}>{links[0].text}</NavLink>
        : <NavLink
          style={{ top: 40 * i }}
          class={(!expanded ? "lg:hidden" : "") + " z-10 lg:w-full lg:absolute p-4 lg:px-0"}
          href={href}
        >{text}</NavLink>)}
    </div>
  );
}

export default function Navbar() {
  const router = useRouter();
  const l = useLocale();
  const t = l.nav;
  const locale = l.locale;

  const [open, setOpen] = useState(false);

  function swapLocale() {
    router.push(router.pathname, router.pathname, {
      locale: locale === "sv" ? "en" : "sv",
      scroll: false,
    });
  }

  useEffect(() => {
    function close(event: MouseEvent) {
      if (event.target &&
        "dataset" in event.target &&
        event.target.dataset instanceof DOMStringMap &&
        event.target.dataset.dontClose
      ) return;
      setOpen(false);
    };

    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  });

  return (
    <>
      <nav className="
        w-full fixed
        uppercase text-white
        z-50
      ">
        <div className="
          h-20 px-7 flex justify-between items-center
          bg-gradient-to-t from-transparent to-[#000b]
          w-full
          lg:absolute lg:justify-center
        ">
          <Logo class="z-10" />
          <button className="w-9 h-8 z-10 relative lg:hidden" data-dont-close onClick={() => setOpen(open => !open)}>
            <div data-dont-close className={"transition-all absolute h-1/5 bg-white rounded-md " +
              (open ? "rotate-45 top-[40%] w-[120%]" : "top-0 w-full")} />
            <div data-dont-close className={"transition-all absolute h-1/5 bg-white rounded-md top-[40%] " +
              (open ? "w-0" : "w-full")} />
            <div data-dont-close className={"transition-all absolute h-1/5 bg-white rounded-md " +
              (open ? "-rotate-45 top-[40%] w-[120%]" : "w-full top-[80%]")} />
          </button>
        </div>

        <div className={`
          flex justify-between flex-col items-stretch
          bg-darkblue lg:bg-transparent
          absolute w-full transition-all duration-300
          top-0 pt-20

          lg:left-0 lg:flex-row lg:items-center lg:px-8 lg:pt-0
        ` + (open ? "left-0" : "-left-full")
        }>
          <a
            className="sr-only focus:not-sr-only"
            href="#main-content"
          >{t.toContent}</a>
          <NavLink class="px-14 lg:px-4 p-4" href="/">{t.home}</NavLink>
          <Group links={[
            { href: "/förföretag", text: t.forCompanies },
            { href: "/faq", text: "faq" },
          ]} />
          {/*<NavLink class="px-14 lg:px-0" href="/förstudenter">{t.forStudents}</NavLink>*/}
          {/*<NavLink class="px-14 lg:px-0" href="/mässan">{t.about}</NavLink>*/}
          <div className="
            flex flex-row justify-center items-center
            py-4 gap-8
            lg:px-0 bg-blue lg:bg-transparent lg:ml-auto
          ">
            <Link
              className="bg-cerise py-2.5 px-4 rounded-full text-center hover:scale-105 transition-transform"
              href="/företagsanmälan"
            >{t.companyForm}</Link>
            <button data-dont-close onClick={swapLocale} className={`
              w-8 h-8
              rounded-full border-none
              bg-no-repeat bg-center bg-[length:180%]
              transition-transform hover:scale-110
              ` + (locale == "sv"
                ? "bg-[url(/img/uk-flag.svg)]"
                : "bg-[url(/img/se-flag.svg)]"
              )}
            ><img className="sr-only" alt={t.changeLanguage} /></button>
          </div>
        </div>
      </nav>
    </>
  );
}
