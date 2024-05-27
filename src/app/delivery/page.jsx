"use client";

import * as React from "react";
import Sidebar from "../../components/layout/sidebar/sidebar";
import ProgressBar from "../../components/ui/progressbar/progressbar";
import { FaTruckFast } from "react-icons/fa6";
import { getDeliveryDetail, getDeliveryList } from "./page.service";
import EnhancedTable from "../../components/ui/table/table";
import { configTableDelivery } from "../../config/config-table-delivery";
import moment from "moment";

const Delivery = () => {
	const [list, setList] = React.useState([]);
	const [totalList, setTotalList] = React.useState(0);
	const [page, setPage] = React.useState(0);
	const [sort, setSort] = React.useState(null);
	const [loading, setLoading] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [maximum, setMaximum] = React.useState(false);
	const [selectedDetail, setSelectedDetail] = React.useState(null);

	const [selectedItem, setSelectedItem] = React.useState(null);
	const [itemDetail, setItemDetail] = React.useState([]);

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

	const handleDeliveryDetail = async (id, item) => {
		setSelectedDetail(item.Status);
		setSelectedItem(item);

		try {
			setLoading(true);

			const res = await getDeliveryDetail(id);

			if (res) {
				setItemDetail(res.data);

				console.log("item", item);
				console.log("itemDetail", res.data);
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
				{/* NAVBAR */}
				<nav className='w-full h-12 bg-white shadow-sm flex items-center px-2 gap-2 z-20'>
					<h2 className='text-xl font-medium'>
						<span>Pengiriman</span> / <i className='text-blue-500'>Delivery</i>
					</h2>
					<FaTruckFast size={20} color='#3b82f6' />
				</nav>

				{/* CONTENT */}
				<main className='flex-1 flex flex-col overflow-y-auto'>
					<div className='w-full min-h-64 flex justify-center items-center'>
						{selectedDetail ? (
							<>
								<div className='w-1/2 h-full flex justify-center items-center'>
									<ProgressBar selectedDetail={selectedDetail} />
								</div>
								<div className='w-1/2 h-full overflow-hidden'>
									<div className='w-full h-full flex flex-col shadow-sm bg-white p-2 overflow-x-hidden overflow-y-auto'>
										<h2 className=' text-xl w-full border-b-2'>
											Delivery Detail
										</h2>
										<div className='w-full flex-1 flex'>
											{selectedItem ? (
												<div className='w-full overflow-y-auto'>
													<div className='flex justify-between w-full items-center h-12'>
														<h4 className='text-blue-500'>
															{selectedItem?.CustomerLabel}
														</h4>
														<p className=''>{selectedItem?.OrderNumber}</p>
													</div>
													<p className='text-sm'>
														Alamat : {selectedItem?.CustomerAddress}
													</p>
													<p className='text-sm'>
														Estimasi paling lambat :{" "}
														{selectedItem?.DueDate
															? moment(selectedItem.DueDate).format("ll")
															: null}
													</p>
													<p className='text-sm'>
														Status : {selectedItem?.Status}
													</p>
													<p className='text-sm'>
														Notes pengiriman :{" "}
														{selectedItem?.ClosingNotes
															? selectedItem.ClosingNotes
															: "-"}
													</p>
													<p className='text-sm'>
														Total item : {selectedItem?.NumberOfItems}
													</p>

													<div>
														<h3 className='w-full border-b-2 mt-3'>
															List item
														</h3>
														{itemDetail.length > 0 && (
															<div className='pb-20'>
																{itemDetail.map((item, index) => (
																	<div key={index} className='border-y-2  my-2'>
																		<p className='text-xs font-bold'>
																			Deskripsi barang :
																		</p>
																		<p className='text-sm'>
																			{item.ItemDescription}
																		</p>

																		<div>
																			<p className='text-xs font-bold mt-2'>
																				Kuantitas barang :
																			</p>
																			{item?.UnitOfMeasurement1 && (
																				<p className='text-sm'>
																					{item.Quantity1} -------{" "}
																					<span className='text-xs'>per</span>{" "}
																					{item.UnitOfMeasurement1}
																				</p>
																			)}
																			{item?.UnitOfMeasurement2 && (
																				<p className='text-sm'>
																					{item.Quantity2} -------{" "}
																					<span className='text-xs'>per</span>{" "}
																					{item.UnitOfMeasurement2}
																				</p>
																			)}
																			{item?.UnitOfMeasurement3 && (
																				<p className='text-sm'>
																					{item.Quantity3} -------{" "}
																					<span className='text-xs'>per</span>{" "}
																					{item.UnitOfMeasurement3}
																				</p>
																			)}
																		</div>
																	</div>
																))}
															</div>
														)}
													</div>
												</div>
											) : null}
										</div>
									</div>
								</div>
							</>
						) : (
							<div className='w-full h-full bg-neutral-400 flex justify-center items-center'>
								<h2 className="text-5xl font-bold text-neutral-200 tracking-wide">PILIH PENGIRIMAN UNTUK MEMUNCULKAN DETAIL</h2>
							</div>
						)}
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
