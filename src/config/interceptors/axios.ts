/**
 * 定义 axios request， response的拦截器
 */
import { AxiosError } from 'axios';
import { Message } from 'element-ui';
import { CONSOLE_REQUEST_ENABLE, CONSOLE_RESPONSE_ENABLE, __DEV__ } from '../base';

export function requestSuccessFn(config: any) {
  if (__DEV__ && CONSOLE_REQUEST_ENABLE) {
    console.info('requestInterceptorFn: ', `url: ${config.url}`, config);
  }

  // 自定义请求拦截逻辑，可以处理权限，请求发送监控等

  return config;
}

export function requestFailFn(error: AxiosError) {
  // 自定义发送请求失败逻辑， 断网，请求发送监控等

  return Promise.reject(error);
}

export function responseSuccessFn(response: any) {
  // 自定义响应成功逻辑，全局拦截接口。根据不同业务做不同处理， 响应成功监控等
  /**
   * 假设请求体为：
   * {
   *  code: 0,
   *  msg: '',
   *  data: null
   * }
   */
  if (__DEV__ && CONSOLE_RESPONSE_ENABLE) {
    console.info('responseInterceptorFn: ', response);
  }

  const resData = response.data;
  const { code } = resData;

  switch (code) {
    case 0: // 业务成功，直接进入成功回调
      return resData.data;
    case 1111:
      // 如果业务失败，根据不同 code 做不同处理
      // 比如最常见的授权过期跳转登录
      // 特定弹窗
      // 跳转特定页面等
      // location.href = '';
      return;
    default:
      // 业务中还会有一些特殊 code 逻辑， 可以在这里做统一处理，也可以下发到业务层
      if (!response.config.noShowDefaultError) {
        window.GLOBAL.vbus.$emit('global.error.show', resData.msg);
      }
      return Promise.reject(resData);
  }
}

function errorHandler(error: any) {
  if (!error) {
    return '未知错误';
  } else if (!error.response) {
    return '服务端连接失败';
  } else if (error.status) {
    // 根据不同的状态码，返回不同的错误信息
    return error.status;
  } else if (error.response.status) {
    // 根据不同的状态码，返回不同的错误信息
    return error.response.status;
  }

  return '未知错误';
}

export function responseFailFn(error: AxiosError) {
  // 响应失败， 可根据 error.message 和 error.response.status 来做监控处理
  const msg = errorHandler(error);

  Message({
    type: 'error',
    message: msg,
    showClose: true,
    duration: undefined,
  });

  return Promise.reject(error);
}
