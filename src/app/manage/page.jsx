"use client";

import * as React from "react";
import Sidebar from "../../components/layout/sidebar/sidebar";
import { loadListUser, loadSubsidiaries, addPartner } from "./page.service";
import { useUser } from "../../context/user/user-context";
import styles from "./card.module.css";
import Image from "next/image";
import userimg from "../../assets/icons/user.png";

const Manage = () => {
	const { user, companyData } = useUser();
	const initialForm = {
		UserName: "",
		Name: "",
		EmailAddress: "",
		PhoneNumber: "",
	};

	const [listuser, setListuser] = React.useState([]);
	const [subsidiaries, setSubsidiaries] = React.useState([]);
	const [update, setUpdate] = React.useState(false);
	const [selected, setSelected] = React.useState(companyData);
	const [showModal, setShowModal] = React.useState(false);
	const [formData, setFormData] = React.useState(initialForm);

	const [open, setOpen] = React.useState(false);

	const fetchUser = async id => {
		try {
			const res = await loadListUser(id);

			setListuser(res?.data);
		} catch (error) {
			console.error(error);
		}
	};

	const fetchCompany = async id => {
		try {
			const res = await loadSubsidiaries(id);

			setSubsidiaries(res?.data);
		} catch (error) {
			console.log(error);
		}
	};

	React.useEffect(() => {
		if (user?.OrganizationId) {
			fetchUser(user.OrganizationId);
			fetchCompany(user.OrganizationId);
		}
	}, [user]);

	React.useEffect(() => {
		if (selected) {
			fetchUser(selected.Id);
		}
	}, [selected, update]);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleAddUser = async e => {
		e.preventDefault();

		try {
			const param = {
				OrganizationId: selected.Id,
				UserName: formData.UserName,
				Name: formData.Name,
				EmailAddress: formData.EmailAddress,
				PhoneNumber: formData.PhoneNumber,
			};
			const res = await addPartner(param);
			if (res) {
				console.log("User added successfully:", res.data);
				//fetchUser(selected.Id);
				setListuser(prevList => [...prevList, res.data]);
				setUpdate(!update);
			}
		} catch (error) {
			console.error("Error adding user:", error);
		} finally {
			// Tutup modal setelah proses selesai
			setShowModal(false);
			setFormData(initialForm);
		}
	};

	return (
		<div className='flex w-full h-screen'>
			<Sidebar />
			<div className=' w-full overflow-y-auto'>
				<div className='w-full border-b-2 bg-white shadow h-12 flex items-center px-4 z-30'>
					Manage Account
				</div>
				<div className='w-full min-h-72 bg-white'>
					<div className='p-4'>
						<div className='flex p-2 border-2 rounded gap-2'>
							<div className=''>
								<div>
									<h3 className='text-2xl w-96 mb-1 bg-gradient-to-br from-indigo-900 to-blue-800  text-white p-2 rounded'>
										{companyData?.CompanyTitleLabel} {companyData?.Name}
									</h3>
								</div>
								<div className='w-96 h-56 bg-slate-50 rounded overflow-hidden'>
									{companyData?.ProfileImagePartner && (
										<Image
											src={`data:image/png;base64,${companyData.ProfileImagePartner}`}
											alt='Company Profile'
											width={400}
											height={400}
											className='w-full h-full object-contain'
										/>
									)}
								</div>
							</div>
							<div className=''>
								<div>
									<p className='text-slate-700 border-b mb-2 text-sm'>
										Owner : {companyData?.OwnerName}
									</p>
									<p className='text-slate-700 border-b mb-2 text-sm'>
										Email : {companyData?.EmailAddress}
									</p>
									<p className='text-slate-700 border-b mb-2 text-sm'>
										Phone : {companyData?.PhoneNumber}
									</p>
									<p className='text-slate-700 border-b mb-2 text-sm'>
										Billing Address : {companyData?.BillingAddress}
									</p>
									<p className='text-slate-700 border-b mb-2 text-sm'>
										Delivery Address : {companyData?.DeliveryAddress}
									</p>
								</div>
							</div>
						</div>

						{/*  */}
					</div>
				</div>
				<div className='w-full flex items-center p-4'>
					<button className=' bg-gradient-to-br from-blue-950 to-blue-700 p-2 px-4 rounded text-white'>
						+ Tambah subsidiaries
					</button>
				</div>
				<div className=' w-full min-h-96 bg-white p-4'>
					<div className='w-full flex overflow-x-auto gap-2 mb-4 pb-4 border-b-2'>
						{companyData ? (
							<button
								className={`
								p-2 px-4 border-b-2
								transition-all duration-150
								${selected?.Id === companyData?.Id && "border-teal-500"}
								`}
								onClick={() => {
									setSelected(companyData);
								}}>
								{companyData?.Name}
							</button>
						) : null}
						{subsidiaries?.length > 0 ? (
							subsidiaries.map((item, index) => (
								<button
									className={`
								p-2 px-4 border-b-2
								transition-all duration-150
								${selected?.Id === item?.Id && "border-teal-500"}
								`}
									key={index}
									onClick={() => {
										setSelected(item);
									}}>
									{item?.Name}
								</button>
							))
						) : (
							null
							// <p>Maaf, data subsidiaries tidak ditemukan</p>
						)}
					</div>
					<button
						onClick={() => setShowModal(true)}
						className=' bg-gradient-to-br from-teal-400 to-green-400 py-2 px-4 rounded text-white hover:scale-95 hover:shadow transition-all duration-150 active: active:scale-100'>
						+ Tambah user
					</button>
					<div className='mt-2 w-full flex flex-wrap gap-2'>
						{/* CARD */}
						{/* CARD */}
						{/* CARD */}

						{listuser?.length > 0 ? (
							listuser.map((item, index) => (
								<div
									className={`
						${styles.card}
						shadow
						`}
									key={index}>
									<div className={styles.card__img}>
										<svg xmlns='http://www.w3.org/2000/svg' width='100%'>
											<rect fill='#ffffff' width='540' height='450'></rect>
											<defs>
												<linearGradient
													id='a'
													gradientUnits='userSpaceOnUse'
													x1='0'
													x2='0'
													y1='0'
													y2='100%'
													gradientTransform='rotate(222,648,379)'>
													<stop offset='0' stopColor='#ffffff'></stop>
													<stop offset='1' stopColor='#bfdbfe'></stop>
												</linearGradient>
												<pattern
													patternUnits='userSpaceOnUse'
													id='b'
													width='300'
													height='250'
													x='0'
													y='0'
													viewBox='0 0 1080 900'>
													<g fillOpacity='0.5'>
														<polygon
															fill='#444'
															points='90 150 0 300 180 300'></polygon>
														<polygon points='90 150 180 0 0 0'></polygon>
														<polygon
															fill='#AAA'
															points='270 150 360 0 180 0'></polygon>
														<polygon
															fill='#DDD'
															points='450 150 360 300 540 300'></polygon>
														<polygon
															fill='#999'
															points='450 150 540 0 360 0'></polygon>
														<polygon points='630 150 540 300 720 300'></polygon>
														<polygon
															fill='#DDD'
															points='630 150 720 0 540 0'></polygon>
														<polygon
															fill='#444'
															points='810 150 720 300 900 300'></polygon>
														<polygon
															fill='#FFF'
															points='810 150 900 0 720 0'></polygon>
														<polygon
															fill='#DDD'
															points='990 150 900 300 1080 300'></polygon>
														<polygon
															fill='#444'
															points='990 150 1080 0 900 0'></polygon>
														<polygon
															fill='#DDD'
															points='90 450 0 600 180 600'></polygon>
														<polygon points='90 450 180 300 0 300'></polygon>
														<polygon
															fill='#666'
															points='270 450 180 600 360 600'></polygon>
														<polygon
															fill='#AAA'
															points='270 450 360 300 180 300'></polygon>
														<polygon
															fill='#DDD'
															points='450 450 360 600 540 600'></polygon>
														<polygon
															fill='#999'
															points='450 450 540 300 360 300'></polygon>
														<polygon
															fill='#999'
															points='630 450 540 600 720 600'></polygon>
														<polygon
															fill='#FFF'
															points='630 450 720 300 540 300'></polygon>
														<polygon points='810 450 720 600 900 600'></polygon>
														<polygon
															fill='#DDD'
															points='810 450 900 300 720 300'></polygon>
														<polygon
															fill='#AAA'
															points='990 450 900 600 1080 600'></polygon>
														<polygon
															fill='#444'
															points='990 450 1080 300 900 300'></polygon>
														<polygon
															fill='#222'
															points='90 750 0 900 180 900'></polygon>
														<polygon points='270 750 180 900 360 900'></polygon>
														<polygon
															fill='#DDD'
															points='270 750 360 600 180 600'></polygon>
														<polygon points='450 750 540 600 360 600'></polygon>
														<polygon points='630 750 540 900 720 900'></polygon>
														<polygon
															fill='#444'
															points='630 750 720 600 540 600'></polygon>
														<polygon
															fill='#AAA'
															points='810 750 720 900 900 900'></polygon>
														<polygon
															fill='#666'
															points='810 750 900 600 720 600'></polygon>
														<polygon
															fill='#999'
															points='990 750 900 900 1080 900'></polygon>
														<polygon
															fill='#999'
															points='180 0 90 150 270 150'></polygon>
														<polygon
															fill='#444'
															points='360 0 270 150 450 150'></polygon>
														<polygon
															fill='#FFF'
															points='540 0 450 150 630 150'></polygon>
														<polygon points='900 0 810 150 990 150'></polygon>
														<polygon
															fill='#222'
															points='0 300 -90 450 90 450'></polygon>
														<polygon
															fill='#FFF'
															points='0 300 90 150 -90 150'></polygon>
														<polygon
															fill='#FFF'
															points='180 300 90 450 270 450'></polygon>
														<polygon
															fill='#666'
															points='180 300 270 150 90 150'></polygon>
														<polygon
															fill='#222'
															points='360 300 270 450 450 450'></polygon>
														<polygon
															fill='#FFF'
															points='360 300 450 150 270 150'></polygon>
														<polygon
															fill='#444'
															points='540 300 450 450 630 450'></polygon>
														<polygon
															fill='#222'
															points='540 300 630 150 450 150'></polygon>
														<polygon
															fill='#AAA'
															points='720 300 630 450 810 450'></polygon>
														<polygon
															fill='#666'
															points='720 300 810 150 630 150'></polygon>
														<polygon
															fill='#FFF'
															points='900 300 810 450 990 450'></polygon>
														<polygon
															fill='#999'
															points='900 300 990 150 810 150'></polygon>
														<polygon points='0 600 -90 750 90 750'></polygon>
														<polygon
															fill='#666'
															points='0 600 90 450 -90 450'></polygon>
														<polygon
															fill='#AAA'
															points='180 600 90 750 270 750'></polygon>
														<polygon
															fill='#444'
															points='180 600 270 450 90 450'></polygon>
														<polygon
															fill='#444'
															points='360 600 270 750 450 750'></polygon>
														<polygon
															fill='#999'
															points='360 600 450 450 270 450'></polygon>
														<polygon
															fill='#666'
															points='540 600 630 450 450 450'></polygon>
														<polygon
															fill='#222'
															points='720 600 630 750 810 750'></polygon>
														<polygon
															fill='#FFF'
															points='900 600 810 750 990 750'></polygon>
														<polygon
															fill='#222'
															points='900 600 990 450 810 450'></polygon>
														<polygon
															fill='#DDD'
															points='0 900 90 750 -90 750'></polygon>
														<polygon
															fill='#444'
															points='180 900 270 750 90 750'></polygon>
														<polygon
															fill='#FFF'
															points='360 900 450 750 270 750'></polygon>
														<polygon
															fill='#AAA'
															points='540 900 630 750 450 750'></polygon>
														<polygon
															fill='#FFF'
															points='720 900 810 750 630 750'></polygon>
														<polygon
															fill='#222'
															points='900 900 990 750 810 750'></polygon>
														<polygon
															fill='#222'
															points='1080 300 990 450 1170 450'></polygon>
														<polygon
															fill='#FFF'
															points='1080 300 1170 150 990 150'></polygon>
														<polygon points='1080 600 990 750 1170 750'></polygon>
														<polygon
															fill='#666'
															points='1080 600 1170 450 990 450'></polygon>
														<polygon
															fill='#DDD'
															points='1080 900 1170 750 990 750'></polygon>
													</g>
												</pattern>
											</defs>
											<rect
												x='0'
												y='0'
												fill='url(#a)'
												width='100%'
												height='100%'></rect>
											<rect
												x='0'
												y='0'
												fill='url(#b)'
												width='100%'
												height='100%'></rect>
										</svg>
									</div>
									<div className={`${styles.card__avatar} p-2`}>
										<div className='w-full h-full rounded-full'>
											<Image src={userimg} alt='user' />
										</div>
									</div>
									<div className={styles.card__title}>{item?.Name}</div>
									<div className={styles.card__subtitle}>
										<p>{item?.EmailAddress}</p>
										<p>User </p>
									</div>
									<div className={`${styles.card__wrapper} flex gap-1`}>
										<button className={styles.card__btn}>Active</button>
										<button
											className={`${styles.card__btn} ${styles.card__btn_solid}`}>
											Deactive
										</button>
									</div>
								</div>
							))
						) : (
							<p>Maaf, data user tidak ditemukan</p>
						)}

						{/* CARD */}
						{/* CARD */}
						{/* CARD */}
					</div>
				</div>
			</div>

			{/* Modal */}
			{showModal && (
				<div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
					<div className='bg-white p-4 rounded shadow-lg w-1/2'>
						<h2 className='text-xl mb-4'>Tambah User Baru</h2>
						<form>
							<div className='mb-2'>
								<label className='block text-sm'>UserName:</label>
								<input
									type='text'
									name='UserName'
									value={formData?.UserName}
									onChange={handleInputChange}
									className='w-full p-2 border rounded'
								/>
							</div>
							<div className='mb-2'>
								<label className='block text-sm'>Name:</label>
								<input
									type='text'
									name='Name'
									value={formData?.Name}
									onChange={handleInputChange}
									className='w-full p-2 border rounded'
								/>
							</div>
							<div className='mb-2'>
								<label className='block text-sm'>Email Address:</label>
								<input
									type='email'
									name='EmailAddress'
									value={formData?.EmailAddress}
									onChange={handleInputChange}
									className='w-full p-2 border rounded'
								/>
							</div>
							<div className='mb-2'>
								<label className='block text-sm'>Phone Number:</label>
								<input
									type='text'
									name='PhoneNumber'
									value={formData?.PhoneNumber}
									onChange={handleInputChange}
									className='w-full p-2 border rounded'
								/>
							</div>
							<div className='flex justify-end mt-4'>
								<button
									type='button'
									onClick={() => setShowModal(false)}
									className='bg-gray-500 text-white py-2 px-4 rounded mr-2'>
									Batal
								</button>
								<button
									type='button'
									onClick={handleAddUser}
									className=' bg-gradient-to-br from-teal-400 to-green-400 py-2 px-4 rounded text-white hover:scale-95 hover:shadow transition-all duration-150 active: active:scale-100'>
									Tambah User
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default Manage;
