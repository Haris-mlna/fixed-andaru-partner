"use client";

import Sidebar from "@/components/layout/sidebar/sidebar";
import Image from "next/image";
import layeredwave from "@/assets/background/layered-wave-2.svg";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

const OrderList = () => {
	const palette = ["#69faef", "#00d5fd", "#00a9fa", "#facc15", "#ff0066"];
	const data = [
		{ id: 0, value: 50, label: "Done" },
		{ id: 1, value: 10, label: "Active" },
		{ id: 3, value: 20, label: "Checked Out" },
		{ id: 4, value: 10, label: "Pending" },
		{ id: 5, value: 10, label: "Cancelled" },
	];

	return (
		<div className='w-full h-screen flex'>
			<Sidebar />
			<div className='flex flex-col w-full h-full relative'>
				<header className='w-full h-16 flex px-4 items-center shadow bg-white z-10'>
					<h1 className='text-2xl font-bold text-red-500'>List Pesanan</h1>
				</header>
				<section className={`w-full h-full relative flex gap-2 p-4`}>
					<div className='w-1/2 h-full flex flex-col gap-2 z-20'>
						<div className='w-full h-2/4 rounded shadow flex justify-center items-center'>
							<PieChart
								series={[
									{
										data: data,
										arcLabelMinAngle: 45,
										innerRadius: 30,
										outerRadius: 120,
										paddingAngle: 5,
										cornerRadius: 5,
										startAngle: 0,
										endAngle: 360,
									},
								]}
								colors={palette}
								className='w-3/4 h-3/4'
							/>
						</div>
						<div className='w-full h-2/4 rounded shadow bg-white bg-opacity-70'></div>
					</div>
					<div className='w-1/2 h-full z-20 bg-white rounded shadow'></div>
					<div className='w-full h-full top-0 left-0 absolute z-0'>
						<Image
							src={layeredwave}
							width={4000}
							height={2000}
							className=' object-cover w-full h-full z-0'
						/>
					</div>
				</section>
			</div>
		</div>
	);
};

export default OrderList;
