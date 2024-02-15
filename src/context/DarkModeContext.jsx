import { createContext, useContext, useEffect } from "react";

import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  function handleToggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, handleToggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkModeContext() {
  const context = useContext(DarkModeContext);

  if (!context) {
    throw new Error("DarkModeContext was used outside of DarkModeProvider");
  }

  return context;
}

export { DarkModeProvider, useDarkModeContext };