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

function Check({value,}: { value: boolean;}){
  if (value){
    return(
      <div className="flex justify-center items-center">
        <img src={"/img/check.png"} className="h-6"></img>
      </div>
    );
  }
  return(
    <div></div>
  );
};

function Table(){
  const t = useLocale();
  return(
    <div className="pt-6 pl-10 pr-10 grid grid-rows-2 grid-flow-row">
      <Header packages={t.catalog.names}/>
      <RowText title={t.catalog.titles.price} packages={price}/>
      <RowText title={t.catalog.titles.area} packages={area}/>
      <RowText title={t.catalog.titles.placement} packages={t.catalog.placement}/>
      <RowText title={t.catalog.titles.exposure} packages={t.catalog.exposure}/>
      <RowText title={t.catalog.titles.representatives} packages={t.catalog.representatives}/>
      <RowText title={t.catalog.titles.sittningTickets} packages={t.catalog.sittningTickets}/>
      <RowText title={t.catalog.titles.drinkCoupons} packages={t.catalog.drinkCoupons}/>
      <RowBoolean title={t.catalog.titles.companyHost} packages={companyHost}/>
      <RowBoolean title={t.catalog.titles.lounge} packages={lounge}/>
      <RowText title={t.catalog.titles.tables} packages={t.catalog.tables}/>
      <RowBoolean title={t.catalog.titles.wifi} packages={wifi}/>
      <RowBoolean title={t.catalog.titles.sponsoredPost} packages={sponsoredPost}/>
      <RowBoolean title={t.catalog.titles.kontaktSamtal} packages={studentMeeting}/>
    </div>
  );
};

function Header({
  packages
                }:{
  packages: string[]
}){
  return(
    <div className="border-b border-white grid grid-cols-4 gap-4 h-9 items-center">
      <div></div>
      {
        packages.map(text => <div className="text-xl text-cerise flex justify-center">
          <div>{text}</div>
        </div>)
      }
    </div>
  );
};

function RowBoolean({
              title,
              packages,
             }:{
  title: string;
  packages: boolean[];
}){
  return(
    <div className="border-b border-white grid grid-cols-4 gap-4 h-9 items-center">
      <div className="pl-5 text-cerise font-medium">{title}</div>
      {
        packages.map(val => <Check value={val}/>)
      }
    </div>
  );
};

function RowText({
                      title,
                      packages,
                    }:{
  title: string;
  packages: string[];
}){
  return(
    <div className="border-b border-white grid grid-cols-4 gap-4 h-9 items-center">
      <div className="pl-5 text-cerise font-medium">{title}</div>
      {
        packages.map(text => <div className="text-yellow flex justify-center">
                                <div>{text}</div>
                            </div>)
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
