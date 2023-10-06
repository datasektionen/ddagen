import { MouseEventHandler } from "react";

export default function Button({
  value,
  loading,
  isImage,
  uppercase,
  onClick,
}: {
  value: string;
  loading: boolean;
  isImage?: boolean;
  uppercase?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      disabled={loading}
      className={`
          bg-cerise transition-transform hover:scale-110 text-white 
            w-fit ml-3 py-2 px-5 rounded-full cursor-pointer 
            disabled:cursor-wait disabled:grayscale ${
              uppercase == undefined || uppercase == true ? "uppercase" : ""
            }
        `}
      onClick={onClick}
    >
      {isImage ? <img src={value} className="w-[20px]" /> : value}
    </button>
  );
}
