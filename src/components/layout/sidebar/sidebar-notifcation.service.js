import { getList } from "../../../utils/controller/get";

export const loadNotification = async (userId, page) => {
	const body = {
		modelName: "partnernotifications",
		maximumResult: 10,
		sortList: ["InsertStamp desc"],
		fieldNames: [
			"Id",
			"InsertStamp",
			"InsertedBy",
			"Message",
			"SenderName",
			"ProfileImageSender",
		],
		// fieldNames: ["*"],
		pageNumber: page,
		criteriaList: [
			{
				propertyName: "organizationId",
				operator: "=",
				value: userId,
			},
		],
	};

	try {
		const res = await getList(body, "/getlist");
		return res;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
