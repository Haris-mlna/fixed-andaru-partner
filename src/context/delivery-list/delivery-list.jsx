"use client";

import React from "react";

const DeliveryListContext = React.createContext(undefined);

const DeliveryListProvider = ({ children }) => {
	const [list, setList] = React.useState([null]);

	const contextValue = {
		list,
		setList,
	};

	return (
		<DeliveryListContext.Provider value={contextValue}>
			{children}
		</DeliveryListContext.Provider>
	);
};

export const useDeliveryList = () => {
	const context = React.useContext(DeliveryListContext);
	if (!context) {
		throw new Error("useUser must be used within a Delivery List Provider");
	}
	return context;
};

export default DeliveryListProvider;
