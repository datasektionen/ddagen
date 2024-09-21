import Link from "next/link";
import { useLocale } from "@/locales";
import { useState, useRef } from "react";
import { useRouter } from "next/router";

function SingleTeam({
  bgColor,
  borderColor,
  toReverse,
  textColor,
  image,
  teamInfo,
  roles,
}: {
  bgColor: string;
  borderColor: string;
  toReverse: boolean;
  textColor: string;
  image: string;
  teamInfo: string[];
  roles: string[];
}) {
  const t = useLocale();
  const [modalState, setModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const isPageActive = false;

 // old form: https://forms.gle/VyigeGiQuEXgE9eS8

  const openModal = () => {
    setModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModal(false);
    document.body.style.overflow = "auto";
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
          {teamInfo[0]}
        </h2>
        <h3 className="text-center text-cerise  lg:text-xl md:mt-1 lg:mt-2"></h3>
        <p className="text-white text-start mt-5 text-sm">{teamInfo[1]}</p>
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
              className={`bg-white bg-opacity-70 w-[325px] sm:w-[500px] max-h-[80vh] overflow-y-auto pb-5 flex flex-col rounded-3xl`}
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
                  {teamInfo[0]}
                </h2>
                <h3 className="text-center text-cerise text-2xl mt-2"></h3>
                <ul className="list-none mt-2 text-center">
                  {roles.map((role, index) => (
                    <li key={index} className={index !== 0 ? "mt-8" : ""}>
                      {role.split("\n").map((line, i) => (
                        <p
                          key={i}
                          className={
                            i === 0
                              ? "ml-0 text-center text-xl mb-2 text-cerise"
                              : "ml-0 mb-2"
                          }
                        >
                          {line}
                        </p>
                      ))}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SignupPage() {
  const t = useLocale();
  const isPageActive = true;
  const router = useRouter();

  if(!isPageActive) 
  {
    return (
      <div className="mt-[200px] mb-[200px] text-center text-white">
        {t.sok.notActive} 
      </div>
    )
  }
  else 
  {
    return (
      <div className="pt-[200px] pb-[200px]">
      <h1 className="text-5xl text-cerise font-medium text-center uppercase">
        {" "}
        {t.sok.header}
      </h1>
      <div className="flex flex-row items-center justify-center mt-[50px] px-5">
        <p className="text-white w-[300px] sm:w-[600px] text-center">
          {t.sok.description}
        </p>
      </div>
      <div className="flex flex-row items-center justify-center">
      <Link 
            className="flex flex-row items-center justify-center w-[175px] bg-cerise rounded-full h-[60px] mt-[50px] text-white text-center" 
            href="https://docs.google.com/forms/d/e/1FAIpQLSfRBriKZYXWZCssxv2Z-fsFPzPnTmfd6-gUvqtzNNgWsEV2bQ/viewform"
            target="_blank"
            >
            {t.sok.search}
          </Link>
      </div>
      <h1 className="text-4xl text-cerise font-normal text-center uppercase mt-[100px] px-5">
        {" "}
        {t.sok.info}
      </h1>

      <SingleTeam
        bgColor="bg-[#E2B7C9]"
        borderColor="border-[#E2B7C9]"
        toReverse={false}
        textColor="text-[#E2B7C9]"
        image="/img/projectGroup/g_pr.jpg"
        teamInfo={[
          t.sok.prGroup.header,
          t.sok.prGroup.text,
          t.event.fullParagraph1,
        ]}
        roles={t.sok.prGroup.roles}
        />

      <SingleTeam
        bgColor="bg-yellow"
        borderColor="border-yellow"
        toReverse={true}
        textColor="text-[#E2B7C9]"
        image="/img/projectGroup/g_dev.jpg"
        teamInfo={[
          t.sok.devGroup.header,
          t.sok.devGroup.text,
          t.event.fullParagraph1,
        ]}
        roles={t.sok.devGroup.roles}
        />

      <SingleTeam
        bgColor="bg-[#D5759C]"
        borderColor="border-[#D5759C]"
        toReverse={false}
        textColor="text-[#D5759C]"
        image="/img/projectGroup/g_sales.jpg"
        teamInfo={[
          t.sok.saleGroup.header,
          t.sok.saleGroup.text,
          t.event.fullParagraph2,
        ]}
        roles={t.sok.saleGroup.roles}
        />
      <SingleTeam
        bgColor="bg-cerise"
        borderColor="border-cerise"
        toReverse={true}
        textColor="text-cerise"
        image="/img/projectGroup/g_mass.jpg"
        teamInfo={[
          t.sok.massGroup.header,
          t.sok.massGroup.text,
          t.event.fullParagraph3,
        ]}
        roles={t.sok.massGroup.roles}
        />
      <SingleTeam
        bgColor="bg-yellow"
        borderColor="border-yellow"
        toReverse={false}
        textColor="text-yellow"
        image="/img/projectGroup/g_money.jpg"
        teamInfo={[
          t.sok.ecoGroup.header,
          t.sok.ecoGroup.text,
          t.event.fullParagraph4,
        ]}
        roles={t.sok.ecoGroup.roles}
        />
      <h1 className="text-4xl text-cerise font-normal text-center uppercase mt-[100px]">
        {" "}
        {t.sok.moreInfo}
      </h1>
      <div className="flex flex-row items-center justify-center">
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSfRBriKZYXWZCssxv2Z-fsFPzPnTmfd6-gUvqtzNNgWsEV2bQ/viewform" target="_blank">
          <button className="w-[175px] bg-cerise rounded-full h-[60px] mt-[50px]">
            <p className="text-white text-center">{t.sok.search}</p>
          </button>
        </a>
      </div>
    </div>
    );
  }
}
