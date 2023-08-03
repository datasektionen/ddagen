import Locale from "@/locales";
import type { ChangeEvent, Dispatch } from "react";

export function UploadButton({
  t,
  selectedImage,
  setSelectedImage,
  textAbove,
  textInsideMiddle,
  textInsideBottom,
  accept,
}: {
  t: Locale;
  selectedImage: string;
  setSelectedImage: Dispatch<string>;
  textAbove: string;
  textInsideMiddle: string;
  textInsideBottom: string;
  accept: string[];
}) {
  function toBase64(file: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  }

  async function onImageChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length == 1) {
      const MAX_FILE_SIZE = 5e6;
      const FILE_SIZE = e.target.files[0].size as number;

      if (accept.includes(e.target.files[0].type)) {
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
      } else {
        alert(t.exhibitorSettings.table.row1.imageTypeNotSupported);
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
        <h1 className="relative top-[50%] -translate-y-2/4 text-center text-2xl">
          {selectedImage == "" ? (
            textInsideMiddle
          ) : (
            <img className="mx-auto" src={selectedImage} />
          )}
        </h1>
        <h1 className="relative top-[70%] -translate-y-2/4 text-center text-[10px] text-slate-400">
          {selectedImage == "" ? (
            textInsideBottom
          ) : ""}
        </h1>
        <div>
          <label
            htmlFor={textAbove}
            className="absolute top-2 right-2 cursor-pointer bg-editIcon bg-white
                      bg-[length:30px_30px] w-[33px] h-[33px] bg-no-repeat bg-origin-content
                      pl-1 pb-1 rounded-md hover:scale-105 transition-transform"
          >
            <input
              id={textAbove}
              type="file"
              accept={accept.join(",")}
              onChange={onImageChange}
              className="invisible"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
