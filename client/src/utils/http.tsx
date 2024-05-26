import axios from "axios";
import Cookies from "js-cookie";

const http = axios.create({
    baseURL: 'http://localhost:3001/',
})

http.interceptors.request.use(request => {
    const access_token = localStorage.getItem('user_access_token')

    const isCookies = Cookies.get("token");

    if (access_token) {
        request.headers.Authorization = `Bearer ${access_token}`
    }
    if (isCookies && !access_token) {
        request.headers.Authorization = `Bearer ${isCookies}`
    }

    return request
})

export default http