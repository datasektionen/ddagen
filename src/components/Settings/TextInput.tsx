import type { ChangeEvent, Dispatch } from "react";

export function TextInput({
  description,
  setDescription,
  textAbove,
  placeHolderText,
}: {
  description: string;
  setDescription: Dispatch<string>;
  textAbove: string;
  placeHolderText: string;
}) {
  const onTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value) setDescription(e.target.value);
    else setDescription("");
  };

  return (
    <div className="flex flex-col items-start">
      <label
        className="block mb-2 text-xl font-normal text-center text-white dark:text-white tracking-wider"
        htmlFor="text_input"
      >
        {textAbove}
      </label>
      <textarea
        className="relative w-[330px] h-[150px] bg-black/25 border-solid border-yellow border-2 rounded-xl p-2
                placeholder:text-[#D9D9D9] placeholder:font-light placeholder:text-2xl break-words
                  focus:placeholder:text-transparent focus:outline-none focus:border-yellow resize-none"
        placeholder={placeHolderText}
        maxLength={250}
        onChange={onTextChange}
        value={description}
      />
    </div>
  );
}
