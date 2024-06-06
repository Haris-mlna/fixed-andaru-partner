import * as React from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { useUser } from "../../context/user/user-context";
import { editCompany } from "./page.service";
import imageCompression from "browser-image-compression";

export const Settingscompany = props => {
	const { setLoading } = props;

	const { companyData } = useUser();

	const [form, setForm] = React.useState({
		Id: "",
		Name: "",
		CompanyTitle: "",
		DeliveryAddress: "",
		BillingAddress: "",
		EmailAddress: "",
		PhoneNumber: "",
		ProfileImagePartner: "",
		DomainName: "",
	});
	const [currentImage, setCurrentImage] = React.useState("");
	const [imageEdited, setImageEdited] = React.useState(false);
	const [editable, setEditable] = React.useState({
		name: false,
		contact: false,
		owner: false,
		billingaddress: false,
		deliveryaddress: false,
	});

	React.useEffect(() => {
		setCurrentImage(
			`data:image/png;base64,${companyData?.ProfileImagePartner}`
		);
	}, [companyData]);

	const handleFileChange = async event => {
		const file = event.target.files[0];
		if (file) {
			try {
				setLoading(true);
				const options = {
					maxSizeMB: 2, // Set maximum size to 2MB
					maxWidthOrHeight: 1920, // Set maximum width or height
					useWebWorker: true, // Use Web Worker for faster compression (optional)
				};
				const compressedFile = await imageCompression(file, options); // Compress the image
				const reader = new FileReader();
				reader.onloadend = () => {
					const base64String = reader.result.split(",")[1];
					setCurrentImage(`data:image/png;base64,${base64String}`);
					setForm(prev => ({ ...prev, ProfileImagePartner: base64String }));
					setImageEdited(true);
				};
				reader.readAsDataURL(compressedFile); // Read compressed file
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}
	};

	const handleSubmit = async () => {
		const body = {
			Id: companyData.Id,
			Name: form.Name ? form.Name : companyData.Name,
			CompanyTitle: form.CompanyTitle
				? form.CompanyTitle
				: companyData.CompanyTitle,
			DeliveryAddress: form.DeliveryAddress
				? form.DeliveryAddress
				: companyData.DeliveryAddress,
			BillingAddress: form.BillingAddress
				? form.BillingAddress
				: companyData.BillingAddress,
			EmailAddress: form.EmailAddress
				? form.EmailAddress
				: companyData.EmailAddress,
			PhoneNumber: form.PhoneNumber
				? form.PhoneNumber
				: companyData.PhoneNumber,
			ProfileImagePartner: form.ProfileImagePartner
				? form.ProfileImagePartner
				: companyData.ProfileImagePartner,
		};
		try {
			setLoading(true);
			const res = await editCompany(body);

			if (res) {
				// console.log(res);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const handleChangeInput = e => {
		const { value, id } = e.target;
		setForm(prev => ({ ...prev, [id]: value }));
	};

	return (
		<div className='w-full'>
			<div className='mt-1 w-full min-h-72 p-4 flex'>
				<div className='size-72 relative rounded-lg overflow-hidden'>
					<div className='absolute inset-0 z-20 flex flex-col justify-center items-center'>
						<label
							className={`${styles.custum_file_upload} w-full ${
								imageEdited ? "opacity-0" : "opacity-100"
							} h-full hover:bg-white bg-white/20 transition-all ease-in-out duration-150`}
							htmlFor='file'>
							<div className={styles.icon}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill=''
									viewBox='0 0 24 24'>
									<g strokeWidth={0} id='SVGRepo_bgCarrier'></g>
									<g
										strokeLinejoin='round'
										strokeLinecap='round'
										id='SVGRepo_tracerCarrier'></g>
									<g id='SVGRepo_iconCarrier'>
										<path
											fill=''
											d='M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.5523 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z'
											clipRule='evenodd'
											fillRule='evenodd'></path>
									</g>
								</svg>
							</div>
							<div className={styles.text}>
								<span>Click to edit image</span>
							</div>
							<input
								className=''
								type='file'
								id='file'
								onChange={handleFileChange}
							/>
						</label>
					</div>
					<div
						className={`absolute inset-0 z-10 ${
							imageEdited ? " opacity-100" : "opacity-20"
						}`}>
						<Image
							src={currentImage}
							alt='cmp'
							width={600}
							height={600}
							className='w-full h-full object-cover'
						/>
					</div>
				</div>
				<div className='flex-1 flex-col flex gap-1'>
					<div className='w-full px-4'>
						<div className='w-full flex justify-between px-2 py-4 border-b-2'>
							<div className='flex-col'>
								<p className='font-bold'>Name</p>
								<p className='text-sm text-neutral-500'>
									{editable.name ? (
										<div className='flex gap-2'>
											<div className='flex flex-col'>
												<label htmlFor='CompanyTitle'>title</label>
												<input
													type='text'
													id='CompanyTitle'
													value={form.CompanyTitle}
													placeholder={companyData?.CompanyTitle}
													className='p-2 outline-none border'
													onChange={handleChangeInput}
												/>
											</div>
											<div className='flex flex-col'>
												<label htmlFor='Name'>name</label>
												<input
													type='text'
													id='Name'
													value={form.Name}
													placeholder={companyData?.Name}
													className='p-2 outline-none border'
													onChange={handleChangeInput}
												/>
											</div>
										</div>
									) : (
										`${companyData?.CompanyTitleLabel} ${companyData?.Name}`
									)}
								</p>
							</div>
							<div>
								<button
									className='p-1 px-3 shadow border rounded text-sm'
									onClick={() => {
										setEditable(prev => ({ ...prev, name: !editable.name }));
									}}>
									Edit
								</button>
							</div>
						</div>
					</div>
					<div className='w-full px-4'>
						<div className='w-full flex justify-between px-2 py-4 border-b-2'>
							<div className='flex-col'>
								<p className='font-bold'>Contact</p>
								{editable.contact ? (
									<div className='text-sm text-neutral-500'>
										<div className='flex flex-col'>
											<label htmlFor='EmailAddress'>email</label>
											<input
												type='email'
												id='EmailAddress'
												value={form.EmailAddress}
												placeholder={companyData?.EmailAddress}
												className='p-2 outline-none border'
												onChange={handleChangeInput}
											/>
										</div>
										<div className='flex flex-col'>
											<label htmlFor='PhoneNumber'>phone</label>
											<input
												type='text'
												id='PhoneNumber'
												value={form.PhoneNumber}
												placeholder={companyData?.PhoneNumber}
												className='p-2 outline-none border'
												onChange={handleChangeInput}
											/>
										</div>
									</div>
								) : (
									<>
										<p className='text-sm text-neutral-500'>
											email : {companyData?.EmailAddress}
										</p>
										<p className='text-sm text-neutral-500'>
											phone : {companyData?.PhoneNumber}
										</p>
									</>
								)}
							</div>
							<div>
								<button
									className='p-1 px-3 shadow border rounded text-sm'
									onClick={() => {
										setEditable(prev => ({
											...prev,
											contact: !editable.contact,
										}));
									}}>
									Edit
								</button>
							</div>
						</div>
					</div>
					<div className='w-full px-4'>
						<div className='w-full flex justify-between px-2 py-4 border-b-2'>
							<div className='flex-col'>
								<p className='font-bold'>owner</p>
								<p className='text-sm text-neutral-500'>
									{companyData?.OwnerName}
								</p>
							</div>
							<div>
								{/* <button className='p-1 px-3 shadow border rounded text-sm'>
                                    Edit
                                </button> */}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='w-full px-6'>
				<div className='w-full flex justify-between px-2 py-4 border-b-2'>
					<div className='flex-col'>
						<p className='font-bold'>Billing Address</p>
						{editable.billingaddress ? (
							<div className='text-sm text-neutral-500'>
								<div className='flex flex-col'>
									<label htmlFor='BillingAddress'>new billing address</label>
									<input
										type='text'
										id='BillingAddress'
										value={form.BillingAddress}
										placeholder={companyData?.BillingAddress}
										className='p-2 outline-none border'
										onChange={handleChangeInput}
									/>
								</div>
							</div>
						) : (
							<p className='text-sm text-neutral-500'>
								{companyData?.BillingAddress}
							</p>
						)}
					</div>
					<div>
						<button
							className='p-1 px-3 shadow border rounded text-sm'
							onClick={() => {
								setEditable(prev => ({
									...prev,
									billingaddress: !editable.billingaddress,
								}));
							}}>
							Edit
						</button>
					</div>
				</div>
			</div>
			<div className='w-full px-6'>
				<div className='w-full flex justify-between px-2 py-4 border-b-2'>
					<div className='flex-col'>
						<p className='font-bold'>Delivery Address</p>
						{editable.deliveryaddress ? (
							<div className='text-sm text-neutral-500'>
								<div className='flex flex-col'>
									<label htmlFor='DeliveryAddress'>new delivery address</label>
									<input
										type='text'
										id='DeliveryAddress'
										value={form.DeliveryAddress}
										placeholder={companyData?.DeliveryAddress}
										className='p-2 outline-none border'
										onChange={handleChangeInput}
									/>
								</div>
							</div>
						) : (
							<p className='text-sm text-neutral-500'>
								{companyData?.DeliveryAddress}
							</p>
						)}
					</div>
					<div>
						<button
							className='p-1 px-3 shadow border rounded text-sm'
							onClick={() => {
								setEditable(prev => ({
									...prev,
									deliveryaddress: !editable.deliveryaddress,
								}));
							}}>
							Edit
						</button>
					</div>
				</div>
			</div>
			<button className={styles.button} onClick={handleSubmit}>
				Save
			</button>
		</div>
	);
};
