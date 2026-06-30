import { useEffect, useMemo, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { Button, FormGroup } from 'navium-ui-lib';
import { fetchAndenAsignacion, asignarAnden } from '../../services/bffService';
import './AndenInfo.css';

const formatValue = (value) => (value === null || value === undefined || value === '' ? '—' : value);

const formatDate = (value) => {
	if (!value) {
		return '—';
	}
	try {
		const date = new Date(value);
		return date.toLocaleString('es-CL');
	} catch (err) {
		return value;
	}
};

function AndenInfo({ anden, onClose }) {
	const [info, setInfo] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	// Assignment form state
	const [showAssignForm, setShowAssignForm] = useState(false);
	const [assignPatente, setAssignPatente] = useState('');
	const [assignContenedor, setAssignContenedor] = useState('');
	const [assigning, setAssigning] = useState(false);
	const [assignError, setAssignError] = useState('');
	const [assignSuccess, setAssignSuccess] = useState(false);

	const idAnden = anden?.idAnden;
	const codigoAnden = anden?.codigoAnden;

	useEffect(() => {
		let isMounted = true;
		setLoading(true);
		setError('');
		setInfo(null);
		setShowAssignForm(false);
		setAssignSuccess(false);
		setAssignError('');

		const loadInfo = async () => {
			try {
				const data = await fetchAndenAsignacion(idAnden);
				if (isMounted) {
					setInfo(data);
				}
			} catch (err) {
				if (isMounted) {
					setError('No se pudo cargar la asignacion del anden.');
				}
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		};

		loadInfo();
		return () => {
			isMounted = false;
		};
	}, [idAnden]);

	const isDisponible = useMemo(() => {
		if (!info) return false;
		const estado = (info.estado || '').toUpperCase();
		return estado === 'DISPONIBLE';
	}, [info]);

	const detailItems = useMemo(() => {
		if (!info) {
			return [];
		}
		return [
			{ label: 'Codigo', value: formatValue(info.codigo ?? codigoAnden) },
			{ label: 'Estado', value: formatValue(info.estado) },
			{ label: 'Tipo', value: formatValue(info.tipo) },
			{ label: 'Asignacion', value: formatValue(info.asignacionId) },
			{ label: 'Patente', value: formatValue(info.patenteTransporte) },
			{ label: 'Contenedor', value: formatValue(info.contenedorId) },
			{ label: 'Inicio', value: formatDate(info.horaInicio) },
			{ label: 'Fin', value: formatDate(info.horaFin) },
		];
	}, [info, codigoAnden]);

	const handleAssign = async () => {
		const patenteVal = assignPatente.trim();
		const contenedorVal = assignContenedor.trim();
		if (!patenteVal) return;

		setAssigning(true);
		setAssignError('');
		setAssignSuccess(false);

		try {
			await asignarAnden({
				idAnden,
				codigoAnden,
				patenteTransporte: patenteVal,
				idContenedor: contenedorVal ? Number(contenedorVal) : null,
			});
			setAssignSuccess(true);
			setShowAssignForm(false);
			setAssignPatente('');
			setAssignContenedor('');
			// Reload info to reflect the new assignment
			const data = await fetchAndenAsignacion(idAnden);
			setInfo(data);
		} catch (err) {
			setAssignError('Error al asignar andén. Intente nuevamente.');
		} finally {
			setAssigning(false);
		}
	};

	return (
		<div className="anden-info-overlay" role="presentation" onClick={onClose}>
			<div
				className="anden-info"
				role="dialog"
				aria-modal="true"
				aria-labelledby="anden-info-title"
				onClick={(event) => event.stopPropagation()}
			>
				<button className="anden-info__close" type="button" onClick={onClose} aria-label="Cerrar">
					<FiX />
				</button>
				<div className="anden-info__content">
					<div className="anden-info__panel">
						<h2 id="anden-info-title" className="anden-info__title">
							Anden {codigoAnden || '—'}
						</h2>
						<p className="anden-info__subtitle">Detalle de asignacion activa</p>
						{loading ? (
							<div className="anden-info__loader" aria-live="polite">
								<span className="anden-info__spinner" aria-hidden="true" />
								Cargando asignacion...
							</div>
						) : null}
						{!loading && error ? (
							<p className="anden-info__error" role="alert">
								{error}
							</p>
						) : null}
						{!loading && !error ? (
							<div className="anden-info__details">
								{detailItems.map((item) => (
									<div className="anden-info__row" key={item.label}>
										<span className="anden-info__label">{item.label}</span>
										<span className="anden-info__value">{item.value}</span>
									</div>
								))}
							</div>
						) : null}

						{assignSuccess ? (
							<p className="anden-info__success" role="status">
								Andén asignado correctamente.
							</p>
						) : null}

						{!loading && !error && isDisponible && !showAssignForm && !assignSuccess ? (
							<Button
								type="button"
								variant="primary"
								size="sm"
								className="anden-info__assign-btn"
								onClick={() => setShowAssignForm(true)}
							>
								Asignar Andén
							</Button>
						) : null}

						{showAssignForm ? (
							<div className="anden-info__assign-form">
								<h3 className="anden-info__assign-title">Asignación Manual</h3>
								<FormGroup>
									<label className="anden-info__form-label" htmlFor="assign-patente">
										Patente *
									</label>
									<input
										id="assign-patente"
										className="anden-info__form-input"
										type="text"
										placeholder="Ej: ABCD12"
										value={assignPatente}
										onChange={(e) => setAssignPatente(e.target.value)}
									/>
								</FormGroup>
								<FormGroup>
									<label className="anden-info__form-label" htmlFor="assign-contenedor">
										ID Contenedor
									</label>
									<input
										id="assign-contenedor"
										className="anden-info__form-input"
										type="text"
										placeholder="Ej: 456"
										value={assignContenedor}
										onChange={(e) => setAssignContenedor(e.target.value)}
									/>
								</FormGroup>
								{assignError ? (
									<p className="anden-info__error" role="alert">{assignError}</p>
								) : null}
								<div className="anden-info__assign-actions">
									<Button
										type="button"
										variant="secondary"
										size="sm"
										onClick={() => setShowAssignForm(false)}
										disabled={assigning}
									>
										Cancelar
									</Button>
									<Button
										type="button"
										variant="primary"
										size="sm"
										onClick={handleAssign}
										disabled={assigning || !assignPatente.trim()}
									>
										{assigning ? 'Asignando...' : 'Confirmar'}
									</Button>
								</div>
							</div>
						) : null}

						<Button type="button" variant="primary" size="sm" className="anden-info__accept" onClick={onClose}>
							Aceptar
						</Button>
					</div>
					<div className="anden-info__media" aria-hidden="true">
						<div className="anden-info__media-panel" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default AndenInfo;
