import { Client } from "../../utils/api/api";
import { jwtDecode } from "jwt-decode";

let decodedToken = null;
let token = null;

if (typeof window !== "undefined") {
  token = window.localStorage.getItem("token");
}

if (token) {
  decodedToken = jwtDecode(token);
}

const userServices = {
	async loadUser(user) {
		const body = {
			modelName: "partnerusers",
			criteriaList: [
				{
					propertyName: "Id",
					operator: "=",
					value: user?.UserId,
				},
			],
		};

		try {
			const res = Client.post("/GetSingle", body);

			return res;
		} catch (err) {
			console.log(err);
		}
	},
	async loadCompany(param) {
		const body = {
			modelName: "partners",
			criteriaList: [
				{
					propertyName: "Id",
					operator: "=",
					value: param || decodedToken?.OrganizationId,
				},
			],
		};

		try {
			const res = await Client.post("/GetSingle", body);

			return res;
		} catch (error) {
			console.log(error);
		}
	},
};

export default userServices;
