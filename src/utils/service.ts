import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

// 创建实例时设置配置的默认值
const service: AxiosInstance = axios.create({
  // baseURL: 'https://music.qier222.com/api/',
  // baseURL: 'https://dselegent-music.vercel.app/',
  baseURL: 'https://dselegentmusic.cf/',
  // baseURL: 'http://localhost:3000/',
  // baseURL: 'https://music.dselegent.cf/',
  // baseURL: 'http://admin.dselegent.cf:3000/',
  timeout: 5000,
  // 携带cookie
  withCredentials: true,
})

// 全局
service.defaults.transformRequest = [
  function (data) {
    let ret = ''
    for (const it in data) ret += `${encodeURIComponent(it)}=${encodeURIComponent(data[it])}&`
    return ret
  },
]

// 添加请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 在发送请求之前做些什么
    nprogress.start()
    if (config && config.headers) {
      // axios实例拦截响应
      config.headers.post['Access-Control-Allow-Origin-Type'] = '*'
    }
    config.params = {
      realIP: '211.161.244.70',
      ...config.params,
    }
    return config
  },
  // 对请求错误做些什么
  (error: AxiosError) => {
    ElMessage.error(error.message)
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    nprogress.done()
    const { code, message } = response.data
    // 根据自定义错误码判断请求是否成功
    if (code === 200) {
      // 将组件用的数据返回
      return response.data
    } else {
      // 处理业务错误。
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error: AxiosError) => {
    nprogress.done()
    // 处理 HTTP 网络错误
    let message = ''
    // HTTP 状态码
    const status = error.response?.status
    switch (status) {
      case 401:
        message = '401-token 失效，请重新登录'
        // 这里可以触发退出的 action
        break
      case 403:
        message = '403-拒绝访问'
        break
      case 404:
        message = '404-请求地址错误'
        break
      case 500:
        message = '500-服务器故障'
        break
      default:
        message = '网络连接故障'
    }
    ElMessage.error(message)
    return Promise.reject(error)
  },
)

/* 导出封装的请求方法 */
export const http = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, config)
  },

  post<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.post(url, config)
  },
}

/* 导出 axios 实例 */
export default service
