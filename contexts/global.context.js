"use client";
import { createContext, useContext, useState } from "react";

// Create context
const GlobalContext = createContext();

// Create a provider
export function GlobalProvider({ children }) {
  const [unread, setUnreadCount] = useState(0);

  return (
    <GlobalContext.Provider
      value={{
        unread,
        setUnreadCount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

// Create a custom hook to access context
export function useGlobalContext() {
  return useContext(GlobalContext);
}
