import { useLocale } from "@/locales";

export default function Catalog() {
    const t = useLocale();
    const packets = [t.catalog.premiumPacket, t.catalog.headhHunterPacket, t.catalog.sponsorPacket, t.catalog.basePacket]
    const prices = ["70 000:-", "55 000:-", "45 000:-", "35 000:-"]
    return (
        <div className="py-[200px]">
            <h1 className="uppercase text-cerise text-5xl font-medium text-center">{t.catalog.header}</h1>
            <div className="flex flex-row justify-between  px-[100px] mt-[200px]">
            {
            packets.map((packet, i) => (
            
                <div className="h-full  w-[398px] flex flex-col py-[30px] border-cerise border-[3px]">
                    <h1 className="text-white text-center text-3xl"> {t.catalog.packetType[i]}</h1>
                    <h1 className="text-yellow text-center text-1xl"> {t.catalog.info}</h1>
                    <h1 className="text-white text-center text-7xl py-10"> {prices[i]}</h1>
                    <div className="px-[30px]">
                        
                        {packet.map((row, i) => (
                            <div className="flex flex-row py-2">
                                <span className="text-white pr-2">&#10004;</span>
                                <p className="text-white">{row}</p>
                            </div>
                        ))}
                    </div>
                </div>
                ))
                }
            </div>
        </div>
    )
}
