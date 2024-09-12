import React, { createContext, useContext } from "react";
import { useState, useEffect, ReactNode } from "react";
import { set } from "zod";

export const AnimationContext = createContext({isAnimationDone: false, setIsAnimationDone: (value: boolean) => {}});

export const AnimationProvidor = ({children}: any) => {
    const [isAnimationDone, setIsAnimationDone] = useState(false); // used to determine if the index page has been loaded before


    return (
        <AnimationContext.Provider value={{isAnimationDone, setIsAnimationDone}}>
            {children}
        </AnimationContext.Provider>
    );
}

export const useAnimation = () => useContext(AnimationContext);

interface ModalContextType {
    openModal: (saved: boolean, openModal: string, duration?: number) => void;
  }

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = (): ModalContextType => {
    const context = useContext(ModalContext);
    if (!context) {
      throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
  };

export const ModalContextProvider = ({children}: any) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<string|null>(null);
    const timerRef = React.useRef<any | null>(null);

    const openModal = (saved: boolean, message: string, duration: number = 1000) => {
        if(timerRef.current) {
            clearTimeout(timerRef.current);
        }
        if(saved){
            setModalContent(message);
        } else {
            setModalContent(message);
        }
        setIsModalOpen(true);
        // Automatically close the modal after the specified duration
        timerRef.current = setTimeout(() => {
          closeModal();
          timerRef.current = null;
        }, duration);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <ModalContext.Provider value={{openModal}}>
            
            {true && (
                <div className={`fixed bottom-0 right-2 mb-4 text-white px-4 py-2 
                        shadow-lg z-50 bg-white/20 backdrop-blur-md border-4 
                        border-yellow rounded-2xl transition-opacity ${isModalOpen ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex items-center justify-between text-xl">
                        {modalContent}
                    </div>
                </div>
              )}
            {children}
        </ModalContext.Provider>
    );
}