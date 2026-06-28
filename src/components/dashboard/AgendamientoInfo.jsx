import { useMemo } from 'react';
import { FiX } from 'react-icons/fi';
import { Button } from 'navium-ui-lib';
import './AgendamientoInfo.css';

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

const ESTADO_CLASSES = {
	CONFIRMADO: 'agendamiento-info__estado--confirmado',
	PENDIENTE: 'agendamiento-info__estado--pendiente',
	CANCELADO: 'agendamiento-info__estado--cancelado',
	EN_CURSO: 'agendamiento-info__estado--en-curso',
	COMPLETADO: 'agendamiento-info__estado--completado',
	CREADO: 'agendamiento-info__estado--creado',
};

function AgendamientoInfo({ agendamiento, onClose }) {
	const detailItems = useMemo(() => {
		if (!agendamiento) {
			return [];
		}
		return [
			{ label: 'ID', value: formatValue(agendamiento.id) },
			{ label: 'Patente', value: formatValue(agendamiento.patenteCamion) },
			{ label: 'RUT Chofer', value: formatValue(agendamiento.rutChofer) },
			{ label: 'Operación', value: formatValue(agendamiento.tipoOperacion) },
			{ label: 'Contenedor', value: formatValue(agendamiento.idContenedor) },
			{ label: 'Sigla Contenedor', value: formatValue(agendamiento.codigoSigla) },
			{ label: 'Estado TATC', value: formatValue(agendamiento.estadoTATC) },
			{ label: 'Estado General', value: formatValue(agendamiento.estadoGeneral) },
			{ label: 'Empresa Transporte', value: formatValue(agendamiento.rutEmpresaTransporte) },
			{ label: 'Inicio', value: formatDate(agendamiento.bloqueInicio) },
			{ label: 'Fin', value: formatDate(agendamiento.bloqueFin) },
		];
	}, [agendamiento]);

	const estadoNorm = (agendamiento?.estado || '').toUpperCase().replace(/\s+/g, '_');
	const estadoClass = ESTADO_CLASSES[estadoNorm] || '';

	if (!agendamiento) {
		return null;
	}

	return (
		<div className="agendamiento-info-overlay" role="presentation" onClick={onClose}>
			<div
				className="agendamiento-info"
				role="dialog"
				aria-modal="true"
				aria-labelledby="agendamiento-info-title"
				onClick={(event) => event.stopPropagation()}
			>
				<button className="agendamiento-info__close" type="button" onClick={onClose} aria-label="Cerrar">
					<FiX />
				</button>
				<div className="agendamiento-info__content">
					<div className="agendamiento-info__panel">
						<h2 id="agendamiento-info-title" className="agendamiento-info__title">
							Agendamiento {agendamiento.id || '—'}
						</h2>
						<p className="agendamiento-info__subtitle">Detalle de agendamiento</p>
						{agendamiento.estado ? (
							<div className={`agendamiento-info__estado ${estadoClass}`}>
								{agendamiento.estado}
							</div>
						) : null}
						<div className="agendamiento-info__details">
							{detailItems.map((item) => (
								<div className="agendamiento-info__row" key={item.label}>
									<span className="agendamiento-info__label">{item.label}</span>
									<span className="agendamiento-info__value">{item.value}</span>
								</div>
							))}
						</div>
						<Button type="button" variant="primary" size="sm" className="agendamiento-info__accept" onClick={onClose}>
							Aceptar
						</Button>
					</div>
					<div className="agendamiento-info__media" aria-hidden="true">
						<div className="agendamiento-info__media-panel" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default AgendamientoInfo;
