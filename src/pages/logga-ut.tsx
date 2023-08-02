import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();
  const trpc = api.useContext();
  const logout = api.account.logout.useMutation();

  useEffect(() => {
    trpc.account.invalidate();
    router.replace("/");
  }, [logout.isSuccess]);

  useEffect(() => {
    logout.mutate();
  }, []);

  return <></>;
}
