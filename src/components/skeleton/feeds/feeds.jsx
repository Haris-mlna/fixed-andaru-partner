import { Skeleton } from "@mui/material";

const SkeletonFeeds = () => {
	const arr = [1, 2, 3, 4, 5];

	return (
		<>
			{arr.map(item => (
				<div key={item} className='p-2 w-full bg-white h-80 flex flex-col gap-2'>
					<div className='flex gap-2'>
						<Skeleton variant='circular' width={64} height={64} />
						<div className='flex flex-col'>
							<Skeleton
								variant='rounded'
								className=' mt-2'
								width={100}
								height={10}
							/>
							<Skeleton
								variant='rounded'
								className=' mt-2'
								width={150}
								height={10}
							/>
							<Skeleton
								variant='rounded'
								className=' mt-2'
								width={200}
								height={10}
							/>
						</div>
					</div>
					<div className='flex flex-col gap-1'>
						<Skeleton variant='rounded' width={"100%"} height={10} />
						<Skeleton variant='rounded' width={"80%"} height={10} />
					</div>
					<div>
						<Skeleton variant='rounded' width={"100%"} height={200} />
					</div>
				</div>
			))}
		</>
	);
};

export default SkeletonFeeds;
