import { useLocale } from "@/locales";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState } from "react";

const companyHost = [true,true,true];
const lounge = [true,true,true];
const wifi = [true,true,true];
const sponsoredPost = [false,false,true];
const studentMeeting = [false,false,true];
const price = ["35 000:-","47 000:-","59 000:-"];
const area = ["4 m²","6 m²","8 m²"];

function Table(){
  const t = useLocale();
  const titles = t.catalog.titles;
  const titlesList = [titles.price, titles.area, titles.placement, titles.exposure, titles.representatives,
                      titles.sittningTickets, titles.drinkCoupons, titles.companyHost, titles.lounge,
                      titles.tables, titles.wifi, titles.sponsoredPost, titles.kontaktSamtal];

  const smallPackage = [price[0], area[0], t.catalog.placement[0],t.catalog.exposure[0],
    t.catalog.representatives[0],t.catalog.sittningTickets[0],
    t.catalog.drinkCoupons[0], companyHost[0], lounge[0],
    t.catalog.tables[0], wifi[0], sponsoredPost[0], studentMeeting[0]];

  const mediumPackage = [price[1], area[1], t.catalog.placement[1],t.catalog.exposure[1],
    t.catalog.representatives[1],t.catalog.sittningTickets[1],
    t.catalog.drinkCoupons[1], companyHost[1], lounge[1],
    t.catalog.tables[1], wifi[1], sponsoredPost[1], studentMeeting[1]];

  const largePackage = [price[2], area[2], t.catalog.placement[2],t.catalog.exposure[2],
    t.catalog.representatives[2],t.catalog.sittningTickets[2],
    t.catalog.drinkCoupons[2], companyHost[2], lounge[2],
    t.catalog.tables[2], wifi[2], sponsoredPost[2], studentMeeting[2]];

  const packages = [smallPackage, mediumPackage, largePackage];

  const [packageIdx, setPackageIdx] = useState<number>(0);

  function Display({value,}: { value: string | boolean;}){
    if (typeof value === 'string'){
      return (<div className="text-center p-2 text-yellow sm-text-xs lg-text-lg">
                {value}
              </div>);
    }
    if (value){
      return (<div className="flex justify-center items-center">
                <img src={"/img/check.png"} className="h-6"></img>
              </div>);
    }
    return(
      <div></div>
    );
  };

  const increasePackageIdx = () => {
    setPackageIdx((packageIdx + 1) % packages.length);
  };

  const decreasePackageIdx = () => {
    setPackageIdx((packageIdx - 1 + packages.length) % packages.length);
  };

  return(
    <div>
      {/*Desktop version*/}
      <div className="pt-4 pl-10 pr-10 hidden md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white">
              <th></th>
              {t.catalog.names.map(name => (
                <th className="text-xl text-cerise">{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
          {titlesList.map((title, idx) =>(
              <tr key={idx} className="border-b border-white h-10">
                <td className="pl-5 text-cerise font-medium">{title}</td>
                <td><Display value={smallPackage[idx]}/></td>
                <td><Display value={mediumPackage[idx]}/></td>
                <td><Display value={largePackage[idx]}/></td>
              </tr>
            )
          )}
          </tbody>
        </table>
      </div>

      {/*Phone version*/}
      <div className="block md:hidden pr-10 pl-10 pt-4">
        <div className="rounded-2xl bg-white/20 pt-4 pb-4">
          <div className="flex justify-center items-center">
            <button onClick={decreasePackageIdx} className="pl-4">
              <img src={"/img/leftArrow.png"} className="h-6"></img>
            </button>
            <h2 className="text-white text-center w-64">{t.catalog.names[packageIdx]}</h2>
            <button onClick={increasePackageIdx} className="pr-4">
              <img src={"/img/rightArrow.png"} className="h-6"></img>
            </button>
          </div>
          <table className="border-collapse">
            {titlesList.map((title, idx) =>(
                <tr key={idx} className="h-10">
                  <td className="text-center object-center w-1/2 border-r border-white p-2 text-cerise font-medium text-xs">
                    {title}
                  </td>
                  <td className="w-1/2">
                    <Display value={packages[packageIdx][idx]}/>
                  </td>
                </tr>
              )
            )}
          </table>
        </div>


      </div>
    </div>
  );
};

export default function Catalog() {
  const t = useLocale();
  const prices = ["35 000:-", "45 000:-", "55 000:-", "70 000:-"];
  const iconsBase = ["fa-expand", "fa-laptop", "fa-circle", "fa-users", "fa-ticket-alt", "fa-cocktail", "fa-wifi", "fa-couch", "fa-user-tie", "fa-box-open",];
  const iconsSponsor = ["fa-expand", "fa-laptop", "fa-circle", "fa-users", "fa-ticket-alt", "fa-cocktail", "fa-wifi", "fa-couch", "fa-user-tie", "fa-box-open", "fa-book-open", "fa-shopping-bag", "fa-camera"];
  const iconsHunter = ["fa-expand", "fa-laptop", "fa-circle", "fa-users", "fa-ticket-alt", "fa-cocktail", "fa-wifi", "fa-couch", "fa-user-tie", "fa-box-open", "fa-book-open", "fa-shopping-bag", "fa-camera", "fa-phone-alt", "fa-ad"];
  const iconsPremium = ["fa-expand", "fa-laptop", "fa-circle", "fa-users", "fa-ticket-alt", "fa-cocktail", "fa-wifi", "fa-couch", "fa-user-tie", "fa-box-open", "fa-book-open", "fa-shopping-bag", "fa-camera", "fa-phone-alt", "fa-ad"];

  const icons = [iconsBase, iconsSponsor, iconsHunter, iconsPremium];

  const packetColor1 = ["border-[#E2B7C9]", "border-[#D5759C]", "border-cerise", "border-yellow"];
  const packetColor2 = ["bg-[#E2B7C9]", "bg-[#D5759C]", "bg-cerise", "bg-yellow"];

  return (
    <div className="pt-[80px] pb-[300px]">
      <h1 className="uppercase text-cerise text-4xl md:text-5xl font-medium text-center px-[10px] break-words">{t.catalog.header}</h1>

      <Table/>

      <div className="flex flex-col sm:flex-row justify-center gap-[20px] sm:gap-[100px] px-[50px] mt-[200px]">
        <div className="pt-[20px] px-[0px] sm:w-[400px]">
          <h1 className="text-4xl font-normal text-cerise"> {t.catalog.subheader}</h1>
          <p className="text-white text-lg mt-4">{t.catalog.paragraph}</p>
          <a className="block text-cerise mt-6" href="mailto:sales@ddagen.se">sales@ddagen.se</a>
        </div>
        <div className="">
          <img src="/img/catalogImg.png" className="sm:w-[600px]"></img>
        </div>
      </div>
    </div>
  );
}
