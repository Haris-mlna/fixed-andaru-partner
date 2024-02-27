import { getList, getSingle } from "@/utils/controller/get";

export const loadCartId = async customerId => {
	const body = {
		modelName: "ordercart",
		fieldNames: ["Id"],
		criteriaList: [
			{
				propertyName: "customerId",
				operator: "=",
				value: customerId,
			},
			{
				propertyName: "Status",
				operator: "=",
				value: "Pending",
			},
		],
	};
	try {
		const res = await getSingle(body, "/getsingle");

		return res;
	} catch (err) {
		throw err;
	}
};

export const loadCart = async customerId => {
	try {
		const body = {
			modelName: "ordercart",
			criteriaList: [
				{
					propertyName: "customerId",
					operator: "=",
					value: customerId,
				},
				{
					propertyName: "Status",
					operator: "=",
					value: "Pending",
				},
			],
		};

		const res = await getSingle(body, "/getsingle");

		if (res) {
			const itemsBody = {
				modelName: "ordercartitems",
				sortList: ["InsertStamp desc"],
				criteriaList: [
					{
						propertyName: "orderCartId",
						operator: "=",
						value: res.Id,
					},
				],
			};

			const res2 = await getList(itemsBody, "/getlist");

			return res2;
		}
	} catch (err) {
		console.error("Error loading cart list:", err);
		throw err;
	}
};

export const loadSubsidiaries = async param => {
	const body = {
		modelName: "partners",
		criteriaList: [
			{
				propertyName: "parentCode",
				operator: "=",
				value: param,
			},
		],
	};

	const body2 = {
		modelName: "partners",
		criteriaList: [
			{
				propertyName: "Id",
				operator: "=",
				value: param,
			},
		],
	};

	const mapToUnifiedFormat = item => {
		return {
			id: item.Id,
			value: item.Id,
			label: item.Name,
		};
	};

	try {
		const subsidiaries = await getList(body, "/getlist");
		const self = await getSingle(body2, "/getsingle");

		const mappedSubsidiaries = subsidiaries.data.map(mapToUnifiedFormat);

		// Add self to the beginning of the array
		mappedSubsidiaries.unshift(mapToUnifiedFormat(self));

		return mappedSubsidiaries;
	} catch (err) {
		console.log(err);
	}
};

export const loadAddress = async param => {
	try {
		const body = {
			modelName: "partneraddresses",
			criteriaList: [
				{
					propertyName: "partnerId",
					operator: "=",
					value: param,
				},
			],
		};

		const res = await getList(body, "/getlist");

		return res;
	} catch (err) {
		console.error("Error searching address:", err);
		throw err;
	}
};
