import { useLocale } from '@/locales';
import React, { useState, useEffect, use } from 'react';
import { CheckMark } from '../../CheckMark';
import { api } from '@/utils/api';
import MultiRangeSlider from '../MultiRangeSlider';


interface MeetingData {
    checked?: boolean;
    ugkthid: string;
    name: string;
    year: string;
    cv: string;
    other: string[];
    timeslot?: string;
}

export default function CompanyMeetingBooker(
) {
  const t = useLocale();
  
  const getInterestedStudents = api.exhibitor.getStudentInterests.useQuery();
  const getPendingStudents = api.exhibitor.getPendingMeetings.useQuery();
  const getAcceptedStudents = api.exhibitor.getAcceptedMeetings.useQuery();
  
    const createMeeting = api.exhibitor.createMeeting.useMutation();

    const [students, setStudents] = useState<MeetingData[]>([]);
    const [tableIndex, setTableIndex] = useState(0);
    
    const [pendingStudents, setPendingStudents] = useState<MeetingData[]>([]);
    const [acceptedStudents, setAcceptedStudents] = useState<MeetingData[]>([]);

    const [query, setQuery] = useState({
      offers: {
        summer: false,
        internship: false,
        partTime: false,
        thesis: false,
        fullTime: false,
        trainee: false,
      },
      keyValues: ['summerJob', 'internship', 'partTimeJob', 'thesis', 'fullTimeJob', 'traineeProgram'],
      offersBool: [false, false, false, false, false, false],
    });

    const [showFilter, setShowFilter] = useState(false);
    const [sliderValues, setSliderValues] = useState<{ min: number; max: number }>({ min: 1, max: 5 });

    const handleSliderChange = (minValue: number, maxValue: number) => {
      setSliderValues({ min: minValue, max: maxValue });
      //console.log(sliderValues.min, sliderValues.max)
    };

    const offers = [
        t.exhibitorSettings.table.row1.section2.jobs.summer,
        t.exhibitorSettings.table.row1.section2.jobs.internship,
        t.exhibitorSettings.table.row1.section2.jobs.partTime,
        t.exhibitorSettings.table.row1.section2.other.thesis,
        t.exhibitorSettings.table.row1.section2.other.fullTime,
        t.exhibitorSettings.table.row1.section2.other.trainee,
    ];

    const countActiveQueries = () => {
      return query.offersBool.filter((b) => b).length;
    }

    const filterStudents = (students: MeetingData[]) => {
      const selectedOffers: string[] = query.offersBool.map((b,i)=>{ return b ? query.keyValues[i] : ''}).filter((b) => b !== '');
      const years = [1,2,3,4,5].filter((y)=> y >= sliderValues.min && y <= sliderValues.max);

      return students.filter((student) => {
        if(!years.includes(parseInt(student.year))) return false;
        //if(selectedOffers.length === 0) return true;
        const intersection = student.other.filter((offer) => selectedOffers.includes(offer));
        //console.log("intersection", intersection, student)
        return intersection.length == countActiveQueries();
      });
      
    }



    useEffect(() => {
      if (!getInterestedStudents.data) return;
        const students = getInterestedStudents.data.map((student: any) => {
          return {
            checked: false,
            ugkthid: student.ugkthid,
            name: student.name,
            year: student.year,
            cv: student.cv,
            other: student.other
          }
        });

        // add dummy students
        students.push({
          checked: false,
          ugkthid: 'u1',
          name: 'John Doe',
          year: '3',
          cv: 'cv',
          other: ['thesis', 'fullTimeJob'],
        });

        students.push({
          checked: false,
          ugkthid: 'u2',
          name: 'Jane Doe',
          year: '4',
          cv: 'cv',
          other: ['summerJob', 'internship'],
        });

        students.push({
          checked: false,
          ugkthid: 'u3',
          name: 'Anders Smith',
          year: '2',
          cv: 'cv',
          other: ['partTimeJob', 'traineeProgram', 'thesis'],
        });
    
        setStudents(students);
    }, [getInterestedStudents.data]);

    useEffect(() => {
      if (!getPendingStudents.data) return;
        const students = getPendingStudents.data.map((student: any) => {
          return {
            ugkthid: student.ugkthid,
            name: student.name,
            year: student.year,
            cv: student.cv,
            other: student.other,
          }
        });
    
        setPendingStudents(students);
    }, [getPendingStudents.data]);

    useEffect(() => {
      if (!getAcceptedStudents.data) return;
        const students = getAcceptedStudents.data.map((student: any) => {
          return {
            ugkthid: student.ugkthid,
            name: student.name,
            year: student.year,
            cv: student.cv,
            other: student.other,
            timeslot: student.timeslot,
          }
        });
    
        setAcceptedStudents(students);
    }, [getAcceptedStudents.data]);

    const handleCheck = (id: string) => {
      const updatedData = [...students];
      const idx = updatedData.findIndex((d) => d.ugkthid === id);
      updatedData[idx].checked = !updatedData[idx].checked;
      setStudents(updatedData);
    };

    const checkAll = () => {
      const updatedData = [...students];
      updatedData.forEach((d) => d.checked = true);
      setStudents(updatedData);
    }

    const uncheckAll = () => {
      const updatedData = [...students];
      updatedData.forEach((d) => d.checked = false);
      setStudents(updatedData);
    }

    const bookMeetings = async () => {
      const selectedStudents = students.filter((student) => student.checked);
      if(selectedStudents.length === 0) return; 
      selectedStudents.forEach((student) => {
        createMeeting.mutateAsync({ugkthid: student.ugkthid,});
      });
      setPendingStudents([...pendingStudents, ...selectedStudents]);
      setStudents(students.filter((s) => !s.checked));
    }

    function openPDF(pdfData: string){
      console.log("open pdf", pdfData);
      const base64Prefix = 'data:application/pdf;base64,';
      if (pdfData.startsWith(base64Prefix)) {
        pdfData = pdfData.slice(base64Prefix.length);
      } else {
        return; 
      }
      if(pdfData.length == 0) return;
      
      try {
      
        // Decode base64 string to Uint8Array
        const byteArray = Uint8Array.from(window.atob(pdfData), c => c.charCodeAt(0));
        
        // Create a blob from the byte array
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(blob);
        
        // Open the PDF in a new tab
        window.open(blobUrl, '_blank');
      } catch (error) {
        console.error("error opening cv ", error);
      }
    }
    const times = ["10:00-10:30", "10:30-11:00", "11:00-11:30", "11:30-12:00", "12:00-12:30", "12:30-13:00",
                   "13:00-13:30", "13:30-14:00", "14:00-14:30", "14:30-15:00", "15:00-15:30", "15:30-16:00"]

    const TablePages = [
      <>
        <div className="flex flex-row items-center gap-4">
          <button className="mt-2 mb-2" onClick={checkAll}>
            <a className="block hover:scale-105 transition-transform bg-cerise rounded-full uppercase text-white text-base font-medium px-4 py-1 max-lg:mx-auto w-max">
              {t.exhibitorSettings.meetings.checkAll}
            </a>
          </button>
          <button className="mt-2 mb-2" onClick={uncheckAll}>
              <a className="block hover:scale-105 transition-transform bg-cerise rounded-full uppercase text-white text- text-base font-medium px-4 py-1 max-lg:mx-auto w-max">
                {t.exhibitorSettings.meetings.unCheckAll}
              </a>
          </button>
          <button className='mt-2 mb-2' onClick={()=>{ setShowFilter(!showFilter); }}>
              <a className="hover:scale-105 transition-transform bg-cerise rounded-full uppercase text-white text-base font-medium px-4 py-1 max-lg:mx-auto w-max flex flex-row">
                {t.exhibitorSettings.meetings.filter + (countActiveQueries() > 0 ? ` (${countActiveQueries()})` : '')}
                <img src="\img\arrow-down.png"  
                  className={` w-[16px] h-[10px] transition-all duration-500 mt-2 ml-2
                  ${showFilter ? ' rotate-180' : " rotate-0 "} `}/>    
              </a>
          </button>
        </div>

        <div className={ (showFilter ? 'flex flex-col ' : 'hidden ') + 'py-2' } >
          <div className="mb-4 flex flex-column text-center w-[32rem] pl-12">
           
            <MultiRangeSlider header={t.exhibitorSettings.meetings.year} min={1} max={5} step={1} onChange={handleSliderChange}/>

          </div>
          <div className='flex flex-row flex-warp py-2'>


          {offers.map((offer, i) => (
            <div key={i} className='flex flex-row space-x-1 ml-2'>
              <div className='text-white text-center px-1'>{offer}</div>
              <div>
                <CheckMark name={`${i}`} checked={query.offersBool[i]} onClick={()=>{
                  query.offersBool[i] = !query.offersBool[i];
                  setQuery({ ...query });
                }} />
              </div>
            </div>
          ))}
          </div>
        </div>
        <div className='overflow-y-auto h-90 mt-4 p-8 bg-black/50 rounded-lg'>
          <table className='w-full '>
            <thead>
              <tr className="border-b border-white">
                {t.exhibitorSettings.meetings.columns.map((name,i) => (
                  <th key={i} className="text-xl text-cerise">{name}</th>
                ))}
              </tr>
            </thead>
            <tbody className='w-full'>
              {filterStudents(students).map((data, idx) =>(
                <tr key={idx} className="border-b border-white h-12 text-center p-4 text-white sm-text-xs lg-text-lg text-drop-shadow">
                    <td className=""><CheckMark name="" checked={data.checked} onClick={()=>{handleCheck(data.ugkthid)} } /></td>
                    <td className="px-8">{String(data['name'])}</td>
                    <td className="px-8">{String(data['year'])}</td>
                    <td className="px-8">
                      <div>
                        <button className="my-1" onClick={
                          () => {
                            openPDF(data.cv);
                          }
                        }>
                          <a className={`block transition-transform rounded-full text-white text-base font-medium px-4 py-1 max-lg:mx-auto w-max 
                             ${(data.cv.startsWith("data:application/pdf;base64,") ? ' bg-cerise hover:scale-105' : ' bg-gray/50 pointer-events-none')}`
                          }>
                            CV       
                          </a>
                        </button>
                      </div>
                    </td>
                    <td className="px-8">
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
        <p className='text-white mt-2'> 
          {"("+ students.filter((student)=> student.checked).length.toString() + ") " + t.exhibitorSettings.meetings.selectedStudents}
        </p>
        <button className="mt-4 mb-4" onClick={bookMeetings}>
            <a className={`block transition-transform rounded-full 
            text-white text-base font-medium px-6 py-2 max-lg:mx-auto w-max `
            + (students.filter((student)=> student.checked).length > 0 ? 'bg-cerise hover:scale-105' : 'bg-gray/50')}>
              {t.exhibitorSettings.meetings.bookSelected}
            </a>
        </button>
      </>,
      <>
      <p className='text-white mb-2'> { "("+ pendingStudents.length + ") " + t.exhibitorSettings.meetings.pendingMeetings }</p>
        <div className='overflow-y-auto h-90 p-8 bg-black/50 rounded-lg'>
          <table className='w-full '>
            <thead>
              <tr className="border-b border-white">
                {t.exhibitorSettings.meetings.columns2.map((name,i) => (
                  <th key={i} className="text-xl text-cerise">{name}</th>
                ))}
              </tr>
            </thead>
            <tbody className='w-full'>
              {pendingStudents.map((data, idx) =>(
                <tr key={idx} className="border-b border-white h-12 text-center p-4 text-white sm-text-xs lg-text-lg text-drop-shadow">
                    <td className="px-8">{String(data['name'])}</td>
                    <td className="px-8">{String(data['year'])}</td>
                    <td className="px-8">
                      <div>
                        <button className="my-1" onClick={
                          () => {
                            openPDF(data.cv);
                          }
                        }>
                         <a className={`block transition-transform rounded-full text-white text-base font-medium px-4 py-1 max-lg:mx-auto w-max 
                             ${(data.cv.startsWith("data:application/pdf;base64,") ? ' bg-cerise hover:scale-105' : ' bg-gray/50 pointer-events-none')}`
                          }>
                            CV       
                          </a>
                        </button>
                      </div>
                    </td>
                    <td className="px-8">
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </>,
      <>
      <p className='text-white mb-2'> {"(" + acceptedStudents.length + ") " + t.exhibitorSettings.meetings.bookedMeetings} </p>
      <div className='overflow-y-auto h-90 p-8 bg-black/50 rounded-lg'>
        <table className='w-full '>
          <thead>
            <tr className="border-b border-white">
              {t.exhibitorSettings.meetings.columns3.map((name,i) => (
                <th key={i} className="text-xl text-cerise">{name}</th>
              ))}
            </tr>
          </thead>
          <tbody className='w-full'>
            {acceptedStudents.map((data, idx) =>(
              <tr key={idx} className="border-b border-white h-12 text-center p-4 text-white sm-text-xs lg-text-lg text-drop-shadow">
                  <td className='px-8'>{times[Number(data['timeslot'])-1]} </td>
                  <td className="px-8">{String(data['name'])}</td>
                  <td className="px-8">{String(data['year'])}</td>
                  <td className="px-8">
                    <div>
                      <button className="my-1" onClick={
                        () => {
                          openPDF(data.cv);
                        }
                      }>
                        <a className={`block transition-transform rounded-full text-white text-base font-medium px-4 py-1 max-lg:mx-auto w-max 
                             ${(data.cv.startsWith("data:application/pdf;base64,") ? ' bg-cerise hover:scale-105' : ' bg-gray/50 pointer-events-none')}`
                          }>
                            CV       
                        </a>
                      </button>
                    </div>
                  </td>
                  <td className="px-8">
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      </>
    ]


    return (
    <div className="hidden lg:flex flex-row items-center justify-center w-full mt-12  ">
      {/*Desktop version*/}
      <div className="lg:p-10 p-4 backdrop-blur-md bg-white/20 rounded-xl w-full border-cerise border-solid border-2 border-collapse ">

        <div className="flex flex-row gap-2 mb-12 w-full content-center flex-wrap">
          <button className="mt-2 mb-2 grow" onClick={()=>{
            setTableIndex(0);
            }}>
              <a className={"block hover:scale-105 transition-transform w-full rounded-l-full text-white text-lg font-medium px-6 py-4 max-lg:mx-auto"
                + (tableIndex === 0 ? " bg-cerise" : " bg-gray/50")
              }>
                {t.exhibitorSettings.meetings.pages.interested}
              </a>
          </button>
          <button className="mt-2 mb-2 grow" onClick={()=>{
              setTableIndex(1);
            }
          }>
            <a className={"block hover:scale-105 transition-transform text-white text-base font-medium px-6 py-4 max-lg:mx-auto w-full"
              + (tableIndex === 1 ? " bg-cerise" : " bg-gray/50")
            
            }>
              {t.exhibitorSettings.meetings.pages.pending}
            </a>
          </button>
          
          <button className="mt-2 mb-2 grow" onClick={()=>{
              setTableIndex(2);
            }
          }>
              <a className={"block hover:scale-105 transition-transform rounded-r-full text-white text-lg font-medium px-6 py-4 max-lg:mx-auto w-full"
                + (tableIndex === 2 ? " bg-cerise" : " bg-gray/50")
              
              }>
                {t.exhibitorSettings.meetings.pages.accepted}
              </a>
          </button>
        </div>
        {TablePages[tableIndex]}
      </div>
    </div>);
}