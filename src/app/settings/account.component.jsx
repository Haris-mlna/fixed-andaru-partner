import * as React from "react";
import { FiTrash2 } from "react-icons/fi";
import { MdOutlineFileUpload } from "react-icons/md";
import Image from "next/image";
import styles from "./page.module.css";
import { editUser } from "./page.service";
import { useUser } from "../../context/user/user-context";
import Swal from "sweetalert2";

export const Settingsaccount = props => {
	const { userData, updateUser, setUpdateUser } = useUser();

	const imageDataUrl = `data:image/png;base64,${userData?.ProfilePicture}`;
	const imageData = base64 => {
		if (base64) {
			return `data:image/png;base64,${base64}`;
		}

		return "";
	};
	const [form, setForm] = React.useState({
		PartnerUserId: "",
		Name: "",
		Username: "",
		EmailAddress: "",
		PhoneNumber: "",
		ProfilePicture: "",
	});

	const initialEdit = {
		name: false,
		username: false,
		contact: false,
	};

	const [edit, setEdit] = React.useState(initialEdit);

	const handleSubmit = async () => {
		const body = {
			PartnerUserId: userData.Id,
			Name: form.Name ? form.Name : userData.Name,
			UserName: form.Username ? form.Username : userData.UserName,
			EmailAddress: form.EmailAddress
				? form.EmailAddress
				: userData.EmailAddress,
			PhoneNumber: form.PhoneNumber ? form.PhoneNumber : userData.PhoneNumber,
			ProfilePicture: form.ProfilePicture
				? form.ProfilePicture
				: userData.ProfilePicture,
		};

		try {
			const res = await editUser(body);

			if (res) {
				setEdit(initialEdit);
				setUpdateUser(!updateUser);
				Swal.fire({
					icon: "success",
					title: "User berhasil diganti",
					timer: 1000,
					showCancelButton: false,
					showConfirmButton: false,
					timerProgressBar: true,
					width: 300,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleFileChange = async e => {
		const file = e.target.files[0];
		if (file) {
			try {
				const options = {
					maxSizeMB: 2, // Set maximum size to 2MB
					maxWidthOrHeight: 1920, // Set maximum width or height
					useWebWorker: true, // Use Web Worker for faster compression (optional)
				};
				const compressedFile = await imageCompression(file, options); // Compress the image
				const reader = new FileReader();
				reader.onloadend = () => {
					const base64String = reader.result
						.replace("data:", "")
						.replace(/^.+,/, "");
					setForm(prev => ({ ...prev, ProfilePicture: base64String }));
				};
				reader.readAsDataURL(compressedFile); // Read compressed file
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<div className='flex flex-col w-full'>
			<div className='w-full mt-2 px-4'>
				<div className='w-full flex justify-between items-center border-b-2  h-32 bg-white'>
					<div className='flex items-center gap-3'>
						<div className='size-24 rounded-full'>
							<Image
								src={imageData(
									form.ProfilePicture
										? form.ProfilePicture
										: userData?.ProfilePicture
								)}
								alt='user'
								width={400}
								height={400}
								className='w-full h-full rounded-full object-cover'
							/>
						</div>
						<div>
							{userData?.Status === "Active" && (
								<div className='px-4 border border-teal-600 bg-teal-100 text-teal-500 rounded-full text-sm flex'>
									active
								</div>
							)}
						</div>
					</div>
					<div className='flex gap-2'>
						<button className='p-2 rounded shadow text-red-500'>
							<FiTrash2 size={18} />
						</button>
						<input
							type='file'
							id='fileInput'
							className='hidden'
							onChange={handleFileChange}
						/>
						<label
							htmlFor='fileInput'
							className='p-2 shadow rounded flex gap-1 items-center text-sm cursor-pointer'>
							<MdOutlineFileUpload size={18} />
							Upload
						</label>
					</div>
				</div>
				<div className='w-full flex justify-between px-2 py-4 border-b-2'>
					<div className='flex-col'>
						<p className='font-bold'>Name</p>
						{edit.name ? (
							<input
								type='text'
								value={form.Name}
								onChange={e => {
									const { value } = e.target;
									setForm(prev => ({ ...prev, Name: value }));
								}}
								placeholder='Type your new name here...'
								className='border p-2 text-sm outline-none min-w-64'
							/>
						) : (
							<p className='text-sm text-neutral-500'>{userData?.Name}</p>
						)}
					</div>
					<div>
						<button
							className='p-1 px-3 shadow border rounded text-sm'
							onClick={() => {
								setEdit(prev => ({ ...prev, name: !edit.name }));
							}}>
							Edit
						</button>
					</div>
				</div>
				<div className='w-full flex justify-between px-2 py-4 border-b-2'>
					<div className='flex-col'>
						<p className='font-bold'>Username</p>
						{edit.username ? (
							<input
								type='text'
								value={form.Username}
								onChange={e => {
									const { value } = e.target;
									setForm(prev => ({ ...prev, Username: value }));
								}}
								placeholder='Type your new username here...'
								className='border p-2 text-sm outline-none min-w-64'
							/>
						) : (
							<p className='text-sm text-neutral-500'>{userData?.UserName}</p>
						)}
					</div>
					<div>
						<button
							className='p-1 px-3 shadow border rounded text-sm'
							onClick={() => {
								setEdit(prev => ({ ...prev, username: !edit.username }));
							}}>
							Edit
						</button>
					</div>
				</div>
				<div className='w-full flex justify-between px-2 py-4 border-b-2'>
					<div className='flex-col'>
						<p className='font-bold'>Contact</p>
						{edit.contact ? (
							<div className='flex flex-col gap-1'>
								<input
									type='text'
									value={form.EmailAddress}
									onChange={e => {
										const { value } = e.target;
										setForm(prev => ({ ...prev, EmailAddress: value }));
									}}
									placeholder='Type your new email address here...'
									className='border p-2 text-sm outline-none min-w-64'
								/>
								<input
									type='text'
									value={form.PhoneNumber}
									onChange={e => {
										const { value } = e.target;
										setForm(prev => ({ ...prev, PhoneNumber: value }));
									}}
									placeholder='Type your new phone number here...'
									className='border p-2 text-sm outline-none min-w-64'
								/>
							</div>
						) : (
							<>
								<p className='text-sm text-neutral-500'>
									email : {userData?.EmailAddress}
								</p>
								<p className='text-sm text-neutral-500'>
									phone : {userData?.PhoneNumber}
								</p>
							</>
						)}
					</div>
					<div>
						<button
							className='p-1 px-3 shadow border rounded text-sm'
							onClick={() => {
								setEdit(prev => ({ ...prev, contact: !edit.contact }));
							}}>
							Edit
						</button>
					</div>
				</div>
			</div>
			<button className={styles.button} onClick={handleSubmit}>
				Edit
			</button>
		</div>
	);
};
