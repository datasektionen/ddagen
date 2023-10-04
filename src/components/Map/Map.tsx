import type Locale from "@/locales";
import { Button } from "./Button";

export default function Map({ t }: { t: Locale }) {
  return (
    <div className="flex flex-col items-center justify-center mt-16">
      <div>
        <div className="w-[600px] h-[400px] bg-[#d9d9d9] text-5xl text-white mt-14 mb-6"></div>
      </div>
      <div className="flex flex-row items-center">
        <Button value={t.map.floors.one} loading={false} uppercase={false} />
        <Button value={t.map.floors.two} loading={false} uppercase={false} />
        <Button
          value={t.map.floors.entrance}
          loading={false}
          uppercase={false}
        />
      </div>
    </div>
  );
}
