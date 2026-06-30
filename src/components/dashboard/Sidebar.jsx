import { useState } from 'react';
import './Sidebar.css';

const menuItems = [
	{ id: 'mapa-andenes', label: 'Mapa de Andenes', icon: '' },
	{ id: 'agendamientos', label: 'Agendamientos', icon: '' },
];

function Sidebar({ activeView, onViewChange }) {
	return (
		<aside className="sidebar">
			<nav className="sidebar__nav">
				<ul className="sidebar__menu">
					{menuItems.map((item) => (
						<li key={item.id} className="sidebar__menu-item">
							<button
								className={`sidebar__menu-button ${
									activeView === item.id ? 'sidebar__menu-button--active' : ''
								}`}
								onClick={() => onViewChange(item.id)}
							>
								<span className="sidebar__menu-icon">{item.icon}</span>
								<span className="sidebar__menu-label">{item.label}</span>
							</button>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
}

export default Sidebar;
