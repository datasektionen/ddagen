import { useLocale } from '@/locales';
import React, { useState } from 'react';
import { CheckMark } from '../CheckMark';


export default function CompanyMeetingBooker(

) {
    const t = useLocale();
    const [checked, setChecked] = useState([false]);

    const checkAll = () => {
       for (let i = 0; i < checked.length; i++) {
            checked[i] = true;
        }
    };

    const uncheckAll = () => {
        for (let i = 0; i < checked.length; i++) {
            checked[i] = false;
        }
    };

    function Display({value,}: { value: string | boolean;}){
        if (typeof value === 'string'){
          return (<div className="text-center p-2 text-yellow sm-text-xs lg-text-lg text-drop-shadow">
                    {value}
                  </div>);
        }
        if (value){
          return (<div className="flex justify-center items-center text-drop-shadow">
                    <img src={"/img/check.png"} className="h-6"></img>
                  </div>);
        }
        return(
          <div></div>
        );
      };
    return (
    <div className="flex flex-row items-center justify-center w-full mt-12 ">
      {/*Desktop version*/}
      <div className="lg:p-10 p-4 backdrop-blur-md bg-white/20 rounded-xl w-full border-cerise border-solid border-2 border-collapse">
        <table>
          <thead>
            <tr className="border-b border-white ">
              
              {t.exhibitorSettings.meetings.columns.map((name,i) => (
                <th key={i} className="text-xl text-cerise">{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
          {t.catalog.titles.map((title, idx) =>(
              <tr key={idx} className="border-b border-white h-10 ">
                <td className="px-8"></td>
                <td className=""><CheckMark name="" defaultChecked={checked[idx]} onClick={()=>{checked[idx] = !checked[idx];  }  } /></td>
                <td className="px-8"><Display value={"1"}/></td>
                <td className="px-8"><Display value={"1"}/></td>
                <td className="px-8"><Display value={"1"}/></td>
              </tr>
            )
          )}
          </tbody>
        </table>
      </div>
    </div>
    );
}