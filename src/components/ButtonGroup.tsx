import { type Dispatch } from "react";
import type Locale from "@/locales";

export default function ButtonGroup({
  t,
  buttonOneText,
  buttonTwoText,
  buttonThreeText,
  buttonFourText,
  buttonSelected,
  setButtonSelected,
}: {
  t: Locale;
  buttonOneText: string;
  buttonTwoText: string;
  buttonThreeText: string;
  buttonFourText: string,
  buttonSelected: 1 | 2 | 3 | 4;
  setButtonSelected: Dispatch<1 | 2 | 3 | 4>;
}) {
  return (
    <div className="flex items-center justify-center mt-12" role="group">
      <button
        type="button"
        className={
          (buttonSelected == 1 ? "bg-cerise " : "bg-none ") +
          "border-cerise inline-block rounded-l border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary hover:border-primary-600 hover:bg-neutral-100 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700"
        }
        onClick={() => {
          setButtonSelected(1);
        }}
      >
        {buttonOneText}
      </button>
      <button
        type="button"
        className={
          (buttonSelected == 2 ? "bg-cerise " : "bg-none ") +
          "border-cerise -ml-0.5 inline-block border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary hover:border-primary-600 hover:bg-neutral-100 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700"
        }
        onClick={() => {
          setButtonSelected(2);
        }}
      >
        {buttonTwoText}
      </button>
      <button
        type="button"
        className={
          (buttonSelected == 3 ? "bg-cerise " : "bg-none ") +
          "border-cerise -ml-0.5 inline-block rounded-r border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary hover:border-primary-600 hover:bg-neutral-100 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700"
        }
        onClick={() => {
          setButtonSelected(3);
        }}
      >
        {buttonThreeText}
      </button>

      <button
        type="button"
        className={
          (buttonSelected == 4 ? "bg-cerise " : "bg-none ") +
          "border-cerise -ml-0.5 inline-block rounded-r border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary hover:border-primary-600 hover:bg-neutral-100 hover:bg-opacity-10 hover:text-primary-600 focus:border-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700"
        }
        onClick={() => {
          setButtonSelected(4);
        }}
      >
        {buttonFourText}
      </button>
    </div>
  );
}
