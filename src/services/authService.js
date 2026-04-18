import api from './api';

export const csrf = () => api.get('/sanctum/csrf-cookie');

export const login = async (credentials) => {
    await csrf();
    return api.post('/login', credentials);
};

export const register = async (data) => {
    await csrf();
    return api.post('/register', data);
};

export const logout = () => api.post('/logout');

export const getUser = () => api.get('/api/user');

export const getWatchlist = () => api.get('/api/watchlist');

export const addToWatchlist = (anime) => api.post('/api/watchlist', {
    mal_id: anime.mal_id,
    title: anime.title,
    image_url: anime.images?.webp?.image_url,
    type: anime.type,
});

export const removeFromWatchlist = (mal_id) => api.delete(`/api/watchlist/${mal_id}`);
