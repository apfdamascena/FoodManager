import axios from 'axios';

const API = axios.create({
    baseURL: 'https://mighty-temple-51387.herokuapp.com'
});

export default API;