import { useEffect, useState } from "react";

export function Select({
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
      className="form-select w-full py-2 px-1 leading-tight
          bg-transparent appearance-none
          text-slate-400
          border-0 border-b-2 border-red-500 valid:border-slate-400
          placeholder-shown:border-slate-400 focus:border-cerise
          focus:outline-none
          peer disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
