"use client";

import * as React from "react";
import { useUser } from "../../../context/user/user-context";
import { IoNotificationsOutline } from "react-icons/io5";
import { loadNotification } from "./sidebar-notifcation.service";
import { CircularProgress, Divider } from "@mui/material";
import Image from "next/image";
import { HiOutlineMailOpen } from "react-icons/hi";
import { AiOutlineClockCircle } from "react-icons/ai";
import moment from "moment";

const SidebarNotification = () => {
	const { user } = useUser();
	const [notification, setNotification] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const [page, setPage] = React.useState(1);
	const [totalPages, setTotalPages] = React.useState(1);

	const fetchNotification = async (id, page) => {
		try {
			setLoading(true);

			const res = await loadNotification(id, page);

			if (res && res.data) {
				setNotification(prevState => [...prevState, ...res.data]);
				setTotalPages(Math.ceil(res.totalPages) / 10);
			}
		} catch (error) {
			console.error(error);
			// Handle error if needed
		} finally {
			setLoading(false);
		}
	};

	React.useEffect(() => {
		if (user && user.OrganizationId) {
			fetchNotification(user.OrganizationId, page);
		}
	}, [user, page]);

	return (
		<div className='flex flex-col w-80 h-screen border-l border-slate-200 shadow-lg bg-white'>
			<div className='p-4 flex-shrink-0 flex items-center gap-2 shadow-sm'>
				<IoNotificationsOutline size={20} />
				<h1>NOTIFIKASI</h1>
			</div>
			<div className='flex-grow py-4 flex flex-col gap-2 overflow-y-scroll'>
				{loading ? (
					<div className='w-full h-full flex gap-2 flex-col items-center justify-center'>
						<CircularProgress size={24} />
						<p className='text-xs text-slate-400'>Loading...</p>
					</div>
				) : (
					<>
						{notification.length > 0 ? (
							<>
								{notification.map(item => {
									const imageDataUrl = `data:image/png;base64,${item?.ProfileImageSender}`;

									return (
										<div key={`${item.Id} ${item.InsertStamp}`}>
											<div className='flex w-full items-center gap-1'>
												<div>
													{item?.ProfileImageSender ? (
														<div className='w-12 h-12 flex justify-center items-center'>
															<Image
																src={imageDataUrl}
																className=' w-5/6 h-5/6 object-cover rounded-full'
																width={50}
																height={50}
															/>
														</div>
													) : (
														<div></div>
													)}
												</div>
												<div className='flex flex-col px-1 py-1 flex-1'>
													<div className='flex items-center justify-between'>
														<div className='flex items-center gap-2'>
															<p className='text-xs text-neutral-400'>From :</p>
															<h2 className='font-bold text-sm'>
																{item.SenderName}
															</h2>
														</div>
														<div>
															<div
																style={{
																	fontSize: 10,
																}}
																className=' text-blue-500 flex items-center'>
																<AiOutlineClockCircle />
																{moment(item.InsertStamp).format("ll")}
															</div>
														</div>
													</div>
													<div>
														<p className='text-xs text-neutral-400'>
															Messages :
														</p>
														<p className='text-xs text-ellipsis line-clamp-1'>
															{item.Message}
														</p>
													</div>
												</div>
											</div>
											<Divider className='py-1' />
										</div>
									);
								})}

								<div className=' px-2'>
									{page !== totalPages ? (
										<button
											className='text-sky-500 text-sm cursor-pointer'
											onClick={() => {
												setPage(prev => prev + 1);
											}}>
											load more...
										</button>
									) : (
										<div className='px-2'>
											<p className='text-sm text-slate-400'>
												You are reaching the end..
											</p>
										</div>
									)}
								</div>
							</>
						) : (
							<div className='w-full h-full flex flex-col justify-center items-center text-slate-400'>
								<HiOutlineMailOpen size={32} />
								<p className='text-sm '>Anda tidak memiliki notifikasi</p>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default SidebarNotification;
