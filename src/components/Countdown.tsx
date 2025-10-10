import {useLocale} from "@/locales";
import {useEffect, useState} from "react";

function TimeUnit({time, timeString, index = 0}: {time: number; timeString: string, index?: number}){
  // "w-1/2 max-auto bg-cerise py-2.5 rounded-full"
  return(
        <div className={`w-16 h-32 sm:w-24 sm:h-48
            flex flex-col bg-cover bg-16
            ${
              index == 2 && "bg-[url('/img/ballonger/ballong_2.svg')]"
              ||
              index == 3 && "bg-[url('/img/ballonger/ballong_3.svg')]"
              ||
              index == 4 && "bg-[url('/img/ballonger/ballong_4.svg')]"
              ||
              "bg-[url('/img/ballonger/ballong_1.svg')]"
            }`}>

          <div className="w-16 h-20 sm:w-24 sm:h-[7.75rem] 
              flex flex-col items-center justify-center">
            <div className="text-white text-xl sm:text-4xl leading-[1.25rem] sm:leading-[1.75rem] text-center">
              {time}
            </div>
            <div className="text-white text-xs sm:text-lg text-center">
              {timeString}
            </div>
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
    const target = new Date("10/8/2026 10:00:00+02:00") // vilket datum är d-dagen?
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
    <div className="hover:cursor-default gap-5 columns-4 flex items-center justify-center">
      <TimeUnit time={days} timeString={t.home.countDown.days} index={1}/>
      <TimeUnit time={hours} timeString={t.home.countDown.hours} index={2}/>
      <TimeUnit time={minutes} timeString={t.home.countDown.minutes} index={3}/>
      <TimeUnit time={seconds} timeString={t.home.countDown.seconds} index={4}/>
    </div>
  );
}
