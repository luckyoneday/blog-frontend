import axios, { AxiosResponse } from "axios"
import { ResponseProps } from "../interface"

axios.defaults.withCredentials = true
axios.defaults.baseURL = "http://localhost:2333"
axios.defaults.timeout = 10000

axios.interceptors.response.use(
  (response: AxiosResponse<ResponseProps>): Promise<AxiosResponse<ResponseProps>> => {
    if (response.status === 200 && response.data.success === true) {
      return Promise.resolve(response)
    } else return Promise.reject(response.data)
  },
  error => {
    console.error("request  error ", error)
    return Promise.reject(error)
  }
)

export default axios
