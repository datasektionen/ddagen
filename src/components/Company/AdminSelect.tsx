import { useEffect, useState } from "react";

export function AdminSelect({
  name,
  id,
  options,
  values,
  value,
  setValue,
  required,
  disabled = false,
  onChange = ()=>{},
}: {
  name: string;
  id?: string;
  options: string[];
  values: any[];
  value: any;
  setValue: (value: any) => void;
  required?: boolean;
  disabled?: boolean,
  onChange?: () => void;
}) {
  return (
    <select
      className="
          focus:outline-none
          peer disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
          relative w-[330px] h-[50px] bg-black/25 border-solid border-yellow border-2 rounded-xl p-2
          placeholder:text-[#D9D9D9] placeholder:font-light placeholder:text-2xl break-words
          text-white font:light
          focus:placeholder:text-transparent focus:outline-none focus:border-yellow resize-none"
      name={name}
      id={id}
      value={value || values[0]}
      onChange={(e) => setValue(e.target.value)}
    >
      {options.map((option, index) => (
        <option
          key={index}
          value={values ? values[index] : option}
        >
          {option}
        </option>
      ))}
    </select>
  );
}