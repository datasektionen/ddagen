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
      className="checkbox checkbox-secondary cursor-pointer bg-[#A7A7A7] checked:bg-cerise border-[#A7A7A7] hover:border-cerise"
      name={name}
      checked={checked}
      onClick={() => {
        if (setValue) setValue();
      }}
    />
  );
}
