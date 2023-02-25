import Link from "next/link";
import { useRouter } from "next/router";
import en from "@/locales/en";
import sv from "@/locales/sv";
import { useEffect, useState } from "react";

function NavLink({ href, children, "class": className }: { href: string, children: React.ReactNode, "class": string }) {
    const router = useRouter();

    return <Link
        className={className + (router.pathname == encodeURI(href) ? " text-cerise" : "")}
        href={href}
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

export default function Navbar() {
    const router = useRouter();
    const { locale } = router;
    const { nav } = locale === "en" ? en : sv;

    function swapLocale() {
        router.push(router.pathname, router.pathname, {
            locale: locale === "sv" ? "en" : "sv"
        });
    }

    const [open, setOpen] = useState(false);

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
                    lg:absolute
                ">
                    <Logo class="lg:hidden z-10" />
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
                    flex justify-between flex-col items-stretch gap-8
                    bg-darkblue lg:bg-transparent
                    absolute w-full transition-all duration-300
                    top-0 pt-20

                    lg:left-0 lg:flex-row lg:items-center lg:px-8 lg:pt-0
                ` + (open ? "left-0" : "-left-full")
                }>
                    <a
                        className="sr-only focus:not-sr-only"
                        href="#main-content"
                    >{nav.toContent}</a>
                    <NavLink class="px-14 lg:px-0" href="/">{nav.home}</NavLink>
                    <NavLink class="px-14 lg:px-0" href="/förföretag">{nav.forCompanies}</NavLink>
                    {/*<NavLink class="px-14 lg:px-0" href="/förstudenter">{nav.forStudents}</NavLink>*/}
                    <Logo class="hidden lg:block mx-auto" />
                    {/*<NavLink class="px-14 lg:px-0" href="/mässan">{nav.about}</NavLink>*/}
                    <div className="flex flex-row justify-center items-center py-4 gap-8 lg:px-0 bg-blue lg:bg-transparent ">
                        <Link
                            className="bg-cerise p-2.5 rounded-full text-center"
                            href="/företagsanmälan"
                        >{nav.companyForm}</Link>
                        <button data-dont-close onClick={swapLocale} title={nav.changeLanguage} className={`
                            w-8 h-8
                            rounded-full border-none
                            bg-no-repeat bg-center bg-[length:180%]
                            ` + (locale == "sv"
                                ? "bg-[url(/img/uk-flag.svg)]"
                                : "bg-[url(/img/se-flag.svg)]"
                            )}
                        ></button>
                    </div>
                </div>
            </nav>
        </>
    );
}
