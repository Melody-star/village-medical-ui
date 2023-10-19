import axios from 'axios';
import proxy from '../config/host';
import { MessagePlugin } from 'tdesign-vue';

const env = import.meta.env.MODE || 'development';

const API_HOST = env === 'mock' ? '/' : proxy[env].API; // 如果是mock模式 就不配置host 会走本地Mock拦截

const CODE = {
  LOGIN_TIMEOUT: 1000,
  REQUEST_SUCCESS: 200,
  REQUEST_FOBID: 1001,
};

const instance = axios.create({
  baseURL: API_HOST,
  timeout: 1000,
  withCredentials: true,
});

// eslint-disable-next-line
// @ts-ignore
// axios的retry ts类型有问题
instance.interceptors.retry = 3;

instance.interceptors.request.use((config) => config);

instance.interceptors.response.use(
  (response) => {
    if (response.status === 200 || 201) {
      return response.data.data;
    }
  },
  (err) => {
    let message = '';
    let status = err.response.status;
    switch (status) {
      case 401:
        message = 'Token已过期';
        break;
      case 403:
        message = '权限不足';
        break;
      case 404:
        message = '接口请求地址错误';
        break;
      case 500:
        message = '服务器错误';
        break;
      case 405:
        message = '密码错误';
        break;
      default:
        message = '网络错误';
        break;
    }
    // $message('warning', message);
    MessagePlugin.error(message);
    return Promise.reject(err);
  },
);

export default instance;
