import * as React from "react";
import Image from "next/image";

const UserCard = props => {
	const { userData, open } = props;

	// Convert base64 string to data URL
	const imageDataUrl = `data:image/png;base64,${userData?.ProfilePicture}`;

	return (
		<div
			className={`w-full flex  rounded-lg min-h-20 ${
				open ? "border border-slate-200 p-2" : "p-1"
			}`}>
			<div
				className={
					open
						? " w-2/6 h-full flex justify-center items-center"
						: "  w-full h-full flex cursor-pointer pb-2 border-b border-slate-200"
				}>
				<Image
					src={imageDataUrl}
					width={200}
					height={200}
					alt='User Profile Picture'
					className={`aspect-square object-cover  rounded-full shadow-md ${
						open ? "w-16 h-16" : " w-14 h-14 border border-slate-400"
					}`}
				/>
			</div>
			{open ? (
				<div className='w-4/6 h-full px-2'>
					<p className='m-0 p-0 text-sm'>
						Hello! <span className='text-sky-400'>{userData?.Name}</span>
					</p>
					<p className='m-0 p-0 text-sm'>{userData?.EmailAddress}</p>
					<button className='w-14 h-5 mt-1 bg-indigo-400 text-white rounded text-xs flex justify-center items-center gap-2'>
						Edit
					</button>
				</div>
			) : (
				""
			)}
		</div>
	);
};

export default UserCard;
