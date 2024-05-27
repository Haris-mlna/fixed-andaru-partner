import { getList } from "../../utils/controller/get";
import { Client } from "../../utils/api/api";

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

export const addPartner = async (param) => {
	const body = {
		actionController: "PartnerUserController",
		actionName: "AddPartnerUser",
		actionParam: param,
	};

	try {
		const res = await Client.post('/action', body);

		return res
	} catch (err) {
		console.log(err);
	}
};

