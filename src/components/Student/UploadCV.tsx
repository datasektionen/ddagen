import React, { Dispatch } from 'react';
import { Buffer } from 'buffer';

export default function UploadCV(
  {
    file,
    setFile,
  }:{
    file: string;
    setFile: Dispatch<string>;

}) {
  function handleFileChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const files = evt.target.files;
    if (files && files.length > 0) {
        const newFile = files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(newFile);
        fileReader.onload = () => {
            const base64String = fileReader.result as string;
            // Manually add the filename to the base64 string
            const base64WithFilename = `data:${newFile.type};name=${newFile.name};base64,${base64String.split(',')[1]}`;
            setFile(base64WithFilename);
        };
    }
}


function base64ToFile(base64String: string): File {
  const match = base64String.match(/^data:(.+?);name=(.+?);base64,(.+)$/);
  if (!match) {
      throw new Error("Invalid base64 string format");
  }

  const type = match[1];
  const filename = match[2];
  const base64Data = match[3];

  const buffer = Buffer.from(base64Data, 'base64');
  const blob = new Blob([buffer], { type: type });
  return new File([blob], filename, { type: type });
}


  return (
    <div className="flex text-white items-center relative bg-black/25 w-[200px] h-[100px] rounded-3xl border-solid border-yellow border-2 overflow-hidden">
    <h2 className='whitespace-normal break-words text-center'>
      {base64ToFile(file).name}
    </h2>
    <h2 className="absolute bottom-0 left-0 right-0 text-center text-[10px] text-slate-400">
      {"" == "" ? (
        "pdf"
      ) : ""}
    </h2>
    <div>
      <label
        htmlFor={"cv"}
        className="absolute top-2 right-2 cursor-pointer bg-editIcon bg-white
                  bg-[length:30px_30px] w-[33px] h-[33px] bg-no-repeat bg-origin-content
                  pl-1 pb-1 rounded-md hover:scale-105 transition-transform"
      >
        <input
          id={"cv"}
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="invisible"
        />
      </label>
    </div>
  </div>
  
  );
}

