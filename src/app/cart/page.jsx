"use client";

import * as React from "react";
import styles from "./page.module.css";
import Sidebar from "../../components/layout/sidebar/sidebar";
import { motion } from "framer-motion";
import layeredwave from "../../assets/background/layered-wave.svg";
import Image from "next/image";
import { useUser } from "../../context/user/user-context";
import {
	actionCheckout,
	deleteItemCart,
	loadAddress,
	loadCart,
	loadCartId,
	loadSubsidiaries,
} from "./page.service";
import Swal from "sweetalert2";
import { CartList } from "../../components/ui/list/cart-list";
import { BsBoxes, BsTrash } from "react-icons/bs";
import { FaTruckLoading } from "react-icons/fa";
import {
	Box,
	CircularProgress,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Tooltip,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";
import { TiArrowBackOutline } from "react-icons/ti";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import moment from "moment";
import { IoMdArrowBack } from "react-icons/io";
import { TbArrowBackUp } from "react-icons/tb";

const Cart = () => {
	const { user } = useUser();

	// Data
	const [cart, setCart] = React.useState([]);
	const [cartId, setCartId] = React.useState();
	const [customer, setCustomer] = React.useState([]);
	const [customerAddress, setCustomerAddress] = React.useState([]);

	//Select
	const [selectedCustomer, setSelectedCustomer] = React.useState("");
	const [selectedAddress, setSelectedAddress] = React.useState("");
	const [selectedDelivery, setSelectedDelivery] = React.useState(dayjs());

	// Loading State
	const [loading, setLoading] = React.useState(false);
	const [loadingCheckout, setLoadingCheckout] = React.useState(false);

	// Input
	const [cleared, setCleared] = React.useState(false);
	const [notes, setNotes] = React.useState("");

	// Change Layer
	const [change, setChange] = React.useState(false);

	// DELETE
	const [deleteMode, setDeleteMode] = React.useState(false);
	const [selectedItem, setSelectedItem] = React.useState([]);

	// UPDATE
	const [update, setUpdate] = React.useState(false);

	const fetchCartId = async () => {
		try {
			setLoading(true);

			const res = await loadCartId(user.OrganizationId);

			if (res) {
				setCartId(res);
			}
		} catch (error) {
			Swal.fire({
				title: "Error!",
				icon: "error",
				text: "Terjadi Kesalahan saat memuat data keranjand :id",
				width: 300,
			});
		} finally {
			setLoading(false);
		}
	};

	const fetchCartList = async () => {
		try {
			const res = await loadCart(user.OrganizationId);

			if (res) {
				if (res.data) {
					setCart(res.data);
				}
			}
		} catch (error) {
			Swal.fire({
				title: "Error!",
				icon: "error",
				text: "Terjadi Kesalahan saat memuat data keranjand :list",
				width: 300,
			});
		}
	};

	const fetchSubsidaries = async () => {
		try {
			setLoading(true);
			const res = await loadSubsidiaries(user.OrganizationId);

			if (res) {
				setCustomer(res);
			} else {
				Swal.fire({
					icon: "error",
					title: "Error!",
					text: "Terjadi kesalahan saat memuat customer",
					width: 300,
				});
			}
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Error!",
				text: "Terjadi kesalahan saat memuat customer",
				width: 300,
			});
		} finally {
			setLoading(false);
		}
	};

	const fetchAddress = async () => {
		try {
			setLoading(true);
			const res = await loadAddress(selectedCustomer);

			if (res) {
				if (res.data.length !== 0) {
					setCustomerAddress(res.data);
				} else {
					setCustomerAddress([
						{
							Id: "",
							Address: "Alamat belum terdaftar pada customer ini",
						},
					]);
				}
			}
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Error!",
				text: "Terjadi kesalahan saat memuat alamat customer",
				width: 300,
			});
		} finally {
			setLoading(false);
		}
	};

	React.useEffect(() => {
		if (window) {
			if (user) {
				fetchCartId();
			}
		}
	}, [user]);

	React.useEffect(() => {
		if (window) {
			if (user) {
				fetchCartList();
			}
		}
	}, [user, update]);

	React.useEffect(() => {
		if (window) {
			if (user) {
				fetchSubsidaries();
			}
		}
	}, [user]);

	React.useEffect(() => {
		if (selectedCustomer) {
			fetchAddress();
		} else {
			setCustomerAddress([]);
			setSelectedAddress("");
		}
	}, [selectedCustomer]);

	const today = dayjs();
	const tomorrow = dayjs().add(1, "day");

	const VisuallyHiddenInput = styled("input")({
		clip: "rect(0 0 0 0)",
		clipPath: "inset(50%)",
		height: 1,
		overflow: "hidden",
		position: "absolute",
		bottom: 0,
		left: 0,
		whiteSpace: "nowrap",
		width: 1,
	});

	const handleCheckout = async () => {
		setLoadingCheckout(true);

		const body = {
			SupplierId: cartId.SupplierId,
			OrderCartId: cartId.Id,
			DeliveryAddressId: selectedAddress,
			ExpectedDeliveryDate: selectedDelivery,
			Notes: notes !== "" ? notes : null,
		};

		try {
			const res = await actionCheckout(body);
			if (res) {
				Swal.fire({
					title: "Checkout order berhasil!",
					timer: 1000,
					width: 300,
					timerProgressBar: true,
				});
				setUpdate(!update);
				setTimeout(() => {
					window.location.reload();
				}, 600);
			}
		} catch (error) {
		} finally {
			setLoadingCheckout(false);
		}
	};

	const handleChangeAddress = date => {
		if (date.$d) {
			const formatedDate = moment(date.$d).format();
			setSelectedDelivery(formatedDate);
		}
	};

	const handleDeleteCart = async () => {
		if (selectedItem.length !== 0) {
			const param = {
				IdList: selectedItem,
			};

			try {
				setLoading(true);

				const res = await deleteItemCart(param);

				if (res) {
					Swal.fire({
						title: "Success!",
						text: "Barang di hapus dari keranjang",
						icon: "success",
						width: 300,
					});
					setUpdate(!update);
					setDeleteMode(false);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		} else {
			Swal.fire({
				title: "Error!",
				text: "Pilih pesanan yang mau dihapus",
				icon: "error",
				timer: 1000,
				timerProgressBar: true,
				width: 300,
			});
		}
	};

	const handleSelectItem = item => {
		const index = selectedItem.indexOf(item.Id);
		if (index === -1) {
			setSelectedItem(prev => [...prev, item.Id]);
		} else {
			setSelectedItem(prev => prev.filter(itemId => itemId !== item.Id));
		}
	};

	return (
		<div className='w-full h-screen flex'>
			{loading && (
				<div className='w-full h-screen fixed top-0 left-0 bg-black/40 flex justify-center items-center z-50'>
					<CircularProgress size={20} sx={{ color: "white" }} />
				</div>
			)}
			<Sidebar />
			<div className='flex flex-col w-full h-full relative'>
				<header className='w-full h-16 flex px-4 items-center shadow bg-white z-10'>
					<h1 className='text-2xl font-bold text-indigo-500'>
						KERANJANG ANDA{" "}
					</h1>
				</header>
				<div className={`w-full h-full relative flex gap-2 p-4`}>
					<div className='w-full h-full top-0 left-0 absolute z-0'>
						<Image
							src={layeredwave}
							width={4000}
							height={2000}
							className=' object-cover w-full h-full opacity-50 z-0'
						/>
					</div>
					<div className='w-full h-full flex gap-2 relative z-10'>
						<div className='w-1/2 h-full'>
							{/* LEFT TOP */}
							<div className='w-full h-full flex flex-col gap-4'>
								<div className='w-full relative h-2/3 bg-white rounded shadow-sm overflow-hidden'>
									<h1 className='w-full h-12 flex justify-center items-center shadow-sm text-2xl text-indigo-500 font-light'>
										{change ? (
											<button
												className='absolute left-4 cursor-pointer hover:scale-125 transition-all duration-150'
												onClick={() => {
													setChange(false);
												}}>
												<TiArrowBackOutline className='' />
											</button>
										) : (
											""
										)}
										INFORMASI PENGIRIMAN
										<Tooltip
											title={
												<p
													className='text-light'
													style={{
														fontFamily: "var(--font-outfit)",
													}}>
													Informasi tambahan
												</p>
											}>
											<button
												className='absolute right-4'
												onClick={() => {
													setChange(!change);
												}}>
												<motion.div
													initial={false}
													animate={{
														rotate: change ? 90 : 0,
													}}
													whileHover={{
														scale: 1.1,
													}}>
													<HiOutlineAdjustmentsVertical className='text-slate-400 ' />
												</motion.div>
											</button>
										</Tooltip>
									</h1>
									<form className='p-4 flex flex-col gap-2 z-10'>
										{change ? (
											<>
												<div className='flex flex-col gap-1'>
													<p className='text-sm text-slate-400'>
														Informasi tambahan (optional) :
													</p>
													<TextField
														id='standard-basic'
														label='Masukan No PO'
														variant='standard'
														sx={{
															fontFamily: "var(--font-outfit)",
														}}
													/>
												</div>
												<div>
													<Button
														component='label'
														role={undefined}
														variant='contained'
														tabIndex={-1}
														startIcon={<CloudUploadIcon />}
														className='bg-blue-500 hover:bg-blue-700'>
														Upload File Bukti Po
														<VisuallyHiddenInput type='file' />
													</Button>
												</div>
											</>
										) : (
											<>
												<motion.div
													initial={{
														opacity: 0,
														translateX: -100,
														transitionDelay: 0.6,
													}}
													animate={{
														opacity: 1,
														translateX: 0,
													}}>
													<p className='text-sm text-slate-400 mb-2'>
														Masukan data pengiriman :
													</p>

													<p className='text-xs text-slate-800 mb-1'>
														Masukan Nama Customer :
													</p>
													<Box sx={{ minWidth: 120 }}>
														<FormControl fullWidth size='small'>
															<InputLabel
																id='demo-simple-select-label'
																sx={{
																	fontFamily: "var(--font-outfit)",
																}}>
																Pilih Customer
															</InputLabel>
															<Select
																labelId='demo-simple-select-label'
																id='demo-simple-select'
																label='Pilih Customer'
																value={selectedCustomer}
																onChange={event =>
																	setSelectedCustomer(event.target.value)
																}
																sx={{
																	fontFamily: "var(--font-outfit)",
																	zIndex: 10,
																}}>
																<MenuItem value=''>
																	<em>None</em>
																</MenuItem>
																{customer.length > 0 &&
																	customer.map((item, index) => (
																		<MenuItem
																			key={index}
																			value={`${item.id}`}
																			sx={{
																				fontFamily: "var(--font-outfit)",
																			}}>
																			{item.label}
																		</MenuItem>
																	))}
															</Select>
														</FormControl>
													</Box>
												</motion.div>
												<motion.div
													initial={{
														opacity: 0,
														translateX: -100,
														transitionDelay: 0.6,
													}}
													animate={{
														opacity: 1,
														translateX: 0,
													}}>
													<p className='text-xs text-slate-800 mb-1'>
														Masukan Alamat Customer :
													</p>
													<Box sx={{ minWidth: 120 }}>
														<FormControl fullWidth size='small'>
															<InputLabel
																id='select-address-label'
																sx={{
																	fontFamily: "var(--font-outfit)",
																}}>
																Pilih Alamat
															</InputLabel>
															<Select
																labelId='select-address-label'
																id='select-address'
																label='Pilih Alamat'
																value={selectedAddress}
																onChange={event =>
																	setSelectedAddress(event.target.value)
																}
																sx={{
																	fontFamily: "var(--font-outfit)",
																	zIndex: 10,
																}}>
																{customerAddress.length > 0 ? (
																	[
																		<MenuItem key='none' value=''>
																			<em>None</em>
																		</MenuItem>,
																		...customerAddress.map((item, index) => (
																			<MenuItem
																				key={index}
																				value={`${item.Id}`}
																				sx={{
																					fontFamily: "var(--font-outfit)",
																				}}>
																				{item.Address}
																			</MenuItem>
																		)),
																	]
																) : (
																	<MenuItem key='placeholder' value={""}>
																		Pilih customer untuk menampilkan alamat
																	</MenuItem>
																)}
															</Select>
														</FormControl>
													</Box>
												</motion.div>
												<motion.div
													initial={{
														opacity: 0,
														translateX: -100,
														transitionDelay: 0.6,
													}}
													animate={{
														opacity: 1,
														translateX: 0,
													}}>
													<p className='text-xs text-slate-800 mb-1'>
														Masukan tanggal pengiriman :
													</p>
													<LocalizationProvider dateAdapter={AdapterDayjs}>
														<DemoContainer components={["DatePicker"]}>
															<DatePicker
																minDate={today}
																label='Pilih tgl pengiriman'
																className='z-10 w-full'
																slotProps={{
																	field: {
																		clearable: true,
																		onClear: () => {
																			setCleared(true);
																			setSelectedDelivery(null);
																		},
																	},
																	textField: {
																		size: "small",
																		sx: {
																			fontFamily: "var(--font-outfit)",
																		},
																	},
																}}
																onChange={handleChangeAddress}
																sx={{
																	fontFamily: "var(--font-outfit)",
																}}
															/>
														</DemoContainer>
													</LocalizationProvider>

													<button
														className='text-sm text-blue-500 cursor-pointer mt-2 underline'
														onClick={() => {
															setChange(true);
														}}>
														Informasi tambahan...
													</button>
												</motion.div>
											</>
										)}
									</form>
									<FaTruckLoading
										className=' absolute -bottom-4 text-sky-300 opacity-5 -right-8 z-0'
										size={300}
									/>
								</div>

								{/* BOTTOM */}
								<div className='w-full h-1/3 bg-white bg-opacity-70 rounded shadow flex flex-col p-4'>
									<div>
										<p className='text-sm text-slate-700 flex justify-between items-center'>
											Masukan Notes (Optional)
											<span className='text-xs'>{notes.length} / 500</span>
										</p>
										<textarea
											style={{
												fontFamily: "var(--font-outfit)",
											}}
											value={notes}
											onChange={e => {
												setNotes(e.target.value);
											}}
											maxLength={500}
											className='w-full resize-none text-xs p-2 outline-none bg-white bg-opacity-70 border border-slate-300 rounded'
											rows={5}></textarea>
									</div>

									<button
										className={`w-full h-12 bg-gradient-to-br from-indigo-500 to-blue-400 rounded text-white ${styles.primary_button}`}
										onClick={handleCheckout}>
										<div
											className={`z-10 text-white ${styles.text} transition-all duration-150`}>
											Checkout Sekarang!
										</div>
									</button>
								</div>
							</div>
						</div>

						{/* RIGHT SIDE */}
						<div className='w-2/3 h-full rounded bg-white bg-opacity-80 shadow'>
							<h1 className='w-full relative h-12 flex justify-center items-center shadow-sm text-2xl text-blue-500 font-light'>
								List item
								<BsBoxes className=' absolute left-4' />
								<div className='flex items-center gap-2 absolute right-4'>
									<button
										className=''
										onClick={() => {
											setDeleteMode(!deleteMode);
										}}>
										{deleteMode ? (
											<TbArrowBackUp />
										) : (
											<BsTrash className='text-red-500' />
										)}
									</button>
									{deleteMode ? (
										<button
											className='text-sm text-white bg-red-500 px-4 p-1 rounded'
											onClick={handleDeleteCart}>
											Hapus
										</button>
									) : null}
								</div>
							</h1>

							{/* CART LIST */}
							<div
								style={{
									maxHeight: 600,
								}}
								className='w-full h-5/6  p-4 overflow-hidden '>
								{cart.length > 0 && (
									<ul className=' w-full h-full flex flex-col gap-2 p-2 bg-white bg-opacity-30 rounded border overflow-y-auto border-slate-50'>
										{cart.map((item, index) => (
											<CartList
												data={item}
												key={index}
												deleteMode={deleteMode}
												handleSelectItem={handleSelectItem}
											/>
										))}
									</ul>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
