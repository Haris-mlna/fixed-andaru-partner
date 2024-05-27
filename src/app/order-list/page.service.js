import { getList } from "../../utils/controller/get";

export const getListorder = async id => {
	const body = {
		modelName: "ordercart",
		sortList: ["insertStamp desc"],
		criteriaList: [
			{
				propertyName: "customerId",
				operator: "=",
				value: id,
			},
			{
				propertyName: "Status",
				operator: "!=",
				value: "Pending",
			},
		],
	};

	const res = await getList(body, "/getlist");

	return res;
};

export const orderListDetail = async id => {
	const body = {
		modelName: "ordercartitems",
		criteriaList: [
			{
				propertyName: "orderCartId",
				operator: "=",
				value: id,
			},
		],
	};

	try {
		const res = await getList(body, "/getlist");

		return res;
	} catch (err) {
		console.log(err);
	}
};
