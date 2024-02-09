import { useLocale } from "@/locales";
export default function Contact() {
  const t = useLocale();
  const names = [
    "Toshihide Sakao",
    "William Nordwall",
    "Felicia Murkes", 
    "Viktor Rönnbacka ",
    "Mortada Nasser", 
    "Linus Markström", 
    "Oscar Witt", 
  ];
  const roles = t.contact.roles;
  const phones = [
    "072-889 52 83",
    "070-338 35 92",
    "076-715 50 85",
    "070-100 70 59", 
    "072-044 01 44", 
    "070-517 72 78", 
    "070-351 90 99",
  ];
  const images = [
    "/img/projectGroup/p_toshihide.jpg",
    "/img/projectGroup/p_william.jpg",
    "/img/projectGroup/p_felicia.jpg", 
    "/img/projectGroup/p_viktor.jpg", 
    "/img/projectGroup/p_mortada.jpg", 
    "/img/projectGroup/p_linus.jpg", 
    "/img/projectGroup/p_oscar.jpg",
    "/img/projectGroup/p_oscar.jpg",
    "/img/projectGroup/p_oscar.jpg",
    "/img/projectGroup/p_oscar.jpg",
  ];
  const mails = [
    "ansvarig@ddagen.se",
    "ansvarig@ddagen.se",
    "felicia.murkes@ddagen.se", 
    "viktor.ronnbacka@ddagen.se", 
    "mortada.nasser@ddagen.se", 
    "linus.markstrom@ddagen.se", 
    "oscar.witt@ddagen.se",
  ];
  const rows1 = [0, 1, 2];
  const layout1 = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ];
  const rows2 = [0, 1, 2, 3];
  const layout2 = [
    [0, 1],
    [2, 3],
    [4, 5],
    [6, 7]
  ];
  const rows3 = [0, 1, 2, 3, 4, 5, 6];
  const layout3 = [[0], [1], [2], [3], [4], [5], [6]];


  return (
    <div className="pb-[150px] flex flex-col items-center ">
      <div className=" xl:w-[1200px] lg:w-[1000px] w-full ">
        <h1 className="text-cerise text-5xl pt-[200px] mb-36  font-medium uppercase text-center ">
          {t.contact.header}
        </h1>
        <div className="flex flex-col-reverse mb-36  md:flex-row justify-center px-6 sm:px-[0px] gap-12 xl:pl-[0px] xl:gap-[120px] md:items-center ">
          <div className="px-[15px] md:px-0 sm:w-[500px] md:w-[250px] lg:w-[300px] text-left">
            <h1 className="text-cerise text-2xl md:text-4xl font-normal uppercase"> {t.contact.salesHeader}</h1>
            <br/>
            <p className="text-white text-lg">{t.contact.p1}</p>
            <br/>
            <a className="block text-cerise" href="mailto:sales@ddagen.se">sales@ddagen.se</a>
          </div>
          <img className="sm:h-[350px] md:h-[250px] lg:h-[300px] xl:h-[400px] grayscale" src="/img/projectGroup/g_sales.jpg"></img>
        </div>

        <div className="flex flex-col md:flex-row mb-36 justify-center px-6 sm:px-[0px] gap-12 xl:pr-[0px] xl:gap-[120px] md:items-center ">
          <img className="sm:h-[350px] md:h-[250px] lg:h-[300px] xl:h-[400px] grayscale " src="/img/BOSSES.jpg"></img>
          <div className="px-[15px] md:px-0 sm:w-[500px] md:w-[250px] lg:w-[300px] text-left">
            <h1 className="text-cerise text-2xl md:text-4xl font-normal uppercase"> D-DAGEN</h1>
            <h1 className="text-cerise text-2xl md:text-4xlfont-normal uppercase"> {t.contact.bossesHeader}</h1>
            <br/>
            <p className="text-white mt-[0px] text-lg">{t.contact.p2}</p>
            <br/>
            <a className="block text-cerise" href="mailto:ansvarig@ddagen.se">ansvarig@ddagen.se</a>
          </div>
        </div>

        {/*
              Project Leaders Section - 3 different layouts:
              2 Rows (> lg)
              3 Rows (sm< & <lg)
              6 Rows (< sm)
              Lazy implementation
        */}
        
        
        <h1 className="mt-[150px] text-cerise text-2xl lg:text-4xl font-bold uppercase text-center">
          {t.contact.subheader2}
        </h1>
        <div className="mt-12 flex flex-col ">
          {rows1.map((i, _) => (
            <div className="hidden lg:flex flex-row justify-between gap-10 px-[100px] mb-12" key={i}>
              {/** Where we use some funky indexing to ensure the seventh person is centerd but without the design breaking and the data still being correct*/}
              {layout1[i].map((i, _) => (
                <div className="flex flex-col" key={i} style={{ visibility: (i > 7 || i == 6) ? 'hidden' : 'visible' }}> 
                  <img className="grayscale w-full" src={images[i]} ></img>
                  <p className="px-[10px] text-cerise text-xl font-normal mt-5">
                    {names[(i < 7 ? i : i-1 )]}
                  </p>
                  <div className="py-[20px] px-[10px] rounded-[20px] mt-2 bg-slate-50 bg-opacity-20 border-cerise text-white">
                    
                    <span className="block">{roles[(i < 7 ? i : i-1 )]}</span>
                    <a    className="block" href={"mailto:" + mails[ (i < 7 ? i : i-1 ) ]} >{mails[(i < 7 ? i : i-1 )]}</a> {/** Funky indexing*/}
                    <a    className="block" href={"tel:" + phones[(i < 7 ? i : i-1 )]} >{phones[(i < 7 ? i : i-1 )]}</a>  {/** -||- */}
                  </div>
                </div>
              ))}
            </div>
          ))}

          {rows2.map((i, _) => (
            <div className=" hidden lg:hidden sm:flex justify-center flex-row px-12 mb-12 gap-10" key={i}>
              {layout2[i].map((i, _) => (
                <div className="flex flex-col" key={i} style={{ visibility: i > 6 ? 'hidden' : 'visible' }}> {/** Cheat to ensure even design*/}
                  <img className="grayscale" src={images[i]}></img>
                  <p className="w-[10px] px-[10px] text-cerise text-2xl font-normal mt-5">
                    {names[i]}
                  </p>
                  <div className="py-[20px] px-[10px]  rounded-[20px] mt-2 bg-slate-50 bg-opacity-20 border-cerise text-white text-sm">
                    <span className="block">{roles[i]}</span>
                    <a    className="block" href={"mailto:" + mails[i]} >{mails[i]}</a>
                    <a    className="block" href={"tel:" + phones[i]} >{phones[i]}</a>
                  </div>
                </div>
              ))}
            </div>
          ))}

          {rows3.map((i, _) => (
            <div className=" sm:hidden justify-center flex flex-row px-6 px-12 gap-10" key={i}>
              {layout3[i].map((i, _) => (
                <div className="flex flex-col" key={i}>
                  <img className="grayscale" src={images[i]}></img>
                  <p className="w-[10px] px-[10px] text-cerise text-2xl font-normal mt-5">
                    {names[i]}
                  </p>
                  <div className="py-[20px] px-[10px]  rounded-[20px] mt-2 bg-slate-50 bg-opacity-20 border-cerise text-white text-sm">
                    <span className="block">{roles[i]}</span>
                    <a    className="block" href={"mailto:" + mails[i]} >{mails[i]}</a>
                    <a    className="block" href={"tel:" + phones[i]} >{phones[i]}</a>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div></div>
      </div>
    </div> 
    
  );
}
