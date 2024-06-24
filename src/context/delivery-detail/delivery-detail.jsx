"use client";

import React from "react";

const DeliveryDetailContext = React.createContext(undefined);

const DeliveryDetailProvider = ({ children }) => {
	const [detail, setDetail] = React.useState(null);
	const [detailList, setDetailList] = React.useState([]);

	const contextValue = {
		detail,
		setDetail,
		detailList,
		setDetailList,
	};

	return (
		<DeliveryDetailContext.Provider value={contextValue}>
			{children}
		</DeliveryDetailContext.Provider>
	);
};

export const useDeliveryDetail = () => {
	const context = React.useContext(DeliveryDetailContext);
	if (!context) {
		throw new Error("useUser must be used within a Delivery Detail Provider");
	}
	return context;
};

export default DeliveryDetailProvider;
