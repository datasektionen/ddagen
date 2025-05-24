import { useLocale } from "@/locales";
import { NextSeo } from "next-seo";
import { useState, useRef } from "react";

function SingleEvent({
  bgColor,
  borderColor,
  toReverse,
  textColor,
  image,
  showDate,
  eventInfo
}: {
  bgColor: string;
  borderColor: string;
  toReverse: boolean;
  textColor: string;
  image: string;
  showDate: boolean;
  eventInfo: string[];
}) {
  const t = useLocale();
  const [modalState, setModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (modalRef.current === event.target) {
      closeModal();
    }
  };

  /*
  eventInfo={[
      event.companyName,
      event.header,
      event.text,
    ]}
  */

  return (
    <div className={`
        flex
        flex-row-reverse
        ${toReverse ? "sm:flex-row-reverse" : "sm:flex-row"} 
        gap-4 px-[50px] md:px-[50px] justify-between`}>
      <div className={`sm:basis-1/2 max-sm:w-full flex flex-col ${toReverse ? "sm:items-start" : "sm:items-end"} max-h-[300px]`}>
        <div className={`flex flex-col w-full gap-2 items-start ${toReverse ? "sm:items-start" : "sm:items-end"}`}>
          <h2 className="text-center lg:text-3xl md:text-xl text-white">{eventInfo[1]}</h2>
          <div className="flex bg-slate-100 bg-opacity-50 px-8 py-4 w-full max-w-[350px] bg-white/80 rounded-md" onClick={openModal}>
            <img src={image} className="flex-1 max-h-[230px] sm:max-h-[300px] lg:max-h-[300px] w-full object-contain"></img>
          </div>
        </div>
      </div>
      <div className="basis-[124px] h-full flex justify-center">
        <div className="flex relative justify-center w-4 bg-cerise h-full min-h-[300px]">
          {showDate && <div className="flex absolute justify-center items-center h-16 w-16 rounded-full bg-cerise text-white text-lg">
            {eventInfo[3]}
          </div>}
        </div>
      </div>
      <div className="sm:basis-1/2 max-sm:hidden"></div>
      {modalState && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-40"
            ref={modalRef}
            onClick={handleOverlayClick}
          >
          <div className={`bg-white bg-opacity-70 w-[500px] pb-5 flex flex-col rounded-3xl`}>
            <div className="relative px-8 py-4 justify-center flex flex-row">
                <img src={image} />

                <button
                  className="absolute top-5 right-3 w-[50px] h-[50px] flex items-center justify-center"
                  onClick={closeModal}
                >
                  <div className="absolute h-[50px] w-[5px] bg-white rounded-md rotate-45"></div>
                  <div className="absolute h-[50px] w-[5px] bg-white rounded-md -rotate-45"></div>
                </button>
              </div>
              <div className="px-5 mt-5">
                <h2 className="text-3xl text-black">
                  {eventInfo[1]}
                </h2>
                <h3 className="text-cerise text-2xl mt-2">
                  {t.event.subheader + eventInfo[0] + ":"}
                </h3>
                <p className="text-black text-start mt-5">{eventInfo[2]}</p>
              </div>
          </div>
        </div>
      )}
    </div>
  );
  /*
    <div
      className={`${
        toReverse
          ? "md:flex-row-reverse flex-col-reverse"
          : "md:flex-row flex-col-reverse"
      } flex flex-row gap-[50px] px-[50px] md:px-[50px] mt-[100px] justify-center`}
    >
      <div className="py-[0px]">
        <img src={image} className="md:h-[300px] lg:h-[300px]"></img>
      </div>
      <div
        className={`${bgColor} ${borderColor} border-[3px] rounded-lg py-[25px] md:py-[25px] lg:py-[50px] px-[20px] bg-opacity-10 md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[300px]`}
      >
        <h2 className="text-center lg:text-3xl md: text-xl text-white">
          {eventInfo[1]}
        </h2>
        <h3 className="text-center text-cerise  lg:text-xl md:mt-1 lg:mt-2">
          {" "}
          {t.event.subheader + eventInfo[0]}
        </h3>
        <p className="text-white text-start mt-5 text-sm">{eventInfo[1]}</p>
        <button className={`${textColor} text-start mt-3`} onClick={openModal}>
          
        </button>
        {modalState && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60"
            ref={modalRef}
            onClick={handleOverlayClick}
          >
            <div
              className={` bg-white bg-opacity-70 w-[500px] pb-5 flex flex-col  rounded-3xl`}
            >
              <div className="relative py-[0px] justify-center flex flex-row">
                <img src={image} />

                <button
                  className="absolute top-5 right-3 w-[50px] h-[50px] flex items-center justify-center"
                  onClick={closeModal}
                >
                  <div className="absolute h-[50px] w-[5px] bg-white rounded-md rotate-45"></div>
                  <div className="absolute h-[50px] w-[5px] bg-white rounded-md -rotate-45"></div>
                </button>
              </div>
              <div className="px-5 mt-5">
                <h2 className="text-center text-3xl text-black">
                  {eventInfo[1] + " - " + eventInfo[0]}
                </h2>
                <h3 className="text-center text-cerise text-2xl mt-2">
                  {t.event.subheader + eventInfo[0] + " :-"}
                </h3>
                <p className="text-black text-start mt-5">{eventInfo[2]}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  */
}

export default function Events() {
  const t = useLocale();

  const events = [
    {
      date: "Tis",
      companyName: "Qulturnämnden",
      image: "/img/exhibitors/qn.png",
      header: t.event.header1,
      text: t.event.fullParagraph1
    },
    {
      date: "Ons",
      companyName: "DKM",
      image: "/img/exhibitors/dkm.svg",
      header: t.event.header2,
      text: t.event.fullParagraph2
    },
    {
      date: "Tor",
      companyName: "Systemgruppen",
      image: "/img/exhibitors/systemgruppen.svg",
      header: t.event.header3,
      text: t.event.fullParagraph3
    },
  ]

  const seoContent = {
    sv: {
      title: "Upptäck Spännade Event",
      description: "Upptäck spännande event inför D-Dagen 2025! Från lunchevent till afterwork, erbjuder vi flera möjligheter att nätverka med företag och förbättra dina karriärmöjligheter. Delta i våra event för att skapa värdefulla kontakter inom tech-branschen.",
      url: "https://ddagen.se/event",
    },
    en: {
      title: "Discover Exciting Events",
      description: "Discover exciting events leading up to D-Dagen 2025! From lunch events to afterwork gatherings, we offer multiple opportunities to network with companies and enhance your career prospects. Join our events to create valuable connections in the tech industry.",
      url: "https://ddagen.se/en/event",
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
      <div className="pt-[200px] pb-[300px]">
        <h1 className="text-5xl text-cerise font-medium text-center"> EVENT</h1>
        <div className="flex flex-col mt-8">  
          <div className="max-sm:hidden flex justify-center">
            <div className="w-4 bg-cerise h-full min-h-[30px] rounded-t-full"></div>
          </div>
          {events?.map((event, i) => (
            <SingleEvent
              key={i}
              bgColor="bg-[#E2B7C9]"
              borderColor="border-[#E2B7C9]"
              toReverse={i%2 == 0}
              textColor="text-[#E2B7C9]"
              image={event?.image}
              showDate={!(i > 0 && event.date === events[i-1].date)}
              eventInfo={[
                event.companyName,
                event.header,
                event.text,
                event.date
              ]}
              />
            ))
          }
        </div>
          <div className="flex max-sm:hidden justify-center">
            <div className="w-4 bg-cerise h-full min-h-[30px] rounded-b-full"></div>
          </div>
      </div>
    </>
  );
}
