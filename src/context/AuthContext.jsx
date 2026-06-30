import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { fetchCurrentUser, logout as logoutService } from '../services/bffService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [userEmail, setUserEmailState] = useState('');
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const initAuth = async () => {
			// -------------------------------------------- [LOGIN REAL vs MOCK]
			// cuando VITE_BYPASS_AUTH es 'true', saltamos la peticion al backend de AWS 
			// para desarrollo

			// una vez no se ocupe, se debe eliminar este bloque
			if (import.meta.env.VITE_BYPASS_AUTH === 'true') {
				console.warn('bypass de autenticacion activo con usuario mock local');
				setUserEmailState('dev@local.com');
				setIsAuthenticated(true);
				setIsLoading(false);
				return;
			}

			try {
				const user = await fetchCurrentUser();
				setUserEmailState(user.email);
				setIsAuthenticated(true);
			} catch (error) {
				setUserEmailState('');
				setIsAuthenticated(false);
			} finally {
				setIsLoading(false);
			}
		};
		initAuth();
	}, []);

	const logout = useCallback(async () => {
		try {
			await logoutService();
		} catch (e) {
			console.error('Logout error', e);
		} finally {
			setIsAuthenticated(false);
			setUserEmailState('');
			window.location.href = import.meta.env.VITE_URL_LOGIN_CENTRAL;
		}
	}, []);

	const value = useMemo(
		() => ({
			userEmail,
			isAuthenticated,
			logout,
		}),
		[userEmail, isAuthenticated, logout],
	);

	if (isLoading) {
		return null; // o spinner
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within AuthProvider');
	}
	return context;
}
