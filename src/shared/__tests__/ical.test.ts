import { describe, expect, it } from "vitest";
import { escapeText, foldLine, generateIcs, nextDay } from "@/shared/ical";

const bytes = (s: string) => Buffer.byteLength(s, "utf8");

describe("escapeText", () => {
  it("escapes backslash, semicolon, comma and newlines", () => {
    expect(escapeText("a,b;c\\d\ne\r\nf")).toBe("a\\,b\\;c\\\\d\\ne\\nf");
  });

  it("leaves å/ä/ö and colons alone", () => {
    expect(escapeText("Sveavägen 17: kl. 17:30, öl")).toBe("Sveavägen 17: kl. 17:30\\, öl");
  });
});

describe("foldLine", () => {
  it("does not fold short lines", () => {
    expect(foldLine("SUMMARY:Modal AW")).toBe("SUMMARY:Modal AW");
  });

  it("folds at 75 octets without splitting å/ä/ö", () => {
    const line = "DESCRIPTION:" + "åäö ".repeat(60);
    const folded = foldLine(line);
    const lines = folded.split("\r\n");

    expect(lines.length).toBeGreaterThan(1);
    for (const l of lines) {
      expect(bytes(l)).toBeLessThanOrEqual(75);
      // A split multi-byte char would not round-trip through UTF-8.
      expect(Buffer.from(l, "utf8").toString("utf8")).toBe(l);
      expect(l).not.toContain("�");
    }
    lines.slice(1).forEach((l) => expect(l.startsWith(" ")).toBe(true));
    expect(lines.map((l, i) => (i === 0 ? l : l.slice(1))).join("")).toBe(line);
  });

  it("does not split emoji surrogate pairs", () => {
    const line = "SUMMARY:" + "🎉".repeat(40);
    const unfolded = foldLine(line).replace(/\r\n /g, "");
    expect(unfolded).toBe(line);
  });
});

describe("nextDay", () => {
  it("rolls over month ends", () => {
    expect(nextDay("2026-09-30")).toBe("2026-10-01");
    expect(nextDay("2026-10-09")).toBe("2026-10-10");
    expect(nextDay("2026-12-31")).toBe("2027-01-01");
  });
});

describe("generateIcs", () => {
  const now = new Date("2026-09-26T07:21:36.123Z");
  const ics = generateIcs({
    prodId: "-//Test//Test//SV",
    name: "Test",
    refreshInterval: "PT12H",
    now,
    events: [
      {
        uid: "timed@ddagen.se",
        time: { allDay: false, start: "2026-10-08T10:00", end: "2026-10-08T16:00" },
        summary: "Mässan",
        description: "Rad ett\nRad två, med komma; och semikolon \\ backslash. " + "Lång text ".repeat(20),
        location: "Nymble, Drottning Kristinas väg 15-19",
        url: "https://ddagen.se/event",
      },
      { uid: "open-ended@ddagen.se", time: { allDay: false, start: "2026-10-05T17:30" }, summary: "AW" },
      { uid: "single-day@ddagen.se", time: { allDay: true, start: "2026-10-01" }, summary: "Pitch" },
      {
        uid: "multi-day@ddagen.se",
        time: { allDay: true, start: "2026-09-28", end: "2026-10-09" },
        summary: "Hackathon",
        sequence: 2,
      },
    ],
  });
  const lines = ics.split("\r\n");

  it("uses CRLF only and ends with CRLF", () => {
    expect(ics.replace(/\r\n/g, "")).not.toMatch(/[\r\n]/);
    expect(ics.endsWith("END:VCALENDAR\r\n")).toBe(true);
  });

  it("keeps every line within 75 octets", () => {
    lines.forEach((l) => expect(bytes(l)).toBeLessThanOrEqual(75));
  });

  it("writes the calendar header", () => {
    for (const expected of [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Test//Test//SV",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "X-WR-CALNAME:Test",
      "X-WR-TIMEZONE:Europe/Stockholm",
      "REFRESH-INTERVAL;VALUE=DURATION:PT12H",
      "X-PUBLISHED-TTL:PT12H",
      "BEGIN:VTIMEZONE",
      "TZID:Europe/Stockholm",
      "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU",
      "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU",
    ]) {
      expect(lines).toContain(expected);
    }
  });

  it("writes DTSTAMP in UTC", () => {
    expect(lines).toContain("DTSTAMP:20260926T072136Z");
  });

  it("writes timed events with TZID", () => {
    expect(lines).toContain("DTSTART;TZID=Europe/Stockholm:20261008T100000");
    expect(lines).toContain("DTEND;TZID=Europe/Stockholm:20261008T160000");
  });

  it("omits DTEND when the end time is unknown", () => {
    const aw = ics.slice(ics.indexOf("UID:open-ended"), ics.indexOf("END:VEVENT", ics.indexOf("UID:open-ended")));
    expect(aw).toContain("DTSTART;TZID=Europe/Stockholm:20261005T173000");
    expect(aw).not.toContain("DTEND");
  });

  it("writes all-day events with an exclusive DTEND", () => {
    expect(lines).toContain("DTSTART;VALUE=DATE:20261001");
    expect(lines).toContain("DTEND;VALUE=DATE:20261002");
  });

  it("writes multi-day events", () => {
    expect(lines).toContain("DTSTART;VALUE=DATE:20260928");
    expect(lines).toContain("DTEND;VALUE=DATE:20261010");
    expect(lines).toContain("SEQUENCE:2");
  });

  it("escapes text values and keeps URLs raw", () => {
    const unfolded = ics.replace(/\r\n /g, "");
    expect(unfolded).toContain("DESCRIPTION:Rad ett\\nRad två\\, med komma\\; och semikolon \\\\ backslash.");
    expect(unfolded).toContain("LOCATION:Nymble\\, Drottning Kristinas väg 15-19");
    expect(unfolded).toContain("URL:https://ddagen.se/event");
  });
});
