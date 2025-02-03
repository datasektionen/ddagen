import React from "react";
import Locale from "@/locales";
import { UploadButton } from "@/components/Company/UploadButton";
import { TextInput } from "@/components/Company/TextInput";

export default function GeneralInfo(
    {
        t,
        whiteLogo,
        setWhiteLogo,
        colorLogo,
        setColorLogo,
        description,
        setDescription,
        industry,
        setIndustry,
    }: {
        t: Locale;
        whiteLogo: string;
        setWhiteLogo: React.Dispatch<React.SetStateAction<string>>;
        colorLogo: string;
        setColorLogo: React.Dispatch<React.SetStateAction<string>>;
        description: string;
        setDescription: React.Dispatch<React.SetStateAction<string>>;
        industry: string;
        setIndustry: React.Dispatch<React.SetStateAction<string>>;
    }

) {
    return (
        <>
            <h2 className="uppercase text-cerise text-2xl md:text-4xl font-normal px-[10px] break-words w-full text-center pt-4">
                {t.exhibitorSettings.table.row1.section1.header}
            </h2>
            <div className="w-full flex flex-col lg:flex-row gap-8 mt-8 mb-20 lg:px-24 flex-wrap items-center">
              <div className="">
                <TextInput
                    description={description}
                    setDescription={setDescription}
                    textAbove={t.exhibitorSettings.table.row1.section1.description}
                    placeHolderText={
                      t.exhibitorSettings.table.row1.section1.placeholderText
                    }
                    />
              </div>
              <div>
                <TextInput
                  description={industry}
                  setDescription={setIndustry}
                  textAbove={t.exhibitorSettings.table.row1.section1.industry}
                  placeHolderText={
                    t.exhibitorSettings.table.row1.section1.placeholderTextIndustry
                  }
                />
            </div>
            <div className="flex flex-col max-sm:gap-y-8 sm:flex-row sm:gap-x-8">
                <div>
                    <UploadButton
                    t={t}
                    selectedImage={whiteLogo}
                    setSelectedImage={setWhiteLogo}
                    textAbove={t.exhibitorSettings.table.row1.section1.logoWhite}
                    textInsideMiddle="/img/fluga_gra.png"
                    textInsideBottom={"SVG"}
                    accept={["image/svg+xml"]}
                    />
                </div>
                <div>
                    <UploadButton
                    t={t}
                    selectedImage={colorLogo}
                    setSelectedImage={setColorLogo}
                    textAbove={t.exhibitorSettings.table.row1.section1.logoColour}
                    textInsideMiddle="/img/fluga_gra.png"
                    textInsideBottom={`SVG ${t.exhibitorSettings.table.row1.section1.or} PNG`}
                    accept={["image/png", "image/svg+xml"]}
                    />
                </div>
              </div>
        </div>
    </>
    );
}
