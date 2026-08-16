import React from "react";
import Locale from "@/locales";
import { UploadButton } from "@/components/Company/UploadButton";
import { TextInput } from "@/components/Company/TextInput";
import { CheckMark } from "@/components/CheckMark";
import { InputField } from "@/components/InputField";


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
		allowMarketing,
		setAllowMarketing,
		showSetUpPage,
		hasChecked,
		setHasChecked
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
		allowMarketing: boolean;
		setAllowMarketing: React.Dispatch<React.SetStateAction<boolean>>;
		showSetUpPage: boolean;
		hasChecked: boolean;
		setHasChecked: React.Dispatch<React.SetStateAction<boolean>>;
	}

) {
	return (
		<>
			<h2 className="uppercase text-cerise text-2xl md:text-4xl font-normal px-[10px] break-words w-full text-center pt-4">
				{t.exhibitorSettings.table.row1.section1.header}
			</h2>
			<div className="w-full flex flex-col gap-8 mt-8 mb-20 lg:px-24 items-center">
				<div className="w-[520px] max-w-[90vw]">
					<InputField
						fields={{ industry: t.exhibitorSettings.table.row1.section1.industry }}
						name="industry"
						value={industry}
						setValue={(value: string, _element: HTMLInputElement) => setIndustry(value)}
					/>
				</div>
			  <div className="">
					<TextInput
						description={description}
						name="description"
						setDescription={setDescription}
						autoGrow={true}
						textAreaClassName="w-[520px] max-w-[90vw]"
						textAbove={t.exhibitorSettings.table.row1.section1.description}
						placeHolderText={
							t.exhibitorSettings.table.row1.section1.placeholderText
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
							textInsideBottom={""}
							accept={["image/*"]}
						/>
					</div>
					<div>
						<UploadButton
							t={t}
							selectedImage={colorLogo}
							setSelectedImage={setColorLogo}
							textAbove={t.exhibitorSettings.table.row1.section1.logoColour}
							textInsideMiddle="/img/fluga_gra.png"
							textInsideBottom={""}
							accept={["image/*"]}
						/>
					</div>
			  </div>

			  <div className="w-full max-w-[420px] text-white bg-black/25 border-2 border-yellow rounded-xl px-4 py-3">
					<div className="flex items-center justify-between gap-4">
						<div>
							<p className="text-lg">{t.exhibitorSettings.step0.allowMarketing}</p>
							<p className="text-sm text-[#D9D9D9]">
								{(!hasChecked && showSetUpPage ? true : allowMarketing)
								? t.exhibitorSettings.step0.yes
								: t.exhibitorSettings.step0.no}
							</p>
						</div>
						<CheckMark
							name="allowMarketing"
							checked={!hasChecked && showSetUpPage ? true : allowMarketing}
							onClick={() => {
								setHasChecked(true);
								setAllowMarketing((current) => !current);
							}}
						/>
					</div>
			  </div>
			</div>
		</>
	);
}
