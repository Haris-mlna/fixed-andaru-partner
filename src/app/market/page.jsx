"use client";

import * as React from "react";
import Image from "next/image";
import Sidebar from "../../components/layout/sidebar/sidebar";
import ButtonMessage from "../../components/ui/button/button-message";
import FilterMarket from "../../components/ui/filter/market/filter-market";
import { useProduct } from "../../context/product/product-context";
import { motion } from "framer-motion";
import blob from "../../assets/background/blob-scene.svg";
import { Pagination } from "@mui/material";
import { getListProduct } from "./page.service";
import { useUser } from "../../context/user/user-context";
import { useRouter } from "next/navigation";
import { useSidebar } from "../../context/sidebar/sidebar-context";
import SkeletonProduct from "../../components/skeleton/product/product-skeleton";

const Market = () => {
	const router = useRouter();
	const { product, setProduct, setProductDetail } = useProduct();
	const { open } = useSidebar();
	const { user } = useUser();
	const [pages, setPages] = React.useState(1);
	const [totalpages, setTotalPages] = React.useState(1);
	const [loading, setLoading] = React.useState(false);

	const [filter, setFilter] = React.useState({
		Category: {
			PropertyName: "manufactureName",
			Operator: "In",
			Value: "",
		},
		Name: {
			PropertyName: "ProductFullName",
			Operator: "like",
			Value: "",
		},
		Type: {
			PropertyName: "TypeName",
			Operator: "In",
			Value: "",
		},
		Spec: {
			PropertyName: "SpecificationName",
			Operator: "In",
			Value: "",
		},
		Size: {
			PropertyName: "Size",
			Operator: "In",
			Value: "",
		},
	});

	const fetchProduct = async filter => {
		try {
			let criteriaOrders = [];
			for (var key in filter) {
				criteriaOrders.push(filter[key]);

				var newFilter = criteriaOrders.filter(function (el) {
					return (
						el.Value != "" &&
						el.Value != null &&
						el.Value != "%%" &&
						el.Value != "('')"
					);
				});
				criteriaOrders = newFilter;
			}

			setLoading(true);
			const res = await getListProduct(pages, criteriaOrders);

			if (res) {
				setProduct(res.data);
				setTotalPages(Math.ceil(res.totalRows / 15));
			}
		} catch (error) {
			console.log("error");
		} finally {
			setLoading(false);
		}
	};

	React.useEffect(() => {
		if (user) {
			fetchProduct(filter);
		}
	}, [user, pages, filter]);

	const handleSelect = item => {
		setProductDetail(item);
		router.push("/market/product");
	};

	const handlePageChange = (event, value) => {
		setPages(value);
	};

	const handleFindProduct = e => {
		const { value } = e.target;

		setTimeout(() => {
			setFilter(prevFilter => ({
				...prevFilter,
				Name: {
					...prevFilter.Name,
					Value: "%" + value + "%",
				},
			}));
		}, 1000);
	};

	const handleChangeFilter = (filterKey, label) => {
		setFilter(prevFilter => ({
			...prevFilter,
			[filterKey]: {
				...prevFilter[filterKey],
				Value: `('${label}')`,
			},
		}));
	};

	return (
		<div className='flex w-full h-screen overflow-hidden'>
			<ButtonMessage />
			<Sidebar />
			<div className='flex w-full h-full flex-col overflow-y-auto'>
				<div className='w-full h-20 bg-white flex items-center justify-end px-4 flex-shrink-0 shadow z-20'>
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
				<div className='w-full flex flex-col bg-white'>
					<header className='w-full h-96 flex flex-col flex-shrink-0 shadow z-10 relative justify-center items-center bg-gradient-to-br from-sky-50 to-indigo-50'>
						<Image
							src={blob}
							width={4000}
							height={2000}
							alt='bg-katalog'
							className='object-cover w-full h-full absolute opacity-40'
							priority
						/>
						<div className=' p-4 z-10 mb-4 bg-white rounded shadow'>
							<motion.h1 className='text-2xl text font-bold tracking-wide bg-gradient-to-br from-sky-500 to-black text-transparent bg-clip-text'>
								MANFAATKAN KESEMPATAN BELANJA DI BISNIS PARTNER!
								<br />
							</motion.h1>
							<span className='text-5xl font-black text-neutral-700 '>
								DAPATKAN <span className=''>PROMONYA !!!!</span>
							</span>
						</div>
						<h1 className='text-center text-black font-black text-3xl z-10'>
							#BERSAMA<span className='text-red-500'>PASTI</span>
							<br />#<span className='text-red-500'>PASTI</span>SUKSES!
						</h1>
					</header>
					<FilterMarket
						handleFindProduct={handleFindProduct}
						onChangeFilter={handleChangeFilter}
					/>
					<section className='w-full bg-white min-h-screen flex flex-col py-4 px-2 overflow-x-hidden'>
						<Pagination
							shape='rounded'
							count={totalpages}
							onChange={handlePageChange}
							size='small'
						/>
						{loading ? (
							<SkeletonProduct />
						) : (
							<div className='flex flex-wrap gap-2 mt-2'>
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
										className=' w-48 min-h-80 flex flex-col rounded'>
										<div className='w-full h-64 bg-slate-300 rounded '></div>
										<div>
											<p className='font-bold text-sm text-justify'>
												{item.Label}
											</p>
											<p className='text-sm text-left font-medium'>
												{item.ManufactureName}
											</p>
											<p className='text-left text-xs'>
												{item.TypeName}, {item.SpecificationName}, {item.Size}
												&quot;
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
