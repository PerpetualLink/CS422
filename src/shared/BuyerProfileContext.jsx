import { createContext, useContext, useState } from "react";
import { pages } from "./navigation";

// This context lets the Financing page (and anywhere else) read the values
// the user entered into the HomeSavingsCalculator on the Getting Started page.
// Defaults match the calculator's initial state so the recommendation still
// works even if the user jumps straight to Financing without touching the calculator.

const defaultProfile = {
    homePrice: 300000,
    downPercent: 20,
    saved: 20000,
    monthlySave: 1000,
    pmi: false,
    creditScore: 640,   // not captured in current calculator; used by Financing logic
    timeline: "medium", // 'urgent' | 'medium' | 'flexible'
    glossaryOpen: false,
    currentRoute: pages[0].route
};

const BuyerProfileContext = createContext({
    profile: defaultProfile,
    setProfile: () => {},
    updateProfile: () => {},
});

export function BuyerProfileProvider({ children }) {
    const [profile, setProfile] = useState(defaultProfile);

    const updateProfile = (patch) => {
        setProfile((prev) => ({ ...prev, ...patch }));
    };

    return (
        <BuyerProfileContext.Provider value={{ profile, setProfile, updateProfile }}>
            {children}
        </BuyerProfileContext.Provider>
    );
}

export function useBuyerProfile() {
    return useContext(BuyerProfileContext);
}
