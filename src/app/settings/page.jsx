"use client";
import * as React from "react";
import Sidebar from "../../components/layout/sidebar/sidebar";
import { IoSettingsOutline } from "react-icons/io5";
import { useUser } from "../../context/user/user-context";
import { Settingsaddress } from "./address.component";
import { Settingscompany } from "./company.component";
import { Settingsaccount } from "./account.component";

const Settings = () => {
	const { companyData, userData } = useUser();
	const [settings, setSettings] = React.useState("Account");
	const [form, setForm] = React.useState({});

	React.useEffect(() => {
		if (companyData) {
			setForm(companyData);
			console.log(userData);
		}
	}, [companyData]);

	return (
		<div className='flex w-full h-screen'>
			<Sidebar />
			<div className=' w-64 h-full bg-white border-r-2 p-4'>
				<button
					className={`w-full py-2 px-4 flex
                    ${
											settings === "Account" &&
											"bg-blue-200 rounded text-blue-500"
										}
                    `}
					onClick={() => {
						setSettings("Account");
					}}>
					Account
				</button>
				<button
					className={` w-full py-2 px-4 flex
                        ${
													settings === "Company" &&
													"bg-blue-200 rounded text-blue-500"
												}
												`}
					onClick={() => {
						setSettings("Company");
					}}>
					Company
				</button>
				<button
					className={` w-full py-2 px-4 flex
                        ${
													settings === "Address" &&
													"bg-blue-200 rounded text-blue-500"
												}
												`}
					onClick={() => {
						setSettings("Address");
					}}>
					Address
				</button>
			</div>
			<div className='flex flex-1 flex-col bg-white'>
				<div className='w-full overflow-y-auto'>
					<div className='w-full h-16 bg-white shadow flex px-4 items-center gap-1 z-20'>
						<IoSettingsOutline size={18} />
						<h4>SETTINGS</h4>
					</div>
					<div className='flex mt-1'>
						{settings === "Company" && (
							<Settingscompany form={form} setForm={setForm} />
						)}
						{settings === "Account" && <Settingsaccount userData={userData} />}
						{settings === "Address" && <Settingsaddress />}
					</div>
				</div>
			</div>
		</div>
	);
};



export default Settings;
