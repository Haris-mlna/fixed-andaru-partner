import { getList } from "../../../../utils/controller/get";

export const loadManufacture = async () => {
	const body = {
		modelName: "productmanufacture",
	};

	try {
		const res = await getList(body, "/GetList");
		return res;
	} catch (err) {
		return err;
	}
};

export const loadType = async param => {
	const body = {
		modelName: "producttype",
	};

	if (param) {
		body.criteriaList = [
			{
				propertyName: "manufactureId",
				operator: "=",
				value: param,
			},
		];
	}

	try {
		const res = await getList(body, "/getlist");
		return res;
	} catch (error) {
		console.error(error);
	}
};

export const loadSpec = async param => {
	const body = {
		modelName: "productspecifications",
	};

	if (param) {
		body.criteriaList = [
			{
				propertyName: "productTypeId",
				operator: "=",
				value: param,
			},
		];
	}

	try {
		const res = await getList(body, "/getlist");
		return res;
	} catch (error) {
		return error;
	}
};

export const loadSize = async param => {
	const body = {
		modelName: "productsize",
	};

	if (param) {
		body.criteriaList = [
			{
				propertyName: "productSpecId",
				operator: "=",
				value: param,
			},
		];
	}

	try {
		const res = await getList(body, "/getlist");
		return res;
	} catch (error) {
		return error;
	}
};
