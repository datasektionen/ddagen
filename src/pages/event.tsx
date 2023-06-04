import { useLocale } from "@/locales";

function SingleEvent({
  bgColor,
  borderColor,
  toReverse,
  textColor,
  image,
  eventInfo,
  price,
}: {
  bgColor: string;
  borderColor: string;
  toReverse: boolean;
  textColor: string;
  image: string;
  eventInfo: string[];
  price: string
}) {
  const t = useLocale();
  return (
    <div className={`${toReverse ? "flex-row-reverse" : "flex-row"} flex flex-row gap-[100px] px-[0px] mt-[100px] justify-center`}>
      <div className="py-[0px]">
        <img src={image} className="h-[300px]"></img>
      </div>
      <div className={`${bgColor} ${borderColor} border-[3px] rounded-lg py-[40px] px-[20px] bg-opacity-10 w-[400px] h-[300px]`}>
        <h2 className="text-center text-3xl text-white">{eventInfo[0]}</h2>
        <h3 className="text-center text-yellow text-xl mt-2">
          {" "}
          {t.event.subheader + price + " :-"}
        </h3>
        <p className="text-white text-start mt-5">{eventInfo[1]}</p>
        <p className={`${textColor} text-start mt-5`}>
          <u>{t.event.extra}</u>
        </p>
      </div>
    </div>
  );
}

export default function Students() {
  const t = useLocale();

  return (
    <div className="pt-[200px] pb-[300px]">
      <h1 className="text-5xl text-cerise font-medium text-center"> EVENT</h1>
      <SingleEvent
      bgColor="bg-[#E2B7C9]"
      borderColor="border-[#E2B7C9]"
      textColor="text-[#E2B7C9]"
      image="/img/lunchPic.png"
      eventInfo = {[t.event.header1, t.event.paragraph1]}
      price = "50 000"
      />
      <SingleEvent
      bgColor="bg-[#D5759C]"
      borderColor="border-[#D5759C]"
      toReverse = {true}
      textColor="text-[#D5759C]"
      image="/img/officePic.png"
      eventInfo = {[t.event.header2, t.event.paragraph2]}
      price = "15 000"
      />
      <SingleEvent
      bgColor="bg-cerise"
      borderColor="border-cerise"
      textColor="text-cerise"
      image="/img/barPic.png"
      eventInfo = {[t.event.header3, t.event.paragraph3]}
      price = "60 000"
      />
      <SingleEvent
      bgColor="bg-yellow"
      borderColor="border-yellow"
      toReverse = {true}
      textColor="text-yellow"
      image="/img/afterworkPic.png"
      eventInfo = {[t.event.header4, t.event.paragraph4]}
      price = "17 000 kr + 150 kr / student"
      />
    </div>
  );
}
