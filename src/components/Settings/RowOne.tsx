import Locale from "@/locales";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import { TextInput } from "./TextInput";
import { CheckMark } from "./CheckMark";
import { UploadButton } from "./UploadButton";
import { UserDetails } from "./UserDetails";

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

  function removeImageDetails(img: string) {
    return img.replace(/^data:image\/[a-z]+\+?[a-z]+;base64,/, "");
  }

  function addImageDetails(img: string | undefined) {
    if (!img) return "";
    switch (img.charAt(0)) {
      case "/":
        return "data:image/jpg;base64," + img;
      case "i":
        return "data:image/png;base64," + img;
      case "P":
        return "data:image/svg+xml;base64," + img;
      default:
        return img;
    }
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
  }, [getLogos.isSuccess]);

  useEffect(() => {
    if (!getDescription.isSuccess) return;
    setDescription(getDescription.data.description);
  }, [getDescription.isSuccess]);

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
  }, [getJobOffers.isSuccess]);

  return (
    <div className="flex flex-col w-full items-center overflow-auto mt-6">
      <h1 className="uppercase text-cerise text-4xl font-normal px-[10px] break-words">
        {t.exhibitorSettings.table.row1.section1.header}
      </h1>

      {/* Section 1 */}

      <div className="flex flex-row gap-8 mt-8 mb-20">
        <UploadButton
          t={t}
          selectedImage={whiteLogo}
          setSelectedImage={setWhiteLogo}
          textAbove={"Vit Logga"}
          textInside={"Logga"}
          accept={"image/svg+xml"}
        />
        <UploadButton
          t={t}
          selectedImage={colorLogo}
          setSelectedImage={setColorLogo}
          textAbove={"Logga m. färg"}
          textInside={"Logga"}
          accept={"image/png,image/jpeg"}
        />
        <TextInput
          description={description}
          setDescription={setDescription}
          textAbove={t.exhibitorSettings.table.row1.section1.description}
          placeHolderText={
            t.exhibitorSettings.table.row1.section1.placeholderText
          }
        />
      </div>
      {/* Section 1 */}

      {/* Section 2 */}
      <h1 className="uppercase text-cerise text-4xl font-normal px-[10px] break-words">
        {t.exhibitorSettings.table.row1.section2.header}
      </h1>

      <div className="w-[75%]">
        <div className="grid grid-cols-6 grid-rows-4 mx-auto gap-y-2 mt-8 mb-8">
          <div></div>
          <div>{t.exhibitorSettings.table.row1.section2.year.one}</div>
          <div>{t.exhibitorSettings.table.row1.section2.year.two}</div>
          <div>{t.exhibitorSettings.table.row1.section2.year.three}</div>
          <div>{t.exhibitorSettings.table.row1.section2.year.four}</div>
          <div>{t.exhibitorSettings.table.row1.section2.year.five}</div>
          <div className="pr-8 text-right">
            {t.exhibitorSettings.table.row1.section2.jobs.summer}
          </div>
          {[0, 1, 2, 3, 4].map((pos) => (
            <div key={pos}>
              <CheckMark
                name={`${pos}`}
                defaultChecked={checkmarks[pos]}
                onClick={() => {
                  checkmarks[pos] = !checkmarks[pos];
                }}
              />
            </div>
          ))}
          <div className="pr-8 text-right">
            {t.exhibitorSettings.table.row1.section2.jobs.internship}
          </div>
          {[5, 6, 7, 8, 9].map((pos) => (
            <div key={pos}>
              <CheckMark
                name={`${pos}`}
                defaultChecked={checkmarks[pos]}
                onClick={() => {
                  checkmarks[pos] = !checkmarks[pos];
                }}
              />
            </div>
          ))}
          <div className="pr-8 text-right">
            {t.exhibitorSettings.table.row1.section2.jobs.partTime}
          </div>
          {[10, 11, 12, 13, 14].map((pos) => (
            <div key={pos}>
              <CheckMark
                name={`${pos}`}
                defaultChecked={checkmarks[pos]}
                onClick={() => {
                  checkmarks[pos] = !checkmarks[pos];
                }}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-row mb-12 gap-x-16 justify-center">
          {[
            {
              name: t.exhibitorSettings.table.row1.section2.other.thesis,
              num: 15,
            },
            {
              name: t.exhibitorSettings.table.row1.section2.other.fullTime,
              num: 16,
            },
            {
              name: t.exhibitorSettings.table.row1.section2.other.trainee,
              num: 17,
            },
          ].map((pos) => (
            <div className="flex flex-row" key={pos.num}>
              <span className="mr-4 items-center">{pos.name}</span>
              <CheckMark
                name={pos.name}
                defaultChecked={checkmarks[pos.num]}
                onClick={() => {
                  checkmarks[pos.num] = !checkmarks[pos.num];
                }}
              />
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
      {saveChanges == true &&
        setTimeout(() => {
          setSaveChanges(undefined);
        }, 3000) && (
          <p className="text-green-500 font-bold mt-6">{t.success.save}</p>
        )}
      {saveChanges == false &&
        setTimeout(() => {
          setSaveChanges(undefined);
        }, 3000) && (
          <p className="text-red-500 font-bold mt-6">{t.error.unknown}</p>
        )}
      {/* Section 2 */}

      {/* Section 3 */}
      <UserDetails t={t} />
      {/* Section 3 */}
    </div>
  );
}
