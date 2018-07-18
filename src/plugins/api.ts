import axios from './axios';
import pick from 'lodash/pick';
import isEmpty from 'lodash/isEmpty';

import { assert } from '@/utils/tools';
import { API_DEFAULT_CONFIG } from '@/config';
import API_CONFIG from '@/service/api';
import { ApiMakerOptions, ApiBuilderOptions } from '@/types/interface/api';

class ApiMaker {
  api: any;

  constructor(options: ApiMakerOptions) {
    this.api = {};
    this.apiBuilder(options);
  }

  apiBuilder({
    config = {},
    mock = false,
    debug = false,
    mockBaseURL = '',
  }: ApiMakerOptions = {}) {
    Object.keys(config).map((namespace) => this._apiSingleBuilder({
      namespace,
      mock,
      mockBaseURL,
      debug,
      config: config[namespace],
    }));
  }

  _apiSingleBuilder({
    namespace,
    config = [],
    mock = false,
    debug = false,
    mockBaseURL = '',
  }: ApiBuilderOptions) {
    config.forEach((api) => {
      const { name, desc, params = [], method, path, mockPath, query } = api;
      const originUrl = mock ? mockPath : path;
      const baseURL = mock ? mockBaseURL : process.env.BASE_URL;

      if (debug) {
        assert(name, `${originUrl} : 接口 name 属性不能为空`);
      }

      if (!this.api[namespace]) {
        this.api[namespace] = {};
      }

      this.api[namespace][name] = new Proxy(() => {}, {
        apply: (target, thisArg, argumentsList) => {
          const [outerParams, outerOptions] = argumentsList;
          const data = isEmpty(outerParams) ? {} : pick(outerParams, params);
          return axios(_normoalize(Object.assign({}, {
            url: this._getUrlByQuery(originUrl, query, outerParams),
            desc,
            baseURL,
            method,
          }, outerOptions), data));
        },
      });
    });
  }

  /**
   * Gets url by query 根据参数数组获取真实的 url
   * @param [originUrl] 原始url : /a/:b/c
   * @param [query] 在 url 中传递的参数数组 : ['b']
   * @param [data] 当 api 调用时传递过来的真实的值
   * @return [url] 返回真实的 url
   */
  _getUrlByQuery(originUrl: string = '', query: string[] = [], data: any = {}) {
    let url = originUrl.indexOf('/') === 0 ? originUrl : `/${originUrl}`;
    query.forEach((key) => {
      if (data[key] !== 0 && !data[key]) {
        throw new Error('you need a path parameter!');
      }
      url = url.replace(`:${key}`, data[key]);
    });

    return url;
  }
}

function _normoalize(options: any, data: any) {
  if (options.method === 'POST') {
    options.data = data;
  } else if (options.method === 'GET') {
    options.params = data;
  }

  return options;
}

export default new ApiMaker({
  config: API_CONFIG,
  ...API_DEFAULT_CONFIG,
}).api;
