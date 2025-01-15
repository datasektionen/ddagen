import { useLocale } from "@/locales";
import { useState, useRef} from "react";

const imagesPath = "/img/projectGroup/p_";

function formatImagePath(name: string) {
  return imagesPath + name + ".jpg";
}

function stripLastName(name: string) {
  return name.split(" ")[0].toLocaleLowerCase();
}

const managersName        = ["Max Berglund", "Mortada Nasser"]
const prNames             = ["Felicia Murkes","Cissy Yang","Emilie Cao","Julia Potrus","Robert Rosenquist"]
const devNames            = ["Viktor Rönnbacka Nybäck", "Nils Malmberg", "Sofia Edvardsson", "Ivar Boqvist"]
const salesNames          = ["Oskar Furuhed", "Leo Modahed", "Johanna Plant", "Ella Hedberg", "Mimmi Weng", "Samuel Flodin", "Oskar Furuhed", "Farhan Syed"]
const massNames           = ["Felicia Murkes", "Abhinav Sasikumar","Arman Montazeri","Max Berglund", "Adam Njegovanovic","Abdelrahman Aldaker"]
const ecoNames            = ["Oscar Witt","Roger Chen"]

const managersImages      = managersName.map(stripLastName).map(formatImagePath);
const prTeamImages        = prNames.map(stripLastName).map(formatImagePath);
const devTeamImages       = devNames.map(stripLastName).map(formatImagePath);
const saleTeamImages      = salesNames.map(stripLastName).map(formatImagePath);
const massTeamImages      = massNames.map(stripLastName).map(formatImagePath);
const econonmyTeamImages  = ecoNames.map(stripLastName).map(formatImagePath);




function Team({
  teamIndivudualImages: teamImages,
  teamPic,
  names,
  teamName,
  teamRoles,
}: {
  teamIndivudualImages: string[];
  teamPic: string;
  names: string[];
  teamName: string;
  teamRoles: string[];
}) {
  const collapseDiv = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className= "flex flex-col cursor-pointer group/card mb-8" onClick={toggleOpen}>
      <div className=" bg-white/80 rounded-3xl lg:rounded-l-3xl flex flex-col items-center ">
        <img src={teamPic} className="w-full h-auto rounded-t-3xl "></img>
        <div className=" flex items-center justify-center ">
          <p className="text-3xl text-cerise font-bold lg:px-[100px] py-4">
            {teamName}
          </p>
        </div>
      </div>
      
      <button className={` 
        w-full flex flex-col items-center select-none my-4
        duration-300 transition-all 
        opacity-0 translate-y-[-10px] 
        group-hover/card:opacity-100 group-hover/card:translate-y-0 
        ${isOpen ? 'opacity-100 translate-y-0' : ''}`}
      >
        <img src="\img\arrow-down.png" 
            className={`w-6 h-auto text-drop-shadow 
            transition-all duration-500
            ${isOpen ? 'rotate-180' : "rotate-0 "} `}>    
        </img>
      </button>
      
      <div ref={collapseDiv} className={`
            grid bg-white/20 backdrop-blur-md rounded-3xl overflow-hidden mt-5 
            transition-all duration-500 
            ${isOpen ? 'animate-auto-show p-4' : 'animate-auto-hidden'}`}
      >
        <div className={`grid grid-cols-2 justify-center justify-items-center gap-4 overflow-y-hidden`}>
          {teamImages.map((image, i) => (
            <div className="flex flex-col" key={image != null ? image : "about_img_"+(i).toString() }>
              <div className=" w-auto">
                <img src={image} className=" rounded-[20px]"></img>
                <div className="mt-2">
                  <p className="text-center text-yellow  text-sm md:text-lg font-medium text-drop-shadow">
                    {names[i]}
                  </p>
                  <p className="text-center text-xs sm:text-sm md:text-base font-medium text-cerise text-drop-shadow">
                    {teamRoles[i]}
                  </p>
                </div>
              </div>
            </div>
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
        {header}
      </h2>
      <p className="text-white md:text-lg text-xs">{body} </p>
    </div>
  );
};


export default function AboutUs() {
  const t = useLocale();
  return (
    <div className=" flex flex-col items-center pb-[150px]">
      <h1 className="uppercase text-cerise  text-5xl font-medium text-center pt-[200px] mb-36">
        {t.aboutUs.header}
      </h1>
      <div className="w-full lg:block xl:w-[1200px] lg:w-[1000px] lg:px-0 lg:mb-0 px-6 mb-3 ">
        <div className="flex flex-row items-center justify-center mb-10">
          <img className="rounded-3xl" src="/img/projectGroup/g_projectGroup.jpg"></img>
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
        
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 md:gap-8 gap-0 mt-0 lg:mt-12 ">
          <Team
            teamIndivudualImages={prTeamImages}
            teamPic="/img/projectGroup/g_pr.jpg"
            names={prNames}
            teamRoles={t.aboutUs.prTeamRoles}
            teamName={t.aboutUs.teamNames[1]}
          />
        
          <Team
            teamIndivudualImages={prTeamImages}
            teamPic="/img/projectGroup/g_pr.jpg"
            names={prNames}
            teamRoles={t.aboutUs.prTeamRoles}
            teamName={t.aboutUs.teamNames[1]}
            />

          <Team
            teamIndivudualImages={devTeamImages}
            teamPic="/img/projectGroup/g_dev.jpg"
            names={devNames}
            teamRoles={t.aboutUs.devTeamRoles}
            teamName={t.aboutUs.teamNames[2]}
            />
    
          <Team
            teamIndivudualImages={saleTeamImages}
            teamPic="/img/projectGroup/g_sales.jpg"
            names={salesNames}
            teamRoles={t.aboutUs.salesTeamRoles}
            teamName={t.aboutUs.teamNames[3]}
          />

          <Team
            teamIndivudualImages={massTeamImages}
            teamPic="/img/projectGroup/g_mass.jpg"
            names={massNames}
            teamRoles={t.aboutUs.massTeamRoles}
            teamName={t.aboutUs.teamNames[4]}
          />
          <Team
            teamIndivudualImages={econonmyTeamImages}
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
