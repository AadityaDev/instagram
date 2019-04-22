import axios from 'axios';
import baseDomain from './config.js'
import { notification } from 'antd';

// import { Toast } from 'antd-mobile';

const instance = axios.create({
    xsrfCookieName: 'xsrf-token',
    baseURL: baseDomain
});

// interceptor
// instance.interceptors.request.use(function(config){
//         if(commonInfo.hasLoading){
//             Toast.loading('', 3);
//         }

//         return config;
//     },function(error){
//         Toast.hide();
//         return Promise.reject(error);
// });

instance.interceptors.response.use(function (response) {
    if (response.data.success) {
        return Promise.resolve(response.data);
    } else {
        notification['error']({
            message: response.data.message
        })
        return  Promise.reject({
            message: response.data.message
        })
    }

    // if (!response.data.success && response.data.messageCode === globalCode.timeout) {
    //     Toast.hide();
    //     Toast.info("timeout", 1);
    //     createHashHistory().push('/login');

    //     return  Promise.reject({
    //         messageCode: 'timeout'
    //     })
    // }

    // if (response.data.success && response.data.messageCode === globalCode.busyCode) {
    //     Toast.hide();
    //     Toast.info(response.data.message, 1);
    //     return  Promise.reject({
    //         messageCode: 'netError'
    //     })
    // }

}, function (error) {
    try {
        notification['error']({
            message: error.response.data.message || 'error'
        });
        // error
        if (error.response.status === 401) {
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        }
    } catch (err) {
        notification['error']({
            message: 'some error'
        });
    }
    return Promise.reject({
        messageCode: 'sysError'
    });
});

export default instance;