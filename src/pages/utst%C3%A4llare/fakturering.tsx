import { api } from "@/utils/api";
import { useLocale } from "@/locales";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import ExhibitorLayout from "@/shared/exhibitorLayout";
import BillingInfo from "@/components/Company/Billing information/BillingInfo";

export default function ExhibitorBilling() {
  const t = useLocale();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const [physicalAddress, setPhysicalAddress] = useState<string>("");
  const [billingMethod, setBillingMethod] = useState<string>("");
  const [organizationNumber, setOrganizationNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const getIsLoggedIn = api.account.isLoggedIn.useQuery(undefined, {
    onSuccess: (data: any) => {
      setIsLoggedIn(data?.ok);
    },
  });

  const getBillingInfo = api.exhibitor.getBillingInfo.useQuery(undefined, {
    enabled: !!(getIsLoggedIn.isSuccess && isLoggedIn),
  });
  const setBillingInfoMutation = api.exhibitor.setBillingInfo.useMutation();

  useEffect(() => {
    if (!getIsLoggedIn.isSuccess) return;
  }, [isLoggedIn]);

  useEffect(() => {
    if (!getBillingInfo.isSuccess) return;
    const data = getBillingInfo.data;
    if (data) {
      setPhysicalAddress(data.physicalAddress || "");
      setBillingMethod(data.billingMethod || "");
      setOrganizationNumber(data.organizationNumber || "");
      setEmail(data.email || "");
    }
  }, [getBillingInfo.isSuccess]);

  function handleSave() {
    setBillingInfoMutation.mutate({
      physicalAddress,
      billingMethod,
      organizationNumber,
      email,
      locale: t.locale,
    }, {
      onSuccess: () => {
        getBillingInfo.refetch();
      }
    });
  }

  return(
    <>
      <Head>
        <title>Fakturering</title>
      </Head>
      <ExhibitorLayout>
        <BillingInfo
          t={t}
          physicalAddress={physicalAddress}
          setPhysicalAddress={setPhysicalAddress}
          billingMethod={billingMethod}
          setBillingMethod={setBillingMethod}
          organizationNumber={organizationNumber}
          setOrganizationNumber={setOrganizationNumber}
          email={email}
          setEmail={setEmail}
          saveHandler={handleSave}
        />
      </ExhibitorLayout>
    </>
  );
}
