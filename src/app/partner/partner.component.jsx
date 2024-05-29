import * as React from "react";
import { useUser } from "../../context/user/user-context";
import { loadAllPartner, loadPartner } from "./page.service";
import Swal from "sweetalert2";
import {
	PartnerCard,
	PartnerListCard,
} from "../../components/ui/card/card.partner";

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

	const [pages, setPages] = React.useState(1);
	const [pagesAll, setPagesAll] = React.useState(1);

	const fetchData = async (id, page) => {
		try {
			const res = await loadPartner(id, page);

			console.log(res);

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

	const fetchAllPartner = async (filter, page) => {
		let criteriaOrders = [];
		for (var key in filter) {
			criteriaOrders.push(filter[key]);

			var newFilter = criteriaOrders.filter(function (el) {
				return el.Value != "" && el.Value != null && el.Value != "%%";
			});
			criteriaOrders = newFilter;
		}

		try {
			const res = await loadAllPartner(page, criteriaOrders);

			if (res) {
				setAllpartner(res.data);
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
			fetchAllPartner(filter, pagesAll);
		}
	}, [filter, user]);

	React.useEffect(() => {
		if (user) {
			fetchData(user?.OrganizationId, pages);
		}
	}, [user, pages]);

	return (
		<div className='w-full'>
			<div className='w-full border-b-2 py-3'>
				<p className='font-semibold text-teal-500'>PARTNER ANDA</p>
			</div>
			<div className='w-full flex flex-wrap gap-2 mt-4'>
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
			<div className='w-full flex flex-wrap gap-2 mt-4'>
				{allpartner.length > 0
					? allpartner.map(item => {
							return (
								<div key={item.Id}>
									<PartnerListCard partner={item} />
								</div>
							);
					  })
					: null}
			</div>
		</div>
	);
};

export default PartnerComponents;
