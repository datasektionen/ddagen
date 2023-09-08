import { useState } from "react";
import { useLocale } from "@/locales";
import { AdminLogin } from "../../components/Admin/AdminLogin";
import { ExtraOrderPanel } from "../../components/Admin/ExtraOrderPanel";
import { api } from "@/utils/api";
import type { Exhibitor } from "@/shared/Classes";

export default function ExtraOrders() {
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
        <ExtraOrderPanel t={t} exhibitors={exhibitors} />
      )}
    </div>
  );
}
