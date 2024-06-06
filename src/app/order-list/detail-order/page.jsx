"use client";

import * as React from "react";
import Sidebar from "../../../components/layout/sidebar/sidebar";
import { useOrderDetail } from "../../../context/order-detail/order-detail";
import { MdOutlineTouchApp } from "react-icons/md";
import { useRouter } from "next/navigation";
import moment from "moment";
import { FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import { canceledQuantity, fetchDetailOrder } from "./page.service";

const OrderDetail = () => {
	const router = useRouter();
	const { detail, detailList, setDetail, setDetailList } = useOrderDetail();

	const initialForm = detailList.map(item => ({
		ItemId: item.Id,
		CanceledQuantity1: Number(item.CanceledQuantity1) || 0,
		CanceledQuantity2: Number(item.CanceledQuantity2) || 0,
	}));

	const [deleteMode, setDeleteMode] = React.useState(false);
	const [cancelForm, setCancelForm] = React.useState(initialForm);
	const [cancelLoading, setCancelLoading] = React.useState(false);

	React.useEffect(() => {
		if (!detail || !detailList) {
			router.replace("/order-list");
		}
	}, [detail, detailList, router]);

	if (!detail || !detailList) {
		return null
	}

	const handleNumericInputChange = (value, itemId, fieldName) => {
	// Find the item in the cancelForm array
	const itemIndex = cancelForm.findIndex(f => f.ItemId === itemId);
	if (itemIndex === -1) return;

	// Treat empty strings as 0
	const numericValue = value === "" ? 0 : Number(value);

	// Ensure the cancelled quantity cannot exceed the original quantity
	const originalQuantity = detailList.find(item => item.Id === itemId)[
		fieldName === "CanceledQuantity1" ? "QuantityUom1" : "QuantityUom2"
	];

	// Update the state with the new value, ensuring it doesn't exceed the original quantity
	setCancelForm(prevForm => [
		...prevForm.slice(0, itemIndex),
		{
			...prevForm[itemIndex],
			[fieldName]: Math.min(Math.max(numericValue, 0), originalQuantity),
		},
		...prevForm.slice(itemIndex + 1),
	]);
};

	const cancelQuantity = async () => {
		const result = await Swal.fire({
			title: "Warning!",
			text: "Are you sure you want to cancel quantity of the selected orders?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Yes, cancel it!",
			cancelButtonText: "No, keep it",
		});

		if (result.isConfirmed) {
			setCancelLoading(true);
			try {
				const res = await canceledQuantity(cancelForm);
				if (res) {
					Swal.fire(
						"Cancelled!",
						"Your quantity have been cancelled.",
						"success"
					);
					// Optionally, refresh the order list here
					if (detail) {
						const response = await fetchDetailOrder(detail.Id);
						if (response) {
							setCancelForm(
								response.data.map(x => ({
									ItemId: x.Id,
									CanceledQuantity1: Number(x.CanceledQuantity1) || 0,
									CanceledQuantity2: Number(x.CanceledQuantity2) || 0,
								}))
							);
							setDeleteMode(false);
							setDetailList(response.data);
						}
					}
				}
			} catch (error) {
				Swal.fire(
					"Error!",
					"Failed to cancel quantity. Please try again.",
					"error"
				);
			} finally {
				setCancelLoading(false);
			}
		}
	};

	return (
		<div className='w-full h-screen flex'>
			<Sidebar />
			<div className='flex flex-1 bg-white'>
				<div className='w-full overflow-y-auto'>
					<div className='w-full h-12 flex items-center px-4 bg-white shadow-sm font-semibold text-blue-700'>
						Detail Order
					</div>

					<div className='w-full p-4'>
						<div className='flex flex-col gap-2'>
							<div className='flex flex-col'>
								<p className='text-xs font-semibold text-gray-400'>
									NO PESANAN
								</p>
								<p className='text-blue-700 font-semibold'>
									{detail?.OrderNumber}
								</p>
							</div>
							<div className='flex flex-col'>
								<p className='text-xs font-semibold text-gray-400'>
									ALAMAT PENGIRIMAN
								</p>
								<p className='text-blue-700 font-semibold'>
									{detail?.DeliveryAddress}
								</p>
							</div>
							<div className='flex flex-col'>
								<p className='text-xs font-semibold text-gray-400'>
									Waktu Pemesanan
								</p>
								<p className='text-blue-700 font-semibold'>
									{detail?.InsertStamp
										? moment(detail?.InsertStamp).format("lll")
										: ""}
								</p>
							</div>
							<div className='flex flex-col'>
								<p className='text-xs font-semibold text-gray-400'>
									Waktu Pengiriman (paling lambat)
								</p>
								<p className='text-blue-700 font-semibold'>
									{detail?.ExpectedDeliveryDate
										? moment(detail?.ExpectedDeliveryDate).format("lll")
										: ""}
								</p>
							</div>
							<div className='flex flex-col'>
								<p className='text-xs font-semibold text-gray-400'>
									Status Pesanan
								</p>
								<p className='text-blue-700 font-semibold'>{detail?.Status}</p>
							</div>
							<div className='flex flex-col'>
								<p className='text-xs font-semibold text-gray-400'>
									Total items
								</p>
								<p className='text-blue-700 font-semibold'>
									{detail?.TotalItems}
								</p>
							</div>

							<button
								className='w-full h-16 bg-gradient-to-br from-blue-900 to-blue-700'
								onClick={() => {
									console.log(detailList);
								}}>
								<div className='w-full h-full items-center flex p-2 gap-2 text-white'>
									{/* <MdOutlineTouchApp size={48} /> */}
									<div className='flex flex-col'>
										<p className=''>Tabel Item pesanan</p>
										{/* <p className='text-bold text-left'>LIHAT</p> */}
									</div>
								</div>
							</button>
						</div>

						<div className='mt-4'>
							<div className='w-full flex items-center justify-between'>
								{/* <h4>List Item</h4> */}
								<div className='flex gap-1'>
									<button
										className='flex gap-1 items-center text-red-500 bg-white shadow p-1 px-2 rounded-sm'
										onClick={() => {
											setDeleteMode(!deleteMode);
										}}>
										<FiTrash2 /> Batalkan kuantitas pesanan
									</button>
									{deleteMode ? (
										<button
											className='flex gap-1 items-center bg-red-500 text-white shadow p-1 px-2 rounded-sm'
											onClick={() => {
												cancelQuantity();
											}}>
											<FiTrash2 /> Batalkan kuantitas pesanan
										</button>
									) : null}
								</div>
							</div>
							<table className='border border-collapse border-gray-200 mt-2 w-full'>
								<thead>
									<tr>
										<th className='border p-2 w-5/100 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
											No
										</th>
										<th className='border p-2 w-20/100 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
											Nama Produk
										</th>
										<th className='border p-2 w-15/100 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
											Manufaktur
										</th>
										<th className='border p-2 w-10/100 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
											Tipe
										</th>
										<th className='border p-2 w-10/100 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
											Spek
										</th>
										<th className='border p-2 w-10/100 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
											Ukuran
										</th>
										<th className='border p-2 w-10/100 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
											UOM1
										</th>
										<th className='border p-2 w-10/100 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
											UOM2
										</th>
										<th className='border p-2 w-5/100 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
											Qty1
										</th>
										<th className='border p-2 w-5/100 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
											Qty2
										</th>
										<th className='border p-2 w-5/100 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
											Cancelled Qty1
										</th>
										<th className='border p-2 w-5/100 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
											Cancelled Qty2
										</th>
									</tr>
								</thead>
								<tbody>
									{detailList.map((item, index) => (
										<tr key={index}>
											<td className='border p-2 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
												{index + 1}
											</td>
											<td className='border p-2 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
												{item?.ProductName || "-"}
											</td>
											<td className='border p-2 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
												{item?.ManufactureName || "-"}
											</td>
											<td className='border p-2 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
												{item?.TypeName || "-"}
											</td>
											<td className='border p-2 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
												{item?.SpecName || "-"}
											</td>
											<td className='border p-2 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
												{item?.SizeName ? `${item.SizeName}"` : "-"}
											</td>
											<td className='border p-2 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
												{item?.Uom1Label || "-"}
											</td>
											<td className='border p-2 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
												{item?.Uom2Label ? item.Uom2Label : "-"}
											</td>
											<td className='border p-2 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
												{item?.QuantityUom1}
											</td>
											<td className='border p-2 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
												{item?.QuantityUom2}
											</td>
											<td className='border p-2 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
												{deleteMode ? (
													<input
														type='text'
														className='max-w-20 border border-neutral-400 px-2 text-sm p-1'
														value={
															cancelForm.find(f => f.ItemId === item.Id)
																?.CanceledQuantity1 || 0
														}
														onChange={e =>
															handleNumericInputChange(
																e.target.value,
																item.Id,
																"CanceledQuantity1"
															)
														}
													/>
												) : (
													item?.CanceledQuantity1
												)}
											</td>
											<td className='border p-2 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
												{deleteMode ? (
													<input
														type='text'
														className='max-w-20 border border-neutral-400 px-2 text-sm p-1'
														value={
															cancelForm.find(f => f.ItemId === item.Id)
																?.CanceledQuantity2 || 0
														}
														onChange={e =>
															handleNumericInputChange(
																e.target.value,
																item.Id,
																"CanceledQuantity2"
															)
														}
													/>
												) : (
													item?.CanceledQuantity2
												)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						<div className='mt-4'>
							<p>Notes pesanan</p>
							<textarea
								name='30'
								id=''
								cols='30'
								rows='10'
								className={`resize-none w-full border bg-neutral-50 border-neutral-300 font-outfit text-sm p-2
								${detail?.Notes ? "" : "text-neutral-400"}
							`}
								value={
									detail?.Notes
										? detail?.Notes
										: "Tidak ada notes pada pesanan ini"
								}
								readOnly></textarea>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderDetail;
