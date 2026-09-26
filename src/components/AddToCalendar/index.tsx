import CalendarDropdown from "./CalendarDropdown";
import CalendarSheet from "./CalendarSheet";

// "Add to calendar" button for the event page: a dropdown from md and up, a bottom sheet below.
export default function AddToCalendar() {
  return (
    <div className="mb-10 mt-8 flex justify-center px-4 sm:mb-2">
      <div className="hidden md:block">
        <CalendarDropdown />
      </div>
      <div className="md:hidden">
        <CalendarSheet />
      </div>
    </div>
  );
}
