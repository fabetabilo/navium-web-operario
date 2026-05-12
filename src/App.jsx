import { useState } from 'react';
import Home from './pages/home/Home';
import { Footer } from 'navium-ui-lib';
import logo from './assets/navium-v1.png';
import Navbar from './components/ui/Navbar';
import Login from './components/auth/Login';

function App() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    return (
        <>
            <Navbar onLoginClick={() => setIsLoginOpen(true)} />
            <Home />
            <Footer
                logo={logo}
                moduleLinks={[
                    { label: 'Servicios', href: '#servicios' },
                    { label: 'Nosotros', href: '#nosotros' },
                    { label: 'Clientes', href: '#clientes' },
                    { label: 'Contacto', href: '#contacto' },
                ]}
            />
            {isLoginOpen ? (
                <Login onClose={() => setIsLoginOpen(false)} />
            ) : null}
        </>
    );
}

export default App
