import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:2333'
axios.defaults.timeout = 10000

axios.interceptors.response.use(response => {
  if (response.status === 200) {
    // 未登录，跳转登录页
    if (response.data.code === 511) {
      window && window.location.replace('/login')
    }

  }
  return Promise.resolve(response)
}, error => {
  console.error('axios error ', error)
})

export default axios