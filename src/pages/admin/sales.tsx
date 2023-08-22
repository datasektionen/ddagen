import { useState } from "react";
import { useLocale } from "@/locales";
import { AdminLogin } from "../../components/Admin/AdminLogin";
import { ExhibitorPanel } from "../../components/Admin/ExhibitorPanel";
import { api } from "@/utils/api";
import type { Exhibitor } from "@/shared/Classes";

export default function Sales() {
  const t = useLocale();
  const getExhibitors = api.exhibitor.getExhibitors.useMutation();
  const [exhibitors, setExhibitors] = useState<Exhibitor[]>([]);

  async function login(password: string) {
    const exhibitors = await getExhibitors.mutateAsync(password);
    setExhibitors(exhibitors);
    return exhibitors.length > 0;
  }

  return (
    <div>
      {exhibitors.length === 0 ? (
        <AdminLogin
          t={t}
          login={login}
        />
      ) : (
        <ExhibitorPanel t={t} exhibitors={exhibitors} />
      )}
    </div>
  );
}
