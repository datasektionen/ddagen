import { useLocale } from '@/locales';
import React, { useState, useEffect } from 'react';
import { CheckMark } from '../../CheckMark';
import Search from '@/components/Company/SearchStudents';
import { api } from '@/utils/api';
import { get } from 'http';

interface MeetingData {
    checked: boolean;
    name: string;
    year: string;
    cv: string;
    other: string[];
}

export default function CompanyMeetingBooker(
) {
    const t = useLocale();
    const [data, setData] = useState<MeetingData[]>([]);

    const getInterestedStudents = api.exhibitor.getStudentInterests.useQuery();

    const [students, setStudents] = useState<MeetingData[]>([]);

    const dummy_data = [
        { checked: false, name: "1", year: "1", cv: "cv1", other: ["1","1"] },
        { checked: false, name: "2", year: "2", cv: "cv2", other: ["2","2"] },
        { checked: false, name: "3", year: "3", cv: "cv3", other: ["3","3"] },
        { checked: false, name: "4", year: "4", cv: "cv4", other: ["4","4"] },
        { checked: false, name: "5", year: "5", cv: "cv5", other: ["5","5"] },
    ]

    useEffect(() => {
        setData(dummy_data);    
        
    }, []);

    useEffect(() => {
      console.log(getInterestedStudents?.data)
    }, [getInterestedStudents]);

    useEffect(() => {
      console.log(getInterestedStudents?.data)
    }, [getInterestedStudents]);

    const handleCheck = (idx: number) => {
      const updatedData = [...data];
      updatedData[idx].checked = !updatedData[idx].checked;
      setData(updatedData);
    };

    const checkAll = () => {
      const updatedData = [...data];
      updatedData.forEach((d) => d.checked = true);
      setData(updatedData);
    }

    const uncheckAll = () => {
      const updatedData = [...data];
      updatedData.forEach((d) => d.checked = false);
      setData(updatedData);
    }


    return (
    <div className="flex flex-row items-center justify-center w-full mt-12 ">
      {/*Desktop version*/}
      <div className="lg:p-10 p-4 backdrop-blur-md bg-white/20 rounded-xl w-full border-cerise border-solid border-2 border-collapse">

    

      <div className="flex flex-row items-center gap-4">
        <button className="mt-4 mb-4" onClick={checkAll}>
          <a className="block hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base font-medium px-6 py-2 max-lg:mx-auto w-max">
            {t.exhibitorSettings.meetings.checkAll}
          </a>
        </button>
        <button className="mt-4 mb-4" onClick={uncheckAll}>
          <a className="block hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base font-medium px-6 py-2 max-lg:mx-auto w-max">
            {t.exhibitorSettings.meetings.unCheckAll}
          </a>
        </button>
        <Search t={t} setQuery={()=>{}} />
        <button className="mt-4 mb-4" disabled>
          <a className="block hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base font-medium px-6 py-2 max-lg:mx-auto w-max">
            {t.exhibitorSettings.meetings.bookSelected}
          </a>
        </button>
      </div>
        <table>
          <thead>
            <tr className="border-b border-white ">
              {t.exhibitorSettings.meetings.columns.map((name,i) => (
                <th key={i} className="text-xl text-cerise">{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
          {data.map((data, idx) =>(
              <tr key={idx} className="border-b border-white h-10 text-center p-2 text-yellow sm-text-xs lg-text-lg text-drop-shadow">
                <td className=""><CheckMark name="" checked={data.checked} onClick={()=>{handleCheck(idx)} } /></td>
                <td className="px-8">{String(data['name'])}</td>
                <td className="px-8">{String(data['year'])}</td>
                <td className="px-8">
                  <div className='flex flex-row'>
                    <button className="mt-1 mb-1">
                      <a className='block hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base font-medium px-2 py-1 max-lg:mx-auto w-max'>
                        {String(data['cv'])}
                      </a>
                    </button>
                  </div>
                </td>

                <td className='px-8'>
                  <div className="flex flex-row">
                    {data['other'].map((other, idx) => (
                      String(other)
                      )
                    )}
                  </div>
                </td>
                 
              </tr>
            )
          )}
          </tbody>
        </table>
      </div>
    </div>
    );
}