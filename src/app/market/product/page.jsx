"use client";

import * as React from "react";
import Sidebar from "@/components/layout/sidebar/sidebar";
import { useProduct } from "@/context/product/product-context";
import { useRouter } from "next/navigation";
import { actionCart, getListProductManufacture } from "./page.service";
import {
	Box,
	CircularProgress,
	FormControl,
	InputLabel,
	MenuItem,
	Pagination,
	Select,
} from "@mui/material";
import animate from "./page.module.css";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const Product = () => {
	const router = useRouter();
	const { productDetail, setProductDetail } = useProduct();
	const [recommended, setRecommended] = React.useState([]);
	const [totalRecommended, setTotalRecommeded] = React.useState(0);
	const [pages, setPages] = React.useState(1);
	const [totalPages, setTotalPages] = React.useState(0);
	const [loading, setLoading] = React.useState(false);
	const [stock, setStock] = React.useState(Math.floor(Math.random() * 501));
	const [refresh, setRefresh] = React.useState(false);
	const [quantity, setQuantity] = React.useState(0);
	const [quantity2, setQuantity2] = React.useState(0);

	const [selectedUOM, setSelectedUOM] = React.useState("");
	const [selectedUOM2, setSelectedUOM2] = React.useState("");

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
	}, [pages, refresh]);

	React.useEffect(() => {
		if (totalRecommended > 0) {
			setTotalPages(Math.ceil(totalRecommended / 5));
		}
	}, [totalRecommended, productDetail]);

	const handlePageChange = (event, value) => {
		setPages(value);
	};

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

	const handleConfirm = async () => {
		let timerInterval;
		const body = {
			SupplierId: productDetail.OrganizationId,
			ProductId: productDetail.Id,
			ManufactureId: productDetail.ManufactureId,
			TypeId: productDetail.TypeId,
			SpecId: productDetail.SpecificationId,
			SizeId: productDetail.SizeId,
			UomId1: selectedUOM,
			UomdId2: selectedUOM2,
			QuantityUom1: quantity !== "" ? quantity : null,
			QuantityUom2: quantity2 !== "" ? quantity2 : null,
		};

		console.log(body);

		try {
			const res = await actionCart(body);
			if (res) {
				Swal.fire({
					title: "Pesanan Sukses!",
					icon: "success",
					html: "Pesanan berhasil dimasukan ke keranjang <br> anda akan dinavigasi pada keranjang dalam <br> <b id='timer'></b> milidetik.",
					timer: 2000,
					timerProgressBar: true,
					showConfirmButton: false,
					showDenyButton: false,
					width: 450,
					didOpen: () => {
						Swal.showLoading();
						const timer = Swal.getPopup().querySelector("#timer");
						timerInterval = setInterval(() => {
							timer.textContent = `${Swal.getTimerLeft()}`;
						}, 100);
					},
					willClose: () => {
						clearInterval(timerInterval);
						router.push("/cart");
					},
				}).then(result => {
					/* Read more about handling dismissals below */
					if (result.dismiss === Swal.DismissReason.timer) {
						console.log("I was closed by the timer");
					}
				});
			}
		} catch (error) {}
	};

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
				return handleConfirm();
			},
		});
	};

	const handleInput = e => {
		const { value } = e.target;
		const regex = /^[0-9\b]+$/; // Regex to allow only numbers
		if (regex.test(value)) {
			setQuantity(parseInt(value));
		}
	};

	const handleChangeQuantity = action => {
		if (action === "+") {
			setQuantity(prev => prev + 1);
		} else if (action === "-") {
			if (quantity > 0) {
				setQuantity(prev => prev - 1);
			}
		}
	};

	const handleChangeUom = event => {
		const {
			target: { value },
		} = event;

		console.log(value);
		setSelectedUOM(value);
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
						<div className=' w-52 flex flex-col gap-2'>
							<h3 className='text-2xl font-bold text-slate-400'>
								Informasi Pesanan
							</h3>
							<p>
								Quantity Measurement : {productDetail?.UomLabel1},{" "}
								{productDetail?.UomLabel2}
							</p>
							<div>
								{productDetail ? (
									<>
										<p className=' mb-2 text-sm text-slate-400'>
											Pilih perkuantitas :
										</p>
										<Box sx={{ minWidth: 120 }}>
											<FormControl fullWidth size='small'>
												<InputLabel
													id='simple-select-label'
													sx={{
														fontFamily: "var(--font-outfit)",
													}}>
													Per kuantitas.
												</InputLabel>
												<Select
													labelId='simple-select-label'
													id='demo-simple-select'
													label='Per kuantitas.'
													value={selectedUOM}
													onChange={handleChangeUom}
													sx={{
														fontSize: 16,
														fontFamily: "var(--font-outfit)",
													}}>
													<MenuItem value={productDetail.UomId1}>
														{productDetail.UomLabel1}
													</MenuItem>
												</Select>
											</FormControl>
										</Box>
									</>
								) : (
									""
								)}
							</div>
							<div>
								<label htmlFor='quantity-1' className='text-sm text-slate-400'>
									Masukan Kuantitas
								</label>
								<div className='flex w-full gap-1'>
									<motion.button
										whileTap={{
											scale: 0.9,
										}}
										onClick={() => {
											handleChangeQuantity("-");
										}}
										className='w-2/12 h-8 shadow text-blue-500 border border-slate-300 rounded'>
										-
									</motion.button>
									<input
										type='text'
										value={quantity}
										id='quantity-1'
										placeholder='Masukan Kuantitas'
										onChange={e => {
											handleInput(e);
										}}
										className='border h-8 w-8/12 shadow border-slate-400 rounded text-sm  p-2 outline-none'
									/>
									<motion.button
										whileTap={{
											scale: 0.9,
										}}
										onClick={() => {
											handleChangeQuantity("+");
										}}
										className='w-2/12 h-8 shadow text-blue-500 border border-slate-300 rounded'>
										+
									</motion.button>
								</div>
							</div>
						</div>
						<button
							className={`w-full h-12 disabled:bg-slate-400 cursor-pointer bg-blue-500 rounded text-white ${animate.button}`}
							onClick={handleOrder}
							disabled={!(quantity > 0 && selectedUOM)}>
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
							{recommended.length > 0 ? (
								recommended.map((item, index) => (
									<button
										key={index}
										className='w-48 flex flex-col justify-start items-start'
										onClick={() => {
											setProductDetail(item);
										}}>
										<div className='size-48  bg-slate-200 rounded'></div>
										<div>
											<p className=' text-left'>{item?.Label}</p>
											<p className='text-sm text-left'>
												{item?.TypeName}, {item?.SpecificationName}
											</p>
											<p className='text-sm text-left'>{item?.Size}"</p>
										</div>
									</button>
								))
							) : (
								<div className='w-full h-40 flex justify-center items-center'>
									<button
										className=' p-4 px-10 rounded text-white bg-blue-500'
										onClick={() => {
											setRefresh(!refresh);
										}}>
										refresh
									</button>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Product;
