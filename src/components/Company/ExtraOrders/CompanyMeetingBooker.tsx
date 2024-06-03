import { useLocale } from '@/locales';
import React, { useState, useEffect, use } from 'react';
import { CheckMark } from '../../CheckMark';
import { api } from '@/utils/api';


interface MeetingData {
    checked?: boolean;
    ugkthid: string;
    name: string;
    year: string;
    cv: string;
    other: string[];
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
    
    const years = [0, 1, 2, 3, 4];
    const offers = [
      t.exhibitorSettings.table.row1.section2.jobs.summer,
      t.exhibitorSettings.table.row1.section2.jobs.internship,
      t.exhibitorSettings.table.row1.section2.jobs.partTime,
      t.exhibitorSettings.table.row1.section2.other.thesis,
      t.exhibitorSettings.table.row1.section2.other.fullTime,
      t.exhibitorSettings.table.row1.section2.other.trainee,
    ];

    const [searchParams, setSearchParams] = useState({
      years: [false, false, false, false, false],
      offers: {
        summer: false,
        internship: false,
        partTime: false,
        thesis: false,
        fullTime: false,
        trainee: false,
      },
      offerBoolean: [false, false, false, false, false, false],
    });

    const amoutOfFiltersActive = () => {
      return searchParams.years.filter((year) => year).length + Object.values(searchParams.offerBoolean).filter((offer) => offer).length;
    }

    const filterStudents = (students: MeetingData[]) => {
     return students.filter((student) => {
        // student only needs to have atlest one of the selected offers
          

        // filter based on other compared to offerBoolean
        const other = student.other;          
        const offers = Object.keys(searchParams.offers) as (keyof typeof searchParams.offers)[];
        const offerBoolean = Object.values(searchParams.offers);
        //iterate over student others 
        for (let i = 0; i < other.length; i++) {
          if (offers.includes(other[i] as keyof typeof searchParams.offers) && !offerBoolean[offers.indexOf(other[i] as keyof typeof searchParams.offers)]) {
            return true;
          }
        }
        return false;

      })
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
            other: student.other,
          }
        });
        
        students.push({
          checked: false,
          ugkthid: "u1",
          name: "A",
          year: "1",
          cv: "cv",
          other: ["summer", "partTime", "fullTime", "trainee"],
        });
        students.push({
          checked: false,
          ugkthid: "u2",
          name: "B",
          year: "2",
          cv: "cv",
          other: ["internship", "thesis", "fullTime"],
        });
        students.push({
          checked: false,
          ugkthid: "u3",
          name: "C",
          year: "3",
          cv: "cv",
          other: ["summer", "partTime"],
        });

        students.sort((a: any, b: any) => a.name.localeCompare(b.name));

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
          }
        });
    
        setAcceptedStudents(students);
    }, [getAcceptedStudents.data]);

    const handleCheck = (idx: number) => {
      const updatedData = [...students];
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
      selectedStudents.forEach((student) => {
        createMeeting.mutateAsync({ugkthid: student.ugkthid,});
      });
      setPendingStudents([...pendingStudents, ...selectedStudents]);
      setStudents(students.filter((s) => !s.checked));
    }

    function openPDF(pdfData: string){
      const base64Prefix = 'data:application/pdf;base64,';
      if (pdfData.startsWith(base64Prefix)) {
        pdfData = pdfData.slice(base64Prefix.length);
      }
    
      // Decode base64 string to Uint8Array
      const byteArray = Uint8Array.from(atob(pdfData), c => c.charCodeAt(0));
    
      // Create a blob from the byte array
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);
    
      // Open the PDF in a new tab
      window.open(blobUrl, '_blank');
    }

    function updateSearchParam(offer: number) {
      console.log(offer);
      console.log(searchParams.offers);
      // gove key the right object type so it matches the offers object
      const key = Object.keys(searchParams.offers)[offer] as keyof typeof searchParams.offers;
      const updatedOffers = { ...searchParams.offers, [key]: !searchParams.offers[key] };
      setSearchParams({ ...searchParams, offers: updatedOffers });
    }

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
          <button className="mt-2 mb-2">
            <p className="block hover:scale-105 transition-transform bg-cerise rounded-full uppercase text-white text-base font-medium px-4 py-1 max-lg:mx-auto w-max">
              {t.map.search.buttonTwo + (amoutOfFiltersActive() > 0 ? ` (${amoutOfFiltersActive()})` : "")}
            </p>
          </button>
        </div>
        <div className='flex flex-row py-2'>
        
          {
          offers.map((offer, i) => (
            <div key={i} className="flex flex-row space-x-1 ml-2 justify-between">
              <div className='text-white'>{offer}</div>
              <div>
                <CheckMark
                  name={`${i + 5}`}
                  onClick={() => {
                    setSearchParams({ ...searchParams, offerBoolean: searchParams.offerBoolean.map((val, idx) => idx === i ? !val : val) });
                  }}
                  checked={searchParams.offerBoolean[i]}
                />
              </div>
            </div>
          ))
          }
        </div>
        <div className='overflow-y-auto h-90 p-8 bg-black/50 rounded-lg'>
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
                    <td className=""><CheckMark name="" checked={data.checked} onClick={()=>{handleCheck(idx)} } /></td>
                    <td className="px-8">{String(data['name'])}</td>
                    <td className="px-8">{String(data['year'])}</td>
                    <td className="px-8">
                      <div>
                        <button className="my-1" onClick={
                          () => {
                            openPDF(data.cv);
                          }
                        }>
                          <a className='block hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base font-medium px-4 py-1 max-lg:mx-auto w-max'>
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
        <button className="mt-4 mb-4" onClick={bookMeetings}>
            <a className="block hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base font-medium px-6 py-2 max-lg:mx-auto w-max">
              {t.exhibitorSettings.meetings.bookSelected}
            </a>
        </button>
      </>,
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
                          <a className='block hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base font-medium px-4 py-1 max-lg:mx-auto w-max'>
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
        </div>,
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
                    <td className='px-8'>{"Time"} </td>
                    <td className="px-8">{String(data['name'])}</td>
                    <td className="px-8">{String(data['year'])}</td>
                    <td className="px-8">
                      <div>
                        <button className="my-1" onClick={
                          () => {
                            openPDF(data.cv);
                          }
                        }>
                          <a className='block hover:scale-105 transition-transform bg-cerise rounded-full text-white text-base font-medium px-4 py-1 max-lg:mx-auto w-max'>
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