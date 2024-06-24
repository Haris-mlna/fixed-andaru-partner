"use client";

import * as React from "react";
import Sidebar from "../../components/layout/sidebar/sidebar";
import ProgressBar from "../../components/ui/progressbar/progressbar";
import { FaTruckFast } from "react-icons/fa6";
import { getDeliveryDetail, getDeliveryList } from "./page.service";
import EnhancedTable from "../../components/ui/table/table";
import { configTableDelivery } from "../../config/config-table-delivery";
// import moment from "moment";
import { FaAnglesRight } from "react-icons/fa6";
import { useDeliveryDetail } from "../../context/delivery-detail/delivery-detail";
import { useRouter } from "next/navigation";
import TableDelivery from "../../components/ui/table/table-delivery";
import { CircularProgress } from "@mui/material";

const Delivery = () => {
	const { setDetail, setDetailList } = useDeliveryDetail();
	const router = useRouter();

	const [list, setList] = React.useState([]);
	const [totalList, setTotalList] = React.useState(0);
	const [page, setPage] = React.useState(0);
	const [sort, setSort] = React.useState(null);
	const [loading, setLoading] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [maximum, setMaximum] = React.useState(false);
	const [selectedDetail, setSelectedDetail] = React.useState(null);

	const fetchData = async sort => {
		try {
			setLoading(true);
			const newSort = sort !== null && sort !== undefined ? `${sort}` : null;
			const res = await getDeliveryList(newSort);

			if (res) {
				if (newSort !== null && newSort !== sort) {
					// If sort changed, set new data
					const dataWithId = res.data.map(item => ({
						...item,
						id: item.Id,
					}));
					setList(dataWithId);
				} else {
					// If sort didn't change or is null, update the list with unique items
					setList(prevList => {
						// Filter out any items from the new data that already exist in the current list
						const filteredData = res.data.filter(
							newItem => !prevList.some(prevItem => prevItem.Id === newItem.Id)
						);
						return [...prevList, ...filteredData];
					});

					if (res?.data.length === 0) {
						setMaximum(true);
					}
				}
				setTotalList(res.totalRows);
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setLoading(false);
		}
	};

	React.useEffect(() => {
		if (!maximum) {
			fetchData(sort);
		}
	}, [sort]);

	const handleDeliveryDetail = async (id, item) => {
		setSelectedDetail(item.Status);
		setDetail(item);

		try {
			setLoading(true);

			const res = await getDeliveryDetail(id);

			if (res) {
				setDetailList(res.data);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const handleOpenDetail = () => {
		router.push("/delivery/delivery-detail");
	};

	return (
		<div className='flex w-full h-screen overflow-hidden'>
			<Sidebar />
			<div className='flex w-full h-full flex-col overflow-y-auto'>
				{/* NAVBAR */}

				{/* CONTENT */}
				<main className=''>
					<nav className='w-full h-12 bg-white shadow-sm flex items-center px-2 gap-2 z-20'>
						<h2 className='text-xl font-medium'>
							<span>Pengiriman</span> /{" "}
							<i className='text-blue-500'>Delivery</i>
						</h2>
						<FaTruckFast size={20} color='#3b82f6' />
					</nav>
					<div
						className='w-full flex justify-center items-center'
						style={{
							height: 350,
						}}>
						{selectedDetail ? (
							<>
								<div className='w-full h-full flex justify-center items-center relative'>
									<ProgressBar selectedDetail={selectedDetail} />
									<button
										onClick={handleOpenDetail}
										className='absolute bottom-2 right-2 bg-white p-2 px-4 rounded-full text-sm text-blue-500 flex items-center gap-1 hover:translate-x-1 transition-all duration-150'>
										Detail pengiriman
										<FaAnglesRight className='mt-1' />
									</button>
								</div>
							</>
						) : (
							<div className='w-full h-full bg-neutral-400 flex justify-center items-center'>
								<h2 className='text-4xl font-bold text-neutral-200 tracking-wide'>
									PILIH PENGIRIMAN UNTUK MEMUNCULKAN DETAIL
								</h2>
							</div>
						)}
					</div>
					<div className='w-full bg-white'>
						{/*   */}
						{loading ? (
							<div className='w-full h-96 flex justify-center items-center'>
								<div className='flex gap-1 items-center'>
									<CircularProgress size={20} />
									<p className='text-sm text-slate-400'>Loading...</p>
								</div>
							</div>
						) : list.length > 0 ? (
							<TableDelivery handleDetail={handleDeliveryDetail} rows={list} />
						) : (
							<div className='w-full h-96 flex justify-center items-center'>
								<p className='text-sm text-slate-400'>
									Anda belum memiliki pesanan dalam pengiriman
								</p>
							</div>
						)}
					</div>
				</main>
			</div>
		</div>
	);
};

export default Delivery;

// OLD DETAIL

{
	/* <div className='w-full flex-1 flex'>
						CONTENT HERE
</div> */
}
// {selectedItem ? (
// 	<div className='w-full overflow-y-auto'>
// 		<div className='flex justify-between w-full items-center h-12'>
// 			<h4 className='text-blue-500'>
// 				{selectedItem?.CustomerLabel}
// 			</h4>
// 			<p className=''>{selectedItem?.OrderNumber}</p>
// 		</div>
// 		<p className='text-sm'>
// 			Alamat : {selectedItem?.CustomerAddress}
// 		</p>
// 		<p className='text-sm'>
// 			Estimasi paling lambat :{" "}
// 			{selectedItem?.DueDate
// 				? moment(selectedItem.DueDate).format("ll")
// 				: null}
// 		</p>
// 		<p className='text-sm'>
// 			Status : {selectedItem?.Status}
// 		</p>
// 		<p className='text-sm'>
// 			Notes pengiriman :{" "}
// 			{selectedItem?.ClosingNotes
// 				? selectedItem.ClosingNotes
// 				: "-"}
// 		</p>
// 		<p className='text-sm'>
// 			Total item : {selectedItem?.NumberOfItems}
// 		</p>

// 		<div>
// 			<h3 className='w-full border-b-2 mt-3'>
// 				List item
// 			</h3>
// 			{itemDetail.length > 0 && (
// 				<div className='pb-20'>
// 					{itemDetail.map((item, index) => (
// 						<div key={index} className='border-y-2  my-2'>
// 							<p className='text-xs font-bold'>
// 								Deskripsi barang :
// 							</p>
// 							<p className='text-sm'>
// 								{item.ItemDescription}
// 							</p>

// 							<div>
// 								<p className='text-xs font-bold mt-2'>
// 									Kuantitas barang :
// 								</p>
// 								{item?.UnitOfMeasurement1 && (
// 									<p className='text-sm'>
// 										{item.Quantity1} {" "}
// 										<span className='text-xs'>per</span>{" "}
// 										{item.UnitOfMeasurement1}
// 									</p>
// 								)}
// 								{item?.UnitOfMeasurement2 && (
// 									<p className='text-sm'>
// 										{item.Quantity2} {" "}
// 										<span className='text-xs'>per</span>{" "}
// 										{item.UnitOfMeasurement2}
// 									</p>
// 								)}
// 								{item?.UnitOfMeasurement3 && (
// 									<p className='text-sm'>
// 										{item.Quantity3} {" "}
// 										<span className='text-xs'>per</span>{" "}
// 										{item.UnitOfMeasurement3}
// 									</p>
// 								)}
// 							</div>
// 						</div>
// 					))}
// 				</div>
// 			)}
// 		</div>
// 	</div>
// ) : null}
