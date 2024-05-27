import * as React from "react";
import { FiTrash2 } from "react-icons/fi";
import { MdOutlineFileUpload } from "react-icons/md";
import Image from "next/image";
import { TextField } from "@mui/material";

export const Settingsaccount = props => {
	const { userData } = props;

	const imageDataUrl = `data:image/png;base64,${userData?.ProfilePicture}`;
	const [form, setForm] = React.useState({
		PartnerUserId: "",
		Name: "",
		Username: "",
		EmailAddress: "",
		PhoneNumber: "",
		ProfilePicture: "",
	});

	const [edit, setEdit] = React.useState({
		name: false,
		username: false,
		contact: false,
	});

	const handleSubmit = () => {
		const body = {
			PartnerUserId : userData.Id,
			
		}
	}

	return (
		<div className='w-full mt-2 px-4'>
			<div className='w-full flex justify-between items-center border-b-2  h-32 bg-white'>
				<div className='flex items-center gap-3'>
					<div className='size-24 rounded-full'>
						<Image
							src={imageDataUrl}
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
					<button className='p-2 shadow rounded flex gap-1 items-center text-sm'>
						<MdOutlineFileUpload size={18} />
						Upload
					</button>
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
								phone : {userData?.EmailAddress}
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
	);
};
