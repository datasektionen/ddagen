import { useLocale } from "@/locales";

export default function Contact() {
  const t = useLocale();
  const row1Names = ["Axel Johansson", "Johan Abdi", "Maria Tsychkova"];
  const row2Names = ["Aziz Ali", "Vilmer Jonsson", "Melissa Arslan"];
  const row1Roles = ["D-DAGEN ANSVARIG", "D-DAGEN ANSVARIG", "PR-ANSVARIG"];
  const row2Roles = ["MÄSSANSVARIG", "SÄLJANSVARIG", "EKONOMIANSVARIG"];
  const row1Phones = ["076-038 56 51", "070-052 72 26", "070-524 18 82"];
  const row2Phones = ["072-975 79 53", "072-588 77 74", "076-076 20 81"];
  const row1Images = ["/img/AxelPic.png", "/img/JohanPic.png", "/img/MariaPic.png"];
  const row2Images = ["/img/AzizPic.png", "/img/VilmerPic.png", "/img/MelissaPic.png"];
  const row1Mails = ["ansvarig@ddagen.se", "ansvarig@ddagen.se", "maria.tsychova@ddagen.se"];
  const row2Mails = ["aziz.ali@ddagen.se", "vilmer.jonsson@ddagen.se", "melissa.arslan@ddagen.se"];

  return (
    <div className="py-[150px] flex flex-col items-center">
      
        <h1 className="text-cerise  text-4xl font-medium uppercase">
          {t.contact.header}
        </h1>   
     
        <h1 className="mt-[200px] text-cerise  text-3xl font-normal uppercase">
          {t.contact.subheader1}
        </h1>
        <p className="w-[500px] mt-5 text-white">{t.contact.p1}</p>
        <h1 className="mt-[200px] text-cerise  text-3xl font-normal uppercase">
          {t.contact.subheader2}
        </h1>
        <div className="mt-[50px] flex flex-col w-[1300px]">
            <div className="flex flex-row justify-between">
                {row1Names.map((_, i) => (
                    <div className="flex flex-col">
                    <img src={row1Images[i]}></img>
                    <p className="px-[10px] text-cerise text-2xl font-normal mt-5">{row1Names[i]}</p>
                    <div className="py-[20px] px-[10px] w-full rounded-[20px] mt-2 bg-slate-50 bg-opacity-20 border-cerise text-white">
                        <span className="block">{row1Roles[i]}</span>
                        <span className="block">{row1Mails[i]}</span>
                        <span className="block">{row1Phones[i]}</span>
                    </div>
                </div>
                ))}
            </div>
            <div className="flex flex-row justify-between mt-[50px]">
            {row2Names.map((_, i) => (
                    <div className="flex flex-col">
                    <img src={row2Images[i]}></img>
                    <p className="px-[10px] text-cerise text-2xl font-normal mt-5">{row2Names[i]}</p>
                    <div className="py-[20px] px-[10px] w-full rounded-[20px] mt-2 bg-slate-50 bg-opacity-20 border-cerise text-white">
                        <span className="block">{row2Roles[i]}</span>
                        <span className="block">{row2Mails[i]}</span>
                        <span className="block">{row2Phones[i]}</span>
                    </div>
                </div>
                ))}
            </div>
        </div>

      <div></div>
    </div>
  );
}
