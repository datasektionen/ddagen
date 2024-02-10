import { useLocale } from "@/locales";
import { useState, useEffect, useRef, use, useReducer } from "react";
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
  teamPic,
  names,
  teamName,
  teamRoles,
}: {
  team: string[][];
  teamPic: string;
  names: string[][];
  teamName: string;
  teamRoles: string[][];
}) {
  const numMembers = team.length - 1;
  const numRows = 1+Math.ceil(numMembers / 2);
  const arr = Array.from({ length: numRows }, (_, index) => index);

  const collapseDiv = useRef<HTMLDivElement>(null);
  const scrollAnchor = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className= "flex flex-col cursor-pointer group/card" onClick={toggleOpen}>
      <div ref={scrollAnchor} className=" bg-white/80 rounded-3xl lg:rounded-l-3xl flex flex-col items-center ">
        <img src={teamPic} className="h-auto rounded-t-3xl w-full"></img>
        <div className=" flex items-center justify-center ">
          <p className="text-3xl text-cerise font-bold lg:px-[100px] py-4">
            {teamName}
          </p>
        </div>
      </div>
      
      <button className={` 
        duration-300 transition-all 
        opacity-0 translate-y-[-10px] 
        group-hover/card:opacity-100 group-hover/card:translate-y-0 
        my-4 w-full flex flex-col items-center select-none
        ${isOpen ? 'opacity-100 translate-y-0' : ''}`}>
        <img src="\img\arrow-down.png" 
            className={`w-6 h-auto text-drop-shadow 
            transition-all duration-500
            ${isOpen ? 'rotate-180' : "rotate-0 "} `}></img>
      </button>
      
      <div ref={collapseDiv} className={` 
            transition-all duration-500 
            ${isOpen ? 'animate-auto-show p-4' : 'animate-auto-hidden'} 
            grid mt-5 bg-white/20 backdrop-blur-md  rounded-3xl overflow-hidden`}>
        <div className={`grid grid-cols-2 justify-center justify-items-center gap-4 overflow-y-hidden`}>
          {team.map((row, i) => (
              row.map((image, j) => (
                <div className="flex flex-col" key={image != null ? image : "about_img"+(i*3+j).toString() }>
                  <div className=" w-auto">
                    <img src={image} className=" rounded-[20px]"></img>
                    <div className="mt-2">
                      <p className="text-center text-yellow  text-sm md:text-lg font-medium text-drop-shadow">
                        {" "}
                        {names[i][j]}
                      </p>
                      <p className="text-center text-xs sm:text-sm md:text-base font-medium text-cerise text-drop-shadow">
                        {teamRoles[i][j]}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            // </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}

/* This is a totally pointless component, but I just had to try */
function H2AndParagraph({header,body,}: { header: string, body: string}) {
  return(
    <div>
      <h2 className="text-cerise md:text-xl text-xs font-medium">
        {" "}
        {header}
      </h2>
      <p className="text-white md:text-lg text-xs">{body} </p>
    </div>
  );
};


export default function AboutUs() {
  const t = useLocale();
  return (
    <div className="pb-[150px] flex flex-col items-center ">
      <h1 className="uppercase text-cerise pt-[200px] mb-36 text-5xl font-medium text-center">
        {" "}
        {t.aboutUs.header}
      </h1>
      <div className="lg:block xl:w-[1200px] lg:w-[1000px] lg:px-0 lg:mb-0 px-6 mb-3 w-full">
          <div className="flex flex-row items-center justify-center mb-10">
            <img
              className="rounded-3xl "
              src="/img/projectGroup/g_projectGroup.jpg"
            ></img>
        </div>
      
        <div className="flex flex-col">
          <div className="flex flex-row items-center justify-center mb-10">
            <H2AndParagraph header={t.aboutUs.info1} body={t.aboutUs.paragraph1}/>
          </div>
          <div className="flex md:flex-row flex-col lg:gap-10 gap-5">
            <H2AndParagraph header={t.aboutUs.info2} body={t.aboutUs.paragraph2}/>
            <H2AndParagraph header={t.aboutUs.info3} body={t.aboutUs.paragraph3}/>
          </div>
        </div>
        <p className="text-cerise text-2xl md:text-4xl font-bold uppercase text-center lg:mt-[150px] mt-[100px]  ">
          {t.aboutUs.subHeader}
        </p>
        
        <div className=" grid grid-cols-1 lg:grid-cols-2 md:gap-8 gap-0 mt-0 lg:mt-12 w-full">
          <Team
            team={managers}
            teamPic="/img/projectGroup/g_dda.jpg"
            names={managersName}
            teamRoles={t.aboutUs.ddaRoles}
            teamName={t.aboutUs.teamNames[0]}
          />

        
          <Team
            team={prTeam}
            teamPic="/img/projectGroup/g_pr.jpg"
            names={prName}
            teamRoles={t.aboutUs.prTeamRoles}
            teamName={t.aboutUs.teamNames[1]}
            />

          <Team
            team={devTeam}
            teamPic="/img/projectGroup/g_dev.jpg"
            names={devName}
            teamRoles={t.aboutUs.devTeamRoles}
            teamName={t.aboutUs.teamNames[2]}
            />
    
          <Team
            team={saleTeam}
            teamPic="/img/projectGroup/g_sales.jpg"
            names={salesNames}
            teamRoles={t.aboutUs.salesTeamRoles}
            teamName={t.aboutUs.teamNames[3]}
          />

          <Team
            team={massTeam}
            teamPic="/img/projectGroup/g_mass.jpg"
            names={massNames}
            teamRoles={t.aboutUs.massTeamRoles}
            teamName={t.aboutUs.teamNames[4]}
          />
          <Team
            team={econonmyTeam}
            teamPic="/img/projectGroup/g_money.jpg"
            names={ecoNames}
            teamRoles={t.aboutUs.ecoTeamRoles}
            teamName={t.aboutUs.teamNames[5]}
          />
        </div>
      </div>
    
      
    </div>
  );
}
