"use client";

import React, { createContext, useContext, useState } from "react";

type CursorMode = "default" | "view" | "open" | "add" | "discover";

interface CursorContextType {
  cursorText: string;
  cursorMode: CursorMode;
  setCursor: (mode: CursorMode, text?: string) => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorMode, setCursorMode] = useState<CursorMode>("default");
  const [cursorText, setCursorText] = useState("");

  const setCursor = (mode: CursorMode, text?: string) => {
    setCursorMode(mode);
    if (text) {
      setCursorText(text);
    } else {
      switch (mode) {
        case "view":
          setCursorText("VIEW");
          break;
        case "open":
          setCursorText("OPEN");
          break;
        case "add":
          setCursorText("ADD");
          break;
        case "discover":
          setCursorText("DISCOVER");
          break;
        default:
          setCursorText("");
      }
    }
  };

  const resetCursor = () => {
    setCursorMode("default");
    setCursorText("");
  };

  return (
    <CursorContext.Provider
      value={{
        cursorText,
        cursorMode,
        setCursor,
        resetCursor,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
}
