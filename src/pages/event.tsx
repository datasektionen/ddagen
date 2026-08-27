import { useLocale } from "@/locales";
import { NextSeo } from "next-seo";
import { useState, useRef } from "react";

function SingleEvent({
  color,
  toReverse,
  image,
  fullImage,
  showDate,
  eventInfo,
  companyLink
}: {
  color: string;
  toReverse: boolean;
  image: string;
  fullImage?: boolean;
  showDate: boolean;
  eventInfo: string[];
  companyLink?: boolean;
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
      <div className={`sm:basis-1/2 max-sm:min-w-0 max-sm:flex-1 flex flex-col ${toReverse ? "sm:items-start" : "sm:items-end"}`}>
        <button
          type="button"
          aria-label={`${t.event.description}: ${eventInfo[1]}`}
          className={`group flex w-full max-w-[420px] flex-col items-start gap-3 rounded-xl border-2 border-cerise bg-black/10 p-3 text-left shadow-[0_6px_0_rgba(238,47,123,0.35)] transition duration-200 hover:-translate-y-1 hover:bg-black/20 hover:shadow-[0_10px_0_rgba(238,47,123,0.45)] focus:outline-none focus:ring-4 focus:ring-cerise/40 active:translate-y-0 active:shadow-[0_3px_0_rgba(238,47,123,0.35)] ${toReverse ? "sm:items-start" : "sm:items-end"}`}
          onClick={openModal}
        >
          <h2 className="text-left text-white sm:text-center md:text-xl lg:text-3xl">{eventInfo[1]}</h2>
          {(image != "") &&
            <div className={`flex w-full max-w-[350px] overflow-hidden rounded-md bg-white/80 ${fullImage === true ? "" : "px-8 py-4"}`}>
              <img src={image} alt="" className="flex-1 max-h-[230px] sm:max-h-[300px] lg:max-h-[300px] w-full object-contain transition duration-200 group-hover:scale-105"></img>
            </div>
          }
          <span className="self-center text-sm font-medium text-white underline decoration-cerise decoration-2 underline-offset-4 transition group-hover:text-cerise sm:self-auto">
            {t.event.readMore}
          </span>
        </button>
      </div>
      <div className="flex h-full w-16 shrink-0 justify-center sm:basis-[124px]">
        <div className={`relative flex h-full min-h-[360px] w-1 justify-center ${color} sm:min-h-[420px]`}>
          {showDate && <div className={`absolute flex h-14 w-14 items-center justify-center rounded-full ${color} text-center text-xs text-white sm:h-16 sm:w-16 sm:text-lg`}>
            {eventInfo[3]}
          </div>}
        </div>
      </div>
      <div className="sm:basis-1/2 max-sm:hidden"></div>
      {modalState && (
          <div
            className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-verydarkblue/80 px-4 pb-6 pt-24 backdrop-blur-sm sm:pt-28"
            ref={modalRef}
            onClick={handleOverlayClick}
            role="dialog"
            aria-modal="true"
            aria-label={eventInfo[1]}
          >
          <div className="flex max-h-[calc(100vh-7rem)] w-full max-w-[520px] flex-col overflow-y-auto rounded-xl border-2 border-cerise bg-darkblue text-white shadow-[0_10px_0_rgba(238,47,123,0.35)] sm:max-h-[calc(100vh-8rem)]">
            <button
              type="button"
              aria-label="Close event details"
              className="sticky right-3 top-3 z-10 -mb-10 mr-3 flex h-10 w-10 shrink-0 self-end items-center justify-center rounded-full border border-white/50 bg-darkblue/90 transition hover:border-white hover:bg-cerise focus:outline-none focus:ring-4 focus:ring-cerise/40"
              onClick={closeModal}
            >
              <div className="absolute h-5 w-0.5 rotate-45 rounded-md bg-white"></div>
              <div className="absolute h-5 w-0.5 -rotate-45 rounded-md bg-white"></div>
            </button>
            <div className={`relative flex justify-center p-4 sm:p-6 ${fullImage ? "bg-white/10" : "bg-white/80"}`}>
                <img src={image} alt="" className="max-h-[320px] w-full object-contain" />
              </div>
              <div className="px-6 pb-7 pt-5 sm:px-8">
                <h2 className="text-3xl text-white">
                  {eventInfo[1]}
                </h2>
                <h3 className="mt-2 break-words text-2xl text-cerise">
                  {companyLink == true ? <a className="underline decoration-1 underline-offset-4 hover:text-white" href={eventInfo[0]}>{eventInfo[0]}</a> : eventInfo[0]}
                </h3>
                <p className="mt-5 text-start text-white/85">{eventInfo[2]}</p>
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
      image: "/img/ddagen2024/rekrytPub.jpg",
      fullImage: true,
      header: t.event.recruitmentPub,
      text: t.event.recruitmentPubText
    },
        {
      date: "24/9",
      companyName: "",
      image: "/img/ddagen2024/banquette-dinner.jpg",
      fullImage: true,
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
      companyName: "https://ddagen.se/kontaktsamtal",
      companyLink: true,
      image: "/img/ff4.webp",
      fullImage: true,
      header: t.event.contactConversations,
      text: t.event.contactConversationsText
    },
  ]

  const fairEvents = [
    {
      date: "10:00",
      companyName: t.event.opening,
      //image: "/img/d-dagen-logo-jubileum-25-sv.svg",
      image: "/img/ddagen2024/ddagen-entry-balloons.jpg",
      fullImage: true,
      header: t.event.welcome,
      text: ""
    },
    {
      date: "10:15",
      companyName: t.event.openingCeremony,
      image: "/img/exhibitors/Omegapoint.svg",
      header: t.event.inaugeration,
      text: ""
    },
    {
      date: "11:00",
      companyName: t.event.panelDiscussion1,
      image: "/img/exhibitors/panelNordea.png",
      header: t.event.panelDiscussionHeader1,
      text: t.event.panelDiscussion1text + " " + t.event.panelDiscussiontext
    },
    {
      date: "13:00",
      companyName: t.event.panelDiscussion2,
      image: "/img/exhibitors/panelOmegaVertical.png",
      header: t.event.panelDiscussionHeader2,
      text: t.event.panelDiscussion2text + " " + t.event.panelDiscussiontext
    },
    {
      date: "14:30",
      companyName: t.event.panelDiscussion3,
      image: "/img/exhibitors/panelAtlas.png",
      header: t.event.panelDiscussionHeader3,
      text: t.event.panelDiscussion1text + " " + t.event.panelDiscussiontext
    },
    {
      date: "16:00",
      companyName: "",
      image: "/img/ddagen2024/ddagen-exhibitors.jpg",
      fullImage: true,
      header: t.event.closes,
      text: ""
    },
    {
      date: "18:00",
      companyName: "",
      image: "/img/ddagen2024/banquette-dinner.jpg",
      fullImage: true,
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
      description: "Upptäck spännande event inför D-Dagen 2026! Från lunchevent till afterwork, erbjuder vi flera möjligheter att nätverka med företag och förbättra dina karriärmöjligheter. Delta i våra event för att skapa värdefulla kontakter inom tech-branschen.",
      url: "https://ddagen.se/event",
    },
    en: {
      title: "Discover Exciting Events",
      description: "Discover exciting events leading up to D-Dagen 2026! From lunch events to afterwork gatherings, we offer multiple opportunities to network with companies and enhance your career prospects. Join our events to create valuable connections in the tech industry.",
      url: "https://ddagen.se/en/event",
    },
  };

  const { title, description, url } = seoContent[t.locale as "sv" | "en"];

  const comingSoon = false;

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
      {comingSoon &&
      <div className="pt-[200px] pb-[300px]">
        <h1 className="text-5xl text-cerise font-medium text-center"> EVENT</h1>
        <p className="font-medium text-2xl text-center text-cerise">{t.event.comingSoon}</p>
      </div>
      }
      

      {!comingSoon &&
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
              fullImage={event?.fullImage ?? false}
              showDate={!(i > 0 && event.date === events[i-1].date)}
              eventInfo={[
                event.companyName,
                event.header,
                event.text,
                event.date
              ]}
              companyLink={event?.companyLink ?? false}
              />
            ))
          }
          <div className="flex max-sm:hidden justify-center">
            <div className="w-4 bg-cerise h-full min-h-[30px] rounded-b-full"></div>
          </div>
          <div>
            <h1 className="text-5xl text-[#C2952C] p-4 font-medium text-center"> {t.event.fair} 8/10</h1>
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
              fullImage={event?.fullImage ?? false}
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
      }
    </>
  );
}
