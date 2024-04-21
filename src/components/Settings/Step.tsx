import Link from "next/link";
import React from "react";
import Locale from "@/locales";

export function step(title : string,step : number,content : JSX.Element, t : Locale){
  return (<div className="flex justify-center mt-[100px] mb-[100px]">
            <div className="border-2 border-cerise w-[700px] backdrop-blur-md bg-white/20 rounded-xl">
              <div className="mt-4 mb-4 ml-4 mr-4">
                <h2 className="text-white text-center text-2xl">{title}</h2>
                <div className="flex justify-center">
                  {circles(step)}
                </div>
                {content}
                {step>-1? buttons([t.exhibitorSettings.back, t.exhibitorSettings.next]) :
                  buttons([t.exhibitorSettings.start.start])}
              </div>
            </div>
          </div>);

  function buttons(buttonStrs : string[]){
    function btn(btnStr : string){
      return <button
        className="mt-[25px] h-[60px] w-[130px] bg-cerise rounded-[40px] border-cerise flex items-center justify-center px-[30px] flex-col hover:scale-105 transition-transform text-white text-[20px]">
        {btnStr}
      </button>;
    }
    return <div className="flex justify-around">
              {buttonStrs.map(btn)}
           </div>;



  }

  function circles(step : number){
    if(step<0){
      return <div className="flex items-center p-4">
        {bigCircle("3",t.exhibitorSettings.step)}
        {smallCircle("","")}
        {miniCircle()}
      </div>;
    }
    return <div className="flex items-center p-4">
      {step==1 || step==2 ? miniCircle() : ""}
      {step == 0 ? smallCircle("3",t.exhibitorSettings.step) : smallCircle(t.exhibitorSettings.step,(step-1).toString())}
      {bigCircle(t.exhibitorSettings.step, step.toString())}
      {step < 2 ? smallCircle(t.exhibitorSettings.step, (step+1).toString()) : ""}
      {step < 1 ? miniCircle() : ""}
    </div>;

    function bigCircle(text1 : string, text2 : string){
      return <div className="w-20 h-20 rounded-full
                      flex flex-col  justify-center bg-cerise
                      flex-auto mr-2 ml-2">

        <div>
          <div className="text-white text-xl text-center">
            {text1}
          </div>
          <div className="text-white text-xl text-center">
            {text2}
          </div>
        </div>



      </div>;
    }

    function smallCircle(text1 : string, text2 : string){
      return <div className="w-10 h-10 rounded-full
                      flex flex-col  justify-center bg-cerise
                      flex-auto mr-2 ml-2">

        <div>
          <div className="text-white text-xs text-center">
            {text1}
          </div>
          <div className="text-white text-xs text-center">
            {text2}
          </div>
        </div>



      </div>;
    }

    function miniCircle(){
      return <div className="w-6 h-6 rounded-full
                      flex flex-col  justify-center bg-cerise
                      flex-auto mr-2 ml-2">
      </div>;
    }

  }
}


