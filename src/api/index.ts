import {post, get} from "@utils/axios"
import { ResponseProps } from "@interface/index"

interface FormProps {
  userName: string
  passWord: string
}

export const prefix = "/api"
export default class Api {
  static login = (postData: FormProps): Promise<ResponseProps> => {
    return post(`${prefix}/login`, postData)
  }

  static logout = (): Promise<ResponseProps> => {
    return get(`${prefix}/logout`)
  }

  static signUp = (postData: FormProps): Promise<ResponseProps>  => {
    return post(`${prefix}/signUp`, postData)
  }

  static getUserInfo = (): Promise<ResponseProps> => {
    return get(`${prefix}/userInfo`)
  }

  static verifyLogin = () => {
    return get(`${prefix}/verifyLogin`)
  }

  static uploadImage = (postData: any) => {
    // return post(`/upload/image`, postData)
    return Promise.resolve({
      ali: "https://ae01.alicdn.com/kf/Uee395003121c453db5b9e1a30b6938372.jpg",
      distribute: "https://img.rruu.net/image/6038a7222e83c",
      private: []
    })
  }
}
