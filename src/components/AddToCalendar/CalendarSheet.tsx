import { useLocale } from "@/locales";
import { useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import {
  CalendarIcon,
  CheckIcon,
  CloseIcon,
  CopyIcon,
  DownloadIcon,
  focusRing,
  useCalendarLinks,
  useCopy,
} from "./shared";

type Platform = "ios" | "android" | null;

function detectPlatform(): Platform {
  const ua = navigator.userAgent;
  // iPadOS reports itself as a Mac, but with touch support.
  if (/iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return "ios";
  if (/Android/i.test(ua)) return "android";
  return null;
}

const ANIMATION_MS = 200;
const SWIPE_CLOSE_PX = 80;

// Mobile: one button that opens a bottom sheet with the calendar options.
export default function CalendarSheet() {
  const t = useLocale();
  const c = t.event.calendar;
  const links = useCalendarLinks();
  const { copied, copy } = useCopy();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [platform, setPlatform] = useState<Platform>(null);
  const [dragY, setDragY] = useState(0);
  const dragStart = useRef<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout>>();
  const sheetId = useId();
  const titleId = useId();
  const subtitleId = useId();

  useEffect(() => {
    setPlatform(detectPlatform());
    return () => clearTimeout(closeTimeout.current);
  }, []);

  const close = () => {
    setVisible(false);
    clearTimeout(closeTimeout.current);
    closeTimeout.current = setTimeout(() => {
      setOpen(false);
      setDragY(0);
      triggerRef.current?.focus();
    }, ANIMATION_MS);
  };

  useEffect(() => {
    if (!open) return;

    const frame = requestAnimationFrame(() => setVisible(true));
    sheetRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // The sheet is hidden from md and up, so close it if the window grows.
    const desktop = window.matchMedia("(min-width: 768px)");
    const onChange = () => desktop.matches && close();
    desktop.addEventListener("change", onChange);

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", onChange);
    };
  }, [open]);

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== "Tab" || !sheetRef.current) return;

    const focusable = Array.from(sheetRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && (active === first || active === sheetRef.current)) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  const onDragStart = (event: PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("button")) return;
    dragStart.current = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onDragMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStart.current === null) return;
    setDragY(Math.max(0, event.clientY - dragStart.current));
  };

  const onDragEnd = () => {
    if (dragStart.current === null) return;
    dragStart.current = null;
    if (dragY > SWIPE_CLOSE_PX) close();
    else setDragY(0);
  };

  const options = [
    { key: "apple", href: links.webcal, label: c.apple, newTab: false, suggested: platform === "ios" },
    { key: "google", href: links.google, label: c.google, newTab: true, suggested: platform === "android" },
  ];

  const secondaryClass = `flex h-12 items-center justify-center gap-2 rounded-[14px] border border-white/20 font-bold text-white transition hover:bg-white/10 ${focusRing}`;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={sheetId}
        onClick={() => setOpen(true)}
        className={`inline-flex h-12 items-center gap-2 rounded-full bg-cerise px-6 font-bold text-white shadow-md transition hover:bg-cerise/80 ${focusRing}`}
      >
        <CalendarIcon />
        {c.triggerMobile}
      </button>

      {open && (
        <div className="fixed inset-0 z-[70]">
          <div
            aria-hidden
            onClick={close}
            className={`absolute inset-0 bg-verydarkblue/80 backdrop-blur-sm transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"}`}
          />
          <div
            ref={sheetRef}
            id={sheetId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={subtitleId}
            tabIndex={-1}
            onKeyDown={onKeyDown}
            style={{ transform: visible ? `translateY(${dragY}px)` : "translateY(100%)" }}
            className={`absolute inset-x-0 bottom-0 mx-auto max-w-lg overflow-hidden rounded-t-3xl border-t border-white/10 bg-darkblue shadow-2xl shadow-black/50 focus:outline-none motion-reduce:transition-none ${dragStart.current === null ? "transition-transform duration-200" : ""}`}
          >
            <div className="bg-white/5 px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-3">
              <div
                onPointerDown={onDragStart}
                onPointerMove={onDragMove}
                onPointerUp={onDragEnd}
                onPointerCancel={onDragEnd}
                className="touch-none"
              >
                <div aria-hidden className="mx-auto h-1.5 w-10 rounded-full bg-white/20" />
                <div className="mt-3 flex items-start justify-between gap-4 pl-2">
                  <div className="pt-1 text-left">
                    <h2 id={titleId} className="text-2xl font-bold text-white">
                      {c.sheetTitle}
                    </h2>
                    <p id={subtitleId} className="mt-1 text-white/60">
                      {c.sheetSubtitle}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label={c.close}
                    onClick={close}
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 ${focusRing}`}
                  >
                    <CloseIcon />
                  </button>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3">
                {options.map((option) => (
                  <a
                    key={option.key}
                    href={option.href}
                    target={option.newTab ? "_blank" : undefined}
                    rel={option.newTab ? "noopener noreferrer" : undefined}
                    onClick={close}
                    className={`flex h-[60px] items-center justify-between rounded-[14px] px-5 text-lg font-bold text-white transition ${focusRing} ${
                      option.suggested ? "bg-cerise hover:bg-cerise/80" : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    <span>
                      {option.label}
                      {option.newTab && <span className="sr-only"> {c.newTab}</span>}
                    </span>
                    {option.suggested && <span className="text-sm font-medium">{c.suggested}</span>}
                  </a>
                ))}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <button type="button" onClick={() => copy(links.https)} className={secondaryClass}>
                  {copied ? <CheckIcon /> : <CopyIcon />}
                  <span aria-live="polite">{copied ? c.copied : c.copyShort}</span>
                </button>
                <a href={links.download} download onClick={close} className={secondaryClass}>
                  <DownloadIcon />
                  {c.download}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
