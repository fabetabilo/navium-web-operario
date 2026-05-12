import { Button } from 'navium-ui-lib';
import logo from '../../assets/navium-v1.png';
import './Navbar.css';

function Navbar() {
	return (
		<header className="navbar">
			<div className="navbar__inner">
				<a className="navbar__brand" href="#home" aria-label="Navium">
					<img src={logo} alt="Navium" />
				</a>
				<nav className="navbar__links" aria-label="Primary">
					<a href="#servicios">Servicios</a>
					<a href="#nosotros">Nosotros</a>
					<a href="#clientes">Clientes</a>
					<a href="#contacto">Contacto</a>
					<Button className="navbar__button" size="sm" variant="primary">Iniciar Sesión</Button>
				</nav>
			</div>
		</header>
	);
}

export default Navbar;
