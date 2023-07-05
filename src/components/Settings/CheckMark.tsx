import { useState } from "react";

export function CheckMark({
  name,
  checked,
  defaultChecked,
  onClick,
}: {
  name: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onClick?: any;
}) {
  return (
    <input
      type="checkbox"
      className="form-checkbox w-6 h-6 hover:cursor-pointer hover:border-cerise
                bg-[#A7A7A7] checked:text-cerise rounded-lg focus:ring-0"
      name={name}
      checked={checked}
      defaultChecked={defaultChecked}
      onClick={() => {
        if (onClick) onClick();
      }}
      onChange={(e) => {}}
    />
  );
}
