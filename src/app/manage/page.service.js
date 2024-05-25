import { getList } from "../../utils/controller/get";

export const loadListUser = async id => {
	const body = {
		modelName: "partnerusers",
		criteriaList: [
			{
				propertyName: "OrganizationId",
				operator: "=",
				value: id,
			},
		],
	};

	try {
		const res = await getList(body, "/getList");

		return res;
	} catch (err) {
		console.error(err);
	}
};

export const loadSubsidiaries = async id => {
	const body = {
		modelName: "partners",
		criteriaList: [
			{
				propertyName: "parentCode",
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
};
