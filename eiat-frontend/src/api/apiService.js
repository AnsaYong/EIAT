// apiService.js - Manages HTTP requests to the Django API using Axios
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',  // Django API base URL
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        // Include other default headers here
    },
});

export default api;
