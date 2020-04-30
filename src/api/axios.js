import qs from 'qs';
import axios from 'axios';
import baseUrl from './baseUrl';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

let serviceStatus = true;
const service = axios.create({
  baseURL: baseUrl,
  timeout: 30000
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  (error) => Promise.reject(error)
);

// response interceptor
service.interceptors.response.use(
  ({data}) => {
    const {success, message, code} = data;
    if (success) {
      if (!serviceStatus) {
        serviceStatus = true
      }
      return data
    }
    switch (code) {
      case -1:
        // Message({message: message || '系统异常', type: 'error', duration: 1500});
        // MessageBox.alert(message || '系统异常', '错误信息',  {
        //   type: 'error',
        //   confirmButtonText: '确定',
        // })
        return Promise.reject(message);
      default:
        return Promise.reject({code: -2, data: data});
    }
  },
  (error) => Promise.reject(error)
);

export default service
