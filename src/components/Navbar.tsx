import Link from "next/link";
import { useRouter } from "next/router";
import en from "@/locales/en";
import sv from "@/locales/sv";

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
    const router = useRouter();

    return <Link
        className={router.pathname == encodeURI(href) ? "text-cerise" : ""}
        href={href}
    >{children}</Link>;
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

    return (
        <nav className="
            h-16 w-full fixed
            flex justify-between items-center
            bg-gradient-to-t from-transparent to-[#000b]
            uppercase text-white
        ">
            <div className="flex gap-8 items-center ml-14">
                <a
                    className="sr-only focus:not-sr-only"
                    href="#main-content"
                >{nav.toContent}</a>
                <NavLink href="/">{nav.home}</NavLink>
                <NavLink href="/förföretag">{nav.forCompanies}</NavLink>
                <NavLink href="/förstudenter">{nav.forStudents}</NavLink>
            </div>
            <div className="relative w-[102px] h-[35px]">
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
            </div>
            <div className="flex gap-8 items-center mr-10">
                <NavLink href="/mässan">{nav.about}</NavLink>
                <Link
                    className="bg-cerise-strong p-2.5 rounded-full"
                    href="/företagsanmälan"
                >{nav.companyForm}</Link>
                <button onClick={swapLocale} className={`
                    w-8 h-8
                    rounded-full border-none
                    bg-no-repeat bg-center bg-[length:180%]
                    ` + (locale == "sv"
                        ? "bg-[url(/img/uk-flag.svg)]"
                        : "bg-[url(/img/se-flag.svg)]"
                    )}
                ></button>
            </div>
        </nav>
    );
}
