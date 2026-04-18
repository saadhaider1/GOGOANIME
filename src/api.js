const BASE_URL = 'https://api.jikan.moe/v4';

const fetchWithRetry = async (url, retries = 3) => {
    try {
        const response = await fetch(url);
        if (response.status === 429 && retries > 0) {
            console.warn('Rate limited. Retrying...');
            await new Promise(res => setTimeout(res, 1000));
            return fetchWithRetry(url, retries - 1);
        }
        if (!response.ok) throw new Error('API Error');
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

export const getTopAnime = async () => {
    const data = await fetchWithRetry(`${BASE_URL}/top/anime?filter=bypopularity&limit=15`);
    return data.data || [];
};

export const getAiringAnime = async () => {
    const data = await fetchWithRetry(`${BASE_URL}/seasons/now?limit=15`);
    return data.data || [];
};

export const searchAnime = async (query) => {
    const data = await fetchWithRetry(`${BASE_URL}/anime?q=${encodeURIComponent(query)}&sfw=true&limit=20`);
    return data.data || [];
};

export const getAnimeCharacters = async (id) => {
    const data = await fetchWithRetry(`${BASE_URL}/anime/${id}/characters`);
    return (data.data || []).slice(0, 8);
};
