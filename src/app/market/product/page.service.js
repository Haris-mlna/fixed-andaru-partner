import { getList } from "@/utils/controller/get";

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
