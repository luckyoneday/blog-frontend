import axios from "@utils/axios"

interface FormProps {
  userName: string
  passWord: string
}

export default class Api {
  static login = (postData: FormProps) => {
    return axios.post("/login", postData)
  }

  static logout = () => {
    return axios.get("/logout")
  }

  static signUp = (postData: FormProps) => {
    return axios.post("/signUp", postData)
  }

  static getUserInfo = () => {
    return axios.get("/userInfo")
  }
}
