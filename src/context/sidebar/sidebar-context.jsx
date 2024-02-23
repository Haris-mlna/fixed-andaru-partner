"use client";

import React from "react";
import { useCycle } from "framer-motion";

const SidebarContext = React.createContext(undefined);

const SidebarProvider = ({ children }) => {
  const [open, toggleOpen] = useCycle(true, false);

	const contextValue = {
		open,
    toggleOpen
	};

	return (
		<SidebarContext.Provider value={contextValue}>
			{children}
		</SidebarContext.Provider>
	);
};

export const useSidebar = () => {
	const context = React.useContext(SidebarContext);
	if (!context) {
		throw new Error("useUser must be used within a SidebarProvider");
	}
	return context;
};

export default SidebarProvider;
