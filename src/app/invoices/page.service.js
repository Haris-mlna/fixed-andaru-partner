import { getList } from "../../utils/controller/get";

export const getInvoices = async (user, page) => {
	const body = {
		modelName: "invoice",
		// maximumResult: 5,
	};
	return await getList(body, "/getlist"); // Added return statement
};
