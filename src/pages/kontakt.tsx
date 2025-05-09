import { useLocale } from "@/locales";
import { NextSeo } from 'next-seo';
export default function Contact() {
  const t = useLocale();
  const names = [
    "Mortada Nasser",
    "Max Berglund",
    "Julia Potrus", 
    "Theodor Fritsch",
    "Felicia Murkes", 
    "Oskar Furuhed", 
    "Melissa Arslan", 
  ];
  const roles = t.contact.roles;
  const phones = [
    "072-044 01 44",
    "076-133 08 99",
    "072-040 66 69",
    "070-840 25 57", 
    "076-715 50 85", 
    "072-035 80 39", 
    "076-076 20 81",
  ];
  const images = [
    "/img/projectGroup/p_mortada.jpg",
    "/img/projectGroup/p_max.jpg",
    "/img/projectGroup/p_julia.jpg", 
    "/img/projectGroup/p_theodor.jpg", 
    "/img/projectGroup/p_felicia.jpg", 
    "/img/projectGroup/p_oskar.jpg", 
    "/img/projectGroup/p_melissa.jpg",
    "/img/projectGroup/p_melissa.jpg",
    "/img/projectGroup/p_melissa.jpg",
  ];
  const mails = [
    "ansvarig@ddagen.se",
    "ansvarig@ddagen.se",
    "julia.potrus@ddagen.se", 
    "theodor.fritsch@ddagen.se", 
    "felicia.murkes@ddagen.se", 
    "oskar.furuhed@ddagen.se", 
    "melissa.arslan@ddagen.se",
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


  const seoContent = {
    sv: {
      title: "Kontakt - Hör Av Dig till Oss",
      description: "Har du förslag på evenemang eller aktiviteter för studenterna på Konglig Datasektionen? Eller har du frågor om företagspaket? Kontakta oss för mer information och för att diskutera hur vi kan samarbeta för att göra D-Dagen 2025 till en succé!",
      url: "https://ddagen.se/kontakt",
    },
    en: {
      title: "Contact - Get in Touch with Us",
      description: "Do you have ideas for events or activities for students at the Royal Institute of Technology? Or do you have questions about company packages? Contact us for more information and to discuss how we can collaborate to make D-Dagen 2025 a success!",
      url: "https://ddagen.se/en/kontakt",
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
      <div className="pb-[150px] flex flex-col items-center ">
        <div className=" xl:w-[1200px] lg:w-[1000px] w-full ">
          <h1 className="text-cerise text-5xl pt-[110px] lg:pt-[140px] mb-16 font-medium uppercase text-center ">
            {t.contact.header}
          </h1>
          <div className={`flex flex-col-reverse mb-36  md:flex-row justify-center 
              px-6 sm:px-[0px] gap-12 xl:pl-[0px] 
              xl:gap-[120px] md:items-center rounded-lg
              bg-darkblue bg-opacity-90`}>
            <div className="px-[15px] md:px-0 sm:w-[500px] md:w-[250px] lg:w-[360px] text-left">
              <h1 className="text-cerise text-2xl md:text-4xl font-normal uppercase"> {t.contact.salesHeader}</h1>
              <br/>
              <p className="text-white text-lg">{t.contact.p1}</p>
              <br/>
              <a className="block text-yellow" href="mailto:sales@ddagen.se">sales@ddagen.se</a>
            </div>
            <img className="sm:h-[350px] md:h-[250px] lg:h-[300px] xl:h-[400px]" src="/img/projectGroup/g_sales.jpg"></img>
          </div>

          <div className="flex flex-col md:flex-row mb-36 justify-center px-6 sm:px-[0px] gap-12 xl:pr-[0px] xl:gap-[120px] md:items-center bg-darkblue bg-opacity-90 sm:bg-opacity-0">
            <img className="sm:h-[350px] md:h-[250px] lg:h-[300px] xl:h-[400px] " src="/img/projectGroup/g_dda.jpg"></img>
            <div className="px-[15px] md:px-0 sm:w-[500px] md:w-[250px] lg:w-[300px] text-left rounded-lg bg-darkblue bg-opacity-0 sm:bg-opacity-90">
              <h1 className="text-cerise text-2xl md:text-4xl font-normal uppercase"> D-DAGEN</h1>
              <h1 className="text-cerise text-2xl md:text-4xlfont-normal uppercase"> {t.contact.bossesHeader}</h1>
              <br/>
              <p className="text-white mt-[0px] text-lg">{t.contact.p2}</p>
              <br/>
              <a className="block text-yellow" href="mailto:ansvarig@ddagen.se">ansvarig@ddagen.se</a>
            </div>
          </div>

          {/*
                Project Leaders Section - 3 different layouts:
                2 Rows (> lg)
                3 Rows (sm< & <lg)
                6 Rows (< sm)
                Lazy implementation
          */}
          
          <div className="flex justify-center mt-[150px]">
            <h2 className="text-cerise text-2xl lg:text-4xl font-bold uppercase text-center w-auto p-2 rounded-lg bg-darkblue bg-opacity-75">
              {t.contact.subheader2}
            </h2>
          </div>
          <div className="mt-12 flex flex-col">
            {rows1.map((i, _) => (
              <div className="hidden lg:flex flex-row justify-between gap-10 px-[100px] mb-12" key={i}>
                {/** Where we use some funky indexing to ensure the seventh person is centerd but without the design breaking and the data still being correct*/}
                {layout1[i].map((i, _) => (
                  <div className="flex flex-col" key={i} style={{ visibility: (i > 7 || i == 6) ? 'hidden' : 'visible' }}> 
                    <img className=" w-full" src={images[i]} ></img>
                    <div className="py-[20px] px-[10px] rounded-lg mt-2 bg-verydarkblue bg-opacity-75 border-cerise text-white ">
                      <p className="text-cerise text-xl font-normal mb-2">
                        {names[(i < 7 ? i : i-1 )]}
                      </p>
                      
                      <span className="block">{roles[(i < 7 ? i : i-1 )]}</span>
                      <a    className="block" href={"mailto:" + mails[ (i < 7 ? i : i-1 ) ]} >{mails[(i < 7 ? i : i-1 )]}</a> {/** Funky indexing*/}
                      <a    className="block" href={"tel:" + phones[(i < 7 ? i : i-1 )]} >{phones[(i < 7 ? i : i-1 )]}</a>  {/** -||- */}
                    </div>
                  </div>
                ))}
              </div>
            ))}

            {rows2.map((i, _) => (
              <div className=" hidden lg:hidden sm:flex justify-center flex-row px-12 mb-12 gap-10 mb-8" key={i}>
                {layout2[i].map((i, _) => (
                  <div className="flex flex-col" key={i} style={{ visibility: i > 6 ? 'hidden' : 'visible' }}> {/** Cheat to ensure even design*/}
                    <img src={images[i]}></img>
                    <div className="py-[20px] px-[10px]  rounded-lg mt-2 bg-verydarkblue bg-opacity-75 border-cerise text-white text-sm">
                      <p className="text-cerise text-2xl font-normal mb-2">
                        {names[i]}
                      </p>
                      <span className="block">{roles[i]}</span>
                      <a    className="block" href={"mailto:" + mails[i]} >{mails[i]}</a>
                      <a    className="block" href={"tel:" + phones[i]} >{phones[i]}</a>
                    </div>
                  </div>
                ))}
              </div>
            ))}

            {rows3.map((i, _) => (
              <div className=" sm:hidden justify-center flex flex-row px-6 gap-10 mb-8" key={i}>
                {layout3[i].map((i, _) => (
                  <div className="flex flex-col" key={i}>
                    <img src={images[i]}></img>
                    <div className="py-[20px] px-[10px] rounded-lg mt-2 bg-verydarkblue bg-opacity-75 border-cerise text-white text-sm">
                      <p className="text-cerise text-2xl font-normal mb-2">
                        {names[i]}
                      </p>
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
    </>
  );
}
