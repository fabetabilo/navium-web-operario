import { useState } from 'react';
import './Dashboard.css';
import AndenesMap from '../../components/dashboard/AndenesMap';
import Agendamientos from '../../components/dashboard/Agendamientos';
import Sidebar from '../../components/dashboard/Sidebar';
import AndenInfo from '../../components/dashboard/AndenInfo';

function Dashboard() {
	const [selectedAnden, setSelectedAnden] = useState(null);
	const [activeView, setActiveView] = useState('mapa-andenes');

	const handleCloseInfo = () => setSelectedAnden(null);
	const handleSelectAnden = (anden) => setSelectedAnden(anden);
	const handleViewChange = (viewId) => setActiveView(viewId);

	const renderContent = () => {
		switch (activeView) {
			case 'mapa-andenes':
				return <AndenesMap onSelect={handleSelectAnden} />;
			case 'agendamientos':
				return <Agendamientos />;
			default:
				return <AndenesMap onSelect={handleSelectAnden} />;
		}
	};

	return (
		<main className="dashboard">
			<Sidebar activeView={activeView} onViewChange={handleViewChange} />
			<div className="dashboard__inner">
				<div className="dashboard__header">
					<div className="dashboard__header-left">
						<h1 className="dashboard__title">Panel de Operaciones</h1>
						<p className="dashboard__subtitle">
						</p>
					</div>

				</div>
				<div className="dashboard__content">{renderContent()}</div>
			</div>
			{selectedAnden ? (
				<AndenInfo anden={selectedAnden} onClose={handleCloseInfo} />
			) : null}
		</main>
	);
}

export default Dashboard;
