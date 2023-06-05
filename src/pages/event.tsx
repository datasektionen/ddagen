import { useLocale } from "@/locales";
import { useState, useRef } from "react";
function SingleEvent({
  bgColor,
  borderColor,
  toReverse,
  textColor,
  image,
  eventInfo,
  price,
}: {
  bgColor: string;
  borderColor: string;
  toReverse: boolean;
  textColor: string;
  image: string;
  eventInfo: string[];
  price: string;
}) {
  const t = useLocale();
  const [modalState, setModal] = useState(false);
  const modalRef = useRef();

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const handleOverlayClick = (event) => {
    if (modalRef.current === event.target) {
      closeModal();
    }
  };

  return (
    <div
      className={`${
        toReverse
          ? "md:flex-row-reverse flex-col-reverse"
          : "md:flex-row flex-col-reverse"
      } flex flex-row gap-[50px] px-[50px] md:px-[50px] mt-[100px] justify-center`}
    >
      <div className="py-[0px]">
        <img src={image} className="md:h-[300px] lg:h-[300px]"></img>
      </div>
      <div
        className={`${bgColor} ${borderColor} border-[3px] rounded-lg py-[25px] md:py-[25px] lg:py-[50px] px-[20px] bg-opacity-10 md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[300px]`}
      >
        <h2 className="text-center lg:text-3xl md: text-xl text-white">
          {eventInfo[0]}
        </h2>
        <h3 className="text-center text-cerise  lg:text-xl md:mt-1 lg:mt-2">
          {" "}
          {t.event.subheader + price + " :-"}
        </h3>
        <p className="text-white text-start mt-5 text-sm">{eventInfo[1]}</p>
        <button className={`${textColor} text-start mt-3`} onClick={openModal}>
          <u>{t.event.extra}</u>
        </button>
        {modalState && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60"
            ref={modalRef}
            onClick={handleOverlayClick}
          >
            <div
              className={` bg-white bg-opacity-70 w-[500px] pb-5 flex flex-col  rounded-3xl`}
            >
              <div className="relative py-[0px] justify-center flex flex-row">
                <img src={image} />

                <button
                  className="absolute top-5 right-3 w-[50px] h-[50px] flex items-center justify-center"
                  onClick={closeModal}
                >
                  <div className="absolute h-[50px] w-[5px] bg-white rounded-md rotate-45"></div>
                  <div className="absolute h-[50px] w-[5px] bg-white rounded-md -rotate-45"></div>
                </button>
              </div>
              <div className="px-5 mt-5">
                <h2 className="text-center text-3xl text-black">
                  {eventInfo[0]}
                </h2>
                <h3 className="text-center text-cerise text-2xl mt-2">
                  {t.event.subheader + price + " :-"}
                </h3>
                <p className="text-black text-start mt-5">{eventInfo[2]}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Students() {
  const t = useLocale();

  return (
    <div className="pt-[200px] pb-[300px]">
      <h1 className="text-5xl text-cerise font-medium text-center"> EVENT</h1>
      <SingleEvent
        bgColor="bg-[#E2B7C9]"
        borderColor="border-[#E2B7C9]"
        textColor="text-[#E2B7C9]"
        image="/img/lunchPic.png"
        eventInfo={[
          t.event.header1,
          t.event.paragraph1,
          t.event.fullParagraph1,
        ]}
        price="50 000"
      />
      <SingleEvent
        bgColor="bg-[#D5759C]"
        borderColor="border-[#D5759C]"
        toReverse={true}
        textColor="text-[#D5759C]"
        image="/img/officePic.png"
        eventInfo={[
          t.event.header2,
          t.event.paragraph2,
          t.event.fullParagraph2,
        ]}
        price="15 000"
      />
      <SingleEvent
        bgColor="bg-cerise"
        borderColor="border-cerise"
        textColor="text-cerise"
        image="/img/barPic.png"
        eventInfo={[
          t.event.header3,
          t.event.paragraph3,
          t.event.fullParagraph3,
        ]}
        price="60 000"
      />
      <SingleEvent
        bgColor="bg-yellow"
        borderColor="border-yellow"
        toReverse={true}
        textColor="text-yellow"
        image="/img/afterworkPic.png"
        eventInfo={[
          t.event.header4,
          t.event.paragraph4,
          t.event.fullParagraph4,
        ]}
        price="17 000 kr + 150 kr / student"
      />
    </div>
  );
}
