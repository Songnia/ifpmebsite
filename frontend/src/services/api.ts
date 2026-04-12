import axios from 'axios';

// Utiliser l'URL de base de l'API Laravel
const API_URL = import.meta.env.VITE_API_URL || '/api';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Accept': 'application/json'
    },
    withCredentials: true
});

// Intercepteur pour ajouter le token si nécessaire
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 422) {
            console.error('Validation errors:', error.response.data);
            alert(JSON.stringify(error.response.data.errors, null, 2));
        }
        return Promise.reject(error);
    }
);
