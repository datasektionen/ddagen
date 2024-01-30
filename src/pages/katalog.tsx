import { useLocale } from "@/locales";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState } from "react";

function Packet({
                  price,
                  icons,
                  packetColor1,
                  packetColor2,
                  packetType,
                  packetDescription,
                }: {
  price: string;
  icons: string[];
  packetColor1: string;
  packetColor2: string;
  packetType: string;
  packetDescription: string[];
}) {
  return (
    <div className="justify-center flex-col text-center">
      <div className="h-7 text-cerise justify-center">{packetType}</div>
      <div className="h-7 text-white justify-center">{price}</div>
      {packetDescription.map((packet, i) =>
        <div className="h-7 text-white justify-center">{packet}</div>)
      }
    </div>

  );
};

function Menu({
                description,
              }:{
  description: string[]
}){
  return (
    <div className="justify-center flex-col">
      {description.map((packet, i) =>
        <div className="h-7 text-cerise justify-center pl-5 font-semibold">{packet}</div>)
      }
    </div>

  );
};


export default function Catalog() {
  const t = useLocale();
  const packets = [t.catalog.basePacket, t.catalog.sponsorPacket, t.catalog.headhHunterPacket, t.catalog.premiumPacket];
  const prices = ["35 000:-", "45 000:-", "55 000:-", "70 000:-"];
  const iconsBase = ["fa-expand", "fa-laptop", "fa-circle", "fa-users", "fa-ticket-alt", "fa-cocktail", "fa-wifi", "fa-couch", "fa-user-tie", "fa-box-open",];
  const iconsSponsor = ["fa-expand", "fa-laptop", "fa-circle", "fa-users", "fa-ticket-alt", "fa-cocktail", "fa-wifi", "fa-couch", "fa-user-tie", "fa-box-open", "fa-book-open", "fa-shopping-bag", "fa-camera"];
  const iconsHunter = ["fa-expand", "fa-laptop", "fa-circle", "fa-users", "fa-ticket-alt", "fa-cocktail", "fa-wifi", "fa-couch", "fa-user-tie", "fa-box-open", "fa-book-open", "fa-shopping-bag", "fa-camera", "fa-phone-alt", "fa-ad"];
  const iconsPremium = ["fa-expand", "fa-laptop", "fa-circle", "fa-users", "fa-ticket-alt", "fa-cocktail", "fa-wifi", "fa-couch", "fa-user-tie", "fa-box-open", "fa-book-open", "fa-shopping-bag", "fa-camera", "fa-phone-alt", "fa-ad"];

  const icons = [iconsBase, iconsSponsor, iconsHunter, iconsPremium];

  const packetColor1 = ["border-[#E2B7C9]", "border-[#D5759C]", "border-cerise", "border-yellow"];
  const packetColor2 = ["bg-[#E2B7C9]", "bg-[#D5759C]", "bg-cerise", "bg-yellow"];

  return (
    <div className="pt-[100px] pb-[300px]">
      <h1 className="uppercase text-cerise text-5xl font-medium text-center px-[10px] break-words">{t.catalog.header}</h1>

      <div className="pt-10 grid grid-rows-1 grid-flow-col gap-4">
        <Menu description={t.catalog.packetInfo}/>
        {packets.map((packet, i) =>
          <Packet
            key={i}
            price={prices[i]}
            icons={icons[i]}
            packetColor1={packetColor1[i]}
            packetColor2={packetColor2[i]}
            packetType={t.catalog.packetType[i]}
            packetDescription={packet}
          />)}
      </div>

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
