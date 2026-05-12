import { useState } from 'react';
import { Button, FormGroup } from 'navium-ui-lib';
import { FiX } from 'react-icons/fi';
import logo from '../../assets/navium-v1.png';
import { login } from '../../api/source';
import './Login.css';

const promoImage =
	'https://images.pexels.com/photos/17835643/pexels-photo-17835643.jpeg';

function Login({ onClose }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const data = await login({ email, password });
			// TODO: Eliminar despues de pruebas: log de autenticacion exitosa.
			console.log('Autenticacion exitosa');
			console.log('Token recibido:', data?.token); // se puede ver Network, de devtools navegador
		} catch (error) {
			console.error('Error de autenticacion:', error);
		}
	};

	return (
		<div className="login-overlay" role="presentation" onClick={onClose}>
			<div
				className="login"
				role="dialog"
				aria-modal="true"
				aria-labelledby="login-title"
				onClick={(event) => event.stopPropagation()}
			>
				<button className="login__close" type="button" onClick={onClose} aria-label="Cerrar">
					<FiX />
				</button>
				<div className="login__content">
					<div className="login__panel">
						<h2 id="login-title" className="login__title">
							Bienvenido
						</h2>
                        <p className="subtitle">
                            Ingreso a portal de Operaciones de patio. Para iniciar sesión, introduce tu correo empresarial y contraseña.
                        </p>
						<form className="login__form" onSubmit={handleSubmit}>
							<FormGroup
								label="Correo"
								id="login-email"
								required
							>
								<input type="email" placeholder="nombre@navium.com" value={email}
									onChange={(event) => setEmail(event.target.value)}
								/>
							</FormGroup>
							<FormGroup 
                                label="Contraseña"
                                id="login-password"
                                required
                            >
								<input type="password" placeholder="••••••••" value={password}
									onChange={(event) => setPassword(event.target.value)}
								/>
							</FormGroup>
                            <a href="">¿Olvidaste tu contraseña?</a>
							<Button type="submit" variant="primary" size="sm" className="login__submit">
								Iniciar sesión
							</Button>
						</form>
                        <p>
                            Navium logistics, ingreso a portal de Operaciones de patio. <a href="">Más información</a>
                        </p>
                        <img src={logo} alt="Navium" />
					</div>
					<div className="login__media" aria-hidden="true">
						<img src={promoImage} alt="" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
