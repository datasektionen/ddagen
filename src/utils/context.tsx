import React, { createContext, useContext } from "react";
import { useState, useEffect } from "react";

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
