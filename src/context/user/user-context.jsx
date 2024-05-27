"use client";

import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React from "react";
import userServices from "./user-services";

const UserContext = React.createContext(undefined);

const UserProvider = ({ children }) => {
	const navigate = useRouter();
	const [user, setUser] = React.useState();
	const [userData, setUserData] = React.useState();
	const [companyData, setCompanyData] = React.useState();
	const [domain, setDomain] = React.useState();
	const [updateUser, setUpdateUser] = React.useState(false);
	const [updateCompany, setUpdateCompany] = React.useState(false);

	React.useEffect(() => {
		const token = window?.localStorage.getItem("token");
		if (token && !user) {
			try {
				const decodedToken = jwtDecode(token);
				setUser(decodedToken);
			} catch (error) {
				console.error("Error decoding token:", error);
				navigate.push("/");
			}
		} else if (!token && !user) {
			navigate.push("/");
		}
	}, [user, navigate]);

	React.useEffect(() => {
		const domainName = window?.localStorage.getItem("domain");
		if (domainName) {
			try {
				setDomain(domainName);
			} catch (err) {
				console.log(err);
			}
		}
	}, []);

	React.useEffect(() => {
		if (user) {
			userServices.loadUser(user).then(res => {
				if (res) {
					setUserData(res);
				}
			});
		}
	}, [user, updateUser]);

	React.useEffect(() => {
		if (user) {
			userServices.loadCompany(user?.OrganizationId).then(res => {
				if (res) {
					setCompanyData(res);
				}
			});
		}
	}, [user, updateCompany]);

	const contextValue = {
		user,
		setUser,
		userData,
		setUserData,
		companyData,
		setCompanyData,
		domain,
		setDomain,
		updateUser,
		setUpdateUser,
		updateCompany,
		setUpdateCompany,
	};

	return (
		<UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
	);
};

export const useUser = () => {
	const context = React.useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};

export default UserProvider;
