import './AndenCard.css';

const STATUS_CLASSES = {
	DISPONIBLE: 'anden-card--disponible',
	OCUPADO: 'anden-card--ocupado',
	MANTENIMIENTO: 'anden-card--mantenimiento',
};

const normalizeStatus = (estado) => (estado || '').trim().toUpperCase();

function AndenCard({ codigo, estado, onClick }) {
	const normalizedStatus = normalizeStatus(estado);
	const statusClass = STATUS_CLASSES[normalizedStatus] || 'anden-card--desconocido';
	const isClickable = typeof onClick === 'function';
	const Tag = isClickable ? 'button' : 'div';

	return (
		<Tag
			className={`anden-card ${statusClass}${isClickable ? ' anden-card--clickable' : ''}`}
			onClick={onClick}
			type={isClickable ? 'button' : undefined}
		>
			<span className="anden-card__code">{codigo || '--'}</span>
			<span className="anden-card__status">{estado || 'DESCONOCIDO'}</span>
		</Tag>
	);
}

export default AndenCard;
