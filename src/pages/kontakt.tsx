import { useLocale } from "@/locales";
export default function Contact() {
  const t = useLocale();
  const names = [
    "Axel Johansson",
    "Johan Abdi",
    "Maria Tsychkova",
    "Aziz Ali",
    "Vilmer Jonsson",
    "Melissa Arslan",
  ];
  const roles = t.contact.roles;
  const phones = [
    "076-038 56 51",
    "070-052 72 26",
    "070-524 18 82",
    "072-975 79 53",
    "072-588 77 74",
    "076-076 20 81",
  ];
  const images = [
    "/img/AxelPic.png",
    "/img/JohanPic.png",
    "/img/MariaPic.png",
    "/img/AzizPic.png",
    "/img/VilmerPic.png",
    "/img/MelissaPic.png",
  ];
  const mails = [
    "ansvarig@ddagen.se",
    "ansvarig@ddagen.se",
    "maria.tsychkova@ddagen.se",
    "aziz.ali@ddagen.se",
    "vilmer.jonsson@ddagen.se",
    "melissa.arslan@ddagen.se",
  ];
  const rows1 = [0, 1];
  const layout1 = [
    [0, 1, 2],
    [3, 4, 5],
  ];
  const rows2 = [0, 1, 2];
  const layout2 = [
    [0, 1],
    [2, 3],
    [4, 5],
  ];
  const rows3 = [0, 1, 2, 3, 4, 5];
  const layout3 = [[0], [1], [2], [3], [4], [5]];

  return (
    <div className="pt-[200px] pb-[150px] flex flex-col items-center">
      <h1 className="text-cerise text-5xl font-medium uppercase">
        {t.contact.header}
      </h1>
      <div className="flex flex-col-reverse md:flex-row mt-[100px] justify-center px-[30px] sm:px-[0px] gap-[50px] xl:pl-[0px] xl:gap-[120px] md:items-center ">
        <div className="px-[15px] md:px-0 sm:w-[500px] md:w-[250px] lg:w-[300px] text-left">
          <h1 className="text-cerise text-4xl font-normal uppercase"> {t.contact.salesHeader}</h1>
          <br/>
          <p className="text-white text-lg">{t.contact.p1}</p>
          <br/>
          <a className="block text-cerise" href="mailto:sales@ddagen.se">sales@ddagen.se</a>
        </div>
        <img className="sm:h-[350px] md:h-[250px] lg:h-[300px] xl:h-[400px]" src="/img/SaleGroupPic.png"></img>
      </div>

      <div className="flex flex-col md:flex-row mt-[100px] justify-center px-[30px] sm:px-[0px] gap-[50px] xl:pr-[0px] xl:gap-[120px] md:items-center ">
        <img className="sm:h-[350px] md:h-[250px] lg:h-[300px] xl:h-[400px]" src="/img/BOSSES.png"></img>
        <div className="px-[15px] md:px-0 sm:w-[500px] md:w-[250px] lg:w-[300px] text-left">
          <h1 className="text-cerise text-4xl font-normal uppercase"> D-DAGEN</h1>
          <h1 className="text-cerise text-4xl font-normal uppercase"> {t.contact.bossesHeader}</h1>
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
      <h1 className="mt-[150px] text-cerise  text-4xl font-normal uppercase text-center">
        {t.contact.subheader2}
      </h1>
      <div className="mt-[50px] flex flex-col ">
        {rows1.map((i, _) => (
          <div className="hidden lg:flex flex-row justify-between gap-10 px-[100px] mb-[50px]" key={i}>
            {layout1[i].map((i, _) => (
              <div className="flex flex-col" key={i}>
                <img src={images[i]}></img>
                <p className="px-[10px] text-cerise text-xl font-normal mt-5">
                  {names[i]}
                </p>
                <div className="py-[20px] px-[10px] rounded-[20px] mt-2 bg-slate-50 bg-opacity-20 border-cerise text-white">
                  
                  <span className="block">{roles[i]}</span>
                  <a    className="block" href={"mailto:" + mails[i]} >{mails[i]}</a>
                  <a    className="block" href={"tel:" + phones[i]} >{phones[i]}</a>
                </div>
              </div>
            ))}
          </div>
        ))}

        {rows2.map((i, _) => (
          <div className=" hidden lg:hidden sm:flex justify-center flex-row px-[50px] mb-[50px] gap-10" key={i}>
            {layout2[i].map((i, _) => (
              <div className="flex flex-col" key={i}>
                <img className="" src={images[i]}></img>
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
          <div className=" sm:hidden justify-center flex flex-row px-[30px] mb-[50px] gap-10" key={i}>
            {layout3[i].map((i, _) => (
              <div className="flex flex-col" key={i}>
                <img className="" src={images[i]}></img>
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
  );
}
