import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

function ProtectedRoute({ children }) {
	const { isAuthenticated } = useAuth();
	const loginUrl = import.meta.env.VITE_URL_LOGIN_CENTRAL;

	useEffect(() => {
		if (!isAuthenticated) {
			window.location.href = loginUrl;
		}
	}, [isAuthenticated, loginUrl]);

	if (!isAuthenticated) {
		return null;
	}

	return children;
}

export default ProtectedRoute;
