'use client'
import React from "react";

const FeedContext = React.createContext(undefined);

const FeedProvider = ({ children }) => {
  const [feed, setFeed] = React.useState([])

	const contextValue = {
    feed,
    setFeed
	};

	return (
		<FeedContext.Provider value={contextValue}>{children}</FeedContext.Provider>
	);
};

export const useFeed = () => {
	const context = React.useContext(FeedContext);
	if (!context) {
		throw new Error("useFeed must be used within a FeedProvider");
	}
	return context;
};

export default FeedProvider;
