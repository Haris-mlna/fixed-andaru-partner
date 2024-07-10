import { Client } from "../../utils/api/api";
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
			// {
			// 	propertyName: "Status",
			// 	operator: "!=",
			// 	value: "Pending",
			// },
			// {
			// 	propertyName: "Status",
			// 	operator: "=",
			// 	value: "CheckedOut",
			// },
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

export const CancelOrder = async param => {
	const body = {
		actionController: "OrdersController",
		actionName: "CanclePurchaseOrder",
		actionParam: {
			idList: param,
		},
	};

	try {
		const res = await Client.post("/action", body);
		return res;
	} catch (error) {
		console.log(error);
	}
};
