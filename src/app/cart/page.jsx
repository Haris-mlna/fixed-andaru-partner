import * as React from "react";
import Sidebar from "@/components/layout/sidebar/sidebar";
import styles from "./page.module.css";
import layeredwave from "@/assets/background/layered-wave.svg";
import Image from "next/image";

const Cart = () => {
	return (
		<div className='w-full h-screen flex'>
			<Sidebar />
			<div className='flex flex-col w-full h-full relative'>
				<header className='w-full h-16 flex px-4 items-center shadow bg-white z-10'>
					<h1 className='text-2xl font-bold text-indigo-500'>
						KERANJANG ANDA{" "}
					</h1>
				</header>
				<div className={`w-full h-full relative flex gap-2 p-4`}>
					<div className='w-full h-full top-0 left-0 absolute z-0'>
						<Image
							src={layeredwave}
							width={4000}
							height={2000}
							className=' object-cover w-full h-full opacity-50 z-0'
						/>
					</div>
					<div className='w-full flex gap-2 relative z-10'>
						<div className='w-1/2 h-full'>
							<div className='w-full bg-white h-40'>CARD</div>
						</div>
						<div className='w-1/2 h-full rounded bg-white bg-opacity-80 '></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
