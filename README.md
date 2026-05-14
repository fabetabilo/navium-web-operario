![Diagram](docs/navium-banner-operario.png)

# Navium | Vista de usuario Operario de Patio

### Requisitos

- Node.js 18+ (recomendado LTS). Verifica versión:

```powershell
node -v
npm -v
```
Descarga e instala desde: https://nodejs.org/

### Preparar Entorno de Desarrollo

Instalar dependencias
```
npm install
```
```
npm install react-router-dom
```
```
npm install react-icons
```

Libreria UI compartida [navium-ui-lib](https://github.com/fabetabilo/navium-ui-lib.git) (v2.3.0)
```
npm install navium-ui-lib
```
```
npm install axios
```

### Componentes esenciales

- `AuthProvider` y `useAuth`: estado global de autenticacion (token, email, login modal).
- `Login`: modal de ingreso y control de errores de autenticacion.
- `ProtectedRoute`: restringe rutas privadas
- `Navbar`: muestra acciones de login o el usuario autenticado + cierre de sesion.
