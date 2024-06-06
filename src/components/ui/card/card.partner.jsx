import Image from "next/image";
import * as React from "react";
import { FaUserCheck } from "react-icons/fa6";
import company from "../../../assets/images/buildings.png";
import { MdOutlineDomainAdd } from "react-icons/md";
import pastigroup from "../../../assets/images/logo-pasti-group-masked.png";
import Swal from "sweetalert2";
import { CiClock2 } from "react-icons/ci";

export const PartnerCard = ({ partner }) => {
	const imageDataUrl = `data:image/png;base64,${partner?.ProfileImagePartner}`;
	return (
		<div className=' w-full h-28 flex bg-white-500 rounded-sm relative border items-center px-4 overflow-hidden'>
			<div className=' size-16 rounded-full overflow-hidden'>
				{partner.ProfileImagePartner ? (
					<Image
						src={imageDataUrl}
						alt='pp'
						width={500}
						height={500}
						className='w-full h-full object-cover'
					/>
				) : (
					<div className=' size-16 rounded-full bg-neutral-300'></div>
				)}
			</div>
			<div
				style={{
					width: 600,
				}}
				className='p-2 h-full py-6'>
				<p className='font-semibold'>{partner.Name}</p>
				<p className='text-xs'>
					<span className='font-semibold'>Billing Address :</span>{" "}
					{partner.BillingAddress}
				</p>
			</div>
			<div>
				<p className='font-semibold text-neutral-500'>Contact</p>
				<p className='text-xs text-neutral-400'>
					Email : {partner.EmailAddress}
				</p>
				<p className='text-xs text-neutral-400'>
					Phone : {partner.PhoneNumber}
				</p>
			</div>

			<div className='absolute top-2 right-2 rounded size-10 bg-blue-100 text-blue-500 border border-blue-500 flex justify-center items-center'>
				<FaUserCheck />
			</div>
		</div>
	);
};

export const PartnerListCard = ({ partner, handleSelectPartner }) => {
	const handleAddFriend = () => {
		handleSelectPartner(partner);
	};

	if (partner.relation === "self") {
		return null;
	}

	const imageDataUrl = `data:image/png;base64,${partner?.ProfileImagePartner}`;
	return (
		<div
			style={{
				width: 340,
			}}
			className=' h-80 bg-white rounded shadow-lg overflow-hidden'>
			<div
				className='w-full'
				style={{
					height: 150,
				}}>
				{partner.ProfileImagePartner ? (
					<div className='w-full h-full relative'>
						<div className='w-full h-full bg-neutral-200'>
							<Image
								src={pastigroup}
								width={3864}
								alt='pasti'
								height={1152}
								className=' w-full object-contain h-full opacity-40'
							/>
						</div>
						<Image
							src={imageDataUrl}
							alt='pp'
							width={500}
							height={500}
							className=' size-20 rounded-full object-cover absolute -bottom-10 left-4 bg-white'
						/>
					</div>
				) : (
					<div className='w-full h-full relative'>
						<div className='w-full h-full bg-neutral-200'>
							<Image
								src={pastigroup}
								width={3864}
								height={1152}
								alt='pastigroup'
								className=' w-full object-contain h-full opacity-40'
							/>
						</div>
						<Image
							src={company}
							alt='pp'
							width={500}
							height={500}
							className=' size-20 rounded-full object-cover absolute -bottom-10 left-4 bg-white'
						/>
					</div>
				)}
			</div>
			<div className='mt-10'>
				<div className='p-2'>
					<p className='font-semibold'>{partner.Name}</p>
					<p className='text-sm text-neutral-400'>
						Email : {partner.EmailAddress ? partner.EmailAddress : "-"}
					</p>
					<p className='text-sm text-neutral-400'>
						Phone : {partner.PhoneNumber ? partner.PhoneNumber : "-"}
					</p>
					{partner.relation === "not partner" && (
						<button
							onClick={() => {
								handleSelectPartner(partner);
							}}
							className='p-2 px-4 bg-teal-100 rounded text-teal-500 mt-1 border border-teal-500 flex items-center gap-2'>
							<MdOutlineDomainAdd size={20} />
							Jadikan Partner
						</button>
					)}
					{partner.relation === "partner" && (
						<button className='p-2 px-4 bg-blue-100 rounded text-blue-500 mt-1 border border-blue-500 flex items-center gap-2'>
							<FaUserCheck size={20} />
							Partner Anda
						</button>
					)}
					{partner.relation === "already added" && (
						<button className='p-2 px-4 bg-yellow-100 rounded text-yellow-500 mt-1 border border-yellow-500 flex items-center gap-2'>
							<CiClock2 size={20} />
							Sedang Menunggu Permintaan
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export const PartnerWaitingCard = ({ partner }) => {
	const imageDataUrl = `data:image/png;base64,${partner?.ProfileImagePartner}`;

	return (
		<div
			style={{
				width: 340,
			}}
			className=' h-80 bg-white rounded shadow-lg overflow-hidden'>
			<div
				className='w-full flex flex-col'
				style={{
					height: 150,
				}}>
				<div className='w-full h-full relative'>
					<div className='w-full h-full bg-neutral-200'>
						<Image
							src={pastigroup}
							width={3864}
							height={1152}
							alt='pastigroup'
							className=' w-full object-contain h-full opacity-40'
						/>
					</div>
					<Image
						src={company}
						alt='pp'
						width={500}
						height={500}
						className=' size-20 rounded-full object-cover absolute -bottom-10 left-4 bg-white'
					/>
				</div>
			</div>
			<div className='mt-10 flex flex-col justify-between flex-1'>
				<div className='p-2'>
					<p className='font-semibold'>{partner.RequesterName}</p>
					<p className='text-sm text-neutral-400'>{partner.Status}</p>
				</div>
				<div className='flex gap-2 mt-6 px-2 items-center'>
					<button className="text-sm text-red-500 bg-red-50 border border-red-500 p-2 px-4 rounded">Reject</button>
					<button className="text-sm text-green-500 bg-green-50 border border-green-500 p-2 px-4 rounded">Accept</button>
				</div>
			</div>
		</div>
	);
};

export const PartnerRequestCard = ({ partner }) => {
	const imageDataUrl = `data:image/png;base64,${partner?.ProfileImagePartner}`;

	return (
		<div className=' w-full h-28 flex bg-white-500 rounded-sm relative border items-center px-4 overflow-hidden'>
			<div className=' size-16 rounded-full overflow-hidden'>
				{partner.ProfileImagePartner ? (
					<Image
						src={imageDataUrl}
						alt='pp'
						width={500}
						height={500}
						className='w-full h-full object-cover'
					/>
				) : (
					<Image
						src={company}
						alt='pp'
						width={500}
						height={500}
						className=' w-full h-full object-cover'
					/>
				)}
			</div>
			<div
				style={{
					width: 600,
				}}
				className='p-2 h-full py-6'>
				<p className='font-semibold'>{partner.PartnerName}</p>
				<p className='text-xs'>
					<span className='font-semibold'>Messages :</span> {partner.Message}
				</p>
			</div>

			<div className='absolute top-2 right-2 rounded size-10 bg-yellow-100 text-yellow-500 border border-yellow-500 flex justify-center items-center'>
				<CiClock2 size={20} />
			</div>
		</div>
	);
};
