import { useState } from "react";
import parse from "html-react-parser";

export function Table(
  questions: Array<string>,
  answers: Array<string>,
  settings: Array<JSX.Element>
) {
  const stateAction = Array.from({ length: questions.length }, () =>
    useState(false)
  );

  return (
    <div className="mt-[50px]">
      {questions.map((_, i) => (
        <div key={i} className="text-white border-x-2 border-cerise pb-[2px]">
          <button
            onClick={() => stateAction[i][1](!stateAction[i][0])}
            className={`
            ${i == 0 ? "border-t-2" : ""}
            ${settings == undefined ? "" : "font-medium"}
            uppercase items-center flex flex-row justify-between pl-[20px] pr-[20px] py-[15px] text-left max-h-[300px] w-full bg-slate-50 bg-opacity-20 border-cerise`}
          >
            {questions[i]}
            <img
              src="/img/caret.svg"
              className={`${
                stateAction[i][0] ? "rotate-180" : ""
              } duration-200 ml-4 h-4 `}
            ></img>
          </button>

          <div
            className={`${
              stateAction[i][0] ? "py-10 grid-rows-[1fr]" : "grid-rows-[0fr]"
            } grid transition-[padding,grid-template-rows] px-5
              bg-gray bg-opacity-50 border-cerise
              relative
              before:bg-cerise after:bg-cerise
              before:h-[2px] after:h-[2px]
              before:right-0 after:right-0
              before:left-0 after:left-0
              before:top-0 after:bottom-[-2px]
              before:absolute after:absolute
            `}
          >
            <div className="overflow-hidden">
              {answers.length ? parse(answers[i]) : settings[i]}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
