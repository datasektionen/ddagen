import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import React from "react";
import { useLocale } from "@/locales";
import { api } from "@/utils/api";
import { useAnimation } from "@/utils/context";

function NavLink({
  href,
  children,
  class: className,
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
}: {
  href?: string;
  children: React.ReactNode;
  class?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLAnchorElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLAnchorElement>;
  onFocus?: React.FocusEventHandler<HTMLAnchorElement>;
}) {
  const router = useRouter();

  return (
    <Link
      className={
        (className ?? "") +
        " hover:text-cerise" +
        (router.pathname == encodeURI(href ?? "") ? " text-cerise" : "")
      }
      href={href ?? ""}
      style={style}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
    >
      {children}
    </Link>
  );
}

function Logo({ class: className }: { class?: string }) {
  const { isAnimationDone } = useAnimation();
  const hasLoadedBefore = isAnimationDone;
  const router = useRouter();
  const usePath = router.pathname;
  const isUsingMap = usePath == "/karta"; //Then we disable the klick effect of the logo

  if(isUsingMap) {
    return <div
    className={
      "relative w-[102px] h-[35px] flex-shrink-0 overflow-y" + (className ?? "")
    }
  >
    {/**/}
    <img src="/img/fluga_cerise.svg" className={`absolute w-3/4
      ${hasLoadedBefore ? '' : 'animate-in-opacity '}
      `}>
    </img>
    <div className={`
      mx-[-13px] my-[-43px] absolute
      ${hasLoadedBefore ? '' : 'animate-in-fluga '}
      `}>
    </div>
    <div className="absolute w-full top-[16%] left-[1%] ">
    <img
      src="/img/logo-white-ageless_v2.svg"
      alt="D-Dagen logga"
      className={`
        ${hasLoadedBefore ? '' : ' animate-in-logo-text-roll-in '}
      `}
    />
    </div>

    <p
      className={`
        absolute bottom-0 right-0
        text-[65%] leading-none
        ${hasLoadedBefore ? '' : ' animate-in-logo-date-drop-down '}

      `}
    >
      2025
    </p>
  </div>
  }

  return (
    <Link
      href="/"
      className={
        "relative w-[102px] h-[35px] flex-shrink-0 overflow-y" + (className ?? "")
      }
    >
      {/**/}
      <img src="/img/fluga_cerise.svg" className={`absolute w-3/4
        ${hasLoadedBefore ? '' : 'animate-in-opacity '}
        `}>
      </img>
      <div className={`
        mx-[-13px] my-[-43px] absolute
        ${hasLoadedBefore ? '' : 'animate-in-fluga '}
        `}>
      </div>
      <div className="absolute w-full top-[16%] left-[1%] ">
      <img
        src="/img/logo-white-ageless_v2.svg"
        alt="D-Dagen logga"
        className={`
          ${hasLoadedBefore ? '' : ' animate-in-logo-text-roll-in '}
        `}
      />
      </div>

      <p
        className={`
          absolute bottom-0 right-0
          text-[65%] leading-none
          ${hasLoadedBefore ? '' : ' animate-in-logo-date-drop-down '}

        `}
      >
        2025
      </p>
    </Link>
  );
}

function Group({
  links,
  class: className,
}: {
  links: { href: string; text: string; onClick?: () => void }[];
  class?: string;
}) {
  const longestWord = links.reduce(
    (a, b) => (a < b.text.length ? b.text.length : a),
    0
  );
  const [hovered, setHovered] = useState(false);
  const [dropped, setDrop] = useState(false);
  return (
    <div
      onMouseLeave={() => setHovered(false)}
      className={`lg:ml-10 ${className ?? ""}`}
    >
      <div className="lg:flex relative flex-row hidden ">
        <div
          style={{
            height: 70 + links.length * 40,
            width: `${longestWord * 12}px`,
          }}
          className={
            "block absolute z-10 " +
            (hovered
              ? "bg-[#666474] bg-opacity-60 rounded-md -top-[50px] -left-[20px] w-full "
              : "pointer-events-none")
          }
        />
        {links.map(({ href, text, onClick }, i) =>
          i == 0 ? (
            <NavLink
              key={text}
              class="z-10 pl-0 p-4"
              href={href}
              onClick={onClick}
              onMouseEnter={() => setHovered(true)}
              onFocus={() => setHovered(true)}
            >
              {text}
            </NavLink>
          ) : (
            <NavLink
              key={text}
              style={{ top: 40 * i, width: longestWord * 13 }}
              class={
                (hovered ? "" : "hidden") + " z-10 w-full absolute p-4 px-0"
              }
              href={href}
              onClick={onClick}
            >
              {text}
            </NavLink>
          )
        )}
      </div>
      <div className="flex flex-col lg:hidden content-justify ">
        <div className="flex flex-row justify-between gap-4 mb-4 w-[300px]">
          <NavLink href={links[0].href} onClick={links[0].onClick}>
            {links[0].text}
          </NavLink>
          <div className={`
            w-8 h-8 mt-[-8px]
            transition-all duration-500
            rounded-full flex flex-col items-center cursor-pointer
            hover:bg-cerise
            `}
          data-dont-close
          onClick={() => setDrop((d) => !d)}>
            <img
            data-dont-close

            src="/img/smCaret.svg/"
            className={`${
              dropped ? "rotate-180 " : ""
            }  h-4 mt-2 text-cerise  transition-transform duration-300 group`}
            ></img>
          </div>

        </div>
        <div
          className={`
          ${dropped ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
          grid transition-all
        `}
        >
          <div
            className={
              (dropped ? "mb-4" : "mb-0") +
              " flex flex-col pl-8 gap-2 overflow-hidden transition-[margin]"
            }
          >
            {links.slice(1).map(({ href, text, onClick }) => (
              <NavLink key={href} href={href} onClick={onClick}>
                {text}
              </NavLink>
            ))}
          </div>
        </div>
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
    if (logout.isSuccess) {
      trpc.account.invalidate();
    }
  }, [logout.isSuccess]);

  useEffect(() => {
    function close(event: MouseEvent) {
      if (
        event.target &&
        "dataset" in event.target &&
        event.target.dataset instanceof DOMStringMap &&
        event.target.dataset.dontClose
      )
        return;
      setOpen(false);
    }
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  });

  return (
    <>
      <nav
        className="
        w-full fixed
        uppercase text-white
        z-50
        flex flex-col
      "
      >
        <div
          className="
          h-20 px-7 flex justify-between items-center
          bg-[linear-gradient(rgba(15,20,45,1),rgba(15,20,45,0.75))]
          w-full
          lg:absolute lg:justify-center
        "
        >
          <Logo class="z-100" />
          <button
            className="w-9 h-8 z-10 relative lg:hidden"
            data-dont-close
            onClick={() => setOpen((open) => !open)}
          >
            <div
              data-dont-close
              className={
                "transition-all absolute h-1/5 bg-white rounded-md " +
                (open ? "rotate-45 top-[40%] w-[120%]" : "top-0 w-full")
              }
            />
            <div
              data-dont-close
              className={
                "transition-all absolute h-1/5 bg-white rounded-md top-[40%] " +
                (open ? "w-0" : "w-full")
              }
            />
            <div
              data-dont-close
              className={
                "transition-all absolute h-1/5 bg-white rounded-md " +
                (open ? "-rotate-45 top-[40%] w-[120%]" : "w-full top-[80%]")
              }
            />
          </button>
        </div>

        <div
          className={`
            w-full flex justify-between flex-col items-stretch absolute
            top-0 pt-20 pb-[300px] lg:pb-0 lg:left-0 lg:flex-row lg:items-center lg:px-8 lg:pt-0
            bg-gradient-to-b from-black lg:from-transparent via-black lg:via-transparent to-transparent lg:bg-transparent
            transition-all duration-300
          ` + (open ? "left-0" : "-left-full")
          }
        >
          <div className="flex flex-col lg:flex-row items-center px-14 pb-0 lg:px-0 lg:pb-0 mb-1">
            <a className="sr-only focus:not-sr-only" href="#main-content">
              {t.toContent}
            </a>
            <NavLink class="px-0 lg:px-4 p-4 w-[300px] lg:w-auto" href="/">
              {t.home}
            </NavLink>
            <NavLink class="px-0 lg:px-4 xl:block hidden lg:pt-4 pb-4 w-[300px] lg:w-auto" href="/karta">
              {t.map}
            </NavLink>    {/*<= this one was only used during the fair   */}
            <Group
              links={[
                { href: "/förföretag", text: t.forCompanies },
                { href: "/sponsor", text: t.forSponsors },
                //{ href: "/katalog", text: t.catalog },
                //{ href: "/event", text: "event" },
                { href: "/faq", text: "faq" },
                ...(isLoggedIn.data == true
                  ? [{ href: "/utställare", text: t.exhibitorSettings }]
                  : []),
                /*...(isLoggedIn.data == true
                  ? [
                      {
                        href: "/",
                        text: t.logout,
                        onClick: () => logout.mutate(),
                      },
                    ]
                  : [{ href: "/logga-in", text: t.login }]),*/
              ]}
            />
            <Group
              links={[
                { href: "/förstudenter", text: t.forStudents },
                { href: "/karta", text: t.map },
                { href: "/logos", text: t.logos },
                /*{ href: "/student", text: t.meetings },*/
                {href: "/sok", text:t.sok},
              ]}
            />
            {/*<NavLink class="px-14 lg:px-0" href="/mässan">{t.about}</NavLink>*/}
            <div className="lg:hidden">
              <Group
                links={[
                  { href: "/om-oss", text: t.about },
                  { href: "/historia", text: t.history },
                ]}
              />
            </div>
          </div>
          <div
            className="
            flex flex-row lg:justify-center items-center lg:pl-0 justify-center lg:pr-0
            py-4 gap-3
            lg:px-0 bg-black lg:bg-transparent lg:ml-auto
          "
          >
            <NavLink class="hidden lg:block px-0 lg:px-4 p-4 w-[300px] lg:pr-2 lg:w-auto" href="/kontakt">
              {t.contact}
            </NavLink>
            <div className="hidden lg:block">
              <Group
              class=" lg:ml-0"
                links={[
                  { href: "/om-oss", text: t.about },
                  { href: "/historia", text: t.history },
                ]}
              />
            </div>
            <Link
              className="bg-cerise py-2.5 px-4 rounded-full text-center hover:scale-105 transition-transform"
              href="/företagsanmälan"
            >
              {t.companyForm}
            </Link>
            <button
              data-dont-close
              onClick={swapLocale}
              className={
                `
              w-8 h-8
              rounded-full border-none
              bg-no-repeat bg-center bg-[length:180%]
              transition-transform hover:scale-110
              ` +
                (locale == "sv"
                  ? "bg-[url(/img/uk-flag.svg)]"
                  : "bg-[url(/img/se-flag.svg)]")
              }
            >
              <img className="sr-only" alt={t.changeLanguage} />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
