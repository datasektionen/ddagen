import Locale from "@/locales";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import { TextInput } from "./TextInput";
import { CheckMark } from "../CheckMark";
import { UploadButton } from "./UploadButton";
import { UserDetails } from "./UserDetails";
import { addImageDetails } from "@/shared/addImageDetails";

export default function RowOne({ t }: { t: Locale }) {
  // Retrieve data from database
  const getLogos = api.exhibitor.getLogo.useQuery();
  const getDescription = api.exhibitor.getDescription.useQuery();
  const getJobOffers = api.exhibitor.getJobOffers.useQuery();

  // Initialise mutation that are used to update database
  const logoMutation = api.exhibitor.setLogo.useMutation();
  const descriptionMutation = api.exhibitor.setDescription.useMutation();
  const jobOffersMutation = api.exhibitor.setJobOffers.useMutation();

  // Variables
  const [whiteLogo, setWhiteLogo] = useState("");
  const [colorLogo, setColorLogo] = useState("");
  const [description, setDescription] = useState("");
  const [checkmarks, setCheckMarks] = useState<boolean[]>([]);
  const [saveChanges, setSaveChanges] = useState<boolean | undefined>();

  // Other
  const years = [
    t.exhibitorSettings.table.row1.section2.year.one,
    t.exhibitorSettings.table.row1.section2.year.two,
    t.exhibitorSettings.table.row1.section2.year.three,
    t.exhibitorSettings.table.row1.section2.year.four,
    t.exhibitorSettings.table.row1.section2.year.five,
  ];

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

  function removeImageDetails(img: string) {
    return img.replace(/^data:image\/[a-z]+\+?[a-z]+;base64,/, "");
  }

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

  async function handleClick() {
    await Promise.all([
      logoMutation.mutate({
        b64data: removeImageDetails(whiteLogo),
        kind: "white",
      }),
      logoMutation.mutateAsync({
        b64data: removeImageDetails(colorLogo),
        kind: "color",
      }),
      descriptionMutation.mutateAsync(description),
      jobOffersMutation.mutateAsync({
        summerJob: getCheckmarksPos("summer"),
        internship: getCheckmarksPos("intern"),
        partTimeJob: getCheckmarksPos("partTime"),
        masterThesis: checkmarks[15],
        fullTimeJob: checkmarks[16],
        traineeProgram: checkmarks[17],
      }),
    ])
      .then(() => setSaveChanges(true))
      .catch((error) => {
        console.log(error);
        setSaveChanges(false);
      });
  }

  useEffect(() => {
    if (!getLogos.isSuccess) return;
    setWhiteLogo(addImageDetails(getLogos.data.white));
    setColorLogo(addImageDetails(getLogos.data.color));
  }, [getLogos.data]);

  useEffect(() => {
    if (!getDescription.isSuccess) return;
    setDescription(getDescription.data.description);
  }, [getDescription.data]);

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

  useEffect(() => {
    if (typeof saveChanges === "boolean") {
      setTimeout(() => {
        setSaveChanges(undefined);
      }, 3000);
    }
  }, [saveChanges]);

  return (
    <div className="flex flex-col w-full items-center overflow-auto mt-6 text-center">
      <h2 className="uppercase text-cerise text-2xl md:text-4xl font-normal px-[10px] break-words">
        {t.exhibitorSettings.table.row1.section1.header}
      </h2>

      {/* Section 1 */}

      <div className="w-full flex flex-col lg:flex-row gap-8 mt-8 mb-20 lg:px-24 items-center">
        <div className="flex flex-col max-sm:gap-y-8 sm:flex-row sm:gap-x-8">
          <div>
            <UploadButton
              t={t}
              selectedImage={whiteLogo}
              setSelectedImage={setWhiteLogo}
              textAbove={t.exhibitorSettings.table.row1.section1.logoWhite}
              textInsideMiddle="/img/fluga_gra.png"
              textInsideBottom={"SVG"}
              accept={["image/svg+xml"]}
            />
          </div>
          <div>
            <UploadButton
              t={t}
              selectedImage={colorLogo}
              setSelectedImage={setColorLogo}
              textAbove={t.exhibitorSettings.table.row1.section1.logoColour}
              textInsideMiddle="/img/fluga_gra.png"
              textInsideBottom={`SVG ${t.exhibitorSettings.table.row1.section1.or} PNG`}
              accept={["image/png", "image/svg+xml"]}
            />
          </div>
        </div>
        <div className="">
          <TextInput
            description={description}
            setDescription={setDescription}
            textAbove={t.exhibitorSettings.table.row1.section1.description}
            placeHolderText={
              t.exhibitorSettings.table.row1.section1.placeholderText
            }
          />
        </div>
      </div>
      {/* Section 1 */}

      {/* Section 2 */}
      <h2 className="uppercase text-cerise text-2xl md:text-4xl font-normal px-[10px] break-words mb-8">
        {t.exhibitorSettings.table.row1.section2.header}
      </h2>

      <div className="max-lg:hidden w-[75%]">
        <div className="grid grid-cols-6 grid-rows-4 mx-auto gap-y-2 mb-8">
          <div></div>
          {years.map((year) => (
            <div>{year}</div>
          ))}
          <div className="pr-8 text-left">{rows[0].jobOffer}</div>
          {rows[0].checkmarks}
          <div className="pr-8 text-left">{rows[1].jobOffer}</div>
          {rows[1].checkmarks}
          <div className="pr-8 text-left">{rows[2].jobOffer}</div>
          {rows[2].checkmarks}
        </div>
        <div className="flex flex-row mb-12 gap-x-16 justify-center">
          {[3, 4, 5].map((pos) => (
            <div className="flex flex-row" key={pos}>
              <span className="mr-4 items-center">{rows[pos].jobOffer}</span>
              {rows[pos].checkmarks}
            </div>
          ))}
        </div>
      </div>

      <div className="lg:hidden w-full mb-10">
        <div className="flex flex-col gap-y-2 text-lg items-center">
          <div
            className="flex flex-row gap-x-0 xxxs:gap-x-1 xxs:gap-x-3
                              xs:gap-x-7 sm:gap-x-14 md:gap-x-20 justify-center"
          >
            {years.map((year) => (
              <div>{year}</div>
            ))}
          </div>
          {rows.map((row) => (
            <div className="flex flex-col gap-y-2" key={row.jobOffer}>
              {row.jobOffer}
              <div
                className="flex flex-row gap-x-0 xxxs:gap-x-2 xxs:gap-x-4
                              xs:gap-x-8 sm:gap-x-14 md:gap-x-20 justify-center"
              >
                {row.checkmarks}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className="block uppercase hover:scale-105 transition-transform
                bg-cerise rounded-full text-white text-base font-normal
                  px-16 py-2 max-lg:mx-auto w-max"
        onClick={handleClick}
      >
        {t.exhibitorSettings.table.row1.section2.save}
      </button>
      {saveChanges == true && (
        <p className="text-green-500 font-bold mt-6">{t.success.save}</p>
      )}
      {saveChanges == false && (
        <p className="text-red-500 font-bold mt-6">{t.error.unknown}</p>
      )}
      {/* Section 2 */}

      {/* Section 3 */}
      
      <UserDetails t={t} />
      {/* Section 3 */}
    </div>
  );
}
