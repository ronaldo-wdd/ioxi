import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://ioxi-d1ba6.firebaseio.com/'
});

export default instance;