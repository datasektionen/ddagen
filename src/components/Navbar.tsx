import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLocale } from "@/locales";
import { api } from "@/utils/api";

function NavLink({ href, children, class: className, style, onClick }: {
  href?: string,
  children: React.ReactNode,
  class?: string,
  style?: React.CSSProperties,
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  const router = useRouter();

  return <Link
    className={(className ?? "") + " hover:text-cerise" + (router.pathname == encodeURI(href ?? "") ? " text-cerise" : "")}
    href={href ?? ""}
    style={style}
    onClick={onClick}
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

function Group({
  links,
  class: className,
}: {
  links: { href: string, text: string, onClick?: () => void }[];
  class?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [dropped, setDrop] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      className={`lg:ml-10 ${className ?? ""}`}
    >
      <div className="lg:flex relative flex-row hidden">
        <div
          style={{ height: 70 + links.length * 40 }}
          className={
            "block absolute -z-10 " + (hovered
              ? "bg-[#666474] bg-opacity-60 rounded-md -top-[50px] -left-[20px] w-[calc(100%+40px)]"
              : "")
          }
        />
        {links.map(({ href, text, onClick }, i) => i == 0
          ? <NavLink key={text} class="z-10 pl-0 p-4" href={href} onClick={onClick}>{text}</NavLink>
          : <NavLink key={text}
            style={{ top: 40 * i }}
            class={(hovered ? "" : "hidden") + " z-10 w-full absolute p-4 px-0"}
            href={href}
            onClick={onClick}
          >{text}</NavLink>)}
      </div>
      <div className="flex flex-col lg:hidden">
        <div className="flex flex-row justify-start gap-4 mb-4">
          <NavLink href={links[0].href} onClick={links[0].onClick}>{links[0].text}</NavLink>
          <img
            data-dont-close
            onClick={() => setDrop(d => !d)}
            src="/img/smCaret.svg/"
            className={`${
              dropped ? "rotate-180" : ""
            } ml-4 h-4 text-cerise cursor-pointer`}
          ></img>
        </div>
        <div className={`
          ${(dropped ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
          grid transition-all
        `}><div className={(dropped ? "mb-4" : "mb-0") + " flex flex-col pl-8 gap-2 overflow-hidden transition-[margin]"}>
          {links.slice(1).map(({ href, text, onClick }) =>
            <NavLink key={href} href={href} onClick={onClick}>{text}</NavLink>)}
        </div></div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const router = useRouter();
  const trpc = api.useContext();
  const l = useLocale();
  const t = l.nav;
  const locale = l.locale;

  const [open, setOpen] = useState(false);

  const isLoggedIn = api.account.isLoggedIn.useQuery();
  const logout = api.account.logout.useMutation();

  function swapLocale() {
    router.push(router.pathname, router.pathname, {
      locale: locale === "sv" ? "en" : "sv",
      scroll: false,
    });
  }

  useEffect(() => {
    console.log("hej");
    if (logout.isSuccess) {
      trpc.account.invalidate();
    }
  }, [logout.isSuccess]);

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
        flex flex-col
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
          bg-gradient-to-b from-black lg:from-transparent via-black lg:via-transparent to-transparent lg:bg-transparent
          absolute w-full transition-all duration-300
          top-0 pt-20 pb-[300px] lg:pb-0

          lg:left-0 lg:flex-row lg:items-center lg:px-8 lg:pt-0
        ` + (open ? "left-0" : "-left-full")
        }>
          <div className="px-14 pb-0 lg:px-0 lg:pb-0 flex flex-col lg:flex-row ">
            <a
              className="sr-only focus:not-sr-only"
              href="#main-content"
            >{t.toContent}</a>
            <NavLink class="px-0 lg:px-4 p-4" href="/">{t.home}</NavLink>
            <Group links={[
              ...(isLoggedIn.data == true ? [{ href: "/utställare", text: t.exhibitorSettings}] : []),
              { href: "/förföretag", text: t.forCompanies },
              { href: "/katalog", text:t.catalog  },
              { href: "/event", text: "event" },
              { href: "/faq", text: "faq" },
            ]} />
            {isLoggedIn.data == true
              ? <NavLink class="px-0 lg:px-8 p-4" onClick={() => logout.mutate()}>{t.logout}</NavLink>
              : <NavLink class="px-0 lg:px-8 p-4" href="/logga-in">{t.login}</NavLink>
            }
            <NavLink class="mb-4 lg:hidden px-0 lg:px-4" href="/kontakt">{t.contact}</NavLink>
            {/*<NavLink class="px-14 lg:px-0" href="/förstudenter">{t.forStudents}</NavLink>*/}
            {/*<NavLink class="px-14 lg:px-0" href="/mässan">{t.about}</NavLink>*/}
          </div>
          <div className="
            flex flex-row lg:justify-center items-center lg:pl-0 justify-center lg:pr-0
            py-4 gap-8
            lg:px-0 bg-black lg:bg-transparent lg:ml-auto
          ">
            <NavLink class="hidden lg:block px-14 lg:px-4 p-4" href="/kontakt">{t.contact}</NavLink>
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
