import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext({ isScrollTopVisible: false });

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [isScrollTopVisible, setIsScrollTopVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrollTopVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AppContext.Provider value={{ isScrollTopVisible }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    return useContext(AppContext);
}