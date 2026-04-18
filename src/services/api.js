import axios from 'axios';

const api = axios.create({
    withCredentials: true,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
});

export default api;
