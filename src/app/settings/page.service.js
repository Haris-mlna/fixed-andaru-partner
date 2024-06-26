import { Client } from "../../utils/api/api";
import { getList } from "../../utils/controller/get";

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

export const loadAddress = async id => {
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

export const addAddress = async param => {
	const body = {
		actionController: "partnercontroller",
		actionName: "AddAddress",
		actionParam: param,
	};

	try {
		const res = await Client.post("/action", body);

		if (res) {
			return res;
		}
	} catch (error) {
		console.log(error);
	}
};

export const editUser = async param => {
	const body = {
		actionController: "PartnerUserController",
		actionName: "EditPartnerUser",
		actionParam: param,
	};

	try {
		const res = await Client.post("/action", body);

		return res;
	} catch (error) {
		console.log(error);
	}
};

export const editCompany = async param => {
	const body = {
		actionController: "partnercontroller",
		actionName: "UpdateMyOrganizationProfile",
		actionParam: param,
	};

	try {
		const res = await Client.post("/action", body);

		return res;
	} catch (err) {
		console.log(err);
	}
};


export const deleteAddresses = async (ids) => {
    const body = {
        actionController: "partnercontroller",
        actionName: "DeleteAddress",
        actionParam: {
            idList: ids, // Mengirim array ID
        },
    };

    try {
        const res = await Client.post("/action", body);
        if (res) {
            return res;
        }
    } catch (error) {
        console.log(error);
    }
};
