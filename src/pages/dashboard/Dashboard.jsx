import { useState } from 'react';
import './Dashboard.css';
import AndenesMap from '../../components/dashboard/AndenesMap';
import AndenInfo from '../../components/dashboard/AndenInfo';

function Dashboard() {
	const [selectedAnden, setSelectedAnden] = useState(null);

	const handleCloseInfo = () => setSelectedAnden(null);
	const handleSelectAnden = (anden) => setSelectedAnden(anden);

	return (
		<main className="dashboard">
			<div className="dashboard__inner">
				<h1 className="dashboard__title">Panel de Operaciones</h1>
				<p className="dashboard__subtitle">
					Acceso habilitado. Aqui iran las operaciones del operario.
				</p>
				<div className="dashboard__content">
					<AndenesMap onSelect={handleSelectAnden} />
				</div>
			</div>
			{selectedAnden ? (
				<AndenInfo anden={selectedAnden} onClose={handleCloseInfo} />
			) : null}
		</main>
	);
}

export default Dashboard;
