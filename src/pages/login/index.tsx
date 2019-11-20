import * as React from 'react'
import axios from '../../utils/axios'
import Styles from './index.module.scss'

export default class LoginPage extends React.Component {
  state = {
    userName: '',
    passWord: ''
  }

  handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    this.setState({ userName: value })
  }

  handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    this.setState({ passWord: value })
  }

  handleSubmit = (e: React.MouseEvent) => {
    const { userName, passWord } = this.state
    e.preventDefault()
    const postData = { userName, passWord }
    axios.post('/login', postData).then((res) => {
      console.log(res)
    }).catch(console.error)
    console.log(this.state.userName, this.state.passWord)
  }

  render() {
    const { userName, passWord } = this.state
    return (
      <section className={Styles.section}>
        <label>用户名</label><input type="text" value={userName} onChange={this.handleChangeUserName} />
        <label>密码</label><input type="password" value={passWord} onChange={this.handleChangePassword} />
        <button type="submit" onClick={this.handleSubmit}>登录</button>
      </section>
    )
  }
}

