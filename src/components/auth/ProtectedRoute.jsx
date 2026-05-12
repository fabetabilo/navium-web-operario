import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function ProtectedRoute({ children }) {
	const { isAuthenticated, openLogin } = useAuth();
	const location = useLocation();

	useEffect(() => {
		if (!isAuthenticated) {
			openLogin();
		}
	}, [isAuthenticated, location.pathname, openLogin]);

	if (!isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	return children;
}

export default ProtectedRoute;
