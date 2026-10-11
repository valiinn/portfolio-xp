"use client";

import { createContext, useContext } from "react";

export type OsApi = {
  openApp: (id: string) => void;
  closeApp: (id: string) => void;
};

export const OsContext = createContext<OsApi>({ openApp() {}, closeApp() {} });

export const useOs = () => useContext(OsContext);
