const DASHBOARD_BASE_URL = import.meta.env.VITE_API_DASHBOARD;

const verificarRespuesta = (res) => {
    if (res.status === 401) {
        window.location.href = import.meta.env.VITE_URL_LOGIN_CENTRAL; // login centralizado
        throw new Error('Sesión expirada');
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res;
};

export const logout = async () => {
    await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
    });
};

export const fetchCurrentUser = async () => {
    const res = await fetch('/api/auth/me', {
        method: 'GET',
        credentials: 'include'
    });
    verificarRespuesta(res);
    return res.json();
};

export const fetchMapaAndenes = async () => {
    try {
        const response = await fetch(`${DASHBOARD_BASE_URL}/operacion/andenes`, {
            method: 'GET',
            credentials: 'include',
        });
        verificarRespuesta(response);
        if (response.status === 204) return [];
        return await response.json();
    } catch (error) {
        console.error('ERROR con servidor: ', error);
        throw error;
    }
};

export const fetchAndenAsignacion = async (idAnden) => {
    try {
        const response = await fetch(`${DASHBOARD_BASE_URL}/operacion/andenes/${idAnden}/info`, {
            method: 'GET',
            credentials: 'include',
        });
        verificarRespuesta(response);
        if (response.status === 204) return null;
        return await response.json();
    } catch (error) {
        console.error('Error al obtener informacion de anden')
        throw error;
    }
}

export const fetchAgendamientosPorPatente = async (patente) => {
    try {
        const response = await fetch(`${DASHBOARD_BASE_URL}/operacion/agendamientos/patente/${patente}`, {
            method: 'GET',
            credentials: 'include',
        });
        verificarRespuesta(response);
        if (response.status === 204) return [];
        return await response.json();
    } catch (error) {
        console.error('Error al obtener informacion de patente')
        throw error;
    }
}
