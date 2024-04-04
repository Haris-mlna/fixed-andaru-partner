import { getList } from "@/utils/controller/get";

export const getDeliveryList = async (sort, page) => {
	try {
			const body = {
					modelName: "partnerdeliveryorders",
					sortList: sort ? [sort] : ["DueDate desc"], // Adjust the default sort here
			};

			const res = await getList(body, "/getlist");

			if (res) {
					return res;
			}
	} catch (error) {
			throw new Error(error);
	}
};
