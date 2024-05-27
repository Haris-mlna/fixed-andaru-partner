"use client";

import * as React from "react";
import Sidebar from "../../../components/layout/sidebar/sidebar";
import { useOrderDetail } from "../../../context/order-detail/order-detail";
import { MdOutlineTouchApp } from "react-icons/md";
import { useRouter } from "next/navigation";
import moment from "moment";

const OrderDetail = () => {
	const router = useRouter();
	const { detail, detailList } = useOrderDetail();

	React.useEffect(() => {
		if (!detail) {
			router.replace("/order-list");
		}
	}, [detail]);

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

							<button className='w-full h-16 bg-gradient-to-br from-blue-900 to-blue-700'>
								<div className='w-full h-full items-center flex p-2 gap-2 text-white'>
									<MdOutlineTouchApp size={48} />
									<div className='flex flex-col'>
										<p className='text-xs'>Faktur/Tanda Terima</p>
										<p className='text-bold text-left'>LIHAT</p>
									</div>
								</div>
							</button>
						</div>

						<div className='mt-4'>
							<h4>List Item</h4>
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
                ${detail.Notes ? "" : "text-neutral-400"}
                `}
								value={
									detail.Notes
										? detail.Notes
										: "Tidak ada notes pada pesanan ini"
								}></textarea>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderDetail;
