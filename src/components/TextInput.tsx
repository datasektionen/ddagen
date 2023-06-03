import { useState } from "react";

export default function TextInput(textAbove: string, placeHolderText: string) {
  const [description, setDescription] = useState();

  const onTextChange = (e: any) => {
    if (e.target.value) setDescription(e.target.value);
  };

  return (
    <div className="flex flex-col items-start">
      <label
        className="block mb-2 text-xl font-normal text-center text-gray-900 dark:text-white tracking-wider"
        htmlFor="text_input"
      >
        {textAbove}
      </label>
        <textarea
          className="relative w-[450px] h-[150px] bg-white/30 border-solid border-white/70 border-2 rounded-xl p-2
                placeholder:text-[#D9D9D9] placeholder:font-light placeholder:text-2xl break-words
                  focus:placeholder:text-transparent focus:outline-none focus:border-white/70 resize-none"
          placeholder={placeHolderText}
          maxLength={250}
          onChange={onTextChange}
        />
    </div>
  );
}
