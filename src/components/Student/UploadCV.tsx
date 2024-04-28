import React, { Dispatch, useState } from 'react';

export default function UploadCV(
  {
    setFile,
  }:{
    setFile: Dispatch<string>;

}) {
  function handleFileChange(evt: React.ChangeEvent<HTMLInputElement>){
    const files = evt.target.files;
    if (files && files.length > 0) {
        const file = files[0]
        // convert file to string
    } else {
        setFile("");
    }
  };

  return (
    <div className="ml-[8px]">
      <input
        className="text-white"
        type="file"
        onChange={handleFileChange}
        accept=".pdf"
      />
    </div>
  );
}

