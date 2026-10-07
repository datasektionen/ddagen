import {useLocale} from "@/locales";
import {useEffect, useState} from "react";

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

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const target = new Date("10/8/2026 10:00:00+02:00");
  const openTarget = new Date("10/8/2026 16:00:00+02:00");
  useEffect(() => {

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const d_diff = difference / (1000 * 60 * 60 * 24);
      setDays(difference < 0 ? 0 : Math.floor(d_diff));

      const h_diff =
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60);
      setHours(difference < 0 ? 0 : Math.floor(h_diff));

      const m_diff = (difference % (1000 * 60 * 60)) / (1000 * 60);
      setMinutes(difference < 0 ? 0 : Math.floor(m_diff));

      const s_diff = (difference % (1000 * 60)) / 1000;
      setSeconds(difference < 0 ? 0 : Math.floor(s_diff));
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
          Welcome - The fair is open!
        </div>
        <div className="text-white text-sm sm:text-lg mt-1">
          10:00 - 16:00
        </div>
      </div>
    </div>
  )

  if(isClosed)return (
    <div className="hover:cursor-default flex items-center justify-center">
      <div className="flex flex-col items-center text-center">
        <div className="text-white text-3xl sm:text-4xl leading-none">
          The fair is now closed!
        </div>
      </div>
    </div>
  )


  return (
    <div className="hover:cursor-default flex items-center justify-center">
      
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
