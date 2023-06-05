import { useState } from "react";

export default function CheckMark(name: string) {
  const [checked, setChecked] = useState("false");

  const updateCheck = () => {
    setChecked(checked == "false" ? "true" : "false");
  };

  return (
    <input
      type="checkbox"
      className="checkbox checkbox-secondary cursor-pointer bg-[#A7A7A7] checked:bg-cerise border-[#A7A7A7] hover:border-cerise"
      name={name}
      onClick={updateCheck}
      value={checked}
    />
  );
}
