import { useState } from 'react';
import './Agendamientos.css';

function Agendamientos() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	return (
		<section className="agendamientos">
			<div className="agendamientos__header">
				<h2 className="agendamientos__title">Agendamientos</h2>
				<span className="agendamientos__subtitle">Gestión de agendamientos del puerto</span>
			</div>

			{loading ? (
				<p className="agendamientos__state">Cargando agendamientos...</p>
			) : null}
			{!loading && error ? (
				<p className="agendamientos__state agendamientos__state--error">{error}</p>
			) : null}
			{!loading && !error ? (
				<div className="agendamientos__placeholder">
					<p className="agendamientos__placeholder-text">
						Componente de Agendamientos listo para implementar
					</p>
					<p className="agendamientos__placeholder-subtext">
						Aquí se mostrará la lista de agendamientos
					</p>
				</div>
			) : null}
		</section>
	);
}

export default Agendamientos;
