import { api } from "@/utils/api";
import { useLocale } from "@/locales";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { InputField } from "@/components/InputField";
import Head from "next/head";
import ExhibitorLayout from "@/shared/exhibitorLayout";
import JobOffers from "@/components/Company/General/JobOffers";
import { CheckMark } from "@/components/CheckMark";

// TODO hook the next button to the save features
// Maby break save changes into a separate steps for each page
// Add Logic to figure out saved state

export default function ExhibitorInfo({
    children
} : {
    children: React.ReactElement
}) {
  const t = useLocale();
  const router = useRouter();

  // States
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [checkmarks, setCheckMarks] = useState<boolean[]>([]);
  const [saveChanges, setSaveChanges] = useState<boolean | undefined>();
  
  const getName = api.exhibitor.getName.useQuery();
  const getIsLoggedIn = api.account.isLoggedIn.useQuery(undefined, {
    onSuccess: (data: any) => {
      setIsLoggedIn(data);
    },
  });

  // Manage login
  useEffect(() => {
    if (!getIsLoggedIn.isSuccess) return;
    //if (isLoggedIn == false) router.push("/logga-in");
  }, [isLoggedIn]);

  // Mutations
  const jobOffersMutation = api.exhibitor.setJobOffers.useMutation();

  // Dynamic content logic


  // Job offers
  const getJobOffers = api.exhibitor.getJobOffers.useQuery();

  function getCheckMark(pos: number) {
    return (
      <CheckMark
        name={`${pos}`}
        defaultChecked={checkmarks[pos]}
        onClick={() => {
          checkmarks[pos] = !checkmarks[pos];
        }}
      />
    );
  }

  useEffect(() => {
      if (!getJobOffers.isSuccess || !getJobOffers.data) return;
      let initCheckMarks = new Array<boolean>(18).fill(false);
      const jobOffers = getJobOffers.data;
      jobOffers.summerJob.map((num: number) => {
        initCheckMarks[num] = true;
      });
      jobOffers.internship.map((num: number) => {
        initCheckMarks[5 + num] = true;
      });
      jobOffers.partTimeJob.map((num: number) => {
        initCheckMarks[10 + num] = true;
      });
      initCheckMarks[15] = jobOffers.masterThesis;
      initCheckMarks[16] = jobOffers.fullTimeJob;
      initCheckMarks[17] = jobOffers.traineeProgram;
      setCheckMarks(initCheckMarks);
    }, [getJobOffers.data]);

  const rows = [
    {
      jobOffer: t.exhibitorSettings.table.row1.section2.jobs.summer,
      checkmarks: [0, 1, 2, 3, 4].map((pos) => (
        <div key={pos}>{getCheckMark(pos)}</div>
      )),
    },
    {
      jobOffer: t.exhibitorSettings.table.row1.section2.jobs.internship,
      checkmarks: [5, 6, 7, 8, 9].map((pos) => (
        <div key={pos}>{getCheckMark(pos)}</div>
      )),
    },
    {
      jobOffer: t.exhibitorSettings.table.row1.section2.jobs.partTime,
      checkmarks: [10, 11, 12, 13, 14].map((pos) => (
        <div key={pos}>{getCheckMark(pos)}</div>
      )),
    },
    {
      jobOffer: t.exhibitorSettings.table.row1.section2.other.thesis,
      checkmarks: getCheckMark(15),
    },
    {
      jobOffer: t.exhibitorSettings.table.row1.section2.other.fullTime,
      checkmarks: getCheckMark(16),
    },
    {
      jobOffer: t.exhibitorSettings.table.row1.section2.other.trainee,
      checkmarks: getCheckMark(17),
    },
  ];

  function getCheckmarksPos(offer: string) {
    let array: boolean[] = [];
    switch (offer) {
      case "summer":
        array = checkmarks.slice(0, 5);
        break;
      case "intern":
        array = checkmarks.slice(5, 10);
        break;
      case "partTime":
        array = checkmarks.slice(10, 15);
        break;
    }
    return array.reduce(
      (out: number[], bool, index) => (bool ? out.concat(index) : out),
      []
    );
  }

  // Save button logic
  async function handleClick() {
    await Promise.all([
      //logoMutation.mutate({
      //  b64data: removeImageDetails(whiteLogo),
      //  kind: "white",
      //}),
      //logoMutation.mutateAsync({
      //  b64data: removeImageDetails(colorLogo),
      //  kind: "color",
      //}),
      //descriptionMutation.mutateAsync(description),
      //industryMutation.mutateAsync(industry),
      //allowMarketingMutation.mutateAsync(allowMarketing),
      jobOffersMutation.mutateAsync({
        summerJob: getCheckmarksPos("summer"),
        internship: getCheckmarksPos("intern"),
        partTimeJob: getCheckmarksPos("partTime"),
        masterThesis: checkmarks[15],
        fullTimeJob: checkmarks[16],
        traineeProgram: checkmarks[17],
      }),
      //setPhysicalAddressMutation.mutateAsync(physicalAddress),
      //setBillingMethodMutation.mutateAsync(billingMethod),
      //setEmailMutation.mutateAsync(email),
    ])
    .then(() => setSaveChanges(true))
    .catch((error) => {
      console.log(error);
      setSaveChanges(false);
    });
  }
  
  // Rendered page
  return(
    <>
      <ExhibitorLayout>
        <>
          <h2 className="text-white">Info</h2>
          <JobOffers
            t={t}
            rows={rows}
          />
          <div className="flex flex-col w-full items-center mb-8 ">
            <button
              className="block uppercase hover:scale-105 transition-transform
                      bg-cerise rounded-full text-white text-base font-normal
                        px-16 py-2 max-lg:mx-auto w-max"
              onClick={handleClick}
            >
              {t.exhibitorSettings.table.row1.section2.save}
            </button>

            {saveChanges == true && (
              <p className="text-green-500 font-bold mt-6 ">{t.success.save}</p>
            )}
            {saveChanges == false && (
              <p className="text-red-500 font-bold mt-6 ">{t.error.unknown}</p>
            )}
          </div>
        </>
      </ExhibitorLayout>
    </>
  );
}
