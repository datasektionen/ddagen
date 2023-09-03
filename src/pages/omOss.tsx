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
  [imagesPath + "rikazPic.jpg", imagesPath + "maryPic.jpg"],
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
  [
    imagesPath + "mimmiPic.jpg",
    imagesPath + "dilanPic.jpg",
  ],
];

const ecoNames = [["Christofer Gärtner", "Melissa Arslan"]];

const managers = [[imagesPath + "axelPic.jpg", imagesPath + "johanPic.jpg"]];
const econonmyTeam = [
  [imagesPath + "christoferPic.jpg", imagesPath + "melissaPic.jpg"],
];

const managersName = [["Axel Johansson", "Johan Abdi"]];

const prNames = [
  ["Mathias Magnusson", "Olof", "Maria Tcyshkova"],
  ["Jakob Petterson", "Adam Egnell", "Anna Yang"],
  ["Rikaz Nismi", "Mary Abeysekera"],
];

const salesNames = [
  ["William Nordwall", "Linus Markström", "Vilmer"],
  ["Alex", "Roger", "Elin"],
  ["Toshide"],
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
      } flex mt-[100px] px-[20px] lg:px-[100px] flex-col lg:flex-row justify-center`}
    >
      <div className="flex flex-col">
        <img src={teamPic} className=""></img>
        <div className="bg-white/80 lg:bg-white  flex items-center justify-center h-full">
          <p className="text-4xl text-cerise font-bold">{teamName}</p>
        </div>
      </div>

      <div className=" lg:w-[1200px] bg-white/80 flex flex-col overflow-x-auto overflow-y-visible lg:h-[900px] lg:px-1 lg:py-10">
        {team.map((row, i) => (
          <div className="flex flex-row justify-center gap-2">
            {row.map((image, j) => (
              <div className="flex flex-col items-center justify-center">
                <img src={image} className="h-[150px] lg:h-auto lg:w-[150px] rounded-[20px]"></img>
                <p className="text-center text-xs lg:text-sm"> {names[i][j]}</p>
                <p className="text-center text-xs lg:text-sm text-darkblue">{teamRoles[i][j]}</p>
                <img
                  src="/img/linkedinIcon.svg"
                  className="justify-center h-[35px]"
                ></img>
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
      <div className="flex flex-row items-center justify-center px-[200px] hidden lg:block">
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

      {/*
        Phone version version
      */}
      <div className="flex flex-row items-center justify-center lg:hidden">
        <div className="px-[100px] mt-36 bg-[url('/img/grayKth.jpg')] bg-cover bg-no-repeat bg-center h-[150px]">
          
        </div>
      </div>
      <div className="flex flex-col px-[50px] mt-[100px] mb-[100px] lg:hidden">
            <div className="flex flex-row items-center justify-center mb-10">
              <div className="">
                <h2 className="text-cerise text-xs font-medium">
                  {" "}
                  {t.aboutUs.info1}
                </h2>
                <p className="text-white text-xs">{t.aboutUs.paragraph1} </p>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="">
                <h2 className="text-cerise text-xs font-medium">
                  {t.aboutUs.info2}
                </h2>
                <p className="text-white text-xs">{t.aboutUs.paragraph2}</p>
              </div>

              <div className="">
                <h2 className="text-cerise text-xs  font-medium">
                  {t.aboutUs.info3}
                </h2>
                <p className="text-white text-xs">{t.aboutUs.paragraph3}</p>
              </div>
            </div>
          </div>

      <div className="flex flex-row items-center justify-center px-[400px] hidden lg:block">
        <div className="px-[100px] mt-[100px] bg-[url('/img/groupPictures/projectGroup.jpg')] bg-cover bg-no-repeat bg-center h-[400px] w-full flex flex-row items-center justify-center">
          <p className="text-cerise text-8xl">{t.aboutUs.subHeader}</p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center px-[10px] lg:hidden">
        <div className="bg-[url('/img/groupPictures/projectGroup.jpg')] bg-cover bg-no-repeat bg-center items-center justify-center h-[200px] ">
          <p className="text-cerise text-7xl text-center">{t.aboutUs.subHeader}</p>
        </div>
        </div>
      
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
        reverse={true}
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
