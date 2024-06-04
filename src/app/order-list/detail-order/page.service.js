import { Client } from "../../../utils/api/api";
import { getList } from "../../../utils/controller/get";

export const canceledQuantity = async param => {
	// Param examples

	// actionParams: ItemList: [
	// 		{
	// 			ItemId:"",
	// 			CanceledQuantity1:"",
	// 			CanceledQuantity2:"",
	// 		},
	// 	]

	const body = {
		actionController: "OrdersController",
		actionName: "CancelCartItems",
		actionParam: {
			ItemList: param,
		},
	};

	try {
		const res = await Client.post("/action", body);

		return res;
	} catch (error) {
		return error;
	}
};

export const fetchDetailOrder = async (id) => {
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
}