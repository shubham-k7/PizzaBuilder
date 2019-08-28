import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://pizzabui.firebaseio.com/',
});

export default instance;