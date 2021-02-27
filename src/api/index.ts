import axios from "@utils/axios"

interface FormProps {
  userName: string
  passWord: string
}

const prefix = "/api"
export default class Api {
  static login = (postData: FormProps) => {
    return axios.post(`${prefix}/login`, postData)
  }

  static logout = () => {
    return axios.get(`${prefix}/logout`)
  }

  static signUp = (postData: FormProps) => {
    return axios.post(`${prefix}/signUp`, postData)
  }

  static getUserInfo = () => {
    return axios.get(`${prefix}/userInfo`)
  }

  static verifyLogin = () => {
    return axios.get(`${prefix}/verifyLogin`)
  }

  static uploadImage = (postData: any) => {
    // return axios.post(`/upload/image`, postData)
    return Promise.resolve({
      ali: "https://ae01.alicdn.com/kf/Uee395003121c453db5b9e1a30b6938372.jpg",
      distribute: "https://img.rruu.net/image/6038a7222e83c",
      private: []
    })
  }
}
