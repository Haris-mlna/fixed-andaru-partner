"use client";

import * as React from "react";
import Image from "next/image";
import Sidebar from "@/components/layout/sidebar/sidebar";
import ButtonMessage from "@/components/ui/button/button-message";
import FilterMarket from "@/components/ui/filter/market/filter-market";
import { useProduct } from "@/context/product/product-context";
import { motion } from "framer-motion";
import blob from "@/assets/background/blob-scene.svg";
import { Pagination } from "@mui/material";
import { getListProduct } from "./page.service";
import { useUser } from "@/context/user/user-context";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/context/sidebar/sidebar-context";

const Market = () => {
	const router = useRouter();
	const { product, setProduct, setProductDetail } = useProduct();
	const { open } = useSidebar();
	const { user } = useUser();
	const [pages, setPages] = React.useState(1);
	const [loading, setLoading] = React.useState(false);

	const fetchProduct = async () => {
		try {
			setLoading(true);
			const res = await getListProduct(pages);

			if (res) {
				console.log(res);
				await setProduct(res.data);
			}
		} catch (error) {
			console.log("error");
		} finally {
			setLoading(false);
		}
	};

	React.useEffect(() => {
		if (user) {
			fetchProduct();
		}
	}, [user]);

	const handleSelect = item => {
		setProductDetail(item);
		router.push("/market/product");
	};

	return (
		<div className='flex w-full h-screen overflow-hidden'>
			<ButtonMessage />
			<Sidebar />
			<div className='flex w-full h-full flex-col gap-1 overflow-y-auto'>
				<div className='w-full h-20 bg-white flex items-center justify-end px-4 flex-shrink-0'>
					<motion.h1
						initial={{
							opacity: 0,
							translateX: "-100%",
						}}
						animate={{
							opacity: 1,
							translateX: 0,
						}}
						className='font-light text-4xl text-slate-600'>
						KATALOG PRODUK
					</motion.h1>
				</div>
				<div className='w-full flex flex-col gap-1 bg-white'>
					<header className='w-full h-96 flex flex-shrink-0 relative justify-center items-center bg-gradient-to-br from-sky-50 to-indigo-50'>
						<Image
							src={blob}
							width={4000}
							height={2000}
							alt='bg-katalog'
							className='object-cover w-full h-full absolute opacity-40'
							priority
						/>
						<h1 className='text-center text-black font-black text-4xl z-10'>
							#BERSAMA<span className='text-red-500'>PASTI</span>
							<br />#<span className='text-red-500'>PASTI</span>SUKSES!
						</h1>
					</header>
					<section className='w-full bg-white min-h-screen flex flex-col items-center py-4'>
						<Pagination shape='rounded' count={10} size='small' />
						{loading ? (
							"loading"
						) : (
							<div
								className={`
              grid py-4 gap-2 grid-cols-2 sm:grid-cols-2 ${
								open ? "md:grid-cols-2" : " md:grid-cols-3"
							} ${open ? "lg:grid-cols-4" : "lg:grid-cols-5"} ${
									open ? "2xl:grid-cols-5" : "2xl:grid-cols-6"
								}
                 gap-y-4
              `}>
								{product.map((item, index) => (
									<motion.button
										key={index}
										whileHover={{
											translateY: -4,
											boxShadow: "0 0 4px 1px rgba(0,0,0,.1)",
										}}
										onClick={() => {
											handleSelect(item);
										}}
										className='w-52 min-h-80 flex flex-col p-2 rounded'>
										<div className='w-full h-64 bg-slate-300 rounded '></div>
										<div>
											<p className='font-bold text-sm text-justify'>
												{item.Label}
											</p>
											<p className='text-sm text-left font-medium'>
												{item.ManufactureName}
											</p>
											<p className='text-left text-xs'>
												{item.TypeName}, {item.SpecificationName}, {item.Size}"
											</p>
										</div>
										{/* <div className='w-full flex'>
											<div className='bg-blue-500 p-1 px-8 mt-1 text-sm text-white rounded'>
												order
											</div>
										</div> */}
									</motion.button>
								))}
							</div>
						)}
					</section>
				</div>
			</div>
		</div>
	);
};

export default Market;
