import { FiTrash2 } from "react-icons/fi";
import { MdOutlineFileUpload } from "react-icons/md";
import Image from "next/image";

export const Settingsaccount = props => {
	const { userData } = props;

	const imageDataUrl = `data:image/png;base64,${userData?.ProfilePicture}`;

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
					<p className='text-sm text-neutral-500'>{userData?.Name}</p>
				</div>
				<div>
					<button className='p-1 px-3 shadow border rounded text-sm'>
						Edit
					</button>
				</div>
			</div>
			<div className='w-full flex justify-between px-2 py-4 border-b-2'>
				<div className='flex-col'>
					<p className='font-bold'>Username</p>
					<p className='text-sm text-neutral-500'>{userData?.UserName}</p>
				</div>
				<div>
					<button className='p-1 px-3 shadow border rounded text-sm'>
						Edit
					</button>
				</div>
			</div>
			<div className='w-full flex justify-between px-2 py-4 border-b-2'>
				<div className='flex-col'>
					<p className='font-bold'>Contact</p>
					<p className='text-sm text-neutral-500'>
						email : {userData?.EmailAddress}
					</p>
					<p className='text-sm text-neutral-500'>
						phone : {userData?.PhoneNumber}
					</p>
				</div>
				<div>
					<button className='p-1 px-3 shadow border rounded text-sm'>
						Edit
					</button>
				</div>
			</div>
		</div>
	);
};
