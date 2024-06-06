import { ClientAuth } from "../api/api";
import { API } from "../env/environment";
import { jwtDecode } from "jwt-decode";

const AuthServices = {
	async doLogin(body1, body2) {
		try {
			const res1 = await ClientAuth.post(API.authUsername, body1).then(res =>
				res.json()
			);

			const body = {
				...body2,
				UserName: res1.UserName,
				OrganizationId: res1.OrganizationId,
			};

			const res2 = await ClientAuth.post(API.auth, body);

			if (res2.status === 200) {
				const token = await res2.text();
				if (token) {
					const decoded = jwtDecode(token);
					window.localStorage.setItem("apiURL", decoded.APIUrl);
					window.localStorage.setItem("token", token);
					return token;
				}
			} else {
				console.log(res2);

				return res2;
			}
		} catch (error) {
			return error;
		}
	},
};

export default AuthServices;
