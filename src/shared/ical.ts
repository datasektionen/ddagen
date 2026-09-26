// Minimal RFC 5545 (iCalendar) generator for the D-Dagen event feed.

export const TIMEZONE = "Europe/Stockholm";

// Local wall-clock time in Europe/Stockholm, e.g. "2026-10-08T10:00".
export type LocalDateTime = `${number}-${number}-${number}T${number}:${number}`;
// Calendar date, e.g. "2026-10-08".
export type LocalDate = `${number}-${number}-${number}`;

export type CalendarEventTime =
  | { allDay: false; start: LocalDateTime; end?: LocalDateTime }
  // `end` is the last day of the event (inclusive), like it is written on the page.
  | { allDay: true; start: LocalDate; end?: LocalDate };

export type IcsEvent = {
  uid: string;
  time: CalendarEventTime;
  summary: string;
  description?: string;
  location?: string;
  url?: string;
  sequence?: number;
};

export type IcsCalendar = {
  prodId: string;
  name: string;
  refreshInterval: string;
  events: IcsEvent[];
  now?: Date;
};

const CRLF = "\r\n";

// Full VTIMEZONE for Europe/Stockholm (CET/CEST, EU rules since 1996).
const STOCKHOLM_VTIMEZONE = [
  "BEGIN:VTIMEZONE",
  `TZID:${TIMEZONE}`,
  `X-LIC-LOCATION:${TIMEZONE}`,
  "BEGIN:DAYLIGHT",
  "TZOFFSETFROM:+0100",
  "TZOFFSETTO:+0200",
  "TZNAME:CEST",
  "DTSTART:19700329T020000",
  "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU",
  "END:DAYLIGHT",
  "BEGIN:STANDARD",
  "TZOFFSETFROM:+0200",
  "TZOFFSETTO:+0100",
  "TZNAME:CET",
  "DTSTART:19701025T030000",
  "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU",
  "END:STANDARD",
  "END:VTIMEZONE",
];

// Escape a TEXT value (RFC 5545 3.3.11).
export function escapeText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r\n|\r|\n/g, "\\n");
}

// Fold a content line at 75 octets without splitting UTF-8 characters (RFC 5545 3.1).
export function foldLine(line: string): string {
  const encoder = new TextEncoder();
  const parts: string[] = [];
  let current = "";
  let currentBytes = 0;
  let limit = 75;

  for (const char of line) {
    const bytes = encoder.encode(char).length;
    if (currentBytes + bytes > limit) {
      parts.push(current);
      current = "";
      currentBytes = 0;
      // Continuation lines start with a space, which counts toward the 75 octets.
      limit = 74;
    }
    current += char;
    currentBytes += bytes;
  }
  parts.push(current);

  return parts.join(CRLF + " ");
}

function formatDate(date: LocalDate): string {
  return date.replace(/-/g, "");
}

function formatDateTime(dateTime: LocalDateTime): string {
  return dateTime.replace(/[-:]/g, "") + "00";
}

export function formatUtc(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

// Day after `date`, used for the exclusive DTEND of all-day events.
export function nextDay(date: LocalDate): LocalDate {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10) as LocalDate;
}

function eventLines(event: IcsEvent, dtstamp: string): string[] {
  const lines = ["BEGIN:VEVENT", `UID:${event.uid}`, `DTSTAMP:${dtstamp}`];

  if (event.time.allDay) {
    lines.push(`DTSTART;VALUE=DATE:${formatDate(event.time.start)}`);
    lines.push(`DTEND;VALUE=DATE:${formatDate(nextDay(event.time.end ?? event.time.start))}`);
  } else {
    lines.push(`DTSTART;TZID=${TIMEZONE}:${formatDateTime(event.time.start)}`);
    if (event.time.end) {
      lines.push(`DTEND;TZID=${TIMEZONE}:${formatDateTime(event.time.end)}`);
    }
  }

  lines.push(`SEQUENCE:${event.sequence ?? 0}`);
  lines.push(`SUMMARY:${escapeText(event.summary)}`);
  if (event.description) lines.push(`DESCRIPTION:${escapeText(event.description)}`);
  if (event.location) lines.push(`LOCATION:${escapeText(event.location)}`);
  if (event.url) lines.push(`URL:${event.url}`);
  lines.push("END:VEVENT");

  return lines;
}

export function generateIcs(calendar: IcsCalendar): string {
  const dtstamp = formatUtc(calendar.now ?? new Date());

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:${calendar.prodId}`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeText(calendar.name)}`,
    `X-WR-TIMEZONE:${TIMEZONE}`,
    `REFRESH-INTERVAL;VALUE=DURATION:${calendar.refreshInterval}`,
    `X-PUBLISHED-TTL:${calendar.refreshInterval}`,
    ...STOCKHOLM_VTIMEZONE,
    ...calendar.events.flatMap((event) => eventLines(event, dtstamp)),
    "END:VCALENDAR",
  ];

  return lines.map(foldLine).join(CRLF) + CRLF;
}
