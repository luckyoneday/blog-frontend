import axios, { AxiosResponse } from "axios"
import { message } from 'antd'
import { ResponseProps } from "../interface"

axios.defaults.withCredentials = true
axios.defaults.timeout = 10000

export const needRedirectUrlSet = new Set(['/create', '/user'])
export const UNAUTHORIZED_CODE = 40001
  
axios.interceptors.response.use(
  (response: AxiosResponse<ResponseProps>): Promise<AxiosResponse<ResponseProps>> => {
    if (response.status === 200 && response.data.success === true) {
      return Promise.resolve(response)
    } else {
      if (needRedirectUrlSet.has(location.pathname) && response.data.code === UNAUTHORIZED_CODE) {
        message.error('登录失效', () => {
          location.href="/home"
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

export default axios
