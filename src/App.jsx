import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import { Footer } from 'navium-ui-lib';
import logo from './assets/navium-v1.png';
import Navbar from './components/ui/Navbar';
import Login from './components/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useAuth } from './context/AuthContext';

function App() {
    const { isLoginOpen, closeLogin } = useAuth();

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
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
                <Login onClose={closeLogin} />
            ) : null}
        </>
    );
}

export default App
