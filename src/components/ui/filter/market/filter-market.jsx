"use client";
import { IoSearch } from "react-icons/io5";

const FilterMarket = () => {
	return (
		<>
			<div className='w-full flex justify-center items-center sticky px-4 py-4 top-0 z-50'>
				<div className='w-full flex rounded-full h-10 shadow overflow-hidden p-2 bg-white	'>
					<div className='w-14 flex justify-center items-center'>
						<IoSearch size={24} className='text-slate-400' />
					</div>
					<input
						type='text'
						className='w-full h-full outline-none font-outfit'
						placeholder='Cari produk...	'
					/>
				</div>
			</div>
			<div className='flex gap-2 px-4 pb-2'>
				<button className='shadow py-1 px-4 rounded-full hover:bg-blue-400 transition-all duration-150 hover:text-white text-sm text-slate-700'>Produk</button>
				<button className='shadow py-1 px-4 rounded-full hover:bg-blue-400 transition-all duration-150 hover:text-white text-sm text-slate-700'>Manufaktur</button>
				<button className='shadow py-1 px-4 rounded-full hover:bg-blue-400 transition-all duration-150 hover:text-white text-sm text-slate-700'>Tipe</button>
				<button className='shadow py-1 px-4 rounded-full hover:bg-blue-400 transition-all duration-150 hover:text-white text-sm text-slate-700'>Spesifikasi</button>
				<button className='shadow py-1 px-4 rounded-full hover:bg-blue-400 transition-all duration-150 hover:text-white text-sm text-slate-700'>Ukuran</button>
			</div>
		</>
	);
};

export default FilterMarket;
