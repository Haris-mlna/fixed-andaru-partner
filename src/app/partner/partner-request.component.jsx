import * as React from "react";
import { confirmationAwait, loadPartnerRequest } from "./page.service";
import { useUser } from "../../context/user/user-context";
import {
	PartnerCard,
	PartnerRequestCard,
	PartnerWaitingCard,
} from "../../components/ui/card/card.partner";

const PartnerRequest = () => {
	const { user } = useUser();

	const [waitingList, setWaitingList] = React.useState([]);
	const [request, setRequest] = React.useState([]);
	const [loading, setLoading] = React.useState(false);

	const fetchWaitingList = async id => {
		try {
			setLoading(true);
			const res = await loadPartnerRequest(id);

			if (res) {
				console.log(res.data);
				setWaitingList(res.data);
			}
		} catch (error) {
			console.log(res);
		} finally {
			setLoading(false);
		}
	};

	const fetchRequest = async id => {
		try {
			setLoading(true);
			const res = await confirmationAwait(id);

			if (res) {
				setRequest(res.data);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	React.useEffect(() => {
		if (user) {
			fetchWaitingList(user?.OrganizationId);
			fetchRequest(user?.OrganizationId);
		}
	}, [user]);

	return (
		<div className='w-full'>
			<div className='w-full border-b-2 py-3'>
				<p className='font-semibold text-blue-500'>Permintaan Partnership</p>
			</div>
			<div className='w-full min-h-96'>
				{waitingList.length > 0 ? (
					<div className="w-full flex flex-col gap-2 mt-4">
						{waitingList.map((item, index) => (
							<div key={index}>
								<PartnerWaitingCard partner={item} />
							</div>
						))}
					</div>
				) : (
					<p className='w-full h-96 flex justify-center items-center text-sm text-neutral-400'>
						Anda tidak memiliki permintaan Partnership saat ini
					</p>
				)}
			</div>
			<div className='w-full border-b-2 py-3'>
				<p className='font-semibold text-yellow-500'>
					Menunggu Permintaan Partnership
				</p>
			</div>
			<div className='w-full min-h-96'>
				{request.length > 0 ? (
					<div>
						{request.map((item, index) => (
							<div key={index}>
								<PartnerRequestCard partner={item} />
							</div>
						))}
					</div>
				) : (
					<p className='w-full h-96 flex justify-center items-center text-sm text-neutral-400'>
						Anda tidak memiliki permintaan Partnership saat ini
					</p>
				)}
			</div>
		</div>
	);
};

export default PartnerRequest;
