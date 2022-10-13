import { useEffect } from 'react';
import axiosInstance from '../axios';


function Logout() {
    useEffect(() => {
        axiosInstance.post('account/logout/', {
            refresh: localStorage.getItem('refresh_token'),
        });

        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        axiosInstance.defaults.headers['Authorization'] = null;

        window.location.href = '/';
    });
}

export default Logout;