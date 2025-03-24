import type { ChangeEvent, Dispatch } from "react";

export function TextInput({
  description,
  setDescription,
  textAbove,
  placeHolderText,
  name,
  disabled
}: {
  description: string;
  setDescription: Dispatch<string>;
  textAbove: string;
  placeHolderText: string;
  name?: string;
  disabled?: boolean;
}) {
  const onTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value) setDescription(e.target.value);
    else setDescription("");
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
        className="relative w-[330px] h-[150px] bg-black/25 border-solid border-yellow border-2 rounded-xl p-2
        placeholder:text-[#D9D9D9] placeholder:font-light placeholder:text-2xl break-words
        text-white font:light
        focus:placeholder:text-transparent focus:outline-none focus:border-yellow resize-none"
        placeholder={placeHolderText}
        maxLength={250}
        onChange={onTextChange}
        id={name || "text_input"}
        value={description}
        disabled={disabled}
      />
    </div>
  );
}
