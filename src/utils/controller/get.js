// modelName : string to object in backend like props.att examples = modelName : 'products' ----- result = 'object of product'
// fieldName : array of string to take only specific property examples = fieldName : 'id' ----- result = '213JDVOJSDopj34214asf'
// maximumResult : limit of how much will the response object contain examplles = maximumResult : 5 ---- result = [5 object inside array]
// pageNumber : the state of which page the response were examples = pageNumber : 2 ---- result = [object of 6 to 10 from 100] (with maximumResult of 5)
// criteriaList : array of object with 3 property to search more specific data below is the property
// PropertyName === is to search within that property of object
// Operator === is the operator to find or query the databases (=, !=, like, and more)
// Value === the value of specific items you want to find on the property

import { Client } from "../api/api";

const getList = async (props, link) => {
	try {
		const {
			modelName,
			fieldNames,
			maximumResult,
			pageNumber,
			criteriaList,
			sortList,
		} = props;

		const body = {
			modelName,
			...(fieldNames !== undefined && { fieldNames }),
			...(maximumResult !== undefined && { maximumResult }),
			...(pageNumber !== undefined && { pageNumber }),
			...(criteriaList !== undefined && { criteriaList }),
			...(sortList !== undefined && { sortList }),
		};

		const res = await Client.post(link, body);
		return await res;
	} catch (error) {
		// Handle errors
		console.error(error);
		throw error;
	}
};

const getSingle = async (props, link) => {
	try {
		const {
			modelName,
			fieldName,
			maximumResult,
			pageNumber,
			criteriaList,
			sortList,
		} = props;

		const body = {
			modelName,
			...(fieldName !== undefined && { fieldName }),
			...(maximumResult !== undefined && { maximumResult }),
			...(pageNumber !== undefined && { pageNumber }),
			...(criteriaList !== undefined && { criteriaList }),
			...(sortList !== undefined && { sortList }),
		};

		const res = await Client.post(link, body);
		return await res;
	} catch (error) {
		// Handle errors
		console.error(error);
		throw error;
	}
};

export { getList, getSingle };
