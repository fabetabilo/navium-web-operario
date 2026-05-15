import axios from 'axios';

// decision actual: JWT en localStorage por simplicidad; futuro: cookie HttpOnly/Secure !!

/**
 * Decision de autenticacion (actual y futura)
 * Actual: el JWT se guarda en `localStorage` para simplificar el flujo en front y enviar el 
 * `Authorization: Bearer` sin cambios del backend. Esto facilita desarrollo y permite 
 * sincronizar sesiones entre pestañas.
 * Futuro (MUST PLS)**: migrar a cookie `HttpOnly` + `Secure` para reducir riesgo de XSS!!!!!!.
 * Implica emitir cookie segura en el login desde el backend, usar `withCredentials` en Axios en 
 * el front, y eliminar el manejo de token en `localStorage` junto a los listeners de `storage`.
 */
const TOKEN_KEY = 'navium_auth_token';
const EMAIL_KEY = 'navium_auth_email';
export const AUTH_LOGOUT_EVENT = 'navium:auth-logout';

export const getToken = () => localStorage.getItem(TOKEN_KEY) || '';
export const getEmail = () => localStorage.getItem(EMAIL_KEY) || '';
export const setToken = (token) => {
	if (token) {
		localStorage.setItem(TOKEN_KEY, token);
	}
};
export const setEmail = (email) => {
	if (email) {
		localStorage.setItem(EMAIL_KEY, email);
	}
};
export const clearToken = () => {
	localStorage.removeItem(TOKEN_KEY);
};
export const clearEmail = () => {
	localStorage.removeItem(EMAIL_KEY);
};

const api = axios.create({
	baseURL: 'http://localhost:8082',
	headers: {
		'Content-Type': 'application/json',
	},
});

api.interceptors.request.use((config) => {
	const token = getToken();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error?.response?.status === 401) {
			clearToken();
			clearEmail();
			window.dispatchEvent(new CustomEvent(AUTH_LOGOUT_EVENT));
		}
		return Promise.reject(error);
	},
);

export const login = async ({ email, password }) => {
	const response = await api.post('/api/v0/auth/login', { email, password });
	return response.data;
};

export const fetchMapaAndenes = async () => {
	const response = await api.get('/api/v0/operacion/andenes');
	if (response.status === 204 || !response.data) {
		return [];
	}
	return Array.isArray(response.data) ? response.data : [];
};

export const fetchAndenAsignacion = async (idAnden) => {
	if (!idAnden) {
		return null;
	}
	const response = await api.get(`/api/v0/operacion/andenes/${idAnden}/info`);
	if (response.status === 204 || !response.data) {
		return null;
	}
	return response.data;
};
