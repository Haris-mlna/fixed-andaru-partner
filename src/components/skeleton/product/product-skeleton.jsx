import { Skeleton } from "@mui/material";

const SkeletonProduct = () => {
	const skeletonArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

	return (
		<div
			className={`
              grid py-4 gap-2 grid-cols-2 sm:grid-cols-2 ${
								open ? "md:grid-cols-2" : " md:grid-cols-3"
							} ${open ? "lg:grid-cols-4" : "lg:grid-cols-5"} ${
				open ? "2xl:grid-cols-6" : "2xl:grid-cols-7"
			}
                 gap-y-4
              `}>
			{skeletonArr.map(item => (
				<div className='w-48 min-h-80 flex flex-col rounded gap-1' key={item}>
					<Skeleton variant='rounded' width={192} height={256} />
					<Skeleton variant='rounded' width={'30%'} height={10} />
					<Skeleton variant='rounded' width={'50%'} height={12} />
					<Skeleton variant='rounded' width={'60%'} height={10} />
				</div>
			))}
		</div>
	);
};

export default SkeletonProduct;
