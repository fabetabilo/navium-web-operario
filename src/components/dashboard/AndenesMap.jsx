import { useEffect, useMemo, useState } from 'react';
import { fetchMapaAndenes } from '../../api/source';
import AndenCard from './AndenCard';
import './AndenesMap.css';

const groupByZona = (items) => {
	const map = new Map();
	const order = [];

	items.forEach((anden) => {
		const rawZona = anden?.zona || 'Sin zona';
		const zona = rawZona.trim() || 'Sin zona';
		if (!map.has(zona)) {
			map.set(zona, []);
			order.push(zona);
		}
		map.get(zona).push(anden);
	});

	return order.map((zona) => ({ zona, andenes: map.get(zona) }));
};

function AndenesMap({ onSelect }) {
	const [andenes, setAndenes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		let isMounted = true;

		const loadAndenes = async () => {
			setLoading(true);
			setError('');
			try {
				const data = await fetchMapaAndenes();
				if (isMounted) {
					setAndenes(Array.isArray(data) ? data : []);
				}
			} catch (err) {
				if (isMounted) {
					setError('No se pudo cargar el mapa de andenes.');
				}
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		};

		loadAndenes();
		return () => {
			isMounted = false;
		};
	}, []);

	const zonas = useMemo(() => groupByZona(andenes), [andenes]);

	const handleCardClick = (anden) => {
		if (typeof onSelect === 'function') {
			onSelect(anden);
		}
	};

	return (
		<section className="andenes-map">
			<div className="andenes-map__header">
				<h2 className="andenes-map__title">Mapa de Andenes</h2>
				<span className="andenes-map__subtitle">Estado físico del puerto</span>
			</div>

			{loading ? (
				<p className="andenes-map__state">Cargando andenes...</p>
			) : null}
			{!loading && error ? (
				<p className="andenes-map__state andenes-map__state--error">{error}</p>
			) : null}
			{!loading && !error && zonas.length === 0 ? (
				<p className="andenes-map__state">No hay andenes para mostrar.</p>
			) : null}

			{!loading && !error
				? zonas.map(({ zona, andenes: andenesZona }) => (
					<div className="andenes-map__zone" key={zona}>
						<div className="andenes-map__zone-head">
							<span className="andenes-map__zone-label">Zona {zona}</span>
							<span className="andenes-map__zone-count">
								{andenesZona.length} andenes
							</span>
						</div>
						<div className="andenes-map__row" role="list">
							{andenesZona.map((anden, index) => (
								<AndenCard
										key={anden.idAnden ?? `${zona}-${anden.codigoAnden ?? index}`}
										codigo={anden.codigoAnden}
										estado={anden.estado}
										onClick={() => handleCardClick(anden)}
									/>
								))}
						</div>
					</div>
				))
				: null}
		</section>
	);
}

export default AndenesMap;
