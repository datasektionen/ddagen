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
  roles,
}: {
  bgColor: string;
  borderColor: string;
  toReverse: boolean;
  textColor: string;
  image: string;
  eventInfo: string[];
  price: string;
  roles: string[];
}) {
  const t = useLocale();
  const [modalState, setModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const handleOverlayClick = (event: React.MouseEvent) => {
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
        <img src={image} className="md:h-[300px] lg:h-[300px] rounded-xl"></img>
      </div>
      <div
        className={`${bgColor} ${borderColor} border-[3px] rounded-lg py-[25px] md:py-[25px] lg:py-[50px] px-[20px] bg-opacity-10 md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[300px]`}
      >
        <h2 className="text-center lg:text-3xl md: text-xl text-white">
          {eventInfo[0]}
        </h2>
        <h3 className="text-center text-cerise  lg:text-xl md:mt-1 lg:mt-2"></h3>
        <p className="text-white text-start mt-5 text-sm">{eventInfo[1]}</p>
        <button className={`${textColor} text-start mt-3`} onClick={openModal}>
          <u>{t.sok.extra}</u>
        </button>

        {/*MODAL*/}
        {modalState && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-lg"
            ref={modalRef}
            onClick={handleOverlayClick}
          >
            <div
              className={`bg-white bg-opacity-70 w-[500px] max-h-[80vh] overflow-y-auto pb-5 flex flex-col rounded-3xl`}
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
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
                <h3 className="text-center text-cerise text-2xl mt-2"></h3>
                <ul className="list-none mt-2 text-center">
                  {roles.map((role, index) => (
                    <li key={index} className={index !== 0 ? "mt-8" : ""}>
                      {role.split("\n").map((line, i) => (
                        <p
                          key={i}
                          className={
                            i === 0 ? "ml-0 text-left text-cerise" : "ml-0"
                          }
                        >
                          {line}
                        </p>
                      ))}
                    </li>
                  ))}
                </ul>
                <p className="text-black text-start mt-5">
                  {/* Content here */}
                </p>
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
      <h1 className="text-5xl text-cerise font-medium text-center uppercase">
        {" "}
        {t.sok.header}
      </h1>
      <div className="flex flex-row items-center justify-center mt-[50px]">
        <p className="text-white w-[300px] sm:w-[600px] text-center">
          {t.sok.description}
        </p>
      </div>
      <a href="https://forms.gle/VyigeGiQuEXgE9eS8" target="_blank">
      <div className="flex flex-row items-center justify-center">
        <button className="w-[200px] bg-cerise rounded-full h-[60px] mt-[50px]">
          <p className="text-white text-center"> {t.sok.search}</p>
        </button>
      </div>
      </a>
      <h1 className="text-4xl text-cerise font-normal text-center uppercase mt-[100px]">
        {" "}
        {t.sok.info}
      </h1>

      <SingleEvent
        bgColor="bg-[#E2B7C9]"
        borderColor="border-[#E2B7C9]"
        toReverse={false}
        textColor="text-[#E2B7C9]"
        image="/img/groupPictures/prTeam.jpg"
        eventInfo={[
          t.sok.prGroup.header,
          t.sok.prGroup.text,
          t.event.fullParagraph1,
        ]}
        price="50 000"
        roles={t.sok.prGroup.roles}
      />
      <SingleEvent
        bgColor="bg-[#D5759C]"
        borderColor="border-[#D5759C]"
        toReverse={true}
        textColor="text-[#D5759C]"
        image="/img/groupPictures/salesTeam.jpg"
        eventInfo={[
          t.sok.saleGroup.header,
          t.sok.saleGroup.text,
          t.event.fullParagraph2,
        ]}
        price="15 000"
        roles={t.sok.saleGroup.roles}
      />
      <SingleEvent
        bgColor="bg-cerise"
        borderColor="border-cerise"
        toReverse={false}
        textColor="text-cerise"
        image="/img/groupPictures/massTeam.jpg"
        eventInfo={[
          t.sok.massGroup.header,
          t.sok.massGroup.text,
          t.event.fullParagraph3,
        ]}
        price="60 000"
        roles={t.sok.massGroup.roles}
      />
      <SingleEvent
        bgColor="bg-yellow"
        borderColor="border-yellow"
        toReverse={true}
        textColor="text-yellow"
        image="/img/groupPictures/ecoTeam.jpg"
        eventInfo={[
          t.sok.ecoGroup.header,
          t.sok.ecoGroup.text,
          t.event.fullParagraph4,
        ]}
        price="17 000 kr + 150 kr / student"
        roles={t.sok.ecoGroup.roles}
      />
      <h1 className="text-4xl text-cerise font-normal text-center uppercase mt-[100px]">
        {" "}
        {t.sok.moreInfo}
      </h1>
      <a href="https://forms.gle/VyigeGiQuEXgE9eS8" target="_blank">
      <div className="flex flex-row items-center justify-center">
        <button className="w-[200px] bg-cerise rounded-full h-[60px] mt-[50px]">
          <p className="text-white text-center"> {t.sok.search}</p>
        </button>
      </div>
      </a>
    </div>
  );
}
