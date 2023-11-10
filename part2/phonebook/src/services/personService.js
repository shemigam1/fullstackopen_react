import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

export const getAll = () => {
	const promise = axios.get(baseUrl);
	return promise.then((response) => response.data);
};

export const create = (newPerson) => {
	const promise = axios.post(baseUrl, newPerson);
	return promise.then((response) => {
		return response.data;
	});
};

export const deletePerson = (id) => {
	const promise = axios.delete(`${baseUrl}/${id}`);
	return promise.then((response) => response.data);
};
