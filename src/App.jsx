import Home from './pages/home/Home';
import { Footer } from 'navium-ui-lib';
import logo from './assets/navium-v1.png';
import Navbar from './components/ui/Navbar';

function App() {
    return (
        <>
            <Navbar />
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
        </>
    );
}

export default App
