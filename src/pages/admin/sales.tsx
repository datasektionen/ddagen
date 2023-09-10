import { useState } from "react";
import { useLocale } from "@/locales";
import { AdminLogin } from "../../components/Admin/AdminLogin";
import { ExhibitorPanel } from "../../components/Admin/ExhibitorPanel";
import { ExtraOrderPanel } from "../../components/Admin/ExtraOrderPanel";
import { api } from "@/utils/api";
import type { Exhibitor } from "@/shared/Classes";

export default function Sales() {
  const t = useLocale();
  const getExhibitors = api.exhibitor.getExhibitors.useMutation();
  const [exhibitors, setExhibitors] = useState<Exhibitor[]>([]);

  async function login(password: string) {
    try {
      const exhibitors = await getExhibitors.mutateAsync(password);
      if (exhibitors === "invalid-password") {
        return "invalid-password";
      }
      setExhibitors(exhibitors);
    } catch (err) {
      return "unknown-error " + err;
    }
  }

  return (
    <div>
      {exhibitors.length === 0 ? (
        <AdminLogin t={t} login={login} />
      ) : (
        <div className="w-full h-full my-48 text-white">
          <h1 className="uppercase text-cerise text-3xl md:text-5xl font-medium text-center px-[10px] break-words">
            {t.admin.sales.header.title}
          </h1>

          <div className="text-center text-xl mt-10 font-medium">
            <p>
              {t.admin.sales.amountOfExhibitors}:&nbsp;
              <span className="text-cerise">{exhibitors.length}</span>
            </p>
          </div>

          <ExtraOrderPanel t={t} exhibitors={exhibitors} />
          <ExhibitorPanel t={t} exhibitors={exhibitors} />
        </div>
      )}
    </div>
  );
}
