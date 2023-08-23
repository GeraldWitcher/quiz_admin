import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000'


const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,

    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
    }
})


export default axiosInstance