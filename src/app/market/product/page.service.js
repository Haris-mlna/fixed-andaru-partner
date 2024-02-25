import { getList } from "@/utils/controller/get";
import { Client } from "@/utils/api/api";

export const getListProductManufacture = async (page, manufacture) => {
	const body = {
		modelName: "products",
		pageNumber: page,
		sortList: [`Id asc`],
		maximumResult: 5,
		criteriaList: [
			{
				propertyName: "ManufactureName",
				operator: "=",
				value: manufacture,
			},
		],
	};

	try {
		const res = await getList(body, "/getlist");
		return await res;
	} catch (error) {
		console.error(error, "this from services");
	}
};

export const actionCart = async param => {
	const body = {
		actionController: "OrdersController",
		actionName: "AddPurchaseOrder",
		actionParam: param,
	};
	try {
		const res = await Client.post("/action", body);
		return res;
	} catch (error) {
		console.log(error);
	}
};
