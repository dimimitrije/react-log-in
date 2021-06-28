import axios from 'axios'
import Cookies from 'js-cookie';


const client = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 5000
});

client.interceptors.request.use(
    request => {
        if(request.url.includes('user')){
            request.headers['Authorization'] = Cookies.get('Token')
        }
        return request
    },
    error => {
        return Promise.reject(error);
    }
)

client.interceptors.response.use(
    response => {
        return response
    },
    error => {
        return Promise.reject(error);
    }
);
export default client;