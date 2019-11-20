import * as React from 'react'
import axios from '../../utils/axios'

export default class LoginPage extends React.Component {

  handleLogout = (e: React.MouseEvent) => {
    e.preventDefault()
    axios.post('/logout').then((res) => {
      console.log(res)
    }).catch(console.error)
  }

  render() {
    return (
      <section>
        <button type="submit" onClick={this.handleLogout}>退出登录</button>
      </section>
    )
  }
}


