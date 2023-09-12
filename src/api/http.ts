import axios, { AxiosError } from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse
} from 'axios'
import NProgress from '@/config/nprogress'
import { LOGIN_URL } from '@/config/index'
import { message } from 'ant-design-vue'
import { useUserStore } from '@/stores/modules/user'
import router from '@/router'

// 请求响应参数（不包含data）
export interface IResult {
  code: number
  msg: string
}
// 请求响应参数（包含data）
export interface IResultData<T = any> extends IResult {
  data: T
}

// 请求配置
export enum ResultEnum {
  SUCCESS = 0,
  ERROR = 500,
  OVERDUE = 401,
  TIMEOUT = 30000,
  TYPE = 'success'
}
// 请求方法
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

// 校验网络请求状态码
export const checkStatus = (status: number) => {
  switch (status) {
    case 400:
      message.error('请求失败！请您稍后重试')
      break
    case 401:
      message.error('登录失效！请您重新登录')
      break
    case 403:
      message.error('当前账号无权限访问！')
      break
    case 404:
      message.error('你所访问的资源不存在！')
      break
    case 405:
      message.error('请求方式错误！请您稍后重试')
      break
    case 408:
      message.error('请求超时！请您稍后重试')
      break
    case 500:
      message.error('服务异常！')
      break
    case 502:
      message.error('网关错误！')
      break
    case 503:
      message.error('服务不可用！')
      break
    case 504:
      message.error('网关超时！')
      break
    default:
      message.error('请求失败！')
  }
}

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  noLoading?: boolean
}

const config = {
  // 默认地址请求地址，可在 .env.** 文件中修改
  baseURL: import.meta.env.VITE_API_URL as string,
  // 设置超时时间
  timeout: ResultEnum.TIMEOUT as number,
  // 跨域时候允许携带凭证
  withCredentials: true
}

class RequestHttp {
  service: AxiosInstance
  public constructor(config: AxiosRequestConfig) {
    // instantiation
    this.service = axios.create(config)

    /**
     * @description 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验(JWT) : 接受服务器返回的 token,存储到 pinia/本地储存当中
     */
    this.service.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        const userStore = useUserStore()
        // 当前请求不需要显示 loading，在 api 服务中通过指定的第三个参数: { noLoading: true } 来控制
        config.noLoading || NProgress.start()
        if (config.headers && typeof config.headers.set === 'function') {
          config.headers.set('x-access-token', userStore.token)
        }
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    /**
     * @description 响应拦截器
     *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response
        const userStore = useUserStore()
        NProgress.done()
        // 登陆失效
        if (data.code == ResultEnum.OVERDUE) {
          userStore.setToken('')
          router.replace(LOGIN_URL)
          message.error(data.msg)
          return Promise.reject(data)
        }
        // 全局错误信息拦截（防止下载文件的时候返回数据流，没有 code 直接报错）
        else if (data.code && data.code !== ResultEnum.SUCCESS) {
          message.error(data.msg)
          return Promise.reject(data)
        }
        // 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
        else {
          return data
        }
      },
      async (error: AxiosError) => {
        const { response } = error
        NProgress.done()
        // 请求超时 && 网络错误单独判断，没有 response
        if (error.message.indexOf('timeout') !== -1) message.error('请求超时！请您稍后重试')
        if (error.message.indexOf('Network Error') !== -1) message.error('网络错误！请您稍后重试')
        // 根据服务器响应的错误状态码，做不同的处理
        if (response) checkStatus(response.status)
        // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
        if (!window.navigator.onLine) router.replace('/500')
        return Promise.reject(error)
      }
    )
  }

  /**
   * @description 常用请求方法封装
   */
  get<T>(url: string, params?: object, _object = {}): Promise<IResultData<T>> {
    return this.service.get(url, { params, ..._object })
  }
  post<T>(url: string, data?: object | string, _object = {}): Promise<IResultData<T>> {
    return this.service.post(url, data, _object)
  }
  put<T>(url: string, params?: object, _object = {}): Promise<IResultData<T>> {
    return this.service.put(url, params, _object)
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<IResultData<T>> {
    return this.service.delete(url, { params, ..._object })
  }
  download(url: string, params?: object, _object = {}): Promise<BlobPart> {
    return this.service.post(url, params, { ..._object, responseType: 'blob' })
  }
}

export default new RequestHttp(config)
