"use client";

import Sidebar from "../../components/layout/sidebar/sidebar";
import { getListorder, orderListDetail } from "./page.service";
import React from "react";
import { useUser } from "../../context/user/user-context";
import ButtonMessage from "../../components/ui/button/button-message";
import TableOrderList from "../../components/ui/table/table.order-list";
import { useRouter } from "next/navigation";
import { useOrderDetail } from "../../context/order-detail/order-detail";
import { CircularProgress } from "@mui/material";

const OrderList = () => {
	const { user } = useUser();
	const { setDetail, setDetailList } = useOrderDetail();
	const [loading, setLoading] = React.useState(false);
	const router = useRouter();

	const [list, setList] = React.useState([]);

	const fetchList = async id => {
		try {
			const res = await getListorder(id);

			if (res) {
				const dataWithId = res.data.map(item => ({
					...item,
					id: item.Id,
				}));
				setList(dataWithId);
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

	const handleDetail = async item => {
		setDetail(item);

		try {
			const res = await orderListDetail(item.Id);
			setLoading(true);
			if (res) {
				setDetailList(res.data);
				setTimeout(() => {
					router.push("/order-list/detail-order");
				}, 1000);
			}
		} catch (error) {
		} finally {
			setLoading(false);
		}

		setTimeout(() => {
			router.push("/order-list/detail-order");
		}, 1000);
	};

	return (
		<div className='w-full h-screen flex'>
			<Sidebar />
			<div className='flex relative flex-1 bg-white'>
				{loading && (
					<div className='w-full h-scren absolute z-50 bg-black/40 flex justify-center items-center'>
						<CircularProgress size={20} />
					</div>
				)}
				<div className='w-full overflow-y-auto'>
					<div className='w-full h-12 flex items-center px-4 bg-white shadow-sm'>
						Order List
					</div>
					<div className='w-full '>
						<TableOrderList rows={list} handleDetail={handleDetail} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderList;
