import Locale, {useLocale} from "@/locales";
import React, {useState} from "react";
import {step} from "@/components/Settings/Step";
import {UploadButton} from "@/components/Settings/UploadButton";
import {TextInput} from "@/components/Settings/TextInput";

export function GeneralInformation(){
  const t = useLocale();

  const [whiteLogo, setWhiteLogo] = useState("");
  const [colorLogo, setColorLogo] = useState("");
  const [description, setDescription] = useState("");

  const content = <div className="flex justify-center w-full">
    <div className="mr-4">
      <UploadButton
        t={useLocale()}
        selectedImage={whiteLogo}
        setSelectedImage={setWhiteLogo}
        textAbove={t.exhibitorSettings.step0.logoWhite}
        textInsideMiddle="/img/fluga_gra.png"
        textInsideBottom={"SVG"}
        accept={["image/svg+xml"]}
      />
    </div>

    <div className="mr-4">
      <UploadButton
        t={useLocale()}
        selectedImage={colorLogo}
        setSelectedImage={setColorLogo}
        textAbove={t.exhibitorSettings.step0.logoColour}
        textInsideMiddle="/img/fluga_gra.png"
        textInsideBottom={t.exhibitorSettings.step0.format}
        accept={["image/png", "image/svg+xml"]}
      />
    </div>


    <TextInput
      description={description}
      setDescription={setDescription}
      textAbove={t.exhibitorSettings.step0.description}
      placeHolderText="Om oss"
    />
  </div>;

  return step(t.exhibitorSettings.step0.generalInfo,0,content,t);
}
