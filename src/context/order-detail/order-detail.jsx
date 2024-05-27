"use client";

import React from "react";

const OrderDetailContext = React.createContext(undefined);

const OrderDetailProvider = ({ children }) => {
	const [detail, setDetail] = React.useState(null);
	const [detailList, setDetailList] = React.useState([]);

	const contextValue = {
		detail,
		setDetail,
		detailList,
		setDetailList,
	};

	return (
		<OrderDetailContext.Provider value={contextValue}>
			{children}
		</OrderDetailContext.Provider>
	);
};

export const useOrderDetail = () => {
	const context = React.useContext(OrderDetailContext);
	if (!context) {
		throw new Error("useUser must be used within a OrderDetailProvider");
	}
	return context;
};

export default OrderDetailProvider;
