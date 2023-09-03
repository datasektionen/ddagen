import { useLocale } from "@/locales";
import { useState } from "react";
const imagesPath = "/img/groupPictures/";

const prTeam = [
  [
    imagesPath + "mathiasPic.jpg",
    imagesPath + "olofPic.jpg",
    imagesPath + "jakobPic.jpg",
  ],
  [
    imagesPath + "adamPic.jpg",
    imagesPath + "annaPic.jpg",
    imagesPath + "rikazPic.jpg",
  ],
  [imagesPath + "maryPic.jpg"],
];
const saleTeam = [
  [
    imagesPath + "williamPic.jpg",
    imagesPath + "linusPic.jpg",
    imagesPath + "alexPic.jpg",
  ],
  [
    imagesPath + "rogerPic.jpg",
    imagesPath + "elinPic.jpg",
    imagesPath + "toshidePic.jpg",
  ],
];

const massTeam = [
  [
    imagesPath + "oscarPic.jpg",
    imagesPath + "mortadaPic.jpg",
    imagesPath + "lydiaPic.jpg",
  ],
  [imagesPath + "mimmiPic.jpg", imagesPath + "dilanPic.jpg"],
];

const ecoNames = [["Christofer Gärtner", "Melissa Arslan"]];

const managers = [imagesPath + "axelPic.jpg", imagesPath + "johanPic.jpg"];
const econonmyTeam = [
  imagesPath + "christoferPic.jpg",
  imagesPath + "melissaPic.jpg",
];

const managersName = [["Axel Johansson", "Johan Abdi"]];

const prNames = [
  ["Mathias Magnusson", "Olof", "Jakob Petterson"],
  ["Adam Egnell", "Anna Yang", "Rikaz Nismi"],
  ["Mary Abeysekera"],
];

const salesNames = [
  ["William Nordwall", "Linus Markström", "Alexandre Moch"],
  ["Roger Chen", "Elin Gudmunsson", "Toshihide Sakao"],
];

const massNames = [
  ["Oscar Witt", "Mortada Nasser", "Lydia Brorsson"],
  ["Mimmi Weng", "Dilan Ismail"],
];

function Team({
  team,
  reverse,
  leader,
  teamPic,
  leaderPic,
  names,
  useStyle,
  alternateBosses,
  teamName,
}: {
  team: string[];
  reverse: boolean;
  leader: string;
  teamPic: string;
  leaderPic: string;
  names: string[];
  useStyle: boolean;
  alternateBosses: string[];
  teamName: string
}) {
  const numMembers = team.length - 1;
  const numRows = numMembers / 3;
  const arr = Array.from({ length: numRows }, (_, index) => index);

  return (
    <div
      className={`${
        reverse ? "flex-row-reverse" : "flex-row"
      } flex px-[100px] mt-[100px] w-full`}
    >
      <div className="flex flex-col h-[900px]">
        <img src={teamPic} className=""></img>
        <div className="bg-white  flex items-center justify-center h-full">
          <p className="text-4xl text-cerise font-bold">{teamName}</p>
        </div>
      </div>
      {useStyle ? (
        <div className="w-[1200px] bg-white/80 flex flex-col py-5 px-5 h-[900px] overflow-x-auto overflow-y-visible">
          <div className="flex flex-row justify-center">
            <div className="flex flex-col justify-center">
              <img src={leaderPic} className="w-[150px] rounded-[20px]"></img>
              <p className="text-center text-xl">{leader}</p>
              <p className="text-center text-lg">PR-Ansvarig</p>
              <img src="/img/linkedinIcon.svg" className="justify-center h-[35px]"></img>
            </div>
          </div>
          {team.map((row, i) => (
            <div className="flex flex-row justify-center gap-5">
              {row.map((image, j) => (
                <div className="flex flex-col items-center justify-center">
                  <img src={image} className="w-[150px] rounded-[20px]"></img>
                  <p className="text-center text-xl"> {names[i][j]}</p>
                  <p className="text-center text-lgs">Webb-Utvecklare</p>
                  <img src="/img/linkedinIcon.svg" className="justify-center h-[35px]"></img>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full bg-white/80 flex flex-col py-5 px-5 h-[900px] overflow-x-auto overflow-y-visible">
          <div className="flex flex-row justify-center gap-5">
            <div className="flex flex-col justify-center">
              <img
                src={alternateBosses[0]}
                className="w-[150px] rounded-[20px]"
              ></img>
              <p className="text-center text-xl">{names[0][0]}</p>
              <p className="text-center text-lg">PR-Ansvarig</p>
              <img src="/img/linkedinIcon.svg" className="justify-center h-[35px]"></img>
            </div>
            <div className="flex flex-col justify-center">
              <img
                src={alternateBosses[1]}
                className="w-[150px] rounded-[20px]"
              ></img>
              <p className="text-center text-xl">{names[0][1]}</p>
              <p className="text-center text-lg">PR-Ansvarig</p>
              <img src="/img/linkedinIcon.svg" className="justify-center h-[35px]"></img>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Students() {
  const t = useLocale();
  const [currentTeam, setCurrentTeam] = useState(0);
  return (
    <div className="pt-[200px] pb-[300px]">
      <h1 className="uppercase text-cerise text-5xl font-medium text-center">
        {" "}
        {t.aboutUs.header}
      </h1>
      <div className="flex flex-row items-center justify-center px-[200px]">
        <div className="px-[100px] mt-36 bg-[url('/img/grayKth.jpg')] bg-cover bg-no-repeat bg-center h-[600px] w-full flex items-center justify-center gap-5">
          <div className="flex flex-col">
            <div className="flex flex-row items-center justify-center mb-10">
              <div className="">
                <h2 className="text-cerise text-xl font-medium">
                  {" "}
                  {t.aboutUs.info1}
                </h2>
                <p className="text-white text-lg">{t.aboutUs.paragraph1} </p>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="">
                <h2 className="text-cerise text-xl font-medium">
                  {t.aboutUs.info2}
                </h2>
                <p className="text-white text-lg">{t.aboutUs.paragraph2}</p>
              </div>

              <div className="">
                <h2 className="text-cerise text-xl  font-medium">
                  {t.aboutUs.info3}
                </h2>
                <p className="text-white text-lg">{t.aboutUs.paragraph3}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center px-[400px]">
        <div className="px-[100px] mt-[100px] bg-[url('/img/groupPictures/projectGroup.jpg')] bg-cover bg-no-repeat bg-center h-[400px] w-full flex flex-row items-center justify-center">
          <p className="text-cerise text-9xl">Möt teamet</p>
        </div>
      </div>
      <Team
        team={prTeam}
        leader={"Maria Tsychkova"}
        teamPic="/img/groupPictures/prTeam.jpg"
        leaderPic={imagesPath + "mariaPic.jpg"}
        names={prNames}
        useStyle={true}
        teamName="PR-Gruppen"
      />

      <Team
        team={saleTeam}
        reverse={true}
        leader={"Vilmer Jonsson"}
        teamPic="/img/groupPictures/salesTeam.jpg"
        leaderPic={imagesPath + "vilmerPic.jpg"}
        names={salesNames}
        useStyle={true}
        teamName="Säljgruppen"
      />

      <Team
        team={massTeam}
        reverse={false}
        leader={"Aziz Ali"}
        teamPic="/img/groupPictures/massTeam.jpg"
        leaderPic={imagesPath + "azizPic.jpg"}
        names={massNames}
        useStyle={true}
        teamName="Mässgruppen"
      />

      <Team
        team={econonmyTeam}
        reverse={true}
        leader={"Aziz Ali"}
        teamPic="/img/groupPictures/ecoTeam.jpg"
        leaderPic={imagesPath + "azizPic.jpg"}
        names={ecoNames}
        useStyle={false}
        alternateBosses={[
          imagesPath + "christoferPic.jpg",
          imagesPath + "melissaPic.jpg",
        ]}
        teamName="Ekonomiansvariga"
      />

      <Team
        team={managers}
        reverse={false}
        leader={"Aziz Ali"}
        teamPic="/img/groupPictures/bossTeam.jpg"
        leaderPic={imagesPath + "azizPic.jpg"}
        names={managersName}
        useStyle={false}
        alternateBosses={managers}
        teamName="D-Dagenansvariga"
      />
      
    </div>
  );
}
