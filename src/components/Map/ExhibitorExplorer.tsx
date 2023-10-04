import type Locale from "@/locales";
import { useState } from "react";
import { Button } from "./Button";

function Explorer({
  t,
  exhibitor,
  selectedExhibitor,
}: {
  t: Locale;
  exhibitor: number;
  selectedExhibitor: number | undefined;
}) {
  return (
    <div className="flex h-52 items-center justify-center mt-4 mx-4 border border-white bg-white bg-opacity-40 rounded-lg">
      d
    </div>
  );
}

export default function ExhibitorExplorer({ t }: { t: Locale }) {
  const [selectedExhibitor, setSelectedExhibitor] = useState<number>();

  return (
    <div className="flex flex-col gap-y-4 items-center justify-center mt-12">
      <Button value={"/img/arrow-up.png/"} loading={false} isImage={true} />
      <div
        className="block w-[300px] h-[550px] border-2 border-cerise
                    bg-[#eaeaea] bg-opacity-10 rounded-xl pb-4 overflow-hidden"
      >
        <Explorer t={t} exhibitor={1} selectedExhibitor={selectedExhibitor} />
        <Explorer t={t} exhibitor={1} selectedExhibitor={selectedExhibitor} />
        <Explorer t={t} exhibitor={1} selectedExhibitor={selectedExhibitor} />
        <Explorer t={t} exhibitor={1} selectedExhibitor={selectedExhibitor} />
      </div>
      <Button value={"/img/arrow-down.png/"} loading={false} isImage={true} />
    </div>
  );
}
