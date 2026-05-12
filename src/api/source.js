import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:8082',
	headers: {
		'Content-Type': 'application/json',
	},
});

export const login = async ({ email, password }) => {
	const response = await api.post('/api/v0/auth/login', { email, password });
	return response.data;
};
