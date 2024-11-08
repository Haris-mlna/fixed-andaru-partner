"use client";

import * as React from "react";
import Sidebar from "../../components/layout/sidebar/sidebar";
import DataTable from "../../components/ui/table/table.invoice";
import { useUser } from "../../context/user/user-context";
import { getInvoices } from "./page.service";
import ButtonMessage from "../../components/ui/button/button-message";

const Invoices = () => {
	const { user } = useUser();

	const [list, setList] = React.useState([]);

	const fetchData = async id => {
		try {
			const res = await getInvoices(id);

			if (res) {
				setList(res.data);
			}
		} catch (error) {}
	};

	React.useEffect(() => {
		if (user) {
			fetchData(user.OrganizationId);
		}
	}, [user]);

	return (
		<div className='flex w-full h-screen'>
			<Sidebar />
			<div className='flex flex-1 flex-col bg-white'>
				<div className=' overflow-y-auto'>
					<h3 className='w-full h-12 px-4 border-b-2 border-teal-200 text-2xl bg-gradient-to-br from-teal-400 to-green-300 bg-clip-text text-transparent flex items-center'>
						Invoice
					</h3>

					<div className=''>
						<DataTable rows={list} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Invoices;
