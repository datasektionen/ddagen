import Locale from "@/locales";
import { useRef, useState } from "react";

export function DeleteExhibitorLock({
  t,
  onSubmit,
  closeModal,
}: {
  t: Locale;
  onSubmit: (passcode: string) => void;
  closeModal: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");

  function handleOverlayClick(event: React.MouseEvent) {
    if (modalRef.current === event.target) {
      closeModal();
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (passcode.length !== 6 || isNaN(Number(passcode))) {
      setError("Passcode must be a 6-digit number.");
      return;
    }
    setError("");
    onSubmit(passcode);
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-lg z-50"
      ref={modalRef}
      onClick={handleOverlayClick}
    >
      <div
        className="bg-slate-200 w-[325px] sm:w-[400px] p-6 rounded-3xl flex flex-col items-center"
      >
        <button
          className="absolute top-5 right-5 w-[40px] h-[40px] flex items-center justify-center"
          onClick={closeModal}
        >
          <div className="absolute h-[30px] w-[4px] bg-black rounded-md rotate-45"></div>
          <div className="absolute h-[30px] w-[4px] bg-black rounded-md -rotate-45"></div>
        </button>
        <h2 className="text-black text-2xl font-medium mb-4">Enter Passcode</h2>
        <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
          <input
            type="text"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            maxLength={6}
            className="text-center text-xl border text-stone-800 border-gray-400 rounded-md p-2 w-3/4 mb-4"
            placeholder="6-digit passcode"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <input
            type="submit"
            value="Submit"
            className="bg-cerise text-white uppercase py-2 px-6 rounded-full cursor-pointer hover:scale-105 transition-transform"
          />
        </form>
      </div>
    </div>
  );
}
