import AuthServices from "@/utils/controller/auth";
import { jwtDecode } from "jwt-decode";

export const handleLogin = async props => {
	const {
		email,
		password,
		setLoading,
		setUser,
		setMessages,
		navigate,
	} = props;

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
					setMessages(null)
				}

			} catch (error) {
				setMessages({
					text : 'Username dan password salah!',
					error : 'danger'
				})
			} finally {
				setLoading(false);
			}
		} else {
			setMessages({
				text : 'Username tidak valid!',
				error : 'warning'
			})
		}
	} else {
		setMessages({
			text : 'Isi email dan password dengan benar!',
			error : 'warning'
		})
	}
};
