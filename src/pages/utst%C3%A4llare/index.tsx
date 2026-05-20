import { api } from "@/utils/api";
import { useLocale } from "@/locales";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import ExhibitorLayout from "@/shared/exhibitorLayout";

export default function ExhibitorOverview() {
  const t = useLocale();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [companyName, setCompanyName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [logoExists, setLogoExists] = useState<boolean>(false);
  const [jobOffers, setJobOffers] = useState<{ count: number } | null>(null);
  const [billingInfo, setBillingInfo] = useState<{ address: string; method: string } | null>(null);
  const [foodPrefs, setFoodPrefs] = useState<{ count: number } | null>(null);
  const [extras, setExtras] = useState<{ chairs: number; tables: number } | null>(null);

  const getIsLoggedIn = api.account.isLoggedIn.useQuery(undefined, {
    onSuccess: (data: any) => setIsLoggedIn(data),
  });

  const getName = api.exhibitor.getName.useQuery();
  const getDescription = api.exhibitor.getDescription.useQuery();
  const getLogos = api.exhibitor.getLogo.useQuery();
  const getJobOffers = api.exhibitor.getJobOffers.useQuery();
  const getPhysicalAddress = api.exhibitor.getPhysicalAddress.useQuery();
  const getBillingMethod = api.exhibitor.getBillingMethod.useQuery();
  const getPreferenceCounts = api.exhibitor.getPreferenceCount.useQuery();
  const getExtras = api.exhibitor.getExtras.useQuery();

  useEffect(() => {
    if (!getIsLoggedIn.isSuccess) return;
    if (isLoggedIn === false) router.push("/logga-in");
  }, [isLoggedIn, getIsLoggedIn.isSuccess, router]);

  useEffect(() => {
    if (getName.isSuccess) setCompanyName(getName.data?.name || "");
  }, [getName.data]);

  useEffect(() => {
    if (getDescription.isSuccess) setDescription(getDescription.data?.description || "");
  }, [getDescription.data]);

  useEffect(() => {
    if (getLogos.isSuccess) {
      const hasLogo = !!(getLogos.data?.white || getLogos.data?.color);
      setLogoExists(hasLogo);
    }
  }, [getLogos.data]);

  useEffect(() => {
    if (getJobOffers.isSuccess) {
      const offers = getJobOffers.data;
      const count = (offers?.summerJob?.length || 0) + (offers?.internship?.length || 0) + (offers?.partTimeJob?.length || 0) + (offers?.masterThesis ? 1 : 0) + (offers?.fullTimeJob ? 1 : 0) + (offers?.traineeProgram ? 1 : 0);
      setJobOffers({ count });
    }
  }, [getJobOffers.data]);

  useEffect(() => {
    if (getPhysicalAddress.isSuccess || getBillingMethod.isSuccess) {
      const hasAddress = !!getPhysicalAddress.data?.companyAddress;
      const hasMethod = !!getBillingMethod.data?.billingMethod;
      setBillingInfo({ address: hasAddress ? "✓" : "", method: hasMethod ? "✓" : "" });
    }
  }, [getPhysicalAddress.data, getBillingMethod.data]);

  useEffect(() => {
    if (getPreferenceCounts.isSuccess) {
      setFoodPrefs({ count: getPreferenceCounts.data?.banqcount || 0 });
    }
  }, [getPreferenceCounts.data]);

  useEffect(() => {
    if (getExtras.isSuccess) {
      setExtras({
        chairs: getExtras.data?.extraChairs || 0,
        tables: getExtras.data?.extraTables || 0,
      });
    }
  }, [getExtras.data]);

  const StatusCard = ({
    title,
    description,
    status,
    statusColor,
    href,
    icon
  }: {
    title: string;
    description: string;
    status: string;
    statusColor: string;
    href: string;
    icon?: string;
  }) => (
    <Link href={href}>
      <div className="bg-black/25 border-2 border-cerise rounded-xl p-6 hover:bg-black/40 hover:border-yellow transition-all cursor-pointer">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-white text-lg font-medium">{title}</h3>
          {icon && <span className="text-2xl">{icon}</span>}
        </div>
        <p className="text-white/80 text-sm mb-4">{description}</p>
        <div className={`text-sm font-medium ${statusColor}`}>{status}</div>
      </div>
    </Link>
  );

  return (
    <>
      <Head>
        <title>Översikt - D-Dagen Utställarportal</title>
      </Head>
      <ExhibitorLayout>
        <div className="w-full">
          <div className="mb-12 pl-8">
            <h2 className="uppercase text-cerise text-2xl md:text-4xl font-normal">
              Välkommen!
            </h2>
          </div>

          <div className="mb-16 pl-8">
            <h3 className="uppercase text-white text-xl font-medium mb-6">Din Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <StatusCard
                title="Företagsinformation"
                description={description ? "Din företagsbeskrivning är uppdaterad" : "Lägg till företagsbeskrivning och loggor"}
                status={logoExists && description ? "✓ Klar" : "⚠ Ofullständig"}
                statusColor={logoExists && description ? "text-green-400" : "text-yellow"}
                href="/utställare/info"
                icon="📋"
              />
              <StatusCard
                title="Jobberbjudanden"
                description={jobOffers?.count ? `Du erbjuder ${jobOffers.count} typ${jobOffers.count > 1 ? "er" : ""} av jobb` : "Välj vilka jobbtyper ni erbjuder"}
                status={jobOffers?.count ? `✓ ${jobOffers.count} aktiv` : "Inte konfigurerat"}
                statusColor={jobOffers?.count ? "text-green-400" : "text-yellow"}
                href="/utställare/jobbannonser"
                icon="💼"
              />
              <StatusCard
                title="Kontaktpersoner"
                description="Lägg till era huvudkontaktpersoner"
                status="Visa detaljer →"
                statusColor="text-cerise"
                href="/utställare/kontaktpersoner"
                icon="👥"
              />
              <StatusCard
                title="Fakturering"
                description={billingInfo?.address ? "Faktureringsuppgifter är registrerade" : "Lägg till faktureringsadress och betalmetod"}
                status={billingInfo?.address && billingInfo?.method ? "✓ Klar" : "⚠ Behövs"}
                statusColor={billingInfo?.address && billingInfo?.method ? "text-green-400" : "text-yellow"}
                href="/utställare/fakturering"
                icon="💳"
              />
              <StatusCard
                title="Matbiljetter"
                description={foodPrefs?.count ? `${foodPrefs.count} förfat preferenser registrerade` : "Registrera era matpreferenser"}
                status={foodPrefs?.count ? "✓ Påbörjad" : "Inte påbörjad"}
                statusColor={foodPrefs?.count ? "text-green-400" : "text-white/60"}
                href="/utställare/matbiljetter"
                icon="🍽️"
              />
              <StatusCard
                title="Banquetten"
                description="Hantera era banjettbiljetter och gäster"
                status="Visa detaljer →"
                statusColor="text-cerise"
                href="/utställare/banquetten"
                icon="🎉"
              />
              <StatusCard
                title="Extrabeställningar"
                description={extras?.chairs || extras?.tables ? `${(extras?.chairs || 0) + (extras?.tables || 0)} extra föremål beställt` : "Beställ extra bord, stolar och mer"}
                status={extras?.chairs || extras?.tables ? "✓ Aktiv" : "Ingen beställning"}
                statusColor={extras?.chairs || extras?.tables ? "text-green-400" : "text-white/60"}
                href="/utställare/extra"
                icon="📦"
              />
            </div>
          </div>

          <div className="bg-black/25 border-2 border-yellow rounded-xl p-6 ml-8">
            <h3 className="uppercase text-yellow text-lg font-medium mb-4">Nästa Steg</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
              {!logoExists && (
                <li className="flex items-center gap-3">
                  <span className="text-cerise">•</span>
                  <Link href="/utställare/info" className="text-white text-sm hover:text-cerise transition-colors">
                    Ladda upp loggor (vit och färgad)
                  </Link>
                </li>
              )}
              {!description && (
                <li className="flex items-center gap-3">
                  <span className="text-cerise">•</span>
                  <Link href="/utställare/info" className="text-white text-sm hover:text-cerise transition-colors">
                    Skriv er företagsbeskrivning
                  </Link>
                </li>
              )}
              {!jobOffers?.count && (
                <li className="flex items-center gap-3">
                  <span className="text-cerise">•</span>
                  <Link href="/utställare/jobbannonser" className="text-white text-sm hover:text-cerise transition-colors">
                    Välj vilka jobbtyper ni erbjuder
                  </Link>
                </li>
              )}
              {!billingInfo?.address && (
                <li className="flex items-center gap-3">
                  <span className="text-cerise">•</span>
                  <Link href="/utställare/fakturering" className="text-white text-sm hover:text-cerise transition-colors">
                    Fyll i faktureringsuppgifter
                  </Link>
                </li>
              )}
              <li className="flex items-center gap-3">
                <span className="text-cerise">•</span>
                <Link href="/utställare/kontaktpersoner" className="text-white text-sm hover:text-cerise transition-colors">
                  Lägg till kontaktpersoner
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-cerise">•</span>
                <Link href="/utställare/matbiljetter" className="text-white text-sm hover:text-cerise transition-colors">
                  Registrera matpreferenser
                </Link>
              </li>
            </ul>
          </div>

          <div className="mt-8 bg-gradient-to-r from-cerise/20 to-yellow/20 border-2 border-cerise/50 rounded-xl p-6 text-center ml-8">
            <h3 className="text-cerise text-lg font-medium mb-2">Behöver ni hjälp?</h3>
            <p className="text-white text-sm mb-3">
              Besök vår FAQ-sektion för vanliga frågor och support.
            </p>
            <Link href="/utställare/faq">
              <button className="bg-cerise hover:bg-yellow text-white text-sm font-medium px-5 py-2 rounded-full transition-colors">
                Gå till FAQ
              </button>
            </Link>
          </div>
        </div>
      </ExhibitorLayout>
    </>
  );
}
