import axios from 'axios';
import {
  AXIOS_DEFAULT_CONFIG,
  requestSuccessFn,
  requestFailFn,
  responseSuccessFn,
  responseFailFn,
} from '@/config';

const axiosInstance = axios.create(AXIOS_DEFAULT_CONFIG);

// 注入请求拦截
axiosInstance.interceptors.request.use(requestSuccessFn, requestFailFn);

// 注入响应拦截
axiosInstance.interceptors.response.use(responseSuccessFn, responseFailFn);

export default axiosInstance;
