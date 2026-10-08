import {useLocale} from "@/locales";
import {useEffect, useState} from "react";
import Confetti from "react-confetti";

function TimeUnit({time, timeString,}: {time: number; timeString: string;}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-white text-3xl sm:text-4xl leading-none">
        {time}
      </div>
      <div className="text-white text-sm sm:text-lg mt-1">
        {timeString}
      </div>
    </div>
  );
}

export function Countdown() {
  const t = useLocale();

  const dropConfetti = true; // konfetti!!!

  const target = new Date("2027-10-07T10:00:00+02:00");
  const openTarget = new Date("2027-10-07T16:00:00+02:00");
  
  const [viewport, setViewport] = useState({width: 0, height: 0});
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const updateViewport = () => {
      setViewport({width: window.innerWidth, height: window.innerHeight});
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        return;
      }

      const d_diff = difference / (1000 * 60 * 60 * 24);
      setDays(difference < 0 ? 0 : Math.floor(d_diff));

      const h_diff =
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60);
      setHours(difference < 0 ? 0 : Math.floor(h_diff));

      const m_diff = (difference % (1000 * 60 * 60)) / (1000 * 60);
      setMinutes(difference < 0 ? 0 : Math.floor(m_diff));

      const s_diff = (difference % (1000 * 60)) / 1000;
      setSeconds(difference < 0 ? 0 : Math.floor(s_diff));
    }

    updateCountdown();
    const interval = setInterval(() => {
      updateCountdown();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const now = new Date();
  const isOpen = now > target && now < openTarget;
  const isClosed = now > target && now > openTarget;

  if(isOpen)return (
    <div className="hover:cursor-default flex items-center justify-center">
      <div className="flex flex-col items-center text-center">
        <div className="text-white text-3xl sm:text-4xl leading-none">
          {t.home.countDown.welcome}
        </div>
        <div className="text-white text-sm sm:text-lg mt-1">
          {t.home.countDown.welcomeDisclaimer}
        </div>
      </div>
    </div>
  )

  if(isClosed)return (
    <div className="hover:cursor-default flex items-center justify-center">
      <div className="flex flex-col items-center text-center">
        <div className="text-white text-3xl sm:text-4xl leading-none">
          {t.home.countDown.closed}
        </div>
      </div>
    </div>
  )


  return (
    <div className="hover:cursor-default flex items-center justify-center">
      {dropConfetti && viewport.width > 0 && (
        <Confetti
          width={viewport.width}
          height={viewport.height}
          recycle={false}
          numberOfPieces={500}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            pointerEvents: "none",
            zIndex: 50,
          }}
        />
      )}
      
      <TimeUnit time={days} timeString={t.home.countDown.days} />

      <div className="mx-6 h-14 w-[3px] bg-cerise" />

      <TimeUnit time={hours} timeString={t.home.countDown.hours} />

      <div className="mx-6 h-14 w-[3px] bg-cerise" />

      <TimeUnit time={minutes} timeString={t.home.countDown.minutes} />

      <div className="mx-6 h-14 w-[3px] bg-cerise" />

      <TimeUnit time={seconds} timeString={t.home.countDown.seconds} />

    </div>
  );
}
