import type Locale from "@/locales";

export default function Map({ t }: { t: Locale }) {
  return (
    <div className="flex flex-col items-center justify-center mt-12">
      <div>
        <div className="text-5xl text-white">HEllo</div>
      </div>
      <div className="flex flex-row items-center">
        <div className="text-5xl text-white">HEllo</div>
        <div className="text-5xl text-white">HEllo</div>
        <div className="text-5xl text-white">HEllo</div>
      </div>
    </div>
  );
}
