import { getList } from "../../utils/controller/get";

export const loadPartner = async (id, page) => {
	const body = {
		modelName: "partnerlinks",
		maximumResult: 20,
		pageNumber: page,
		fieldName: ["*"],
		sortList: ["insertStamp desc"],
		criteriaList: [
			{
				propertyName: "PartnerId",
				operator: "=",
				value: id,
			},
		],
	};
	try {
		const res = await getList(body, "/getlist");

		return res;
	} catch (err) {
		return err;
	}
};

export const loadAllPartner = async (page, filter) => {
	const body = {
		modelName: "partners",
		maximumResult: 20,
		pageNumber: page,
		sortList: ["ProfileImagePartner desc"],
		criteriaList: filter,
	};

	try {
		const res = await getList(body, "/getlist");

		return res;
	} catch (error) {
		return error;
	}
};

export const loadPartnerRequest = async id => {
	const body = {
		modelName: "partnerrequests",
		maximumResult: 20,
		pageNumber: 1,
		fieldName: ["*"],
		sortList: ["insertStamp desc"],
		criteriaList: [
			{
				propertyName: "PartnerId",
				operator: "=",
				value: id,
			},
			{
				propertyName: "Status",
				operator: "=",
				value: "Pending",
			},
		],
	};
	try {
		const res = await getList(body, "/getlist");

		return res;
	} catch (err) {
		return err;
	}
};

export const confirmationAwait = async id => {
	const body = {
		modelName: "partnerrequests",
		maximumResult: 20,
		pageNumber: 1,
		fieldName: ["*"],
		sortList: ["insertStamp desc"],
		criteriaList: [
			{
				propertyName: "RequesterId",
				operator: "=",
				value: id,
			},
			{
				propertyName: "Status",
				operator: "=",
				value: "Pending",
			},
		],
	};
	try {
		const res = await getList(body, "/getlist");

		return res;
	} catch (err) {
		return err;
	}
};
