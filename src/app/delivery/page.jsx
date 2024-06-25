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
import moment from "moment";
import styles from "./page.module.css";

const Delivery = () => {
	const { setDetail, setDetailList, detail } = useDeliveryDetail();
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
					{selectedDetail && (
						<div className=''>
							<div className={styles.parent}>
								<div className={styles.card}>
									<div className={styles.content_box}>
										<div>
											<span className={styles.card_title}>
												{detail.OrderNumber}
											</span>
											<p className='text-sm text-white'>
												{detail.CustomerLabel}
											</p>
										</div>
										<p className={styles.card_content}>
											{detail.CustomerAddress}
										</p>
										<span
											className={`${styles.see_more}`}
											onClick={handleOpenDetail}>
											Lihat Detail
										</span>
									</div>
									<div className={styles.datebox}>
										<p className='absolute text-sm text-white bottom-0 -left-16'>Estimasi : </p>
										<span className={styles.month}>
											{moment(detail.DueDate).format("MMM").toUpperCase()}
										</span>
										<span className={styles.date}>
											{moment(detail.DueDate).format("DD")}
										</span>
									</div>
								</div>
							</div>
						</div>
					)}
					<div
						className='w-full bg-white flex justify-center items-center'
						style={{
							height: 200,
						}}>
						{selectedDetail ? (
							<>
								<div className='w-full h-full flex justify-center items-center relative'>
									<ProgressBar selectedDetail={selectedDetail} />
									{/* <button className='absolute bottom-2 right-2 bg-white p-2 px-4 rounded-full text-sm text-blue-500 flex items-center gap-1 hover:translate-x-1 transition-all duration-150'>
										Detail pengiriman
										<FaAnglesRight className='mt-1' />
									</button> */}
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
