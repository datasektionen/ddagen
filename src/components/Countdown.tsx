import {useLocale} from "@/locales";
import { Console } from "console";
import {useEffect, useState} from "react";

function TimeUnit({time, timeString}: {time: number; timeString: string}){
  // "w-1/2 max-auto bg-cerise py-2.5 rounded-full"
  return(
        <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full
                flex flex-col  items-center justify-center
                bg-cerise">

          <div className="text-white text-xl sm:text-4xl text-center">
            {time}
          </div>

          <div className="text-white text-xs sm:text-lg text-center">
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
  useEffect(()=>{
    const target = new Date("10/10/2024 10:00:00+02:00") // vilket datum är d-dagen?
    const interval = setInterval(() =>{
      const now = new Date();
      const difference = target.getTime() - now.getTime();
      
      
      const d_diff = difference / (1000 * 60 * 60 * 24);
      const d = difference < 0 ? Math.ceil(d_diff) : Math.floor(d_diff);
      setDays(d)

      const h_diff = (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      const h = difference < 0 ? Math.ceil(h_diff) : Math.floor(h_diff);
      setHours(h)

      const m_diff = (difference % (1000 * 60 * 60))/(1000*60)
      const m = difference < 0 ? Math.ceil(m_diff) : Math.floor(m_diff) 
      setMinutes(m)

      const s_diff = (difference % (1000 * 60))/1000
      const s = difference < 0 ? Math.ceil(s_diff) : Math.floor(s_diff) 
      setSeconds(s)
    },1000)
    return () => clearInterval(interval)
  },[]);

  return (
    <div className="pb-[100px] hover:cursor-default gap-5 columns-4 items-stretch flex items-center justify-center">
      <TimeUnit time={days} timeString={t.home.countDown.days}/>
      <TimeUnit time={hours} timeString={t.home.countDown.hours}/>
      <TimeUnit time={minutes} timeString={t.home.countDown.minutes}/>
      <TimeUnit time={seconds} timeString={t.home.countDown.seconds}/>
    </div>
  );
}
