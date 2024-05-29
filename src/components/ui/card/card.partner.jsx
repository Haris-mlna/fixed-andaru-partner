import Image from "next/image";
import * as React from "react";

export const PartnerCard = ({ partner }) => {
	const imageDataUrl = `data:image/png;base64,${partner?.ProfileImagePartner}`;
	return (
		<div className=' w-64 h-80 bg-white rounded shadow-lg overflow-hidden'>
			{partner.ProfileImagePartner ? (
				<div className='w-full h-3/4'>
					<Image
						src={imageDataUrl}
						alt='pp'
						width={500}
						height={500}
						className='w-full h-full object-cover'
					/>
				</div>
			) : (
				<div className='w-full h-3/4 bg-neutral-300'></div>
			)}
			<div className='p-2'>
				<p className='text-blue-700 font-semibold'>{partner.Name}</p>
			</div>
		</div>
	);
};

export const PartnerListCard = ({ partner }) => {
	const imageDataUrl = `data:image/png;base64,${partner?.ProfileImagePartner}`;
	return (
		<div className=' w-64 h-80 bg-white rounded shadow-lg overflow-hidden'>
			{partner.ProfileImagePartner ? (
				<div className='w-full h-3/4'>
					<Image
						src={imageDataUrl}
						alt='pp'
						width={500}
						height={500}
						className='w-full h-full object-cover'
					/>
				</div>
			) : (
				<div className='w-full h-3/4 bg-neutral-300'></div>
			)}
			<div className='p-2'>
				<p className='text-blue-700 font-semibold'>{partner.Name}</p>
			</div>
		</div>
	);
};
