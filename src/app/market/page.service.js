import { getList } from "../../utils/controller/get";

export const getListProduct = async page => {
	const body = {
		modelName: "products",
		pageNumber: page,
		maximumResult: 15,
		sortList: [`Id asc`],
	};

	try {
		const res = await getList(body, "/getlist");
		return await res;
	} catch (error) {
		console.error(error, "this from services");
	}
};
