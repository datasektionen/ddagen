import Locale from "@/locales";
import React, { Dispatch } from 'react';
import { Buffer } from 'buffer';
import base64ToFile from "@/shared/HandlePDF";
import { set } from "zod";

export default function UploadCV(
  {
    t,
    file,
    setFile,
  }:{
    t: Locale;
    file: string;
    setFile: Dispatch<string>;

}) {
  function handleFileChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const files = evt.target.files;
    if (files && files.length > 0) {
        const newFile = files[0];

        const ALLOWED_FILE_TYPE = "application/pdf";
        if (newFile.type !== ALLOWED_FILE_TYPE) {
            alert(t.exhibitorSettings.table.row1.fileTypeNotSupported);
            setFile("");
            return false;
        }

        // Check file size
        const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB 
        const FILE_SIZE = newFile.size;
        if (FILE_SIZE > MAX_FILE_SIZE) {
            alert(t.exhibitorSettings.table.row1.maxImageWarning(
              (FILE_SIZE / 1e6).toFixed(2),
              (MAX_FILE_SIZE / 1e6).toFixed(0)
            ));
            setFile("");
            return false;
        }
        
        

        const fileReader = new FileReader();
        
        // Handle successful file load
        fileReader.onload = () => {
            try {
                const base64String = fileReader.result as string;
                const base64WithFilename = `data:${newFile.type};name=${newFile.name};base64,${base64String.split(',')[1]}`;
                setFile(base64WithFilename);
            } catch (error) {
                console.error("Error processing PDF:", error);
                alert(t.exhibitorSettings.table.row1.fileDataMalformed);
            }
        };

        // Handle file load errors
        fileReader.onerror = () => {
            alert(t.exhibitorSettings.table.row1.fileDataMalformed);
            console.error("Error reading file:", fileReader.error);
        };

        fileReader.readAsDataURL(newFile);
    }
}

  return (
    <div className="flex text-white items-center relative bg-black/25 min-w-[200px] h-[60px] p-4 rounded-3xl border-solid border-yellow border-2 overflow-hidden">
      {
        file!==""?
          <h2 onClick={()=>{
            const pdffile = base64ToFile(file);
            if(! pdffile ){ return; }
            window.open(URL.createObjectURL(pdffile), '_blank');
          }}
            className='whitespace-normal break-words text-center cursor-pointer'>
            {base64ToFile(file) != null ? base64ToFile(file)?.name : ""}
          </h2>:
          <></>
      }
    
    <h2 className="absolute bottom-0 left-0 right-0 text-center text-[12px] text-slate-400">
      {"" == "" ? (
        "Type: pdf"
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
          name="cv"
          onChange={handleFileChange}
          className="invisible"
        />
      </label>
    </div>
  </div>
  
  );
}

