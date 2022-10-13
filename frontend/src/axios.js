import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    timeout: 5000,
    headers: {
        Authorization: localStorage.getItem('access_token')
            ? 'Bearer ' + localStorage.getItem('access_token')
            : null,
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error){
        const originalRequest = error.config;

        if (error.response.status === 401 &&
            originalRequest.url === axiosInstance.baseURL + 'token-refresh/'){
                window.location.href = '/user/login';
                return Promise.reject(error);
            }

        if (error.response.data.code === 'token_not_valid' &&
            error.response.status === 401 &&
            error.response.statusText === 'Unauthorized'){
                const refresh = localStorage.getItem('refresh_token');

                if (refresh){
                    const tokenPart = JSON.parse(atob(refresh.split('.')[1]));
                    const now = Math.ceil(Date.now() / 1000);

                    if(tokenPart.exp > now){
                        return axiosInstance
                            .post('account/token-refresh/', {refresh: refresh})
                            .then((response) => {
                                localStorage.setItem('access_token', response.data.access);

                                axiosInstance.defaults.headers['Authorization'] =
                                    'Bearer ' + response.data.access;
                                originalRequest.headers['Authorization'] =
                                    'Bearer ' + response.data.access;
                                
                                return axiosInstance(originalRequest);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    } else {
                        console.log('Please log back in again.');
                        window.location.href = '/user/login';
                    }
                } else {
                    console.log('Refresh token is not available');
                    window.location.href = '/user/login';
                }
            }

        return Promise.reject(error);
    }
)

export default axiosInstance;