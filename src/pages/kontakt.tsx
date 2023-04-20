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
  const roles = [
    "D-DAGEN ANSVARIG",
    "D-DAGEN ANSVARIG",
    "PR-ANSVARIG",
    "MÄSSANSVARIG",
    "SÄLJANSVARIG",
    "EKONOMIANSVARIG",
  ];
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
    "maria.tsychova@ddagen.se",
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
    <div className="py-[150px] flex flex-col items-center">
      <h1 className="text-cerise text-5xl font-medium uppercase">
        {t.contact.header}
      </h1>

      <h1 className="mt-[200px] text-cerise  text-3xl font-normal uppercase">
        {t.contact.subheader1}
      </h1>
      <p className="px-[30px] sm:px-[0px] w-[280px] sm:w-[500px] mt-5 text-white">{t.contact.p1}</p>
      <h1 className="mt-[200px] text-cerise  text-3xl font-normal uppercase text-center">
        {t.contact.subheader2}
      </h1>
      {/*
            Project Leaders Section - 3 different layouts:
            2 Rows (> lg)
            3 Rows (sm< & <lg)
            6 Rows (< sm)
            Lazy implementation
        */}
      <div className="mt-[50px] flex flex-col ">
        {rows1.map((i, _) => (
          <div className="hidden lg:flex flex-row justify-between gap-10 px-[100px] mb-[50px]">
            {layout1[i].map((i, _) => (
              <div className="flex flex-col">
                <img src={images[i]}></img>
                <p className="px-[10px] text-cerise text-xl font-normal mt-5">
                  {names[i]}
                </p>
                <div className="py-[20px] px-[10px] rounded-[20px] mt-2 bg-slate-50 bg-opacity-20 border-cerise text-white">
                  <span className="block">{roles[i]}</span>
                  <span className="block">{mails[i]}</span>
                  <span className="block">{phones[i]}</span>
                </div>
              </div>
            ))}
          </div>
        ))}

        {rows2.map((i, _) => (
          <div className=" hidden lg:hidden sm:flex justify-center flex-row px-[50px] mb-[50px] gap-10">
            {layout2[i].map((i, _) => (
              <div className="flex flex-col">
                <img className="" src={images[i]}></img>
                <p className="w-[10px] px-[10px] text-cerise text-2xl font-normal mt-5">
                  {names[i]}
                </p>
                <div className="py-[20px] px-[10px]  rounded-[20px] mt-2 bg-slate-50 bg-opacity-20 border-cerise text-white text-sm">
                  <span className="block">{roles[i]}</span>
                  <span className="block">{mails[i]}</span>
                  <span className="block">{phones[i]}</span>
                </div>
              </div>
            ))}
          </div>
        ))}

        {rows3.map((i, _) => (
          <div className=" sm:hidden justify-center flex flex-row px-[30px] mb-[50px] gap-10">
            {layout3[i].map((i, _) => (
              <div className="flex flex-col">
                <img className="" src={images[i]}></img>
                <p className="w-[10px] px-[10px] text-cerise text-2xl font-normal mt-5">
                  {names[i]}
                </p>
                <div className="py-[20px] px-[10px]  rounded-[20px] mt-2 bg-slate-50 bg-opacity-20 border-cerise text-white text-sm">
                  <span className="block">{roles[i]}</span>
                  <span className="block">{mails[i]}</span>
                  <span className="block">{phones[i]}</span>
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
