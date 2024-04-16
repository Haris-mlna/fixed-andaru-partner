"use client";

import * as React from "react";
import Sidebar from "@/components/layout/sidebar/sidebar";
import ProgressBar from "@/components/ui/progressbar/progressbar";
import { FaTruckFast } from "react-icons/fa6";
import { getDeliveryDetail, getDeliveryList } from "./page.service";
import EnhancedTable from "@/components/ui/table/table";
import { configTableDelivery } from "@/config/config-table-delivery";

const Delivery = () => {
	const [list, setList] = React.useState([]);
	const [totalList, setTotalList] = React.useState(0);
	const [page, setPage] = React.useState(0);
	const [sort, setSort] = React.useState(null);
	const [loading, setLoading] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [maximum, setMaximum] = React.useState(false);

	const fetchData = async sort => {
		try {
			setLoading(true);
			const newSort = sort !== null && sort !== undefined ? `${sort}` : null;
			const res = await getDeliveryList(newSort);

			if (res) {
				console.log(res, page + 1);
				if (newSort !== null && newSort !== sort) {
					// If sort changed, set new data
					setList(res.data);
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

	const handleDeliveryDetail = async id => {
		try {
			setLoading(true);

			const res = await getDeliveryDetail(id);

			if (res) {
				console.log(res);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='w-full flex h-screen overflow-hidden'>
			<Sidebar />
			<div className='flex-1 flex flex-col'>
				<nav className='w-full h-12 bg-white shadow-sm flex items-center px-2 gap-2'>
					<h2 className='text-xl font-medium'>
						<span>Pengiriman</span> / <i className='text-blue-500'>Delivery</i>
					</h2>
					<FaTruckFast size={20} color='#3b82f6' />
				</nav>
				<main className='flex-1 flex flex-col overflow-y-auto'>
					<div className='w-full min-h-64 flex justify-center items-center'>
						<div className='w-1/2 h-full flex justify-center items-center'>
							<ProgressBar />
						</div>
						<div className='w-1/2 h-full p-2 overflow-hidden'>
							<div className='w-full h-full rounded shadow-sm bg-white p-2 overflow-x-hidden overflow-y-auto'>
								<h2 className='font-bold text-slate-300 text-xl'>
									Delivery Detail
								</h2>
							</div>
						</div>
					</div>
					<div className='flex-1 bg-white'>
						{/*   */}
						{list.length > 0 && (
							<EnhancedTable
								title={
									<h2 className=' font-outfit font-normal'>Delivery List</h2>
								}
								rows={list}
								head={configTableDelivery}
								length={totalList}
								page={page}
								setPage={setPage}
								setSort={setSort}
								rowsPerPage={rowsPerPage}
								setRowsPerPage={setRowsPerPage}
								loading={loading}
								maximum={maximum}
								handleDeliveryDetail={handleDeliveryDetail}
							/>
						)}
					</div>
				</main>
			</div>
		</div>
	);
};

export default Delivery;
