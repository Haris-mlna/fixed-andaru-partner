import { getList } from "../../utils/controller/get";

export const getListProduct = async (page, filter) => {
	const body = {
		modelName: "products",
		pageNumber: page,
		maximumResult: 16,
		sortList: [`Id asc`],
		criteriaList: filter,
	};

	try {
		const res = await getList(body, "/getlist");
		return await res;
	} catch (error) {
		console.error(error, "this from services");
	}
};
