import { useLocale } from "@/locales";

export default function Students() {
    const t = useLocale();

    return (
        <div className="pt-[200px] pb-[300px]">
            <div className="flex flex-row justify-center gap-5">
                <div className="py-[100px]"><img src="/img/lunchPic.png"></img></div>
                <div className="border-[3px] rounded-lg w-[300px]"></div>
            </div>
            <p className=" text-9xl text-cerise">HEEEEEEEEEEEEEEEEEEEEEEEJ</p>
        </div>
    )
}
