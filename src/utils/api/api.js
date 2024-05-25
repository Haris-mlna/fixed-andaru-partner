const ClientAuth = {
	get: async url => {
		try {
			const response = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			return await response.json();
		} catch (error) {
			console.error(error);
		}
	},

	post: async (url, body) => {
		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});
			return response;
		} catch (error) {
			throw new Error("internal server error");
		}
	},
};

const Client = {
	get: async url => {
		try {
			const apiUser = window.localStorage.getItem("apiURL");
			const response = await fetch(apiUser + url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			return await response.json();
		} catch (error) {
			console.error(error);
		}
	},

	post: async (url, body) => {
		try {
			const apiUser = window.localStorage.getItem("apiURL");
			const token = window.localStorage.getItem("token");
			const apiNew = "http://103.195.30.148/api/main";

			if (token !== null) {
				const response = await fetch(apiNew + url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(body),
				});

				if (response) {
					if (!response.ok) {
						throw new Error(response.statusText);
					} else if (response.status !== 401 || response.status !== "401") {
						// Check if content-type is application/json
						const contentType = response.headers.get("content-type");
						if (contentType && contentType.includes("application/json")) {
							return await response.json();
						} else {
							// Return the response directly if not JSON
							return response;
						}
					}
				}
			} else {
				const emptyJson = {};
				return JSON.stringify(emptyJson);
			}
		} catch (error) {
			console.log(error);
			if (error instanceof Error && error.message === "Unauthorized") {
				window.location.href = "/";
				localStorage.clear();
			}
		}
	},
};

export { ClientAuth, Client };
