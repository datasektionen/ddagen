import { useLocale } from "@/locales";
import { useState } from "react";
const imagesPath = "/img/groupPictures/";

const prTeam = [
  [
    imagesPath + "mathiasPic.jpg",
    imagesPath + "olofPic.jpg",
    imagesPath + "mariaPic.jpg",
  ],
  [
    imagesPath + "jakobPic.jpg",
    imagesPath + "adamPic.jpg",
    imagesPath + "annaPic.jpg",
  ],
  [imagesPath + "rikazPic.jpg", imagesPath + "maryPic.jpg", ""],
];
const saleTeam = [
  [
    imagesPath + "williamPic.jpg",
    imagesPath + "linusPic.jpg",
    imagesPath + "vilmerPic.jpg",
  ],
  [
    imagesPath + "alexPic.jpg",
    imagesPath + "rogerPic.jpg",
    imagesPath + "elinPic.jpg",
  ],
  [imagesPath + "toshidePic.jpg"],
];

const massTeam = [
  [
    imagesPath + "azizPic.jpg",
    imagesPath + "oscarPic.jpg",
    imagesPath + "mortadaPic.jpg",
  ],
  [imagesPath + "mimmiPic.jpg", imagesPath + "dilanPic.jpg"],
];

const ecoNames = [["Christofer Gärtner", "Melissa Arslan"]];

const managers = [[imagesPath + "axelPic.jpg", imagesPath + "johanPic.jpg"]];
const econonmyTeam = [
  [imagesPath + "christoferPic.jpg", imagesPath + "melissaPic.jpg"],
];

const managersName = [["Axel Johansson", "Johan Abdi"]];

const prNames = [
  ["Mathias Magnusson", "Olof Bargholtz Melcherson", "Maria Tcyshkova"],
  ["Jakob Petterson", "Adam Egnell", "Anna Yang"],
  ["Rikaz Nismi", "Mary Abeysekera"],
];

const salesNames = [
  ["William Nordwall", "Linus Markström", "Vilmer Jonsson"],
  ["Alexandre Moch", "Roger Chen", "Elin Gudmunsson"],
  ["Toshihide Sakao"],
];

const massNames = [
  ["Aziz Ali", "Oscar Witt", "Mortada Nasser"],
  ["Mimmi Weng", "Dilan Ismail"],
];

function Team({
  team,
  reverse,
  teamPic,
  names,
  teamName,
  teamRoles,
}: {
  team: string[][];
  reverse: boolean;
  teamPic: string;
  names: string[][];
  teamName: string;
  teamRoles: string[][];
}) {
  const numMembers = team.length - 1;
  const numRows = numMembers / 3;
  const arr = Array.from({ length: numRows }, (_, index) => index);

  return (
    <div
      className={`${
        reverse ? "flex-row-reverse" : "flex-row"
      } flex mt-[100px] px-[20px] lg:px-[100px] flex-col lg:flex-row justify-center lg:h-[700px]`}
    >
      <div className="flex flex-col">
        <img src={teamPic} className=""></img>
        <div className="bg-white/80 lg:bg-white  flex items-center justify-center h-full">
          <p className="text-4xl text-cerise font-bold lg:px-[100px]">
            {teamName}
          </p>
        </div>
      </div>

      <div className=" pt-5 lg:w-[1300px] bg-white/80 flex flex-col overflow-x-auto overflow-y-visible lg:py-10 gap-10">
        {team.map((row, i) => (
          <div className="flex flex-row gap-2 justify-center  pb-3" key={row.toString()}>
            {row.map((image, j) => (
              <div className="flex flex-col" key={image}>
                <div className=" w-[90px] sm:w-[100px] lg:w-[100px]  xl:w-[120px] 2xl:w-[150px]">
                  <img src={image} className=" rounded-[20px]"></img>
                  <div className="mt-2">
                    <p className="text-center text-xs lg:text-sm font-medium">
                      {" "}
                      {names[i][j]}
                    </p>
                    <p className="text-center text-xs lg:text-sm font-medium text-cerise">
                      {teamRoles[i][j]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AboutUs() {
  const t = useLocale();
  return (
    <div className="pt-[200px] pb-[300px]">
      <h1 className="uppercase text-cerise text-5xl font-medium text-center">
        {" "}
        {t.aboutUs.header}
      </h1>
      {/*
        Desktop version
      */}
      // TODO: Uncomment project group image
      {/* <div className="flex justify-center mt-[100px] px-10">
        <img
          className="xl:w-[800px] lg:w-[700px] md:w-[600px] w-[500px] rounded-3xl"
          src=""
        ></img>
      </div> */}
      <div className="px-[200px] mt-[50px] hidden lg:block">
        <div className="flex flex-col">
          <div className="flex flex-row items-center justify-center mb-10">
            <div>
              <h2 className="text-cerise text-xl font-medium">
                {" "}
                {t.aboutUs.info1}
              </h2>
              <p className="text-white text-lg">{t.aboutUs.paragraph1} </p>
            </div>
          </div>
          <div className="flex flex-row gap-10">
            <div>
              <h2 className="text-cerise text-xl font-medium">
                {t.aboutUs.info2}
              </h2>
              <p className="text-white text-lg">{t.aboutUs.paragraph2}</p>
            </div>

            <div>
              <h2 className="text-cerise text-xl  font-medium">
                {t.aboutUs.info3}
              </h2>
              <p className="text-white text-lg">{t.aboutUs.paragraph3}</p>
            </div>
          </div>
        </div>
      </div>

      {/*
        Phone version version
      */}
      <div className="flex flex-col px-[50px] mt-[100px] mb-[100px] lg:hidden">
        <div className="flex flex-row items-center justify-center mb-10">
          <div>
            <h2 className="text-cerise text-xs font-medium">
              {" "}
              {t.aboutUs.info1}
            </h2>
            <p className="text-white text-xs">{t.aboutUs.paragraph1} </p>
          </div>
        </div>
        <div className="flex flex-row gap-5">
          <div>
            <h2 className="text-cerise text-xs font-medium">
              {t.aboutUs.info2}
            </h2>
            <p className="text-white text-xs">{t.aboutUs.paragraph2}</p>
          </div>

          <div>
            <h2 className="text-cerise text-xs  font-medium">
              {t.aboutUs.info3}
            </h2>
            <p className="text-white text-xs">{t.aboutUs.paragraph3}</p>
          </div>
        </div>
      </div>

      <p className="text-cerise text-4xl font-normal uppercase text-center mt-[200px]">
        {t.aboutUs.subHeader}
      </p>

      <Team
        team={prTeam}
        reverse={false}
        teamPic="/img/groupPictures/prTeam.jpg"
        names={prNames}
        teamRoles={t.aboutUs.prTeamRoles}
        teamName={t.aboutUs.teamNames[0]}
      />

      <Team
        team={saleTeam}
        reverse={false}
        teamPic="/img/groupPictures/salesTeam.jpg"
        names={salesNames}
        teamRoles={t.aboutUs.salesTeamRoles}
        teamName={t.aboutUs.teamNames[1]}
      />

      <Team
        team={massTeam}
        reverse={false}
        teamPic=""
        names={massNames}
        teamRoles={t.aboutUs.massTeamRoles}
        teamName={t.aboutUs.teamNames[2]}
      />

      <Team
        team={econonmyTeam}
        reverse={true}
        teamPic="/img/groupPictures/ecoTeam.jpg"
        names={ecoNames}
        teamRoles={t.aboutUs.ecoTeamRoles}
        teamName={t.aboutUs.teamNames[3]}
      />

      <Team
        team={managers}
        reverse={false}
        teamPic="/img/groupPictures/bossTeam.jpg"
        names={managersName}
        teamRoles={t.aboutUs.ddaRoles}
        teamName={t.aboutUs.teamNames[4]}
      />
    </div>
  );
}
