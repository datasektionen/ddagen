import { useLocale } from "@/locales";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState } from "react";

export default function Catalog() {
    const t = useLocale();
    const [dropped, setDrop] = useState(false);
    const packets = [t.catalog.basePacket, t.catalog.sponsorPacket, t.catalog.headhHunterPacket, t.catalog.premiumPacket]
    const prices = ["35 000:-", "45 000:-", "55 000:-" , "70 000:-"]
    const icons = ["fa-expand", "fa-laptop", "fa-circle", "fa-users", "fa-ticket-alt", "fa-cocktail", "fa-wifi", "fa-couch", "fa-user-tie", "fa-box-open",
                ]
    return (
        <div className="pt-[200px] pb-[600px]">
            <h1 className="uppercase text-cerise text-5xl font-medium text-center">{t.catalog.header}</h1>

            <div className="flex flex-row justify-between  px-[100px] mt-[200px]">
                <div className="flex flex-col">
                    <div className="relative z-40 flex flex-col py-[30px] px-10 border-[#E2B7C9] border-[3px] rounded-xl bg-slate-50 bg-opacity-10 items-center">
                        <h1 className="text-white text-center text-3xl">{t.catalog.packetType[0]}</h1>
                        <h1 className="text-yellow text-center text-1xl">{t.catalog.info}</h1>
                        <h1 className="text-white text-center text-7xl py-10">{prices[0]}</h1>
                        <button onClick={() => setDrop(!dropped)} className="absolute h-[40px] w-[100px] bg-[#E2B7C9] rounded-[40px] border-cerise bottom-0 translate-y-1/2">
                            <i className={`${dropped ? "" : "rotate-180"} duration-200 fas fa-chevron-up text-white`}></i>
                        </button>
                    </div>
                    <div className={`
                    ${dropped ? "max-h-[800px] py-[40px]"
                              : "max-h-0 text-[0px] border-b-0"}
                    duration-200 z-0 flex flex-col px-10 border-[#E2B7C9] border-[3px] border-t-0 rounded-b-xl bg-slate-50 bg-opacity-10 items-center`}>
                    {t.catalog.basePacket.map((row, i) => (
                            <div className={`flex flex-col py-2 items-center`}>
                                <i className={`${dropped ? "text-4xl" : "text-[0px]"} fas ${icons[i]} duration-200 text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]`}></i>
                                <p className="text-white">{row}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
