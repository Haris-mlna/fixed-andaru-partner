import { getList } from "@/utils/controller/get";

export const loadCompany = async id => {
	const body = {
		modelName: "partners",
		criteriaList: [
			{
				propertyName: "Id",
				operator: "=",
				value: id,
			},
		],
	};

	try {
		const res = await getList(body, "/getsingle");

		if (res) {
			return res;
		}
	} catch (error) {}
};

const loadAddress = async id => {
	const body = {
		modelName: "partneraddresses",
		criteriaList: [
			{
				propertyName: "PartnerId",
				operator: "=",
				value: id,
			},
		],
	};

	try {
		const res = getList(body, "/getlist");

		return res;
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};
