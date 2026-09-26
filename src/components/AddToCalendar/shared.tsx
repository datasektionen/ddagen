import { useLocale } from "@/locales";
import { calendarLinks, SITE_URL } from "@/shared/events";
import { useEffect, useRef, useState } from "react";

// Links for the calendar feed on the current host (ddagen.se when rendered on the server).
export function useCalendarLinks() {
  const t = useLocale();
  const [origin, setOrigin] = useState(SITE_URL);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  return calendarLinks(t.locale, origin);
}

async function writeClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }
}

// Copies text and reports `copied` for a moment afterwards.
export function useCopy(duration = 1500) {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timeout.current), []);

  const copy = async (text: string) => {
    await writeClipboard(text);
    setCopied(true);
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setCopied(false), duration);
  };

  return { copied, copy };
}

export const focusRing = "focus:outline-none focus-visible:ring-4 focus-visible:ring-cerise/40";

type IconProps = { className?: string };

const iconProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export function CalendarIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...iconProps} className={className}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

export function ChevronIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...iconProps} className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function DownloadIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14" />
    </svg>
  );
}

export function CopyIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...iconProps} className={className}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V6a2 2 0 0 1 2-2h9" />
    </svg>
  );
}

export function CheckIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...iconProps} className={className}>
      <path d="m5 12 5 5 9-10" />
    </svg>
  );
}

export function CloseIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
