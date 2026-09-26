import ICAL from "ical.js";
import { describe, expect, it } from "vitest";
import {
  buildCalendar,
  calendarLinks,
  ddagenEvents,
  fairTimeline,
  getEvent,
  googleTemplateUrl,
  preFairTimeline,
  timelineLabel,
  timelinePastDate,
} from "@/shared/events";

const now = new Date("2026-09-26T12:00:00Z");

function parse(ics: string) {
  const vcalendar = new ICAL.Component(ICAL.parse(ics));
  const vtimezone = vcalendar.getFirstSubcomponent("vtimezone")!;
  ICAL.TimezoneService.register(new ICAL.Timezone(vtimezone));
  const events = vcalendar.getAllSubcomponents("vevent").map((c) => new ICAL.Event(c));
  return { vcalendar, events, byUid: (uid: string) => events.find((e) => e.uid === uid)! };
}

const utc = (t: ICAL.Time) => t.toJSDate().toISOString();

describe("event data", () => {
  it("has stable, unique ids", () => {
    // These are published as UIDs. Changing them duplicates events for subscribers.
    expect(ddagenEvents.map((e) => e.id)).toEqual([
      "recruitment-pub-2026",
      "ericsson-night-2026",
      "kth-innovation-pitch-2026",
      "ai-society-hackathon-2026",
      "modal-aw-2026",
      "ddagen-fair-2026",
      "ddagen-banquet-2026",
    ]);
  });

  it("renders the same timeline labels as the old hard-coded page", () => {
    expect(preFairTimeline.map(timelineLabel)).toEqual(["16/9", "30/9", "1/10", "28/9 - 9/10", "5/10"]);
    expect(fairTimeline.map(timelineLabel)).toEqual(["10:00", "16:00", "18:00"]);
  });

  it("keeps the same past-event dates as before", () => {
    expect(preFairTimeline.map(timelinePastDate)).toEqual([
      "2026-09-16",
      "2026-09-30",
      "2026-10-01",
      undefined,
      "2026-10-05",
    ]);
    expect(fairTimeline.map(timelinePastDate)).toEqual([undefined, undefined, undefined]);
  });
});

describe("calendar feed parsed with ical.js", () => {
  const sv = parse(buildCalendar("sv", now));
  const en = parse(buildCalendar("en", now));

  it("contains all events with stable UIDs", () => {
    expect(sv.events.map((e) => e.uid)).toEqual(ddagenEvents.map((e) => `${e.id}@ddagen.se`));
    expect(en.events.map((e) => e.uid)).toEqual(sv.events.map((e) => e.uid));
  });

  it("is stable between builds except DTSTAMP", () => {
    const later = new Date("2026-10-01T00:00:00Z");
    const strip = (s: string) => s.replace(/^DTSTAMP:.*$/gm, "");
    expect(strip(buildCalendar("sv", later))).toBe(strip(buildCalendar("sv", now)));
  });

  it("has calendar properties", () => {
    const cal = sv.vcalendar;
    expect(cal.getFirstPropertyValue("version")).toBe("2.0");
    expect(cal.getFirstPropertyValue("calscale")).toBe("GREGORIAN");
    expect(cal.getFirstPropertyValue("method")).toBe("PUBLISH");
    expect(cal.getFirstPropertyValue("x-wr-calname")).toBe("D-Dagen 2026");
    expect(cal.getFirstPropertyValue("x-wr-timezone")).toBe("Europe/Stockholm");
    expect(cal.getFirstPropertyValue("x-published-ttl")).toBe("PT12H");
    expect(String(cal.getFirstPropertyValue("refresh-interval"))).toBe("PT12H");
  });

  it("converts Stockholm summer time to UTC (8/10 10:00 → 08:00Z)", () => {
    const fair = sv.byUid("ddagen-fair-2026@ddagen.se");
    expect(fair.startDate.zone?.tzid).toBe("Europe/Stockholm");
    expect(utc(fair.startDate)).toBe("2026-10-08T08:00:00.000Z");
    expect(utc(fair.endDate)).toBe("2026-10-08T14:00:00.000Z");
  });

  it("parses the other timed events", () => {
    expect(utc(sv.byUid("recruitment-pub-2026@ddagen.se").startDate)).toBe("2026-09-16T15:17:00.000Z");
    expect(utc(sv.byUid("ericsson-night-2026@ddagen.se").startDate)).toBe("2026-09-30T15:17:00.000Z");
    expect(utc(sv.byUid("modal-aw-2026@ddagen.se").startDate)).toBe("2026-10-05T15:30:00.000Z");
    expect(utc(sv.byUid("ddagen-banquet-2026@ddagen.se").startDate)).toBe("2026-10-08T16:00:00.000Z");
  });

  it("leaves out DTEND where the end time is unknown", () => {
    for (const uid of ["ericsson-night-2026", "modal-aw-2026", "ddagen-banquet-2026", "recruitment-pub-2026"]) {
      expect(sv.byUid(`${uid}@ddagen.se`).component.hasProperty("dtend")).toBe(false);
    }
  });

  it("parses all-day and multi-day events", () => {
    const pitch = sv.byUid("kth-innovation-pitch-2026@ddagen.se");
    expect(pitch.startDate.isDate).toBe(true);
    expect(pitch.startDate.toString()).toBe("2026-10-01");
    expect(pitch.endDate.toString()).toBe("2026-10-02");

    const hackathon = sv.byUid("ai-society-hackathon-2026@ddagen.se");
    expect(hackathon.startDate.isDate).toBe(true);
    expect(hackathon.startDate.toString()).toBe("2026-09-28");
    expect(hackathon.endDate.toString()).toBe("2026-10-10");
  });

  it("round-trips escaped text", () => {
    const modal = sv.byUid("modal-aw-2026@ddagen.se");
    expect(modal.location).toBe("Modal, Sveavägen 17, Stockholm");
    expect(modal.description).toBe(
      "Tid: 17:30 \nPlats: Modals kontor på Sveavägen 17\n\nEventsida: https://luma.com/2ammix32\nMer info: https://ddagen.se/event"
    );
    expect(modal.component.getFirstPropertyValue("url")).toBe("https://ddagen.se/event");
    expect(modal.sequence).toBe(0);
  });

  it("labels every link once", () => {
    const banquet = sv.byUid("ddagen-banquet-2026@ddagen.se");
    expect(banquet.description).toBe(
      "Banketten efter mässan. Start 18:00.\n\nAnmälan: https://dsekt.se/ddagensittning\nMer info: https://ddagen.se/event"
    );
  });

  it("has Swedish and English variants", () => {
    expect(sv.byUid("ddagen-fair-2026@ddagen.se").summary).toBe("D-Dagen 2026 – mässan");
    expect(en.byUid("ddagen-fair-2026@ddagen.se").summary).toBe("D-Dagen 2026 – the fair");
    const pitch = en.byUid("kth-innovation-pitch-2026@ddagen.se");
    expect(pitch.description).toContain("Competition Sign Up: https://tally.so/r/yPQLRx");
    expect(pitch.component.getFirstPropertyValue("url")).toBe("https://ddagen.se/en/event#pitch");
    expect(en.vcalendar.getFirstPropertyValue("prodid")).toBe("-//D-Dagen//ddagen.se Events//EN");
  });
});

describe("links", () => {
  it("builds subscription links", () => {
    expect(calendarLinks("sv")).toEqual({
      https: "https://ddagen.se/ddagen.ics",
      webcal: "webcal://ddagen.se/ddagen.ics",
      google: "https://calendar.google.com/calendar/r?cid=webcal%3A%2F%2Fddagen.se%2Fddagen.ics",
      download: "https://ddagen.se/ddagen.ics?download=1",
    });
    const en = calendarLinks("en");
    expect(en.https).toBe("https://ddagen.se/ddagen.ics?lang=en");
    expect(en.webcal).toBe("webcal://ddagen.se/ddagen.ics?lang=en");
    expect(new URL(en.google).searchParams.get("cid")).toBe("webcal://ddagen.se/ddagen.ics?lang=en");
    expect(en.download).toBe("https://ddagen.se/ddagen.ics?lang=en&download=1");
  });

  it("builds Google TEMPLATE links with time, place and description", () => {
    const fair = new URL(googleTemplateUrl("sv", getEvent("ddagen-fair-2026")));
    expect(fair.searchParams.get("action")).toBe("TEMPLATE");
    expect(fair.searchParams.get("text")).toBe("D-Dagen 2026 – mässan");
    expect(fair.searchParams.get("dates")).toBe("20261008T100000/20261008T160000");
    expect(fair.searchParams.get("ctz")).toBe("Europe/Stockholm");
    expect(fair.searchParams.get("location")).toBe("Nymble, Drottning Kristinas väg 15-19, Stockholm");
    expect(fair.searchParams.get("details")).toContain("Mer info: https://ddagen.se/event");

    const hackathon = new URL(googleTemplateUrl("en", getEvent("ai-society-hackathon-2026")));
    expect(hackathon.searchParams.get("dates")).toBe("20260928/20261010");
    expect(hackathon.searchParams.has("ctz")).toBe(false);
  });

  it("encodes spaces as %20 and never leaves raw reserved characters", () => {
    for (const event of ddagenEvents) {
      for (const locale of ["sv", "en"] as const) {
        const query = googleTemplateUrl(locale, event).split("?")[1];
        expect(query).not.toMatch(/[ +#,;åäö\n]/);
      }
    }
  });
});
