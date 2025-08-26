import Locale from "@/locales";
import { api } from "@/utils/api";
import { useState, useEffect } from "react";
import { Exhibitor, sortExhibitors } from "@/shared/Classes";
import { CheckMark } from "@/components/CheckMark";

interface MeetingTimeSlot {
  exhibitorId: string;
  timeSlot: number;
}

export function CompanyMeetingsPanel({
  t,
  exhibitors,
  password,
}: {
  t: Locale;
  exhibitors: Exhibitor[];
  password: string;
}) {
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<MeetingTimeSlot[]>([]);
  const updateMeetingSlots = api.exhibitor.updateMeetingTimeSlots.useMutation();

  // Initialize selectedTimeSlots with existing meeting slots from companies
  useEffect(() => {
    const initialTimeSlots: MeetingTimeSlot[] = [];
    exhibitors.forEach(company => {
      if (company.meetingTimeSlots) {
        company.meetingTimeSlots.forEach(timeSlot => {
          initialTimeSlots.push({
            exhibitorId: company.id,
            timeSlot: timeSlot
          });
        });
      }
    });
    setSelectedTimeSlots(initialTimeSlots);
  }, [exhibitors]);

  const times = [
    "", "10:00-10:15", "10:15-10:30", "10:30-10:45", "10:45-11:00",
    "11:00-11:15", "11:15-11:30", "11:30-11:45", "11:45-12:00",
    "12:00-12:15", "12:15-12:30", "12:30-12:45", "12:45-13:00",
    "13:00-13:15", "13:15-13:30", "13:30-13:45", "13:45-14:00",
    "14:00-14:15", "14:15-14:30", "14:30-14:45", "14:45-15:00",
    "15:00-15:15", "15:15-15:30", "15:30-15:45", "15:45-16:00"
  ];


  // Filter companies that have meetings enabled
  const meetingCompanies = sortExhibitors(exhibitors.filter(e => e.studentMeetings === 1));

  const handleTimeSlotToggle = (exhibitorId: string, timeSlot: number) => {
    const existingSlot = selectedTimeSlots.find(
      slot => slot.exhibitorId === exhibitorId && slot.timeSlot === timeSlot
    );

    if (existingSlot) {
      setSelectedTimeSlots(selectedTimeSlots.filter(
        slot => !(slot.exhibitorId === exhibitorId && slot.timeSlot === timeSlot)
      ));
    } else {
      setSelectedTimeSlots([...selectedTimeSlots, { exhibitorId, timeSlot }]);
    }
  };

  const saveTimeSlots = async (exhibitorId: string) => {
    try {
      const companySlots = selectedTimeSlots
        .filter(slot => slot.exhibitorId === exhibitorId)
        .map(slot => slot.timeSlot);

      await updateMeetingSlots.mutateAsync({
        password: password,
        exhibitorId: exhibitorId,
        timeSlots: companySlots,
      });
    } catch (error) {
      console.error("Failed to update meeting time slots:", error);
    }
  };

  return (
    <div className="w-full h-full text-white">
      <div className="flex flex-col items-center justify-center mt-8">
        <h1 className="text-cerise text-2xl font-medium mb-8">
          Meeting Time Slots Management
        </h1>
        
        <div className="w-[90%] overflow-x-auto">
          <table className="w-full bg-slate-50 bg-opacity-20 border-collapse border-solid">
            <thead className="[&>tr>th]:border-2 [&>tr>th]:border-solid [&>tr>th]:border-cerise [&>tr>th]:py-2 [&>tr>th]:px-4">
              <tr>
                <th>Company</th>
                {times.map((time, index) => (
                  <th key={index}>{time}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="[&>tr>td]:border-2 [&>tr>td]:border-solid [&>tr>td]:border-cerise [&>tr>td]:p-4">
              {meetingCompanies.map((company, i) => (
                <tr key={i}>
                  <td className="text-center">{company.name}</td>
                  {times.map((_, timeSlot) => (
                    <td key={timeSlot} className="text-center">
                      <CheckMark
                        name={`${company.id}-${timeSlot}`}
                        checked={selectedTimeSlots.some(
                          slot => slot.exhibitorId === company.id && slot.timeSlot === timeSlot
                        )}
                        onClick={() => handleTimeSlotToggle(company.id, timeSlot)}
                      />
                    </td>
                  ))}
                  <td className="text-center">
                    <button
                      className="bg-cerise px-4 py-2 rounded-md hover:bg-opacity-80"
                      onClick={() => saveTimeSlots(company.id)}
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}