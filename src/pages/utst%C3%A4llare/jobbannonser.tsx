import { api } from "@/utils/api";
import { useLocale } from "@/locales";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import ExhibitorLayout from "@/shared/exhibitorLayout";
import JobOffers from "@/components/Company/General/JobOffers";
import { CheckMark } from "@/components/CheckMark";

export default function ExhibitorJobOffers() {
  const t = useLocale();
  const router = useRouter();

  const [checkmarks, setCheckMarks] = useState<boolean[]>([]);
  const [saveChanges, setSaveChanges] = useState<boolean | undefined>();

  const getJobOffers = api.exhibitor.getJobOffers.useQuery();
  const jobOffersMutation = api.exhibitor.setJobOffers.useMutation();

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

  function getCheckMark(pos: number) {
    return (
      <CheckMark
        name={`${pos}`}
        defaultChecked={checkmarks[pos]}
        onClick={() => {
          setCheckMarks((prev) => {
            const next = [...(prev || new Array<boolean>(18).fill(false))];
            next[pos] = !next[pos];
            return next;
          });
        }}
      />
    );
  }

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

  async function handleSave() {
    try {
      await jobOffersMutation.mutateAsync({
        summerJob: getCheckmarksPos("summer"),
        internship: getCheckmarksPos("intern"),
        partTimeJob: getCheckmarksPos("partTime"),
        masterThesis: checkmarks[15],
        fullTimeJob: checkmarks[16],
        traineeProgram: checkmarks[17],
      });
      setSaveChanges(true);
    } catch (err) {
      console.error(err);
      setSaveChanges(false);
    }
  }

  return (
    <>
      <ExhibitorLayout>
        <>
          <JobOffers t={t} rows={rows} />

          <div className="flex flex-col w-full items-center mb-8 ">
            <button
              className="block uppercase hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base font-normal px-16 py-2 max-lg:mx-auto w-max"
              onClick={handleSave}
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
