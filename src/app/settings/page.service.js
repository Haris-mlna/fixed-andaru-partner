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

<<<<<<< Updated upstream
export const addAddress = async (param) => {
    const body = {
        actionController: "partnercontroller",
        actionName: "AddAddress",
        actionParam: param,
    };

    try {
        const res = await Client.post('/action', body);

        if (res) {
            return res;
        }
    } catch (error) {
        console.log(error);
    }
=======
const editUser = async param => {
	const body = {
		actionController: "PartnersUserController",
		actionName: "EditPartnerUsers",
		actionParam: param,
	};

	try {
		const res = await Client.post("/action", body);

		return res;
	} catch (error) {
		console.log(error);
	}
>>>>>>> Stashed changes
};
