import AuthServices from "../utils/controller/auth";
import { text } from "@fortawesome/fontawesome-svg-core";
import { jwtDecode } from "jwt-decode";

export const handleLogin = async props => {
	const { email, password, setLoading, setUser, setMessages, navigate } = props;

	const atIndex = email.indexOf("@");
	if (email && password) {
		if (atIndex !== -1) {
			const username = email.slice(0, atIndex);
			const domain = email.slice(atIndex + 1);

			const bodyUsername = {
				UserName: username,
				DomainName: domain,
			};

			const bodyLogin = {
				password: password,
				ApplicationId: "AND_WEB_PAR",
			};

			try {
				setLoading(true);
				const res = await AuthServices.doLogin(bodyUsername, bodyLogin);
				const decodeToken = jwtDecode(res);
				setUser(decodeToken);

				if (res !== undefined) {
					navigate.push("/home");
					setMessages(null);

					return "ok";
				}
			} catch (error) {
				console.log(error.status)
				if (error.status === 500) {
					setMessages({
						text: `Kejadi kesalahan pada server , error status : ${error.status}`,
						error: "error",
					});
				}
				if (error.status === 403) {
					setMessages({
						text: "Username dan password salah!",
						error: "error",
					});
				} else if (error.status === 401) {
					setMessages({
						text: "Username atau password salah!",
						error: "error",
					});
				} else {
					setMessages({
						text: `Error messages : ${error.message}`,
						error: "error",
					});
				}
			} finally {
				setLoading(false);
			}
		} else {
			setMessages({
				text: "Username tidak valid!",
				error: "error",
			});
		}
	} else {
		setMessages({
			text: "Isi email dan password dengan benar!",
			error: "error",
		});
	}
};
