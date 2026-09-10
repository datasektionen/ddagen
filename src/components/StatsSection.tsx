import type Locale from "@/locales";

export default function StatsSection({
  t,
}: {
  t: Locale;
}) {
  return (
    <div
      className="w-full flex items-center flex-wrap flex-col sm:flex-row justify-between xs:mx-auto max-w-5xl"
    >
      <div className="flex flex-col min-w-[200px] py-2 basis-1 sm:basis-1/2 lg:basis-1/4">
        <div className="text-white text-4xl sm:text-6xl">
          {t.home.stats[0].value}
        </div>
        <div className="separator w-full mt-1 sm:mt-3 mb-2 max-w-[200px] border-[1px] border-slate-400">
        </div>
        <div className="text-white text-base sm:text-xl">
          {t.home.stats[0].type}
        </div>
      </div>
      <div className="flex flex-col min-w-[200px] py-2 basis-1 sm:basis-1/2 lg:basis-1/4">
        <div className="text-white text-4xl sm:text-6xl">
          {t.home.stats[1].value}
        </div>
        <div className="separator w-full mt-1 sm:mt-3 mb-2 max-w-[200px] border-[1px] border-slate-400">
        </div>
        <div className="text-white text-base sm:text-xl">
          {t.home.stats[1].type}
        </div>
      </div>
      <div className="flex flex-col min-w-[200px] py-2 basis-1 sm:basis-1/2 lg:basis-1/4">
        <div className="text-[#C2952C] text-4xl sm:text-6xl">
          {t.home.stats[2].value}
        </div>
        <div className="separator w-full mt-1 sm:mt-3 mb-2 max-w-[200px] border-[1px] border-[#C2952C]">
        </div>
        <div className="text-[#C2952C] text-base sm:text-xl">
          {t.home.stats[2].type}
        </div>
      </div>
    </div>
  );
}
