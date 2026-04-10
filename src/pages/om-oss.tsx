import { useLocale } from "@/locales";
import { useState, useRef} from "react";
import { NextSeo } from 'next-seo';

const managers = [
  { name: "Didzis Urtnas", image: "/img/projectGroup/p_didde.png" },
  { name: "Oliver Zhou", image: "/img/projectGroup/p_oliver.png" },
];

const prTeam = [
  { name: "Abdelrahman Aldaker", image: "/img/projectGroup/p_abdelrahman.png" },
  { name: "Amar Ibrahim", image: "/img/projectGroup/p_amar.png" },
  { name: "Sofia Hulth", image: "/img/projectGroup/p_sofia.png" },
  { name: "Ivar Petit", image: "/img/projectGroup/p_ivar.png" },
  { name: "Sibell Israelsson", image: "/img/projectGroup/p_sibell.png" },
];

const devTeam = [
  { name: "David Björklund", image: "/img/projectGroup/p_david.png" },
  { name: "Zimon Moudi", image: "/img/projectGroup/p_zimon.png" },
  { name: "Kajus Sirvinskas", image: "/img/projectGroup/p_kajus.png" },
  { name: "Oscar Eriksson", image: "/img/projectGroup/p_oscar.png" },
];

const salesTeam = [
  { name: "Josef Behnam", image: "/img/projectGroup/p_josef.png" },
  { name: "Sean Zishend", image: "/img/projectGroup/p_sean.png" },
  { name: "David Nilsson", image: "/img/projectGroup/p_davidN.png" },
  { name: "Hedda Fahlin", image: "/img/projectGroup/p_hedda.png" },
  { name: "Husein Hassan", image: "/img/projectGroup/p_husein.png" },
  { name: "Louise Engbrink", image: "/img/projectGroup/p_louise.png" },
  { name: "Yenli Oh", image: "/img/projectGroup/p_yenli.png" },
  { name: "Oliver Haux", image: "/img/projectGroup/p_oliverH.png" },
];

const massTeam = [
  { name: "Elias Rosberg", image: "/img/projectGroup/p_elias.png" },
  { name: "Emanuel Malki", image: "/img/projectGroup/p_emanuel.png" },
  { name: "Daniel Svensson", image: "/img/projectGroup/p_daniel.png" },
  { name: "Elsa Illerström", image: "/img/projectGroup/p_elsa.png" },
  { name: "Tingyuan Hu", image: "/img/projectGroup/p_ting.png" },
  { name: "Theodor Laséen Kuhlström", image: "/img/projectGroup/p_theodor.png" },
];

const economyTeam = [
  { name: "Anton Jansson", image: "/img/projectGroup/p_anton.png" },
  { name: "Theodor Fritsch", image: "/img/projectGroup/p_theo.png" },
  { name: "Oskar Furuhed", image: "/img/projectGroup/p_oskar.png" },
];

const managersImages      = managers.map((member) => member.image);
const prTeamImages        = prTeam.map((member) => member.image);
const devTeamImages       = devTeam.map((member) => member.image);
const saleTeamImages      = salesTeam.map((member) => member.image);
const massTeamImages      = massTeam.map((member) => member.image);
const econonmyTeamImages  = economyTeam.map((member) => member.image);

const managersName        = managers.map((member) => member.name);
const prNames             = prTeam.map((member) => member.name);
const devNames            = devTeam.map((member) => member.name);
const salesNames          = salesTeam.map((member) => member.name);
const massNames           = massTeam.map((member) => member.name);
const ecoNames            = economyTeam.map((member) => member.name);




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
  const seoContent = {
    sv: {
      title: "För Studenter - Träffa IT-företag & Skapa Karriärmöjligheter",
      description: "D-Dagen är Datasektionens årliga arbetsmarknadsdag för IT- och datastudenter vid KTH. Delta den 8 oktober på KTH Campus Valhallavägen och nätverka med ledande företag inom techbranschen. Boka kontaktsamtal, få karriärtips och engagera dig som dagspersonal för unika möjligheter!",
      url: "https://ddagen.se/förstudenter",
    },
    en: {
      title: "For Students - Meet Top IT Companies & Boost Your Career",
      description: "D-Dagen is the annual career fair for IT and computer science students at KTH. Join us on October 8 at KTH Campus Valhallavägen to connect with leading tech companies, book one-on-one career meetings, and explore job opportunities. Get involved as event staff for valuable experience and networking!",
      url: "https://ddagen.se/en/förstudenter",
    },
  };

  const { title, description, url } = seoContent[t.locale as "sv" | "en"];
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          url,
          title,
          description
        }}
        additionalMetaTags={[
          {
            name: 'robots',
            content: 'index, follow'
          }
        ]}
      />
      <div className=" flex flex-col items-center pb-[150px]">
        <h1 className="uppercase text-cerise  text-5xl font-medium text-center pt-[110px] lg:pt-[140px] mb-16">
          {t.aboutUs.header}
        </h1>
        <div className="w-full lg:block xl:w-[1200px] lg:w-[1000px] lg:px-0 lg:mb-0 px-6 mb-3 ">
          <div className="flex flex-row items-center justify-center mb-10">
            <img className="rounded-3xl" src="/img/projectGroup/g_projectGroup.png"></img>
          </div>
        
          <div className="flex flex-col">
            <div className="flex flex-row items-center justify-center rounded-lg p-2 mb-10 bg-darkblue bg-opacity-90 max-w-4xl">
              <H2AndParagraph header={t.aboutUs.info1} body={t.aboutUs.paragraph1}/>
            </div>

            <div className="flex md:flex-row flex-col lg:gap-10 gap-5 rounded-lg p-2 mb-10 bg-darkblue bg-opacity-90">
              <H2AndParagraph header={t.aboutUs.info2} body={t.aboutUs.paragraph2}/>
              <H2AndParagraph header={t.aboutUs.info3} body={t.aboutUs.paragraph3}/>
            </div>
          </div>

          <p className="text-cerise text-2xl md:text-4xl font-bold uppercase text-center lg:mt-[150px] mt-[100px]  ">
            {t.aboutUs.subHeader}
          </p>
          
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 md:gap-8 gap-0 mt-0 lg:mt-12 ">
            <Team
              teamIndivudualImages={managersImages}
              teamPic="/img/projectGroup/g_dda.png"
              names={managersName}
              teamRoles={t.aboutUs.ddaRoles}
              teamName={t.aboutUs.teamNames[0]}
            />
          
            <Team
              teamIndivudualImages={prTeamImages}
              teamPic="/img/projectGroup/g_pr.png"
              names={prNames}
              teamRoles={t.aboutUs.prTeamRoles}
              teamName={t.aboutUs.teamNames[1]}
              />

            <Team
              teamIndivudualImages={devTeamImages}
              teamPic="/img/projectGroup/g_dev.png"
              names={devNames}
              teamRoles={t.aboutUs.devTeamRoles}
              teamName={t.aboutUs.teamNames[2]}
              />
      
            <Team
              teamIndivudualImages={saleTeamImages}
              teamPic="/img/projectGroup/g_sales.png"
              names={salesNames}
              teamRoles={t.aboutUs.salesTeamRoles}
              teamName={t.aboutUs.teamNames[3]}
            />

            <Team
              teamIndivudualImages={massTeamImages}
              teamPic="/img/projectGroup/g_mass.png"
              names={massNames}
              teamRoles={t.aboutUs.massTeamRoles}
              teamName={t.aboutUs.teamNames[4]}
            />
            <Team
              teamIndivudualImages={econonmyTeamImages}
              teamPic="/img/projectGroup/g_ekom.png"
              names={ecoNames}
              teamRoles={t.aboutUs.ecoTeamRoles}
              teamName={t.aboutUs.teamNames[5]}
            />
          </div>
        </div>     
      </div>
    </>
  );
}
