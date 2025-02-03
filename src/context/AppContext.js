"use client";
import { createContext, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [sessionId, setSessionId] = useState(uuidv4());

  const refreshChat = () => {
    setSessionId(uuidv4());
  };

  return (
    <AppContext.Provider
      value={{
        darkMode,
        setDarkMode,
        isLoggedIn,
        setIsLoggedIn,
        showSettings,
        setShowSettings,
        sessionId,
        refreshChat,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
