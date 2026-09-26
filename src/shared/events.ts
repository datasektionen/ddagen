// Single source of truth for D-Dagen events. Used by the event page and the
// calendar feed (/api/calendar, /ddagen.ics).
//
// - `id` is used in the calendar UID. Never change it once published, or
//   subscribers get duplicate events.
// - Bump `sequence` when the time or place of a published event changes.
// - Times are local Europe/Stockholm wall-clock time.

import en from "@/locales/en";
import sv from "@/locales/sv";
import {
  generateIcs,
  nextDay,
  type CalendarEventTime,
  type IcsEvent,
  type LocalDate,
} from "@/shared/ical";

export const SITE_URL = "https://ddagen.se";
export const CALENDAR_PATH = "/ddagen.ics";
export const CALENDAR_FILENAME = "ddagen-2026.ics";

export type EventLocale = "sv" | "en";
type EventTexts = typeof sv.event;

type TextKey<T> = {
  [K in keyof T & string]: T[K] extends string
    ? K
    : T[K] extends object
    ? `${K}.${TextKey<T[K]>}`
    : never;
}[keyof T & string];

// Translation key relative to `t.event`, e.g. "modalAW.header".
export type EventTextKey = TextKey<EventTexts>;

export function eventText(locale: EventLocale, key: EventTextKey): string {
  let value: unknown = (locale === "en" ? en : sv).event;
  for (const part of key.split(".")) {
    value = (value as Record<string, unknown>)[part];
  }
  return value as string;
}

export type EventLink = {
  url: string;
  labelKey?: EventTextKey;
};

export type DDagenEvent = {
  id: string;
  sequence?: number;
  time: CalendarEventTime;
  location?: string;
  links: EventLink[];
  summaryKey: EventTextKey;
  descriptionKey?: EventTextKey;
  // Anchor on the event page, e.g. /event#pitch.
  pageHash?: string;
};

export const ddagenEvents: DDagenEvent[] = [
  {
    id: "recruitment-pub-2026",
    time: { allDay: false, start: "2026-09-16T17:17" }, // TODO: end time unknown
    location: "META, KTH",
    links: [],
    summaryKey: "recruitmentPub",
    descriptionKey: "recruitmentPubText",
  },
  {
    id: "ericsson-night-2026",
    time: { allDay: false, start: "2026-09-30T17:17" }, // TODO: end time unknown
    location: "META, KTH",
    links: [{ url: "https://luma.com/home", labelKey: "ddagenXericssonNight.eventText" }],
    summaryKey: "ddagenXericssonNight.header",
    descriptionKey: "ddagenXericssonNight.text",
  },
  {
    id: "kth-innovation-pitch-2026",
    time: { allDay: true, start: "2026-10-01" }, // TODO: start/end time and location unknown
    links: [
      { url: "https://luma.com/225vk2jh", labelKey: "innovationPitchCompetition.eventText" },
      { url: "https://tally.so/r/yPQLRx", labelKey: "innovationPitchCompetition.eventSignUpText" },
    ],
    summaryKey: "innovationPitchCompetition.header",
    descriptionKey: "innovationPitchCompetition.text",
    pageHash: "pitch",
  },
  {
    id: "ai-society-hackathon-2026",
    time: { allDay: true, start: "2026-09-28", end: "2026-10-09" }, // TODO: times and location unknown
    links: [{ url: "https://luma.com/kthais-d6jh", labelKey: "ais.eventText" }],
    summaryKey: "ais.header",
    descriptionKey: "calendar.hackathonDescription",
  },
  {
    id: "modal-aw-2026",
    time: { allDay: false, start: "2026-10-05T17:30" }, // TODO: end time unknown
    location: "Modal, Sveavägen 17, Stockholm",
    links: [{ url: "https://luma.com/2ammix32", labelKey: "modalAW.eventText" }],
    summaryKey: "modalAW.header",
    descriptionKey: "modalAW.text",
  },
  {
    id: "ddagen-fair-2026",
    time: { allDay: false, start: "2026-10-08T10:00", end: "2026-10-08T16:00" },
    location: "Nymble, Drottning Kristinas väg 15-19, Stockholm",
    links: [],
    summaryKey: "calendar.fairSummary",
    descriptionKey: "calendar.fairDescription",
  },
  {
    id: "ddagen-banquet-2026",
    time: { allDay: false, start: "2026-10-08T18:00" }, // TODO: end time and location unknown
    links: [{ url: "https://dsekt.se/ddagensittning", labelKey: "calendar.banquetLinkText" }],
    summaryKey: "calendar.banquetSummary",
    descriptionKey: "calendar.banquetDescription",
  },
];

export function getEvent(id: string): DDagenEvent {
  const event = ddagenEvents.find((e) => e.id === id);
  if (!event) throw new Error(`Unknown event id: ${id}`);
  return event;
}

// Page timeline. Each entry points at an event above; `label` decides what is
// shown in the timeline bubble.
export type TimelineEntry = {
  eventId: string;
  label: "date" | "startTime" | "endTime";
  companyName?: string;
  companyNameKey?: EventTextKey;
  companyUrl?: string;
  headerKey: EventTextKey;
  textKey?: EventTextKey;
  image: string;
  fullImage?: boolean;
  // Show the event links as buttons in the modal (links need a label).
  showLinks?: boolean;
};

export const preFairTimeline: TimelineEntry[] = [
  {
    eventId: "recruitment-pub-2026",
    label: "date",
    companyName: "EECS event",
    image: "/img/ddagen2024/rekrytPub.jpg",
    fullImage: true,
    headerKey: "recruitmentPub",
    textKey: "recruitmentPubText",
  },
  {
    eventId: "ericsson-night-2026",
    label: "date",
    companyName: "Ericsson",
    companyUrl: "https://www.ericsson.com/",
    image: "/img/exhibitors/ericsson.png",
    fullImage: true,
    headerKey: "ddagenXericssonNight.header",
    textKey: "ddagenXericssonNight.text",
    showLinks: true,
  },
  {
    eventId: "kth-innovation-pitch-2026",
    label: "date",
    companyName: "KTH Innovation",
    companyUrl: "https://www.kth.se/innovation",
    image: "/img/events/pitch-comp.png",
    fullImage: true,
    headerKey: "innovationPitchCompetition.header",
    textKey: "innovationPitchCompetition.text",
    showLinks: true,
  },
  {
    eventId: "ai-society-hackathon-2026",
    label: "date",
    companyName: "AI Society",
    companyUrl: "https://kthais.com/",
    image: "/img/events/ais_hackathon.png",
    fullImage: true,
    headerKey: "ais.header",
    textKey: "ais.text",
    showLinks: true,
  },
  {
    eventId: "modal-aw-2026",
    label: "date",
    companyName: "Modal",
    companyUrl: "https://modal.com/",
    image: "/img/events/modal_aw.png",
    fullImage: true,
    headerKey: "modalAW.header",
    textKey: "modalAW.text",
    showLinks: true,
  },
];

export const fairTimeline: TimelineEntry[] = [
  {
    eventId: "ddagen-fair-2026",
    label: "startTime",
    companyNameKey: "opening",
    image: "/img/ddagen2024/ddagen-entry-balloons.jpg",
    fullImage: true,
    headerKey: "welcome",
  },
  {
    eventId: "ddagen-fair-2026",
    label: "endTime",
    companyName: "",
    image: "/img/ddagen2024/ddagen-exhibitors.jpg",
    fullImage: true,
    headerKey: "closes",
  },
  {
    eventId: "ddagen-banquet-2026",
    label: "startTime",
    companyName: "",
    image: "/img/ddagen2024/banquette-dinner.jpg",
    fullImage: true,
    headerKey: "banquet",
  },
];

function dayMonth(date: string): string {
  const [, month, day] = date.slice(0, 10).split("-");
  return `${Number(day)}/${Number(month)}`;
}

function startDate(event: DDagenEvent): LocalDate {
  return event.time.start.slice(0, 10) as LocalDate;
}

function endDate(event: DDagenEvent): LocalDate {
  return (event.time.end ?? event.time.start).slice(0, 10) as LocalDate;
}

// Text in the timeline bubble, e.g. "30/9", "28/9 - 9/10" or "10:00".
export function timelineLabel(entry: TimelineEntry): string {
  const event = getEvent(entry.eventId);
  if (entry.label === "date") {
    const start = startDate(event);
    const end = endDate(event);
    return start === end ? dayMonth(start) : `${dayMonth(start)} - ${dayMonth(end)}`;
  }
  const time = entry.label === "endTime" ? event.time.end : event.time.start;
  if (!time || time.length < 16) throw new Error(`No ${entry.label} for ${event.id}`);
  return time.slice(11, 16);
}

// Date used to grey out past single-day events on the page.
export function timelinePastDate(entry: TimelineEntry): string | undefined {
  const event = getEvent(entry.eventId);
  if (entry.label !== "date" || startDate(event) !== endDate(event)) return undefined;
  return startDate(event);
}

export function eventPageUrl(locale: EventLocale, event?: DDagenEvent): string {
  const hash = event?.pageHash ? `#${event.pageHash}` : "";
  return `${SITE_URL}${locale === "en" ? "/en" : ""}/event${hash}`;
}

function linkLabel(locale: EventLocale, link: EventLink): string {
  return eventText(locale, link.labelKey ?? "calendar.moreInfo");
}

export function eventDescription(locale: EventLocale, event: DDagenEvent): string {
  const parts: string[] = [];
  const text = event.descriptionKey ? eventText(locale, event.descriptionKey).trim() : "";
  if (text) parts.push(text);
  const links = event.links.map((link) => `${linkLabel(locale, link)}: ${link.url}`);
  links.push(`${eventText(locale, "calendar.moreInfo")}: ${eventPageUrl(locale, event)}`);
  parts.push(links.join("\n"));
  return parts.join("\n\n");
}

export function toIcsEvent(locale: EventLocale, event: DDagenEvent): IcsEvent {
  return {
    uid: `${event.id}@ddagen.se`,
    sequence: event.sequence ?? 0,
    time: event.time,
    summary: eventText(locale, event.summaryKey),
    description: eventDescription(locale, event),
    location: event.location,
    url: eventPageUrl(locale, event),
  };
}

export function buildCalendar(locale: EventLocale, now?: Date): string {
  return generateIcs({
    prodId: `-//D-Dagen//ddagen.se Events//${locale.toUpperCase()}`,
    name: eventText(locale, "calendar.name"),
    refreshInterval: "PT12H",
    events: ddagenEvents.map((event) => toIcsEvent(locale, event)),
    now,
  });
}

export function calendarLinks(locale: EventLocale, origin: string = SITE_URL) {
  const query = locale === "en" ? "?lang=en" : "";
  const https = `${origin}${CALENDAR_PATH}${query}`;
  const webcal = https.replace(/^https?:/, "webcal:");
  return {
    webcal,
    google: `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(webcal)}`,
    download: `${origin}${CALENDAR_PATH}${query ? `${query}&` : "?"}download=1`,
  };
}

function compact(dateOrTime: string): string {
  return dateOrTime.replace(/[-:]/g, "");
}

// "Add to Google Calendar" link for a single event (action=TEMPLATE).
export function googleTemplateUrl(locale: EventLocale, event: DDagenEvent): string {
  let dates: string;
  if (event.time.allDay) {
    dates = `${compact(event.time.start)}/${compact(nextDay(event.time.end ?? event.time.start))}`;
  } else {
    // Without a known end time the event is added with zero length.
    const start = `${compact(event.time.start)}00`;
    const end = event.time.end ? `${compact(event.time.end)}00` : start;
    dates = `${start}/${end}`;
  }

  const params: [string, string | undefined][] = [
    ["action", "TEMPLATE"],
    ["text", eventText(locale, event.summaryKey)],
    ["dates", dates],
    ["ctz", event.time.allDay ? undefined : "Europe/Stockholm"],
    ["details", eventDescription(locale, event)],
    ["location", event.location],
  ];

  const query = params
    .filter((param): param is [string, string] => !!param[1])
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

  return `https://calendar.google.com/calendar/render?${query}`;
}
