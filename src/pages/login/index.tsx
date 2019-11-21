import * as React from "react"
import { Form, Icon, Input, Button } from "antd"
import { FormComponentProps } from "antd/lib/form/Form"
import { Link } from "react-router-dom"
import axios from "../../utils/axios"

import Styles from "./index.module.scss"

interface IFormProps {
  handleSubmit: (e: React.MouseEvent) => void
}

class LoginPage extends React.Component<IFormProps & FormComponentProps> {
  handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios
          .post("/login", values)
          .then(res => {
            window && window.location.replace("/home")
          })
          .catch(console.error)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <section className={Styles.formSection}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator("userName", {
              rules: [{ required: true, message: "请输入用户名!" }]
            })(
              <Input
                prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="用户名"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("passWord", {
              rules: [{ required: true, message: "请输入密码!" }]
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                type="password"
                placeholder="密码"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
            <span className={Styles.goSignUp}>
              或者点击<Link to="/signUp">注册</Link>
            </span>
          </Form.Item>
        </Form>
      </section>
    )
  }
}

export default Form.create({ name: "normal_login" })(LoginPage)
