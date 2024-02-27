import Sidebar from "@/components/layout/sidebar/sidebar";
import { MdOutlineChecklistRtl } from "react-icons/md";

const OrderList = () => {
	return (
		<div className='w-full flex'>
			<Sidebar />
			<div className='w-full h-screen'>
				<div className='w-full h-full'>
					<header className='w-full h-16 px-4 flex justify-end items-center bg-white shadow gap-2'>
						<MdOutlineChecklistRtl size={24} />
						<h1 className='text-2xl'>List Pesanan</h1>
					</header>
					<div className="w-full h-screen">

					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderList;
