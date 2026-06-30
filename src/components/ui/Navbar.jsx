import { Button } from 'navium-ui-lib';
import { Link } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import logo from '../../assets/navium-v1.png';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

function Navbar() {
	const { isAuthenticated, logout, userEmail } = useAuth();
	const displayName = userEmail ? userEmail.split('@')[0] : '';

	return (
		<header className="navbar">
			<div className="navbar__inner">
				<Link className="navbar__brand" to="/" aria-label="Navium">
					<img src={logo} alt="Navium" />
				</Link>
				<nav className="navbar__links" aria-label="Primary">
					<Link to="/dashboard">
						Dashboard
					</Link>
					<a href="#nosotros">Nosotros</a>
					<a href="#contacto">Contacto</a>
					{isAuthenticated && (
						<div className="navbar__user">
							<span className="navbar__user-icon" aria-hidden="true">
								<FiUser />
							</span>
							<span className="navbar__user-name">{displayName}</span>
							<Button
								className="navbar__button"
								size="sm"
								variant="secondary"
								onClick={logout}
							>
								Cerrar Sesión
							</Button>
						</div>
					)}
				</nav>
			</div>
		</header>
	);
}

export default Navbar;
