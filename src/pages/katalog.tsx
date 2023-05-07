import { useLocale } from "@/locales";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState } from "react";

export default function Catalog() {
    const t = useLocale();
    const packets = [t.catalog.basePacket, t.catalog.sponsorPacket, t.catalog.headhHunterPacket, t.catalog.premiumPacket]
    const prices = ["35 000:-", "45 000:-", "55 000:-" , "70 000:-"]
    const iconsBase = ["fa-expand", "fa-laptop", "fa-circle", "fa-users", "fa-ticket-alt", "fa-cocktail", "fa-wifi", "fa-couch", "fa-user-tie", "fa-box-open",]
    const iconsSponsor = ["fa-expand", "fa-laptop", "fa-circle", "fa-users", "fa-ticket-alt", "fa-cocktail", "fa-wifi", "fa-couch", "fa-user-tie", "fa-box-open",
                        "fa-book-open", "fa-shopping-bag", "fa-camera"]
    const iconsHunter = ["fa-expand", "fa-laptop", "fa-circle", "fa-users", "fa-ticket-alt", "fa-cocktail", "fa-wifi", "fa-couch", "fa-user-tie", "fa-box-open",
    "fa-book-open", "fa-shopping-bag", "fa-camera", "fa-phone-alt", "fa-ad"]
    const iconsPremium = ["fa-expand", "fa-laptop", "fa-circle", "fa-users", "fa-ticket-alt", "fa-cocktail", "fa-wifi", "fa-couch", "fa-user-tie", "fa-box-open",
    "fa-book-open", "fa-shopping-bag", "fa-camera", "fa-phone-alt", "fa-ad"]

    const icons = [iconsBase, iconsSponsor, iconsHunter, iconsPremium]

    const packetColor1 = ["border-[#E2B7C9]", "border-[#D5759C]", "border-cerise", "border-yellow"]
    const packetColor2 = ["bg-[#E2B7C9]", "bg-[#D5759C]", "bg-cerise", "bg-yellow"]

    const stateAction = Array.from({ length: packets.length}, () => useState(false));

    return (
        <div className="pt-[200px] pb-[300px]">
            <h1 className="uppercase text-cerise text-3xl md:text-5xl font-medium text-center px-[10px]">{t.catalog.header}</h1>

            <div className="flex flex-row justify-between px-[10px] md:px-[80px] mt-[200px] overflow-x-auto overflow-y-hidden pb-6">
                {packets.map((packet, i) => <div className="flex flex-col px-[20px] md:px-[10px]">
                    <div className={`
                    justify-between relative z-40 flex flex-col py-[30px] px-[px] h-[200px] lg:h-[225px] 2xl:h-[250px] md:w-[150px] lg:w-[200px] xl:w-[250px] 2xl:w-[300px] 
                    ${packetColor1[i]} border-[3px] rounded-xl bg-slate-50 bg-opacity-10 items-center
                    `}>
                        <h2 className="text-white text-center text-3xl md:text-sm lg:text-xl xl:text-2xl 2xl:text-3xl">{t.catalog.packetType[i]}</h2>
                        <div>
                        <h2 className="text-yellow text-center text-sm lg:text-xl ">{t.catalog.info[i]}</h2>
                        <h2 className="text-white text-center text-3xl lg:text-4xl pb-1 px-[10px]">{prices[i]}</h2>
                        </div>
                        <button onClick={() => stateAction[i][1](!stateAction[i][0])} className={`absolute h-[40px] w-[100px] ${packetColor2[i]} rounded-[40px] border-cerise bottom-0 translate-y-1/2`}>
                            <i className={`${stateAction[i][0] ? "" : "rotate-180"} duration-200 fas fa-chevron-up text-white`}></i>
                        </button>
                    </div>
                    <div className={`
                    ${stateAction[i][0] ? " max-h-full py-[40px]"
                              : "max-h-0 text-[0px] border-b-0"}
                    md:w-[150px] lg:w-[200px] xl:w-[250px] 2xl:w-[300px] 
                    px-[0px] duration-200 z-0 flex flex-col ${packetColor1[i]} border-[3px] border-t-0 rounded-b-xl ${packetColor2[i]} bg-opacity-10 text-center`}>
                    {packet.map((row, j) => (
                            <div className={`flex flex-col py-2 items-center px-[50px] mt-10`}>
                                <i className={`${stateAction[i][0] ? "text-2xl" : "text-[0px]"} fas ${icons[i][j]} duration-200 text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]`}></i>
                                <p className="text-white w-[140px] mt-2">{row}</p>
                            </div>
                        ))}
                    </div>
                </div>)}
                
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-[20px] sm:gap-[100px] px-[50px] mt-[200px]">
                <div className="pt-[20px] px-[0px] sm:w-[400px]">
                    <h1 className="text-4xl font-normal text-cerise"> {t.catalog.subheader}</h1>
                    <p className="text-white text-lg mt-4">{t.catalog.paragraph}</p>
                </div>
                <div className="">
                <img src="/img/catalogImg.png" className="sm:w-[600px]"></img>
                </div>
            </div>
        </div>
    )
}
