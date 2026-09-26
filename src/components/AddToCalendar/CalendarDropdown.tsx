import { useLocale } from "@/locales";
import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import {
  CalendarIcon,
  CheckIcon,
  ChevronIcon,
  CopyIcon,
  DownloadIcon,
  focusRing,
  useCalendarLinks,
  useCopy,
} from "./shared";

const rowClass =
  "flex min-h-[56px] w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-white transition hover:bg-white/10 focus:outline-none focus-visible:bg-white/10";

function RowText({ label, hint }: { label: ReactNode; hint?: string }) {
  return (
    <span className="flex flex-col">
      <span className="font-bold">{label}</span>
      {hint && <span className="text-sm text-white/60">{hint}</span>}
    </span>
  );
}

function Tile({ letter }: { letter: string }) {
  return (
    <span aria-hidden className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-sm font-black text-verydarkblue">
      {letter}
    </span>
  );
}

function PlainIcon({ children }: { children: ReactNode }) {
  return <span className="flex h-8 w-8 shrink-0 items-center justify-center text-white/60">{children}</span>;
}

// Desktop: one button that opens a menu with the calendar options.
export default function CalendarDropdown() {
  const t = useLocale();
  const c = t.event.calendar;
  const links = useCalendarLinks();
  const { copied, copy } = useCopy();
  const [open, setOpen] = useState(false);
  const [focusLast, setFocusLast] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout>>();
  const menuId = useId();

  const items = () => Array.from(menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []);

  const close = (returnFocus = true) => {
    clearTimeout(closeTimeout.current);
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  };

  const openMenu = (last = false) => {
    setFocusLast(last);
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const list = items();
    (focusLast ? list[list.length - 1] : list[0])?.focus();

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!menuRef.current?.contains(target) && !buttonRef.current?.contains(target)) close(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, focusLast]);

  useEffect(() => () => clearTimeout(closeTimeout.current), []);

  const onButtonKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      openMenu(event.key === "ArrowUp");
    }
  };

  const onMenuKeyDown = (event: KeyboardEvent) => {
    const list = items();
    const index = list.indexOf(document.activeElement as HTMLElement);
    const focus = (i: number) => list[(i + list.length) % list.length]?.focus();

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        focus(index + 1);
        break;
      case "ArrowUp":
        event.preventDefault();
        focus(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focus(0);
        break;
      case "End":
        event.preventDefault();
        focus(list.length - 1);
        break;
      case "Escape":
      case "Tab":
        event.preventDefault();
        close();
        break;
    }
  };

  const onCopy = async () => {
    await copy(links.https);
    clearTimeout(closeTimeout.current);
    closeTimeout.current = setTimeout(() => close(), 1000);
  };

  return (
    <div className="relative flex justify-center">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => (open ? close() : openMenu())}
        onKeyDown={onButtonKeyDown}
        className={`inline-flex h-[52px] items-center gap-3 rounded-full bg-cerise px-7 font-bold text-white shadow-md transition hover:bg-cerise/80 ${focusRing}`}
      >
        <CalendarIcon />
        {c.triggerDesktop}
        <ChevronIcon className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <span className="sr-only" aria-live="polite">
        {copied ? c.copied : ""}
      </span>

      {open && (
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          aria-label={c.triggerDesktop}
          onKeyDown={onMenuKeyDown}
          className="absolute left-1/2 top-full z-40 mt-3 w-[360px] max-w-[calc(100vw-2rem)] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-darkblue shadow-2xl shadow-black/50"
        >
          <div className="bg-white/5 p-2">
            <a role="menuitem" href={links.google} target="_blank" rel="noopener noreferrer" onClick={() => close()} className={rowClass}>
              <Tile letter="G" />
              <RowText
                label={
                  <>
                    {c.google}
                    <span className="sr-only"> {c.newTab}</span>
                  </>
                }
                hint={c.googleHint}
              />
            </a>
            <a role="menuitem" href={links.webcal} onClick={() => close()} className={rowClass}>
              <Tile letter="A" />
              <RowText label={c.apple} hint={c.appleHint} />
            </a>

            <div role="separator" className="mx-3 my-2 h-px bg-white/10" />

            <a role="menuitem" href={links.download} download onClick={() => close()} className={rowClass}>
              <PlainIcon>
                <DownloadIcon />
              </PlainIcon>
              <RowText label={c.download} hint={c.downloadHint} />
            </a>
            <button role="menuitem" type="button" onClick={onCopy} className={rowClass}>
              <PlainIcon>{copied ? <CheckIcon /> : <CopyIcon />}</PlainIcon>
              <RowText label={copied ? c.copied : c.copy} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
