import './Dashboard.css';
import AndenesMap from '../../components/dashboard/AndenesMap';

function Dashboard() {
	return (
		<main className="dashboard">
			<div className="dashboard__inner">
				<h1 className="dashboard__title">Panel de Operaciones</h1>
				<p className="dashboard__subtitle">
					Acceso habilitado. Aqui iran las operaciones del operario.
				</p>
				<div className="dashboard__content">
					<AndenesMap />
				</div>
			</div>
		</main>
	);
}

export default Dashboard;
