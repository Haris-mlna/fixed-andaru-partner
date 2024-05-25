import * as React from "react";
import { loadAddress } from "../cart/page.service";
import { useUser } from "../../context/user/user-context";
import moment from "moment";

export const Settingsaddress = () => {
	const { user } = useUser();

	const [listaddress, setListaddress] = React.useState([]);
	const [form, setForm] = React.useState({});

	const fetchData = async id => {
		try {
			const res = await loadAddress(id);

			if (res) {
				console.log(res);
				setListaddress(res.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	React.useEffect(() => {
		if (user) {
			fetchData(user.OrganizationId);
		}
	}, []);

	return (
		<div className='p-4 w-full'>
			<div className="mb-4">
				<button className=' bg-gradient-to-br from-indigo-500 to-blue-400 text-white p-1 px-4 rounded'>
					Add address +{" "}
				</button>
			</div>
			<div className='w-full flex flex-col gap-2'>
				{listaddress.length > 0 &&
					listaddress.map((item, index) => (
						<div
							className='w-full min-h-36 bg-neutral-100 rounded p-2'
							key={index}>
							<div className='flex justify-between w-full items-center'>
								<p className='font-bold text-2xl uppercase'>
									{item.AddressLabel}
								</p>
								<p className='text-sm text-neutral-400'>
									{moment(item.InsertStamp).format("ll")}
								</p>
							</div>
							<div>
								<p className='font-semibold'>Contact</p>
								<p className='text-sm'>phone : {item.ContactNumber}</p>
							</div>
							<div>
								<p className='font-semibold'>Address</p>
								<p className='text-sm'>address : {item.Address}</p>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};
