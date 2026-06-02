import { useState } from 'react';
import { Button, FormGroup } from 'navium-ui-lib';
import './ConsultaRapida.css';

function ConsultaRapida() {
	const [patente, setPatente] = useState('');

	const handleSearch = () => {
		console.log('Buscando patente:', patente);
		// TODO: Implementar lógica de búsqueda
	};

	return (
		<div className="consulta-rapida">
			<div className="consulta-rapida__header">
				<h3 className="consulta-rapida__title">Consulta Agendamiento</h3>
			</div>
			<div className="consulta-rapida__form">
				<FormGroup>
                    <input className="consulta-rapida__input"
                        type="email"
                        placeholder="ABDF56" 
                        value={patente}
						onChange={(e) => setPatente(e.target.value)}
					/>
				</FormGroup>
				<Button
					className="consulta-rapida__button"
					variant="primary"
					onClick={handleSearch}
				>
					Buscar
				</Button>
			</div>
		</div>
	);
}

export default ConsultaRapida;
