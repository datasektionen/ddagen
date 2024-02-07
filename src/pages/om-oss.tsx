import { useLocale } from "@/locales";
import { useState } from "react";
import { create2DArrayWithValues } from "@/shared/array";

const imagesPath = "/img/projectGroup/p_";

function formatImagePath(name: string) {
  return imagesPath + name + ".jpg";
}

function stripLastName(name: string) {

  return name.split(" ")[0].toLocaleLowerCase();
}

const managersList = ["Toshihide Sakao", "William Nordwall"]
const prList = ["Felicia Murkes","Cissy Yang","Emilie Cao","Julia Potrus","Robert Rosenquist"]
const devList = ["Viktor Rönnbacka Nybäck", "Nils Malmberg", "Sofia Edvardsson", "Ivar Boqvist"]
const salesList = ["Linus Markström", "Leo Modahed", "Johanna Plant", "Ella Hedberg", "Mimmi Weng", "Samuel Flodin", "Oskar Furuhed", "Farhan Syed"]
const massList = ["Mortada Nasser", "Abhinav Sasikumar","Arman Montazeri","Max Berglund", "Adam Njegovanovic","Abdelrahman Aldaker"]
const ecoList = ["Oscar Witt","Roger Chen"]

const managersName = create2DArrayWithValues(2, 1, managersList);
const managers = create2DArrayWithValues(2, 1, managersList.map(stripLastName).map(formatImagePath))

const prName = create2DArrayWithValues(3, 2, prList);
const prTeam = create2DArrayWithValues(3, 2, prList.map(stripLastName).map(formatImagePath))

const devName = create2DArrayWithValues(3, 2, devList);
const devTeam = create2DArrayWithValues(3, 2, devList.map(stripLastName).map(formatImagePath))

const salesNames = create2DArrayWithValues(3, 3, salesList);
const saleTeam = create2DArrayWithValues(3, 3, salesList.map(stripLastName).map(formatImagePath))

const massNames = create2DArrayWithValues(3, 2, massList);
const massTeam = create2DArrayWithValues(3, 2, massList.map(stripLastName).map(formatImagePath))

const ecoNames = create2DArrayWithValues(2, 1, ecoList);
const econonmyTeam = create2DArrayWithValues(2, 1, ecoList.map(stripLastName).map(formatImagePath))



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
        <img src={teamPic} className="h-auto  lg:max-w-lg"></img>
        <div className="bg-white/80 lg:bg-white flex items-center justify-center h-full">
          <p className="text-4xl text-cerise font-bold lg:px-[100px] py-4">
            {teamName}
          </p>
        </div>
      </div>
      {/* 
      
      <div className=" pt-5 w-auto lg:w-[480px] xl:w-[700px]  bg-white/80 flex flex-col overflow-x-auto overflow-y-visible lg:py-10 gap-10">
        {team.map((row, i) => (
          <div className="flex flex-row gap-2 justify-center pb-3" key={row.toString()}>
            {row.map((image, j) => (
              <div className="flex flex-col" key={image != null ? image : "about_img"+(i*3+j).toString() }>
                <div className=" w-[90px] sm:w-[150px] md:w-[180px] lg:w-[140px] xl:w-[200px] ">
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
      */}
    </div>
  );
}

export default function AboutUs() {
  const t = useLocale();
  return (
    <div className="pt-[200px] pb-[150px] flex flex-col items-center">
      <h1 className="uppercase text-cerise text-5xl font-medium text-center">
        {" "}
        {t.aboutUs.header}
      </h1>
      <div className="flex justify-center mt-[100px] px-10">
        <img
          className="xl:w-[1500px] lg:w[900px]  rounded-3xl"
          src="/img/projectGroup/g_projectGroup.jpg"
        ></img>
      </div>
      {/*
        Desktop version
      */}
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
      <div className="flex flex-col px-[50px] mt-[50px] mb-[50px] lg:hidden">
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
      
      

      <p className="text-cerise text-4xl font-normal uppercase text-center mt-[150px]">
        {t.aboutUs.subHeader}
      </p>
      
      <Team
        team={managers}
        reverse={false}
        teamPic="/img/BOSSES.jpg"
        names={managersName}
        teamRoles={t.aboutUs.ddaRoles}
        teamName={t.aboutUs.teamNames[0]}
      />

      <div className="flex flex-row object-center">
        <Team
          team={prTeam}
          reverse={false}
          teamPic="/img/projectGroup/g_pr.jpg"
          names={prName}
          teamRoles={t.aboutUs.prTeamRoles}
          teamName={t.aboutUs.teamNames[1]}
          />

        <Team
          team={devTeam}
          reverse={false}
          teamPic="/img/projectGroup/g_dev.jpg"
          names={devName}
          teamRoles={t.aboutUs.devTeamRoles}
          teamName={t.aboutUs.teamNames[2]}
          />
      </div>
      <div className="flex flex-row">
        <Team
          team={saleTeam}
          reverse={false}
          teamPic="/img/projectGroup/g_sales.jpg"
          names={salesNames}
          teamRoles={t.aboutUs.salesTeamRoles}
          teamName={t.aboutUs.teamNames[3]}
        />

        <Team
          team={massTeam}
          reverse={false}
          teamPic="/img/projectGroup/g_mass.jpg"
          names={massNames}
          teamRoles={t.aboutUs.massTeamRoles}
          teamName={t.aboutUs.teamNames[4]}
        />
      </div>

      <div className="flex flex-row">
        <Team
          team={econonmyTeam}
          reverse={true}
          teamPic="/img/projectGroup/g_money.jpg"
          names={ecoNames}
          teamRoles={t.aboutUs.ecoTeamRoles}
          teamName={t.aboutUs.teamNames[5]}
        />
      </div>
      
    
      
    </div>
  );
}
