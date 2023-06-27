import Locale from "@/locales";
import { Dispatch } from "react";

export function UploadButton({
  t,
  selectedImage,
  setSelectedImage,
  textAbove,
  textInside,
  accept,
}: {
  t: Locale;
  selectedImage: string;
  setSelectedImage: Dispatch<string>;
  textAbove: string;
  textInside: string;
  accept: string;
}) {
  function toBase64(file: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  }

  async function onImageChange(e: any) {
    if (e.target.files && e.target.files.length == 1) {
      const MAX_FILE_SIZE = 5e6;
      const FILE_SIZE = e.target.files[0].size as number;

      if (FILE_SIZE <= MAX_FILE_SIZE) {
        await toBase64(e.target.files[0])
          .then((data) => {
            setSelectedImage(data as string);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert(
          t.exhibitorSettings.table.row1.maxImageWarning(
            (FILE_SIZE / 1e6).toFixed(2),
            (MAX_FILE_SIZE / 1e6).toFixed(0)
          )
        );
      }

      e.target.files = null;
    } else setSelectedImage("");
  }

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
          {selectedImage == "" ? (
            textInside
          ) : (
            <img className="mx-auto" src={selectedImage} />
          )}
        </h1>
        <input
          type="file"
          className="invisible after:visible after:absolute after:top-2 after:right-2 after:cursor-pointer 
                      after:content-[''] after:bg-editIcon after:bg-white after:bg-[length:30px_30px] 
                      after:w-[33px] after:h-[33px] after:bg-no-repeat after:bg-origin-content after:pl-1
                      after:pb-1 after:rounded-md after:hover:scale-105 after:transition-transform"
          accept={accept}
          onChange={onImageChange}
        />
      </div>
    </div>
  );
}
