import { useLocale } from "@/locales";
import { NextSeo } from "next-seo";
import { useState, useRef } from "react";

function SingleEvent({
  color,
  toReverse,
  image,
  showDate,
  eventInfo
}: {
  color: string;
  toReverse: boolean;
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

  return (
    <div className={`
        flex
        flex-row-reverse
        ${toReverse ? "sm:flex-row-reverse" : "sm:flex-row"}
        gap-4 px-[50px] md:px-[50px] justify-between`}>
      <div className={`sm:basis-1/2 max-sm:w-full flex flex-col ${toReverse ? "sm:items-start" : "sm:items-end"} max-h-[300px]`}>
        <div className={`flex flex-col w-full gap-2 items-start ${toReverse ? "sm:items-start" : "sm:items-end"}`} onClick={openModal}>
          <h2 className="text-center lg:text-3xl md:text-xl text-white">{eventInfo[1]}</h2>
          {(image != "") &&
            <div className="flex bg-slate-100 bg-opacity-50 px-8 py-4 w-full max-w-[350px] bg-white/80 rounded-md">
              <img src={image} className="flex-1 max-h-[230px] sm:max-h-[300px] lg:max-h-[300px] w-full object-contain"></img>
            </div>
          }
        </div>
      </div>
      <div className="basis-[124px] h-full flex justify-center">
        <div className={`flex relative justify-center w-4 ${color} h-full min-h-[300px]`}>
          {showDate && <div className={`flex absolute justify-center items-center h-16 w-16 rounded-full ${color} text-white text-lg`}>
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
                  {eventInfo[0]}
                </h3>
                <p className="text-black text-start mt-5">{eventInfo[2]}</p>
              </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Events() {
  const t = useLocale();

  const events = [
    {
      date: "16/9",
      companyName: "EECS event",
      image: "",
      header: t.event.recruitmentPub,
      text: t.event.recruitmentPubText
    },
        {
      date: "24/9",
      companyName: "",
      image: "",
      header: t.event.banquetSignup,
      text: t.event.banquetSignupText
    },
    {
      date: "01/10",
      companyName: "Omegapoint",
      image: "/img/exhibitors/Omegapoint.svg",
      header: t.event.lunchSeminarHeader,
      text: t.event.lunchSeminar
    },
    {
      date: "07/10",
      companyName: "Strawberry",
      image: "/img/exhibitors/Strawberry.svg",
      header: t.event.lunchSeminarHeader,
      text: t.event.lunchSeminar
    },
        {
      date: "07/10",
      companyName: "http://ddagen.se/kontaktsamtal",
      image: "",
      header: t.event.contactConversations,
      text: t.event.contactConversationsText
    },
  ]

  const fairEvents = [
    {
      date: "10:00",
      companyName: t.event.opening,
      image: "/img/d-dagen-logo-jubileum-25-sv.svg",
      header: "",
      text: ""
    },
    {
      date: "10:15",
      companyName: t.event.openingCeremony,
      image: "/img/exhibitors/Omegapoint.svg",
      header: "",
      text: ""
    },
    {
      date: "11:00",
      companyName: t.event.panelDiscussion1,
      image: "",
      header: t.event.panelDiscussionHeader,
      text: t.event.panelDiscussion1text + " " + t.event.panelDiscussiontext
    },
    {
      date: "13:00",
      companyName: t.event.panelDiscussion2,
      image: "",
      header: t.event.panelDiscussionHeader,
      text: t.event.panelDiscussion2text + " " + t.event.panelDiscussiontext
    },
    {
      date: "14:30",
      companyName: t.event.panelDiscussion3,
      image: "",
      header: t.event.panelDiscussionHeader,
      text: t.event.panelDiscussiontext
    },
    {
      date: "16:00",
      companyName: "",
      image: "",
      header: t.event.closes,
      text: ""
    },
    {
      date: "18:00",
      companyName: "",
      image: "",
      header: t.event.banquet,
      text: ""
    },
  ]

  const postFairEvents = [
    {
      date: "13/10",
      companyName: "Försvarsmaktens Radioanstalt",
      image: "/img/exhibitors/FRA.png",
      header: t.event.lunchSeminarHeader,
      text: t.event.lunchSeminar
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
        <p className="font-medium text-2xl text-center text-cerise">{t.event.description}</p>
        <div className="flex flex-col mt-4">
          <div className="max-sm:hidden flex justify-center">
            <div className="w-4 bg-cerise h-full min-h-[30px] rounded-t-full"></div>
          </div>
          {events?.map((event, i) => (
            <SingleEvent
              key={i}
              color="bg-cerise"
              toReverse={i%2 == 0}
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
          <div className="flex max-sm:hidden justify-center">
            <div className="w-4 bg-cerise h-full min-h-[30px] rounded-b-full"></div>
          </div>
          <div>
            <h1 className="text-5xl text-[#C2952C] p-4 font-medium text-center"> {t.event.fair} 9/10</h1>
          </div>
          <div className="max-sm:hidden flex justify-center">
            <div className="w-4 bg-[#C2952C] h-full min-h-[30px] rounded-t-full"></div>
          </div>
          {fairEvents?.map((event, i) => (
            <SingleEvent
              key={i}
              color="bg-[#C2952C]"
              toReverse={i%2 == 1}
              image={event?.image}
              showDate={!(i > 0 && event.date === fairEvents[i-1].date)}
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
            <div className="w-4 bg-[#C2952C] h-full min-h-[30px] rounded-b-full"></div>
          </div>
          <div>
            <h1 className="text-5xl text-cerise p-4 font-medium text-center"> {t.event.after + " " + t.event.fair}</h1>
          </div>
          <div className="max-sm:hidden flex justify-center">
            <div className="w-4 bg-cerise h-full min-h-[30px] rounded-t-full"></div>
          </div>
          {postFairEvents?.map((event, i) => (
            <SingleEvent
              key={i}
              color="bg-cerise"
              toReverse={i%2 == 0}
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
          <div className="flex max-sm:hidden justify-center">
            <div className="w-4 bg-cerise h-full min-h-[30px] rounded-b-full"></div>
          </div>
      </div>
    </>
  );
}
