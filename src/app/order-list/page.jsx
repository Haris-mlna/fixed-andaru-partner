import Sidebar from "@/components/layout/sidebar/sidebar";
import Image from "next/image";
import { MdOutlineChecklistRtl } from "react-icons/md";
import layeredwave from '@/assets/background/layered-wave-2.svg'

const OrderList = () => {
	return (
		<div className='w-full h-screen flex'>
			<Sidebar />
			<div className='flex flex-col w-full h-full relative'>
				<header className='w-full h-16 flex px-4 items-center shadow bg-white z-10'>
					<h1 className='text-2xl font-bold text-red-500'>
						List Pesanan
					</h1>
				</header>
				<div className={`w-full h-full relative flex gap-2 p-4`}>
					<div className='w-full h-full top-0 left-0 absolute z-0'>
						<Image
							src={layeredwave}
							width={4000}
							height={2000}
							className=' object-cover w-full h-full z-0'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderList;
