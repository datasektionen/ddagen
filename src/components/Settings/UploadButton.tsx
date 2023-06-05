import { useState } from "react";

export function UploadButton({
  textAbove,
  textInside,
  accept,
}: {
  textAbove: string;
  textInside: string;
  accept: string;
}) {
  const [selectedImage, setSelectedImage] = useState();

  const onImageChange = (e: any) => {
    if (e.target.files && e.target.files.length == 1)
      setSelectedImage(e.target.files[0]);
    else setSelectedImage(undefined);
  };

  return (
    <div className="flex flex-col items-center">
      <label
        className="block mb-2 text-xl font-normal text-center text-gray-900 dark:text-white tracking-wider"
        htmlFor="file_input"
      >
        {textAbove}
      </label>
      <div className="relative flex flex-col bg-black/50 w-[150px] h-[150px] rounded-3xl border-solid border-cerise border-2 mx-auto overflow-hidden">
        <h1 className="relative top-[50%] -translate-y-2/4 text-center text-xl">
          {!selectedImage ? (
            textInside
          ) : (
            <img className="mx-auto" src={URL.createObjectURL(selectedImage)} />
          )}
        </h1>
        <input
          type="file"
          className="invisible after:visible after:absolute after:top-2 after:right-2 after:cursor-pointer 
                      after:content-[''] after:bg-editIcon after:bg-white after:bg-[length:30px_30px] 
                      after:w-[33px] after:h-[33px] after:bg-no-repeat after:bg-origin-content after:pl-1
                      after:pb-1 after:rounded-md"
          accept={accept}
          onChange={onImageChange}
        />
      </div>
    </div>
  );
}
