import { CheckMark } from "@/components/CheckMark";
import Locale from "@/locales";
import { Exhibitor } from "@/shared/Classes";

import { useRouter } from "next/router";
import { useRef, useState } from "react";

export function UpdateSpecialOrders({
    t, 
    exhibitor,
    closeModal,
    setSpecialOrders
} : {
    t: Locale;
    exhibitor: Exhibitor;
    closeModal: () => void;
    setSpecialOrders: (z: string, a: number, b: number, c: number, d: number) => void;
}) {
    const modalRef = useRef<HTMLDivElement>(null);

    const [error, setError] = useState("");

    const [studentMeetings, setStudentMeetings] = useState<number>(exhibitor.studentMeetings);
    const [socialMediaPost, setSocialMediaPost] = useState<number>(exhibitor.socialMediaPost);
    const [panelDiscussion, setPanelDiscussion] = useState<number>(exhibitor.panelDiscussion);
    const [goodieBagLogo, setGoodieBagLogo] = useState<number>(exhibitor.goodieBagLogo);
    
    function handleOverlayClick(event: React.MouseEvent) {
        if (modalRef.current === event.target) {
          closeModal();
        }
    }

    const UpdateStudentMeetings = () => {
        setStudentMeetings(exhibitor.studentMeetings);
        setStudentMeetings(studentMeetings == 0 ? 1 : 0);
    };

    const UpdateSocialMediaPost = () => {
        setSocialMediaPost(exhibitor.socialMediaPost);
        setSocialMediaPost(socialMediaPost == 0 ? 1 : 0);
    };

    const UpdatePanelDiscusson = () => {
        setPanelDiscussion(exhibitor.panelDiscussion);
        setPanelDiscussion(panelDiscussion == 0 ? 1 : 0);
    };

    const UpdateGoodieBagLogo = () => {
        setGoodieBagLogo(exhibitor.goodieBagLogo);
        setGoodieBagLogo(goodieBagLogo == 0 ? 1 : 0);
    };

    function Submit({ value }: { value: string }) {
        return (
          <input
            type="submit"
            value={value}
            className="
              bg-cerise transition-transform hover:scale-110 focus:scale-110
              focus:outline-none text-white uppercase w-fit py-2 px-10
              rounded-full cursor-pointer disabled:cursor-wait disabled:grayscale
            "
          />
        );
      }

      return (
        <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50"
        ref={modalRef}
        onClick={handleOverlayClick}
      >
        <div
          className={`bg-slate-200 bg-opacity-100 w-[325px] sm:w-[500px] max-h-[80vh] overflow-y-auto pb-5 flex flex-col rounded-3xl z-50`}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="relative py-[25px] justify-center flex flex-row focus:outline-none focus:ring-0">
            <button
              className="absolute top-5 right-3 w-[50px] h-[50px] flex items-center justify-center"
              onClick={closeModal}
            >
              <div className="absolute h-[50px] w-[5px] bg-white rounded-md rotate-45"></div>
              <div className="absolute h-[50px] w-[5px] bg-white rounded-md -rotate-45"></div>
            </button>
                  <div className="px-5 mt-5">
                    <h2 className="text-black mb-8 text-3xl font-medium uppercase">
                      {"Update special orders for " + exhibitor.name}
                    </h2>
        
                    <form
                      className="flex flex-col gap-12 min-w-[325px] max-w-[375px] text-black"
                      onSubmit={(e) => {
                        e.preventDefault();
                         setSpecialOrders(
                            exhibitor.id,
                            studentMeetings, 
                            socialMediaPost,
                            panelDiscussion,
                            goodieBagLogo
                        )
                      }}
                    >
                        <div>
                        {t.admin.sales.header.specialOrders.studentMeetings}
                        <CheckMark
                        name="Student meetings"
                        defaultChecked = {exhibitor.studentMeetings != 0}
                        onClick={() => UpdateStudentMeetings()}
                        />
                        </div>
                        <div>
                        {t.admin.sales.header.specialOrders.socialMediaPost}
                        <CheckMark
                        name="Social media post"
                        defaultChecked = {exhibitor.socialMediaPost != 0}
                        onClick={() => UpdateSocialMediaPost()}
                        />
                        </div>
                        <div>
                        {t.admin.sales.header.specialOrders.panelDiscussion}
                        <CheckMark
                        name="Paneldiscussion"
                        defaultChecked = {exhibitor.panelDiscussion != 0}
                        onClick={() => UpdatePanelDiscusson()}
                        />
                        </div>
                        <div>
                        {t.admin.sales.header.specialOrders.goodiebagLogo}
                        <CheckMark
                        name="Goodiebag logo"
                        defaultChecked = {exhibitor.panelDiscussion != 0}
                        onClick={() => UpdateGoodieBagLogo()}
                        />
                        </div>
        
                      <Submit value={t.admin.sales.header.specialOrders.specialOrderSave} />
                    </form>
                  </div>
                </div>
              </div>
            </div>
    );
}