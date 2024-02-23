"use client";

import React from "react";

const ProductContext = React.createContext(undefined);

const ProductProvider = ({ children }) => {
	const [product, setProduct] = React.useState([]);
	const [productDetail, setProductDetail] = React.useState(null)
	
	const contextValue = {
		product,
		setProduct,
		productDetail,
		setProductDetail
	};

	return (
		<ProductContext.Provider value={contextValue}>
			{children}
		</ProductContext.Provider>
	);
};

export const useProduct = () => {
	const context = React.useContext(ProductContext);
	if (!context) {
		throw new Error("useUser must be used within a ProductProvider");
	}
	return context;
};

export default ProductProvider;
