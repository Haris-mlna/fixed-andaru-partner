import * as React from "react";
import { useUser } from "../../context/user/user-context";
import {
	alreadyPartner,
	incomingRequest,
	loadAllPartner,
	loadPartner,
	pendingRequest,
} from "./page.service";
import Swal from "sweetalert2";
import {
	PartnerCard,
	PartnerListCard,
} from "../../components/ui/card/card.partner";
import { ModalAddPartner } from "../../components/ui/modal/modal-addpartner";

const PartnerComponents = () => {
	const { user } = useUser();

	const [listpatner, setListpartner] = React.useState([]);
	const [allpartner, setAllpartner] = React.useState([]);
	const [searchUser, setSearchUser] = React.useState("");
	const [filter, setFilter] = React.useState({
		Self: {
			PropertyName: "Id",
			Operator: "!=",
			Value: user?.OrganizationId || "",
		},
		User: {
			PropertyName: "Name",
			Operator: "like",
			Value: "%" + searchUser + "%",
		},
	});

	const [selectedPartner, setSelectedPartner] = React.useState(null);
	const [open, setOpen] = React.useState(false);

	const [pages, setPages] = React.useState(1);
	const [pagesAll, setPagesAll] = React.useState(1);

	const fetchData = async (id, page) => {
		try {
			const res = await loadPartner(id, page);

			if (res) {
				setListpartner(res.data);
			}
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Error!",
				text: error.message,
			});
		}
	};

	const fetchAllPartner = async (filter, page, id) => {
		try {
			const res = await loadAllPartner(page);

			const friendRes = await alreadyPartner(id);
			const requestRes = await incomingRequest(id);
			const waitingRes = await pendingRequest(id);

			const friendIds = friendRes.data.map(friend => friend.PeerPartnerId);
			const requestIds = requestRes.data.map(req => req.PartnerId);
			const waitingIds = waitingRes.data.map(wait => wait.RequesterId);

			const updatedList = res.data.map(item => {
				let relation = "not partner";

				if (friendIds.includes(item.Id)) {
					relation = "partner";
				} else if (requestIds.includes(item.Id)) {
					relation = "already added";
				} else if (waitingIds.includes(item.Id)) {
					relation = "requested";
				} else if (item.Id === user.OrganizationId) {
					relation = "self";
				}

				return { ...item, relation };
			});

			if (updatedList) {
				setAllpartner(updatedList);
			}
		} catch (error) {
			Swal.fire({
				title: "Error!",
				icon: "error",
				text: error.message,
			});
		}
	};

	React.useEffect(() => {
		if (user) {
			fetchAllPartner(filter, pagesAll, user?.OrganizationId);
		}
	}, [filter, user]);

	React.useEffect(() => {
		if (user) {
			fetchData(user?.OrganizationId, pages);
		}
	}, [user, pages]);

	const handleSelectPartner = partner => {
		setSelectedPartner(partner);
		setOpen(true);
	};

	return (
		<div className='w-full'>
			<div className='w-full border-b-2 py-3'>
				<p className='font-semibold text-blue-500'>PARTNER ANDA</p>
			</div>
			<div className='w-full flex flex-col gap-2 mt-4'>
				{listpatner.length > 0
					? listpatner.map(item => {
							return (
								<div key={item.PeerPartnerId}>
									<PartnerCard partner={item} />
								</div>
							);
					  })
					: null}
			</div>
			<div className='w-full border-b-2 py-3'>
				<p className='font-semibold text-teal-500'>CARI PARTNER ANDA</p>
			</div>
			<div className=' py-4 w-full'>
				<div className='w-full h-10 p-2 flex border rounded-full'>
					<input
						type='text'
						className='flex-1 p-2 outline-none text-sm'
						placeholder='Cari patner anda...'
						onChange={(e) => {
							setSearchUser(e.target.value)
						}}
					/>
				</div>
			</div>
			<div className='w-full flex flex-wrap gap-2 mt-4'>
				{allpartner.length > 0
					? allpartner.map(item => {
							return (
								<div key={item.Id}>
									<PartnerListCard
										partner={item}
										handleSelectPartner={handleSelectPartner}
									/>
								</div>
							);
					  })
					: null}
			</div>
			{open && (
				<ModalAddPartner
					open={open}
					setOpen={setOpen}
					partner={selectedPartner}
				/>
			)}
		</div>
	);
};

export default PartnerComponents;
