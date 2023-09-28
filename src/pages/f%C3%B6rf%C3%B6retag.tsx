import { useRef } from "react";
import { useLocale } from "@/locales";
import GridCollage from "@/components/GridCollage";

export default function ForCompanies() {
  const t = useLocale();
  const scrollRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="w-full h-full">
      <div className="flex flex-col mx-auto items-center max-w-[80%]">
        <h1 className="uppercase text-center text-cerise pt-[200px] mb-36 text-5xl font-medium">
          {t.forCompanies.title}
        </h1>

        <GridCollage
          t={t}
          home={false}
          scrollRef={scrollRef}
          rightImage={["/img/ff1.webp", "People talking", "absolute bottom-0 w-full"]}
          leftImage={["/img/ff2.webp", "People talking", "absolute bottom-0 w-full object-cover"]}
        />
      </div>
    </div>
  );
}
