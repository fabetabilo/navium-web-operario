import { useState } from 'react';
import { Button, FormGroup } from 'navium-ui-lib';
import { fetchAgendamientosPorPatente } from '../../services/bffService';
import AgendamientoInfo from './AgendamientoInfo';
import './Agendamientos.css';

const formatDate = (value) => {
	if (!value) return '—';
	try {
		return new Date(value).toLocaleString('es-CL');
	} catch {
		return value;
	}
};

const ESTADO_CLASSES = {
	CONFIRMADO: 'agendamientos__badge--confirmado',
	PENDIENTE: 'agendamientos__badge--pendiente',
	CANCELADO: 'agendamientos__badge--cancelado',
	EN_CURSO: 'agendamientos__badge--en-curso',
	COMPLETADO: 'agendamientos__badge--completado',
};

function Agendamientos() {
	const [patente, setPatente] = useState('');
	const [agendamientos, setAgendamientos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [searched, setSearched] = useState(false);
	const [selected, setSelected] = useState(null);

	const handleSearch = async () => {
		const valor = patente.trim();
		if (!valor) return;

		setLoading(true);
		setError('');
		setAgendamientos([]);
		setSearched(true);

		try {
			const data = await fetchAgendamientosPorPatente(valor);
			setAgendamientos(Array.isArray(data) ? data : []);
		} catch (err) {
			setError('Error al buscar agendamientos.');
		} finally {
			setLoading(false);
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};

	return (
		<>
			<section className="agendamientos">
				<div className="agendamientos__header">
					<h2 className="agendamientos__title">Agendamientos</h2>
					<span className="agendamientos__subtitle">Gestión de agendamientos del puerto</span>
				</div>

				<div className="agendamientos__search">
					<FormGroup>
						<input
							className="agendamientos__search-input"
							type="text"
							placeholder="Buscar por patente..."
							value={patente}
							onChange={(e) => setPatente(e.target.value)}
							onKeyDown={handleKeyDown}
						/>
					</FormGroup>
					<Button
						variant="primary"
						size="sm"
						onClick={handleSearch}
						disabled={loading || !patente.trim()}
					>
						{loading ? 'Buscando...' : 'Buscar'}
					</Button>
				</div>

				{loading ? (
					<p className="agendamientos__state">Cargando agendamientos...</p>
				) : null}

				{!loading && error ? (
					<p className="agendamientos__state agendamientos__state--error">{error}</p>
				) : null}

				{!loading && !error && searched && agendamientos.length === 0 ? (
					<p className="agendamientos__state">No se encontraron agendamientos para esa patente.</p>
				) : null}

				{!loading && !error && !searched ? (
					<div className="agendamientos__placeholder">
						<p className="agendamientos__placeholder-text">
							Ingresa una patente para buscar agendamientos
						</p>
					</div>
				) : null}

				{!loading && !error && agendamientos.length > 0 ? (
					<div className="agendamientos__table-wrapper">
						<table className="agendamientos__table">
							<thead>
								<tr>
									<th>ID</th>
									<th>Patente</th>
									<th>Operación</th>
									<th>Contenedor</th>
									<th>Inicio</th>
									<th>Fin</th>
									<th>Estado</th>
								</tr>
							</thead>
							<tbody>
								{agendamientos.map((ag) => {
									const estadoNorm = (ag.estado || '').toUpperCase().replace(/\s+/g, '_');
									const badgeClass = ESTADO_CLASSES[estadoNorm] || '';
									return (
										<tr
											key={ag.id}
											className="agendamientos__row"
											onClick={() => setSelected(ag)}
										>
											<td>{ag.id || '—'}</td>
											<td>{ag.patenteCamion || '—'}</td>
											<td>{ag.tipoOperacion || '—'}</td>
											<td>{ag.idContenedor || '—'}</td>
											<td>{formatDate(ag.bloqueInicio)}</td>
											<td>{formatDate(ag.bloqueFin)}</td>
											<td>
												<span className={`agendamientos__badge ${badgeClass}`}>
													{ag.estado || '—'}
												</span>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				) : null}
			</section>

			{selected ? (
				<AgendamientoInfo agendamiento={selected} onClose={() => setSelected(null)} />
			) : null}
		</>
	);
}

export default Agendamientos;
