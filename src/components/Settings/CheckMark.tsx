import { useState } from "react";

export function CheckMark({
  name,
  checked,
  setValue,
}: {
  name: string;
  checked?: boolean;
  setValue?: () => void;
}) {
  return (
    <input
      type="checkbox"
      className="form-checkbox w-6 h-6 hover:cursor-pointer hover:border-cerise
                bg-[#A7A7A7] checked:text-cerise rounded-lg focus:ring-0"
      name={name}
      defaultChecked={checked}
      onClick={() => {
        if (setValue) setValue();
      }}
    />
  );
}
