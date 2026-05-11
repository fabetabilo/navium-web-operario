import Navbar from '../../components/Navbar';
import './Home.css';

function Home() {
	return (
		<main className="home" id="home">
			<Navbar />
			<section className="home__hero">
				<div className="home__hero-inner">
					<h1 className="home__title">
						NAVIUM
						<span className="home__title-accent">LOGISTICS</span>
					</h1>
					<div className="home__bar" aria-hidden="true"></div>
					<p className="home__subtitle">Soluciones logisticas con precision y confianza.</p>
				</div>
			</section>
		</main>
	);
}

export default Home;
