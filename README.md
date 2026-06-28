![Diagram](docs/navium-banner-operario.png)

# Navium | Vista de usuario Operario de Patio

Este portal web está diseñado específicamente para los operarios de patio del puerto. Su función principal es ofrecer una interfaz en tiempo real para visualizar y gestionar la distribución física de andenes, asignaciones y los turnos de agendamiento vigentes.

La aplicación consume directamente los endpoints expuestos por el **BFF de Operación** (`bff-operacion`), que consolida la información de los microservicios de Andenes, Agendamientos y Contenedores.

> Repositorio de BFF operaciones: [BFF Operacion](https://github.com/fabetabilo/navium-api-bff-operacion)

### Características Principales

1. **Gestión de Agendamientos:** Búsqueda y control de turnos de camiones por patente. Permite visualizar información del contenedor asignado (sigla, estados TATC/general y empresa de transporte).
2. **Mapa de Andenes:** Panel que muestra la distribución física de los andenes del puerto y su estado actual (ocupado, libre o en mantención).
3. **Asignación Manual:** Permite asociar directamente un camión y contenedor a un andén específico desde la interfaz.
4. **Seguridad Integrada:** Control de acceso mediante rutas protegidas y autenticación centralizada. [Navium Login Centralizado](https://github.com/AlvMaltrain/Navium-Web-LoginCentral)

### Tecnologías y Dependencias

- **Framework:** React 19 (iniciado con Vite)
- **Lenguaje:** JavaScript
- **Librería UI:** `navium-ui-lib` (v2.2.0+) — Componentes de interfaz compartidos
- **Navegación:** React Router 7
- **Iconos:** React Icons 5
- **Estilos:** Vanilla CSS (CSS nativo)

---

### Requisitos Previos

- **Node.js:** Versión 18 o superior (recomendado LTS). Puedes validar tu instalación con:
  ```bash
  node -v
  npm -v
  ```

---

### Preparar el Entorno de Desarrollo

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto tomando como referencia el archivo `.env.example`:
   ```properties
   VITE_API_DASHBOARD=http://localhost:8086/api/v0   # URL del BFF de Operación
   VITE_URL_LOGIN_CENTRAL=http://localhost:3000      # URL del Portal de Login Centralizado
   VITE_BYPASS_AUTH=true                             # Opcional: bypass de seguridad para desarrollo
   ```

3. **Levantar el servidor local de desarrollo:**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible por defecto en: [http://localhost:5173](http://localhost:5173)

---

### Scripts Disponibles

- `npm run dev`: Levanta el servidor de desarrollo local con Vite.
- `npm run build`: Genera el compilado optimizado para producción en la carpeta `dist`.
- `npm run lint`: Ejecuta ESLint para analizar la calidad y estilo del código.
- `npm run preview`: Levanta un servidor local para previsualizar el compilado de producción.
