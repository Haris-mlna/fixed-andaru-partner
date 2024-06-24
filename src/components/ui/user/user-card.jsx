import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "../../../context/user/user-context";
import company_img from "../../../assets/images/buildings.png";

const UserCard = props => {
	const { userData, open } = props;
	const { companyData } = useUser();
	const router = useRouter();

	// Convert base64 string to data URL
	const imageDataUrl = base64 => {
		if (base64) {
			return `data:image/png;base64,${base64}`;
		}

		return null;
	};

	React.useEffect(() => {
		console.log(companyData);
	}, []);

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
				{userData?.ProfilePicture || companyData?.ProfileImagePartner ? (
					<Image
						src={imageDataUrl(
							userData?.ProfilePicture || companyData?.ProfileImagePartner
						)}
						width={200}
						height={200}
						alt='User Profile Picture'
						className={` object-contain  rounded-full shadow-md ${
							open ? "w-16 h-16" : " w-14 h-14 border border-slate-400"
						}`}
					/>
				) : (
					<div>
						<Image
							src={company_img}
							width={200}
							height={200}
							alt='User Profile Picture'
							className={` object-cover  rounded-full shadow-md ${
								open ? "w-16 h-16" : " w-14 h-14 border border-slate-400"
							}`}
						/>
					</div>
				)}
			</div>
			{open ? (
				<div className='w-4/6 h-full px-2'>
					<p className='m-0 p-0 text-sm'>
						Hello!{" "}
						<span className='text-sky-400'>
							{userData?.Name || companyData?.Name}
						</span>
					</p>
					<p className='m-0 p-0 text-xs text-neutral-400'>
						{userData?.EmailAddress || companyData?.EmailAddress}
					</p>
					<button
						className='w-14 h-5 mt-1 bg-indigo-400 text-white rounded text-xs flex justify-center items-center gap-2'
						onClick={() => {
							router.push("/settings");
						}}>
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
