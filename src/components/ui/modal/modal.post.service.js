import { Client } from "../../../utils/api/api";

export const postfeed = param => {
	const body = {
		actionController: "feedscontroller",
		actionName: "AddFeeds",
		actionParam: param,
	};
	try {
		const res = Client.post("/action", body);

		return res;
	} catch (err) {
		return err;
	}
};
