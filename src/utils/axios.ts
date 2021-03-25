import axios, { AxiosResponse } from "axios"
import { message } from "antd"
import { ResponseProps } from "../interface"

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? "http://localhost:2333": ''
axios.defaults.withCredentials = true
axios.defaults.timeout = 10000

export const needRedirectUrl = ["/edit", "/user"]
export const UNAUTHORIZED_CODE = 40001
export const homePageNeedCheckApi = ["/draft"]

axios.interceptors.response.use(
  (response: AxiosResponse<ResponseProps>): Promise<AxiosResponse<ResponseProps>> => {
    const request = response.config || {}
    const requestUrl = request.url || ""

    const filtered = homePageNeedCheckApi.filter(t => requestUrl.includes(t))
    const needRedirectAtHomePage = filtered.length > 0 && location.pathname === "/home"

    if (response.status === 200 && response.data.success === true) {
      return Promise.resolve(response.data as any)
    } else {
      if (
        (needRedirectUrl.filter(t => location.pathname.includes(t)).length > 0 ||
          needRedirectAtHomePage) &&
        response.data.code === UNAUTHORIZED_CODE
      ) {
        message.error("登录失效", () => {
          location.href = "/home"
        })
      }
      return Promise.reject(response.data)
    }
  },
  error => {
    console.error("request  error ", error)
    return Promise.reject(error)
  }
)

export const post = (url: string, data = {}, config = {}): Promise<ResponseProps> => {
  return axios.post(url, data, config)
}

export const get = (url: string, data = {}, config = {}): Promise<ResponseProps> => {
  return axios.get(url, { params: data, ...config })
}

export default axios
