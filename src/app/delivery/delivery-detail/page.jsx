"use client";
import * as React from "react";
import Sidebar from "../../../components/layout/sidebar/sidebar";
import { useDeliveryDetail } from "../../../context/delivery-detail/delivery-detail";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import moment from "moment";

const DeliveryDetail = () => {
	const { detail, detailList } = useDeliveryDetail();
	const router = useRouter();

	React.useEffect(() => {
		if (!detail || !detailList) {
			router.replace("/delivery");
		}
	}, [detail, detailList]);

	if (!detail || !detailList) {
		return null;
	}

	return (
		<div className='w-full h-screen flex'>
			<Sidebar />
			<div className='flex flex-1 bg-white'>
				<div className='w-full overflow-y-auto'>
					<div className='w-full h-12 flex items-center px-4 bg-white shadow-sm font-semibold text-blue-700'>
						Detail Pengiriman
					</div>

					<div className='w-full p-4'>
						<div className='flex flex-col gap-2'>
							<button className="flex gap-2 items-center text-red-500" onClick={() => {
                router.back()
              }}>
								<FaArrowLeft />
								Back
							</button>

							<div className='flex flex-col'>
								<p className='text-xs font-semibold text-gray-400'>Name</p>
								<p className='text-blue-700 font-semibold'>
									{detail?.CustomerLabel}
								</p>
							</div>
							<div className='flex flex-col'>
								<p className='text-xs font-semibold text-gray-400'>
									ALAMAT PENGIRIMAN
								</p>
								<p className='text-blue-700 font-semibold'>
									{detail?.CustomerAddress}
								</p>
							</div>
							<div className='flex flex-col'>
								<p className='text-xs font-semibold text-gray-400'>
									Ekspektasi pesanan dikirm
								</p>
								<p className='text-blue-700 font-semibold'>
									{detail?.DueDate
										? moment(detail?.DueDate).format("lll")
										: "-"}
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
									{detail?.NumberOfItems}
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
							<table className='border border-collapse border-gray-200 mt-2 w-full'>
								<thead>
									<tr>
										<th className='border p-2 w-5/100 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
											No
										</th>
										<th className='border p-2 w-50/100 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
											Deskripsi barang
										</th>
										<th className='border p-2 w-5/100 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
											Qty1
										</th>
										<th className='border p-2 w-5/100 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
											Qty2
										</th>
										<th className='border p-2 w-5/100 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
											Qty3
										</th>
										<th className='border p-2 w-10/100 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
											UOM1
										</th>
										<th className='border p-2 w-10/100 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
											UOM2
										</th>
										<th className='border p-2 w-10/100 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
											UOM3
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
												{item?.ItemDescription || "-"}
											</td>
											<td className='border p-2 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
												{item?.Quantity1}
											</td>
											<td className='border p-2 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
												{item?.Quantity2}
											</td>
											<td className='border p-2 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
												{item?.Quantity3}
											</td>
											<td className='border p-2 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
												{item?.UnitOfMeasurement1 || "-"}
											</td>
											<td className='border p-2 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
												{item?.UnitOfMeasurement2
													? item.UnitOfMeasurement2
													: "-"}
											</td>
											<td className='border p-2 text-left whitespace-nowrap overflow-hidden overflow-ellipsis'>
												{item?.UnitOfMeasurement3
													? item.UnitOfMeasurement3
													: "-"}
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
								${detail?.ClosingNotes ? "" : "text-neutral-400"}
							`}
								value={
									detail?.ClosingNotes
										? detail?.ClosingNotes
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

export default DeliveryDetail;
