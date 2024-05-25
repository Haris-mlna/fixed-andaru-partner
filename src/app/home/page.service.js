import { getList } from "../../utils/controller/get";

export const getFeeds = async (user, page) => {
	const body = {
		modelName: "feeds",
		fieldNames: [
			"PublisherImage",
			"ImgContent",
			"Id",
			"PublisherName",
			"PublishedDate",
			"Caption",
		],
		maximumResult: 5,
		pageNumber: page,
		criteriaList: [
			{
				propertyName: "AudiencesId",
				operator: "=",
				value: user?.OrganizationId,
			},
		],
		sortList: ["PublishedDate desc"],
	};
	return await getList(body, "/getlist"); // Added return statement
};
