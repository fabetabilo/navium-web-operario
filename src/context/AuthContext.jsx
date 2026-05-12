import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
	AUTH_LOGOUT_EVENT,
	clearEmail,
	clearToken,
	getEmail,
	getToken,
	setEmail,
	setToken,
} from '../api/source';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [token, setTokenState] = useState(() => getToken());
	const [userEmail, setUserEmailState] = useState(() => getEmail());
	const [isLoginOpen, setIsLoginOpen] = useState(false);

	const isAuthenticated = Boolean(token);

	const openLogin = useCallback(() => {
		setIsLoginOpen(true);
	}, []);

	const closeLogin = useCallback(() => {
		setIsLoginOpen(false);
	}, []);

	const login = useCallback((newToken, newEmail) => {
		if (!newToken) {
			return;
		}
		setToken(newToken);
		setTokenState(newToken);
		if (newEmail) {
			setEmail(newEmail);
			setUserEmailState(newEmail);
		}
	}, []);

	const logout = useCallback(() => {
		clearToken();
		clearEmail();
		setTokenState('');
		setUserEmailState('');
	}, []);

	useEffect(() => {
		const handleLogout = () => {
			logout();
		};

		window.addEventListener(AUTH_LOGOUT_EVENT, handleLogout);
		return () => {
			window.removeEventListener(AUTH_LOGOUT_EVENT, handleLogout);
		};
	}, [logout]);

	useEffect(() => {
		const handleStorage = (event) => {
			if (event.key === 'navium_auth_token') {
				const nextToken = event.newValue || '';
				setTokenState(nextToken);
				if (!nextToken) {
					setUserEmailState('');
				}
				return;
			}
			if (event.key === 'navium_auth_email') {
				setUserEmailState(event.newValue || '');
			}
		};

		window.addEventListener('storage', handleStorage);
		return () => {
			window.removeEventListener('storage', handleStorage);
		};
	}, []);

	const value = useMemo(
		() => ({
			token,
			userEmail,
			isAuthenticated,
			isLoginOpen,
			openLogin,
			closeLogin,
			login,
			logout,
		}),
		[token, userEmail, isAuthenticated, isLoginOpen, openLogin, closeLogin, login, logout],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within AuthProvider');
	}
	return context;
}
