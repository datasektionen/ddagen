import { useLocale, type Locale } from "@/locales";
import {
  calendarLinks,
  eventText,
  fairTimeline,
  getEvent,
  googleTemplateUrl,
  preFairTimeline,
  SITE_URL,
  timelineLabel,
  timelinePastDate,
  type TimelineEntry,
} from "@/shared/events";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";

type EventItem = {
  date: string;
  eventDate?: string;
  companyName: string;
  image: string;
  fullImage?: boolean;
  header: string;
  text: string;
  companyUrl?: string;
  eventLinkText?: string;
  eventLinkUrl?: string;
  eventLinkSecondaryText?: string;
  eventLinkSecondaryUrl?: string;
  eventHash?: string;
  googleCalendarUrl?: string;
};

function toEventItem(entry: TimelineEntry, t: Locale): EventItem {
  const event = getEvent(entry.eventId);
  const [primary, secondary] = entry.showLinks ? event.links : [];
  return {
    date: timelineLabel(entry),
    eventDate: timelinePastDate(entry),
    companyName: entry.companyNameKey ? eventText(t.locale, entry.companyNameKey) : entry.companyName ?? "",
    companyUrl: entry.companyUrl,
    image: entry.image,
    fullImage: entry.fullImage,
    header: eventText(t.locale, entry.headerKey),
    text: entry.textKey ? eventText(t.locale, entry.textKey) : "",
    eventLinkText: primary?.labelKey && eventText(t.locale, primary.labelKey),
    eventLinkUrl: primary?.url,
    eventLinkSecondaryText: secondary?.labelKey && eventText(t.locale, secondary.labelKey),
    eventLinkSecondaryUrl: secondary?.url,
    eventHash: event.pageHash,
    googleCalendarUrl: googleTemplateUrl(t.locale, event),
  };
}

function CalendarExport() {
  const t = useLocale();
  const [origin, setOrigin] = useState(SITE_URL);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const links = calendarLinks(t.locale, origin);

  return (
    <section aria-labelledby="calendar-export-heading" className="mx-auto mt-8 flex w-full max-w-[720px] flex-col items-center gap-4 px-4 text-center">
      <h2 id="calendar-export-heading" className="text-2xl font-medium text-white">
        {t.event.calendar.title}
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <a
          href={links.google}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-cerise px-5 py-2.5 font-medium text-white shadow-md transition hover:bg-cerise/80 focus:outline-none focus:ring-4 focus:ring-cerise/40"
        >
          {t.event.calendar.google}
          <span className="sr-only"> {t.event.calendar.newTab}</span>
        </a>
        <a
          href={links.webcal}
          className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 font-medium text-verydarkblue shadow-md transition hover:bg-white/80 focus:outline-none focus:ring-4 focus:ring-white/40"
        >
          {t.event.calendar.appleOutlook}
        </a>
        <a
          href={links.download}
          aria-label={t.event.calendar.download}
          title={t.event.calendar.download}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-cerise text-xs font-medium text-white shadow-md transition hover:bg-cerise focus:outline-none focus:ring-4 focus:ring-cerise/40"
        >
          .ics
        </a>
      </div>
    </section>
  );
}

function SingleEvent({
  color,
  toReverse,
  image,
  fullImage,
  showDate,
  eventInfo,
  companyUrl,
  eventLinkText,
  eventLinkUrl,
  eventLinkSecondaryText,
  eventLinkSecondaryUrl,
  eventHash,
  eventDate,
  googleCalendarUrl,
}: {
  color: string;
  toReverse: boolean;
  image: string;
  fullImage?: boolean;
  showDate: boolean;
  eventInfo: string[];
  companyUrl?: string;
  eventLinkText?: string;
  eventLinkUrl?: string;
  eventLinkSecondaryText?: string;
  eventLinkSecondaryUrl?: string;
  eventHash?: string;
  eventDate?: string;
  googleCalendarUrl?: string;
}) {
  const t = useLocale();
  const router = useRouter();
  const [modalState, setModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const stockholmDateParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Stockholm",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const stockholmToday = `${stockholmDateParts.find((part) => part.type === "year")?.value}-${stockholmDateParts.find((part) => part.type === "month")?.value}-${stockholmDateParts.find((part) => part.type === "day")?.value}`;
  const isPast = eventDate ? eventDate < stockholmToday : false;

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    if (eventHash && window.location.hash === `#${eventHash}`) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  };

  useEffect(() => {
    if (!eventHash || !router.isReady) return;

    const openFromHash = () => {
      if (window.location.hash.slice(1) !== eventHash) return;

      setModal(true);
      document.getElementById(eventHash)?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [eventHash, router.isReady]);

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (modalRef.current === event.target) {
      closeModal();
    }
  };

  return (
    <div id={eventHash} className={`
        flex
        flex-row-reverse
        ${toReverse ? "sm:flex-row-reverse" : "sm:flex-row"}
        gap-4 px-[50px] md:px-[50px] justify-between`}>
      <div className={`sm:basis-1/2 max-sm:min-w-0 max-sm:flex-1 flex flex-col ${toReverse ? "sm:items-start" : "sm:items-end"}`}>
        <button
          type="button"
          aria-label={`${t.event.description}: ${eventInfo[1]}`}
          className={`group flex w-full max-w-[420px] flex-col items-start gap-3 rounded-xl border-2 ${isPast ? "border-slate-500" : "border-cerise"} bg-black/10 p-3 text-left shadow-[0_6px_0_rgba(238,47,123,0.35)] transition duration-200 hover:-translate-y-1 hover:bg-black/20 hover:shadow-[0_10px_0_rgba(238,47,123,0.45)] focus:outline-none focus:ring-4 focus:ring-cerise/40 active:translate-y-0 active:shadow-[0_3px_0_rgba(238,47,123,0.35)] ${toReverse ? "sm:items-start" : "sm:items-end"}`}
          onClick={openModal}
        >
          <h2 className="text-left text-white sm:text-center md:text-xl lg:text-3xl">{eventInfo[1]}</h2>
          {(image != "") &&
            <div className={`flex w-full max-w-[350px] overflow-hidden rounded-md bg-white/80 ${fullImage === true ? "" : "px-8 py-4"}`}>
              <img src={image} alt="" className={`w-full object-contain transition duration-200 group-hover:scale-105 ${fullImage ? "h-auto" : "max-h-[230px] sm:max-h-[300px] lg:max-h-[300px]"}`}></img>
            </div>
          }
          <span className="self-center text-sm font-medium text-white underline decoration-cerise decoration-2 underline-offset-4 transition group-hover:text-cerise sm:self-auto">
            {t.event.readMore}
          </span>
        </button>
      </div>
      <div className="flex h-full w-16 shrink-0 justify-center sm:basis-[124px]">
        <div className={`relative flex min-h-[360px] w-1 self-stretch justify-center ${color} sm:min-h-[420px]`}>
          {showDate && <div className={`absolute flex h-14 w-14 items-center justify-center rounded-full ${isPast ? "bg-slate-500 ring-2 ring-cerise/60" : color} text-center text-xs text-white sm:h-16 sm:w-16 sm:text-lg`}>
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
                  {companyUrl ? <a className="underline decoration-1 underline-offset-4 hover:text-white" href={companyUrl}>{eventInfo[0]}</a> : eventInfo[0]}
                </h3>
                <p className="mt-5 whitespace-pre-line text-start text-white/85">{eventInfo[2]}</p>
                {(eventLinkText && eventLinkUrl) || (eventLinkSecondaryText && eventLinkSecondaryUrl) ? (
                  <div className="mt-5 flex flex-wrap gap-3">
                    {eventLinkText && eventLinkUrl && (
                      <a
                        href={eventLinkUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-full bg-cerise px-5 py-2.5 font-medium text-white shadow-md transition hover:bg-cerise/80 focus:outline-none focus:ring-4 focus:ring-cerise/40"
                      >
                        {eventLinkText}
                      </a>
                    )}
                    {eventLinkSecondaryText && eventLinkSecondaryUrl && (
                      <a
                        href={eventLinkSecondaryUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 font-medium text-verydarkblue shadow-md transition hover:bg-white/80 focus:outline-none focus:ring-4 focus:ring-white/40"
                      >
                        {eventLinkSecondaryText}
                      </a>
                    )}
                  </div>
                ) : null}
                {googleCalendarUrl && (
                  <a
                    href={googleCalendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-block text-sm font-medium text-white underline decoration-cerise decoration-2 underline-offset-4 transition hover:text-cerise focus:outline-none focus:ring-4 focus:ring-cerise/40"
                  >
                    {t.event.calendar.addToGoogle}
                    <span className="sr-only"> {t.event.calendar.newTab}</span>
                  </a>
                )}
              </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Events() {
  const t = useLocale();

  const events: EventItem[] = [
    ...preFairTimeline.map((entry) => toEventItem(entry, t)),
    /*
        {
      date: "24/9",
      companyName: "",
      image: "/img/ddagen2024/banquette-dinner.jpg",
      fullImage: true,
      header: t.event.banquetSignup,
      text: t.event.banquetSignupText
    },*//*
    {
      date: "01/10",
      companyName: "Omegapoint",
      image: "/img/exhibitors/Omegapoint.svg",
      header: t.event.lunchSeminarHeader,
      text: t.event.lunchSeminar
    },*//*
    {
      date: "07/10",
      companyName: "https://ddagen.se/kontaktsamtal",
      companyUrl: "https://ddagen.se/kontaktsamtal",
      image: "/img/ff4.webp",
      fullImage: true,
      header: t.event.contactConversations,
      text: t.event.contactConversationsText
    },*/
  ]

  const fairEvents: EventItem[] = [
    ...fairTimeline.map((entry) => toEventItem(entry, t)),
    /*
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
    },*/
  ]

  const postFairEvents: EventItem[] = [/*
    {
      date: "13/10",
      companyName: "Försvarsmaktens Radioanstalt",
      image: "/img/exhibitors/FRA.png",
      header: t.event.lunchSeminarHeader,
      text: t.event.lunchSeminar
    },*/
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
        <CalendarExport />
        <div className="flex flex-col mt-4">
          <div className="max-sm:hidden flex justify-center">
            <div className="w-1 bg-cerise h-full min-h-[30px] rounded-t-full"></div>
          </div>
          <div className="relative before:absolute before:bottom-0 before:left-1/2 before:top-0 before:z-0 before:hidden before:w-1 before:-translate-x-1/2 before:bg-cerise before:content-[''] sm:before:block">
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
                companyUrl={event?.companyUrl}
                eventLinkText={event?.eventLinkText}
                eventLinkUrl={event?.eventLinkUrl}
                eventLinkSecondaryText={event?.eventLinkSecondaryText}
                eventLinkSecondaryUrl={event?.eventLinkSecondaryUrl}
                eventHash={event?.eventHash}
                eventDate={event?.eventDate}
                googleCalendarUrl={event?.googleCalendarUrl}
                />
              ))
            }
          </div>
          <div className="flex max-sm:hidden justify-center">
            <div className="w-1 bg-cerise h-full min-h-[30px] rounded-b-full"></div>
          </div>
          <div>
            <h1 className="text-5xl text-[#C2952C] p-4 font-medium text-center"> {t.event.fair} 8/10</h1>
          </div>
          <div className="max-sm:hidden flex justify-center">
            <div className="w-1 bg-[#C2952C] h-full min-h-[30px] rounded-t-full"></div>
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
              companyUrl={event?.companyUrl}
              eventLinkText={event?.eventLinkText}
              eventLinkUrl={event?.eventLinkUrl}
              eventLinkSecondaryText={event?.eventLinkSecondaryText}
              eventLinkSecondaryUrl={event?.eventLinkSecondaryUrl}
              eventDate={event?.eventDate}
              googleCalendarUrl={event?.googleCalendarUrl}
              />
            ))
          }
        </div>
          {postFairEvents.length === 0 && (
            <div className="flex max-sm:hidden justify-center">
              <div className="w-1 bg-[#C2952C] h-full min-h-[30px] rounded-b-full"></div>
            </div>
          )}
          {postFairEvents.length > 0 && (
            <>
              <div className="flex max-sm:hidden justify-center">
                <div className="w-4 bg-[#C2952C] h-full min-h-[30px] rounded-b-full"></div>
              </div>
              <div>
                <h1 className="text-5xl text-cerise p-4 font-medium text-center"> {t.event.after + " " + t.event.fair}</h1>
              </div>
              <div className="max-sm:hidden flex justify-center">
                <div className="w-1 bg-cerise h-full min-h-[30px] rounded-t-full"></div>
              </div>
              {postFairEvents.map((event, i) => (
                <SingleEvent
                  key={i}
                  color="bg-cerise"
                  toReverse={i%2 == 0}
                  image={event?.image}
                  showDate={!(i > 0 && event.date === postFairEvents[i-1].date)}
                  eventInfo={[
                    event.companyName,
                    event.header,
                    event.text,
                    event.date
                  ]}
                  companyUrl={event?.companyUrl}
                  eventLinkText={event?.eventLinkText}
                  eventLinkUrl={event?.eventLinkUrl}
                  eventLinkSecondaryText={event?.eventLinkSecondaryText}
                  eventLinkSecondaryUrl={event?.eventLinkSecondaryUrl}
                  />
                ))
              }
              <div className="flex max-sm:hidden justify-center">
                <div className="w-1 bg-cerise h-full min-h-[30px] rounded-b-full"></div>
              </div>
            </>
          )}
      </div>
      }
    </>
  );
}
