"use client";

import * as React from "react";
import Sidebar from "../../components/layout/sidebar/sidebar";
import SidebarNotification from "../../components/layout/sidebar/sidebar-notification";
import Image from "next/image";
import { useUser } from "../../context/user/user-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraAlt, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { getFeeds } from "./page.service";
import { useFeed } from "../../context/feed/feed-context";
import Feed from "../../components/ui/feeds/feeds";
import SkeletonFeeds from "../../components/skeleton/feeds/feeds";
import ButtonMessage from "../../components/ui/button/button-message";

const Home = () => {
	const { companyData, user } = useUser();
	const { feed, setFeed } = useFeed();
	const [page, setPages] = React.useState(1);
	const [loading, setLoading] = React.useState(false);

	const imageDataUrl = `data:image/png;base64,${companyData?.ProfileImagePartner}`;

	React.useEffect(() => {
		if (user && feed.length === 0) {
			const fetchdata = async () => {
				try {
					setLoading(true);
					const res = await getFeeds(user, page);

					if (res && res?.data) {
						// console.log(res?.data);
						setFeed(res?.data);
					}
				} catch (error) {
					console.log(error);
				} finally {
					setLoading(false);
				}
			};

			fetchdata();
		}
	}, [user]);

	

	return (
		<div className='flex max-h-screen'>
			<ButtonMessage />
			<Sidebar />

			<div className='w-full flex'>
				<div className='flex flex-1 flex-col'>
					<section className='w-full min-h-40 gap-1 bg-white flex flex-col justify-center px-4 py-8 shadow-lg'>
						<div className='flex gap-8 w-full'>
							<button className='w-full outline-none bg-slate-200 rounded flex p-2 text-sm text-slate-600'>
								Kirim pesan anda...
							</button>
							<Image
								src={imageDataUrl}
								width={200}
								height={200}
								alt='user'
								className='w-20 h-20 object-cover rounded-full'
							/>
						</div>
						<div className='w-full flex justify-between pr-28'>
							<button className='w-32 outline-none h-8 flex text-sm items-center gap-2 px-2 text-slate-800 transition-all duration-300 bg-slate-100 rounded'>
								Unggah Foto
								<FontAwesomeIcon
									icon={faCameraAlt}
									className='text-green-400'
								/>
							</button>
							<button className='w-24 h-8 bg-blue-500 rounded text-white text-sm flex justify-center items-center gap-2'>
								Kirim
								<FontAwesomeIcon icon={faPaperPlane} />
							</button>
						</div>
					</section>

					<section className=' overflow-x-hidden overflow-y-auto w-full flex flex-col gap-2 py-2'>
						{loading ? (
							<SkeletonFeeds />
						) : (
							feed.length > 0 && (
								<>
									{feed.map(item => (
										<Feed item={item} key={item.Id} />
									))}
								</>
							)
						)}
					</section>
				</div>
				<SidebarNotification />
			</div>
		</div>
	);
};

export default Home;
