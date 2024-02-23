"use client";

import * as React from "react";
import Sidebar from "@/components/layout/sidebar/sidebar";
import { useProduct } from "@/context/product/product-context";
import { useRouter } from "next/navigation";
import { getListProductManufacture } from "./page.service";
import { CircularProgress, Pagination } from "@mui/material";
import animate from "./page.module.css";
import Swal from "sweetalert2";

const Product = () => {
	const router = useRouter();
	const { productDetail } = useProduct();
	const [recommended, setRecommended] = React.useState([]);
	const [totalRecommended, setTotalRecommeded] = React.useState(0);
	const [pages, setPages] = React.useState(1);
	const [totalPages, setTotalPages] = React.useState(0);
	const [loading, setLoading] = React.useState(false);
	const [quantity, setQuantity] = React.useState(0);
	const [stock, setStock] = React.useState(Math.floor(Math.random() * 501));

	React.useEffect(() => {
		if (productDetail === null) {
			router.push("/market");
		} else {
			const fetchData = async () => {
				try {
					setLoading(true);
					const res = await getListProductManufacture(
						pages,
						productDetail?.ManufactureName
					);

					setRecommended(res.data);
					setTotalRecommeded(res.totalRows);
				} catch (error) {
				} finally {
					setLoading(false);
				}
			};

			fetchData();
		}
	}, [pages]);

	React.useEffect(() => {
		if (totalRecommended > 0) {
			setTotalPages(Math.ceil(totalRecommended / 5));
		}
	}, [totalRecommended]);

	const handlePageChange = (event, value) => {
		setPages(value);
	};

	const handleConfirm = () => {
		console.log('work')
	}

	const uomLabel1 = productDetail?.UomLabel1;
	const uomLabel2 = productDetail?.UomLabel2;
	const uomId1 = productDetail?.UomId1;
	const uomId2 = productDetail?.UomId2;

	let options = [];

	if (uomLabel1 && uomLabel2) {
		options = [
			{ value: uomId1, label: uomLabel1 },
			{ value: uomId2, label: uomLabel2 },
		];
	} else if (uomLabel1 && !uomLabel2) {
		options = [{ value: uomId1, label: uomLabel1 }];
	} else if (!uomLabel1 && uomLabel2) {
		options = [{ value: uomId2, label: uomLabel2 }];
	}

	const handleOrder = () => {
		Swal.fire({
			title: "Konfirmasi Pemesanan!",
			text: "Masukan kedalam keranjang?",
			icon: "info",
			width: 350,
			showDenyButton: true,
			showConfirmButton: true,
			confirmButtonText: "Konfirmasi",
			denyButtonText: "Batal",
			showLoaderOnConfirm: true,
			confirmButtonColor: "#0ea5e9",
			preConfirm: () => {
				return handleConfirm()
			},
		});
	};

	return (
		<div className='flex overflow-x-hidden'>
			<Sidebar></Sidebar>
			<div className='w-full min-h-screen flex flex-col items-center bg-white p-4 gap-2'>
				<div className='flex gap-4 p-4 border rounded border-slate-200'>
					{/* IMAGE CONTAINER */}
					<div className=''>
						<div className='size-80 bg-slate-200 rounded'></div>
					</div>

					{/* DESCRIPTION CONTAINER */}
					<div className=''>
						<h1 className='text-2xl font-medium'>{productDetail?.Label}</h1>
						<h1 className='text-xl font-medium text-blue-500'>
							{productDetail?.ManufactureName}
						</h1>
						<div className=''>
							<b>Deskripsi :</b>{" "}
							<p className=' text-justify'>{productDetail?.Description}</p>
						</div>
						<p>
							<b>Stok</b> : {stock}
						</p>
						<p>
							<b>Tipe : </b>
							{productDetail?.TypeName}
						</p>
						<p>
							<b>Spek : </b>
							{productDetail?.SpecificationName}
						</p>
						<p>
							<b>Ukuran : </b>
							{productDetail?.Size}"
						</p>
					</div>

					{/* CART MODAL */}
					<div className='flex p-4 flex-col justify-between shadow rounded'>
						<div className='w-full flex flex-col gap-2'>
							<h3 className='text-2xl font-bold text-slate-400'>
								Informasi Pesanan
							</h3>
							<p>
								Quantity Measurement : {productDetail?.UomLabel1},{" "}
								{productDetail?.UomLabel2}
							</p>
							<div>
								<label
									htmlFor='quantity-1'
									className='text-sm text-neutral-500'>
									Masukan Kuantitas
								</label>
								<div className='flex'>
									<input
										type='text'
										value={quantity}
										id='quantity-1'
										placeholder='Masukan Kuantitas'
										onChange={e => {
											const { value } = e.target;
											setQuantity(value);
										}}
										className='border border-slate-400 rounded text-sm  p-2 outline-none'
									/>
								</div>
							</div>
						</div>
						<button
							className={`w-full h-12 bg-blue-500 rounded text-white ${animate.button}`}
							onClick={handleOrder}>
							<p className={animate.text}>Masukan Keranjang</p>
						</button>
					</div>
				</div>

				<div className='w-full p-4 flex flex-col gap-4'>
					<h4>Produk lain dari {productDetail?.ManufactureName} :</h4>
					<div className='w-full'>
						<Pagination
							count={totalPages}
							shape='rounded'
							size='small'
							onChange={handlePageChange}
							showFirstButton
							showLastButton
						/>
					</div>
					{loading ? (
						<div className='flex w-full h-40 justify-center items-center'>
							<CircularProgress size={20} />
						</div>
					) : (
						<div className='flex gap-1'>
							{recommended.length > 0 &&
								recommended.map((item, index) => (
									<div key={index} className='w-48'>
										<div className='size-48 bg-slate-200 rounded'></div>
										<div>
											<p>{item?.Label}</p>
											<p className='text-sm'>
												{item?.TypeName}, {item?.SpecificationName}
											</p>
											<p className='text-sm'>{item?.Size}"</p>
										</div>
									</div>
								))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Product;
