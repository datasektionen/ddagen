import { useLocale } from "@/locales";
import Map from "@/components/Map/Map";
import Search from "@/components/Map/Search";
import ExhibitorExplorer from "@/components/Map/ExhibitorExplorer";

export default function Karta() {
  const t = useLocale();

  return (
    <div className="flex flex-col h-full w-full pt-52 pb-40">
      <h1 className="text-cerise text-6xl font-medium uppercase text-center">
        {t.map.header}
      </h1>
      <Search t={t} />
      <div className="flex flex-row items-start justify-center space-x-10">
        <ExhibitorExplorer t={t} />
        <Map t={t} />
      </div>
    </div>
  );
}