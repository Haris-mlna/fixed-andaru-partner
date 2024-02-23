import Image from "next/image";
import moment from "moment";

const Feed = props => {
	const { item } = props;

	const imageDataUrl = `data:image/png;base64,${item?.PublisherImage}`;
	const imageContentUrl = `data:image/png;base64,${item?.ImgContent}`;

	return (
		<div className='w-full bg-white'>
			<div className='w-full flex gap-2 py-4 px-2'>
				<Image
					src={imageDataUrl}
					width={100}
					height={100}
					className='w-14 h-14 h object-cover rounded-full'
					alt={item.Id}
				/>
				<div className='flex flex-col'>
					<p>{item.PublisherName}</p>
					<p className='text-sm text-slate-400 font-light'>
						{moment(item?.PublishedDate).fromNow()}
					</p>
				</div>
			</div>
			<div className='w-full max-h-20 p-2 overflow-hidden'>
				<p className='text-ellipsis overflow-hidden'>{item?.Caption}</p>
			</div>
			{item.ImgContent && (
				<div className='p-2'>
					<Image
						src={imageContentUrl}
						width={1440}
						height={900}
						className='w-full h-auto rounded'
						alt={item.Id}
					/>
				</div>
			)}
		</div>
	);
};

export default Feed;
