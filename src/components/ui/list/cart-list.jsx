import moment from "moment";

export const CartList = (props, key) => {
	const { data, deleteMode, handleSelectItem } = props;

	return (
		<li
			className='w-full p-2 shadow-sm relative border border-slate-200 rounded'
			key={key}>
			<div className='w-full flex gap-2 relative'>
				<div className='size-16 bg-slate-300 rounded'></div>
				<div className='w-fit flex'>
					<div className=' min-w-40'>
						<p className='text-sm m-0 p-0 font-bold'>
							{data.ProductName}{" "}
							<span className='text-indigo-500'>({data.ManufactureName})</span>
						</p>
						<p className='text-xs m-0 p-0'>
							{data.TypeName}, {data.SpecName}
						</p>
						<p className='text-xs m-0 p-0'>{data.SizeName}&quot;</p>
					</div>
					<div className=''>
						<p className='text-sm font-light'>
							{moment(data.InsertStamp).fromNow()}
						</p>
					</div>
				</div>
			</div>
			<div className='absolute min-w-20 pl-1 py-1 top-2 right-2 text-xs bg-blue-500 text-white flex justify-center items-center rounded-full'>
				{data.QuantityUom1} {data.Uom1Label}
			</div>
			{deleteMode ? <input type='checkbox' onChange={() => {
				handleSelectItem(data)
			}} className=" absolute bottom-2 right-2" name='' id='' /> : null}
		</li>
	);
};
