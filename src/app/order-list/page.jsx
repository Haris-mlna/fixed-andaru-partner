"use client";

import Sidebar from "../../components/layout/sidebar/sidebar";
import { getListorder } from "./page.service";
import React from "react";
import { useUser } from "../../context/user/user-context";
import ButtonMessage from "../../components/ui/button/button-message";

const OrderList = () => {
	const { user } = useUser();

	const palette = ["#69faef", "#00d5fd", "#00a9fa", "#facc15", "#ff0066"];
	const data = [
		{ id: 0, value: 50, label: "Done" },
		{ id: 1, value: 10, label: "Active" },
		{ id: 3, value: 20, label: "Checked Out" },
		{ id: 4, value: 10, label: "Pending" },
		{ id: 5, value: 10, label: "Cancelled" },
	];

	const [list, setList] = React.useState([]);

	const fetchList = async id => {
		try {
			const res = await getListorder(id);

			if (res) {
				setList(res.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	React.useEffect(() => {
		if (user) {
			fetchList(user.OrganizationId);
		}
	}, [user]);

	return (
		<div className='w-full h-screen flex'>
			<ButtonMessage />
			<Sidebar />
			<div className='flex flex-1 bg-white'>
				<div className='w-full overflow-y-auto'>
					<div className='w-full h-12 flex items-center px-4 bg-white shadow-sm'>
						Order List
					</div>
					<div>
						{list.map((item, index) => (
							<div key={index}>
								<p>{item.OrderNumber}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderList;
