import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, FormGroup } from 'navium-ui-lib';
import { FiX } from 'react-icons/fi';
import logo from '../../assets/navium-v1.png';
import { login as loginRequest } from '../../api/source';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const promoImage =
	'https://images.pexels.com/photos/17835643/pexels-photo-17835643.jpeg';

function Login({ onClose }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { login: authLogin, closeLogin } = useAuth();
	const navigate = useNavigate();
	const handleClose = onClose ?? closeLogin;

	const handleSubmit = async (event) => {
		event.preventDefault();
		setErrorMessage('');
		setIsSubmitting(true);
		try {
			const data = await loginRequest({ email, password });
			if (!data?.token) {
				setErrorMessage('No se recibio un token valido.');
				return;
			}
			// El JWT no trae datos del usuario; idealmente el backend debe enviar el email/nombre en el response.
			authLogin(data.token, email);
			handleClose();
			navigate('/dashboard');
		} catch (error) {
			const responseMessage = error?.response?.data?.error;
			setErrorMessage(responseMessage || 'Error de autenticacion.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="login-overlay" role="presentation" onClick={handleClose}>
			<div
				className="login"
				role="dialog"
				aria-modal="true"
				aria-labelledby="login-title"
				onClick={(event) => event.stopPropagation()}
			>
				<button className="login__close" type="button" onClick={handleClose} aria-label="Cerrar">
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
						{errorMessage ? (
							<p className="login__error" role="alert">
								{errorMessage}
							</p>
						) : null}
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
							<Button type="submit" variant="primary" size="sm" className="login__submit" disabled={isSubmitting}>
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
