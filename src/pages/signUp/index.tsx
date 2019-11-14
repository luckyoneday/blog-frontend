import * as React from 'react'
import axios from 'axios'
import './index.scss'

export default class SignUpPage extends React.Component {
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
    axios.post('http://localhost:2333/signUp', postData).then((res) => {
      console.log(res)
    }).catch(console.error)
  }

  render() {
    const { userName, passWord } = this.state
    return (
      <section>
        <label>用户名</label><input type="text" value={userName} onChange={this.handleChangeUserName} />
        <label>密码</label><input type="password" value={passWord} onChange={this.handleChangePassword} />
        <input type="submit" onClick={this.handleSubmit} />
      </section>
    )
  }
}

