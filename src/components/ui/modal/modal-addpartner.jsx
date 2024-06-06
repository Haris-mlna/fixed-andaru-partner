import * as React from "react";
import { ContainerModal } from "../../container/container";
import { motion } from "framer-motion";
import Image from "next/image";
import company from "../../../assets/images/buildings.png";
import { requestPartnership } from "./moda-addpartner.service";
import Swal from "sweetalert2";
import { CircularProgress } from "@mui/material";

export const ModalAddPartner = ({ partner, open, setOpen }) => {
	const imageDataUrl = `data:image/png;base64,${partner?.ProfileImagePartner}`;
	const [loading, setLoading] = React.useState(false);
	const [messages, setMessages] = React.useState(
		"Halo, Mari berteman dengan saya"
	);

	const handleSubmit = async () => {
		try {
			setLoading(true);

			const res = await requestPartnership(partner.Id, messages);

			if (res) {
				Swal.fire({
					icon: "success",
					text: "Permintaan partnership sudah dikirimkan",
					timer: 1000,
					timerProgressBar: true,
					showConfirmButton: false,
					showCancelButton: false,
					width: 300,
				});
				setTimeout(() => {
					window.location.reload();
				}, 1000);
			} else {
				Swal.fire({
					icon: "error",
					text: "Terjadi kesalahan saat menambahkan partner",
					timer: 1000,
					timerProgressBar: true,
				});
			}
		} catch (error) {
			Swal.fire({
				icon: "error",
				text: "Terjadi kesalahan saat menambahkan partner",
				timer: 1000,
				timerProgressBar: true,
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<ContainerModal setOpen={setOpen}>
			{open && (
				<motion.div
					initial={{
						translateY: 100,
						opacity: 0,
					}}
					animate={{
						translateY: 0,
						opacity: 1,
					}}
					style={{
						width: 360,
						height: 500,
					}}
					className='rounded flex flex-col'>
					<div className='w-full h-full flex flex-col justify-between rounded bg-white'>
						<div className='w-full h-12 flex justify-center items-center bg-gradient-to-br from-teal-400 to-green-400'>
							<h4 className='text-white'>Request Partnership</h4>
						</div>
						<div className='flex flex-col flex-1 p-4'>
							<div className='flex gap-2'>
								{partner.ProfileImagePartner ? (
									<div className='size-16'>
										<Image
											src={imageDataUrl}
											alt='pp'
											width={500}
											height={500}
											className=' size-16 rounded-full object-cover bg-white'
										/>
									</div>
								) : (
									<div className='size-16'>
										<Image
											src={company}
											alt='pp'
											width={500}
											height={500}
											className=' size-16 rounded-full object-cover bg-white'
										/>
									</div>
								)}
								<div>
									<p className='font-semibold'>{partner.Name}</p>
									<p className='text-xs text-neutral-400'>
										Email :{partner.EmailAddress}
									</p>
									<p className='text-xs text-neutral-400'>
										Phone :{partner.PhoneNumber}
									</p>
								</div>
							</div>
							<div className='w-full flex-1 pt-4'>
								<textarea
									onChange={e => {
										const { value } = e.target;
										setMessages(value);
									}}
									value={
										messages === "Halo, Mari berteman dengan saya"
											? ""
											: messages
									}
									className='w-full h-full border border-neutral-300 resize-none rounded text-sm p-2 font-outfit'
									placeholder='Halo, Mari berteman dengan saya'></textarea>
							</div>
						</div>
						<div className='w-full h-16 flex gap-2 justify-end items-center p-2'>
							<button
								onClick={() => {
									setOpen(false);
								}}
								className='px-4 p-2 text-sm bg-gradient-to-br from-rose-500 to-rose-400 text-white rounded'>
								Batal
							</button>
							<button
								onClick={handleSubmit}
								disabled={loading}
								className='px-4 p-2 text-sm bg-gradient-to-br from-teal-500 to-green-400 text-white rounded'>
								{loading ? (
									<CircularProgress
										sx={{
											color: "white",
										}}
										size={20}
									/>
								) : (
									"+ Tambah Partner"
								)}
							</button>
						</div>
					</div>
				</motion.div>
			)}
		</ContainerModal>
	);
};
