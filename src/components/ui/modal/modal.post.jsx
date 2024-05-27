import * as React from "react";
import { ContainerModal } from "../../container/container";
import { motion } from "framer-motion";
import { useUser } from "../../../context/user/user-context";
import styles from "./modal.post.module.css";
import Image from "next/image";
import { BiWorld } from "react-icons/bi";
import imageCompression from "browser-image-compression";
import moment from "moment";
import { postfeed } from "./modal.post.service";
import Swal from "sweetalert2";

export const ModalPost = ({ open, setOpen, setUpdate, update }) => {
	const { companyData, user } = useUser();
	const initialForm = {
		image: "",
		caption: "",
	};

	const [form, setForm] = React.useState(initialForm);
	const imageDataUrl = `data:image/png;base64,${companyData?.ProfileImagePartner}`;

	const imageData = base64 => {
		if (base64) {
			return `data:image/png;base64,${base64}`;
		}

		return "";
	};

	const handleFileChange = async event => {
		const file = event.target.files[0];
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
					const base64String = reader.result.split(",")[1];
					setForm(prev => ({ ...prev, image: base64String }));
				};
				reader.readAsDataURL(compressedFile); // Read compressed file
			} catch (error) {
				console.log(error);
			}
		}
	};

	const handleClose = () => {
		setOpen(false);
		setForm(initialForm);
	};

	const handleSubmit = async () => {
		const body = {
			organizationId: user?.OrganizationId,
			groupId: null,
			triggerId: "TI03",
			feedTypeId: form.image ? "IF02" : "IF01",
			publishedDate: moment(new Date()).format("YYYY-MM-DD"),
			caption: form.caption,
			imgContent: form.image,
		};

		try {
			const res = await postfeed(body);

			if (res) {
				Swal.fire({
					icon: "success",
					text: "post berhasil di publish",
					timer: 1500,
					timerProgressBar: true,
					showCancelButton: false,
					showConfirmButton: false,
				});

				handleClose();
				setUpdate(!update);
			}
		} catch (error) {}

		console.log(body);
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
						height: 600,
						width: 800,
					}}
					className='bg-white rounded flex flex-col'>
					<div className='w-full h-10 bg-gradient-to-br from-blue-700 to-blue-500 flex justify-center items-center text-white'>
						POST
					</div>
					<div className='flex-1 flex flex-col justify-between p-4'>
						<div className='w-full flex flex-col flex-1'>
							<div>
								<div className='flex gap-4 items-center'>
									<div className='size-20 rounded-full overflow-hidden'>
										<Image
											src={imageDataUrl}
											alt='pp'
											width={250}
											height={250}
											className='w-full h-full object-cover'
										/>
									</div>
									<div className='flex flex-col justify-start items-start'>
										<div>
											<p className='font-semibold'>
												{companyData.CompanyTitleLabel} {companyData.Name}
											</p>
										</div>
										<div className='px-4 rounded-full bg-neutral-100 text-sm p-px text-neutral-400 border border-neutral-400 flex gap-1 items-center'>
											<BiWorld />
											<p>Public</p>
										</div>
									</div>
								</div>
								<div className='mt-2 flex-1'>
									<textarea
										name='caption'
										id='caption'
										cols='30'
										rows='4'
										className='resize-none w-full bg-neutral-100 rounded text-sm p-2'
										placeholder='Kirim pesan anda...'
										onChange={e => {
											const { value } = e.target;
											setForm(prev => ({ ...prev, caption: value }));
										}}></textarea>
								</div>
							</div>
							<button
								className={`flex-1 mt-2 bg-neutral-100 rounded-lg overflow-hidden flex justify-center items-center relative
							`}>
								<Image
									src={imageData(form.image)}
									alt='post'
									width={1600}
									height={900}
									className='w-full h-full absolute top-0 left-0 opacity-50 object-cover'
								/>
								<label
									className={`${styles.custum_file_upload} absolute top-0 left-0 z-20 w-full  h-full hover:bg-white bg-white/20 transition-all ease-in-out duration-150`}
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
							</button>
						</div>
						<div className='w-full flex justify-end mt-4'>
							<div className='flex items-center gap-2'>
								<button
									onClick={handleClose}
									className='w-32 h-12 border flex justify-center items-center hover:scale-95 active:scale-100 transition-all duration-150'>
									Cancel
								</button>
								<button
									onClick={handleSubmit}
									className={`${styles.button} w-32 h-12 flex justify-center items-center rounded-sm`}>
									<div className={styles.svg_wrapper_1}>
										<div className={styles.svg_wrapper}>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 24 24'
												width='24'
												height='24'>
												<path fill='none' d='M0 0h24v24H0z'></path>
												<path
													fill='currentColor'
													d='M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z'></path>
											</svg>
										</div>
									</div>
									<span>Send</span>
								</button>
							</div>
						</div>
					</div>
				</motion.div>
			)}
		</ContainerModal>
	);
};
