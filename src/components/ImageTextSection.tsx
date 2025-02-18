import type Locale from "@/locales";

type imagePropsType = {
  src: string,
  alt: string,
  className?: string
}

export default function ImageTextSection({
  t,
  imageProps,
  leftSideImage = true,
  imageOverOnMobile = true,
  background = "",
  className = "",
  children
}: {
  t: Locale;
  imageProps: imagePropsType,
  leftSideImage?: boolean,
  imageOverOnMobile?: boolean,
  className?: string,
  background?: string,
  children: React.ReactNode
}) {
  console.log("BG-IMAGE", background)
  return (
    <div className={`
      flex flex-col lg:flex-row 
      ${(imageOverOnMobile && leftSideImage) || (!imageOverOnMobile && !leftSideImage) ? "flex-col" : "flex-col-reverse" }
      max-w-[90vw] lg:max-w-5xl mx-auto 
      p-4
      bg-[rgba(15,20,45,0.75)]
      ${className}
    `}>
      
      { leftSideImage ?
      <>
        <div className="flex basis-1 sm:basis-1/2 align-center">
          <div className="flex max-w-full lg:justify-end">
            <img 
              src={imageProps.src} 
              alt={imageProps.alt} 
              className={"object-contain w-[28rem] sm:w-full sm:max-w-lg lg:max-w-lg lg:pr-8 lg:pl-4 lg:py-4" + imageProps.className || ""} />
          </div>
        </div>
        <div className={`basis-1 sm:basis-1/2 flex flex-col
            px-1 pt-8 lg:pt-0 pb-8 lg:pb-2 
            justify-center align-center`}>
          {
            children
          }
        </div>
      </>
      :
      <>
        <div className={`basis-1 sm:basis-1/2 flex flex-col 
            pt-4 lg:pt-0 pb-8 lg:pb-2 
            justify-center align-center`}>
          {
            children
          }
        </div>
        <div className="flex basis-1 sm:basis-1/2 align-center">
          <div className="flex max-w-full lg:justify-end">
            <img 
              src={imageProps.src} 
              alt={imageProps.alt} 
              className={"object-contain w-[28rem] sm:w-full sm:max-w-lg lg:max-w-lg lg:pr-4 lg:pl-8 lg:py-4 " + imageProps.className} />
          </div>
        </div>
      </>
      }
    </div>
  );
}
