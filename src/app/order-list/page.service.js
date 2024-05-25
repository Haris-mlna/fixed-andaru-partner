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

	const res = await getList(body, '/getlist');

	return res;
};
