import { useEffect, useRef, type ChangeEvent, type Dispatch } from "react";

export function TextInput({
  description,
  setDescription,
  textAbove,
  placeHolderText,
  name,
  disabled,
  autoGrow = false,
  textAreaClassName = ""
}: {
  description: string;
  setDescription: Dispatch<string>;
  textAbove: string;
  placeHolderText: string;
  name?: string;
  disabled?: boolean;
  autoGrow?: boolean;
  textAreaClassName?: string;
}) {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  function resizeTextArea(textArea: HTMLTextAreaElement) {
    if (!autoGrow) return;
    textArea.style.height = "auto";
    textArea.style.height = `${textArea.scrollHeight}px`;
  }

  useEffect(() => {
    if (!textAreaRef.current) return;
    resizeTextArea(textAreaRef.current);
  }, [description, autoGrow]);

  const onTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value) setDescription(e.target.value);
    else setDescription("");

    resizeTextArea(e.target);
  };

  return (
    <div className="flex flex-col items-start">
      <label
        className="block mb-2 text-xl font-normal text-center text-white dark:text-white tracking-wider"
        htmlFor={name || "text_input"}
      >
        {textAbove}
      </label>
      <textarea
        ref={textAreaRef}
        className="relative w-[330px] h-[150px] bg-black/25 border-solid border-gray border-2 rounded-xl p-2
        placeholder:text-[#D9D9D9] placeholder:font-light placeholder:text-2xl break-words
        text-white font:light
        focus:placeholder:text-transparent focus:outline-none focus:border-cerise resize-none ${
          autoGrow ? "min-h-[105px] h-auto overflow-y-hidden" : ""
        } ${textAreaClassName}`}
        placeholder={placeHolderText}
        maxLength={500}
        onChange={onTextChange}
        id={name || "text_input"}
        value={description}
        disabled={disabled}
      />
    </div>
  );
}
