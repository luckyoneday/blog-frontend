import * as React from "react"
import { AxiosResponse } from "axios"
import { ResponseProps } from "@interface/index"
import Api from "@api/index"
import { Form, Icon, Input, Button, message, Modal } from "antd"
import { FormComponentProps } from "antd/lib/form/Form"

import Styles from "./index.module.scss"

interface IFormProps {
  handleSubmit: (e: React.MouseEvent) => void
  visible: boolean
  modalType: string
  onHide: () => void
  onChangeModalType: (value: string) => void
}

class LoginPage extends React.Component<IFormProps & FormComponentProps> {
  componentDidUpdate(nextProp: IFormProps) {
    if (this.props.modalType !== nextProp.modalType) {
      this.props.form.resetFields()
    }
  }
  handleSubmit = (e: React.MouseEvent) => {
    const { modalType, onHide } = this.props
    const methodName = modalType === "login" ? "login" : "signUp"
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        Api[methodName](values)
          .then((res: AxiosResponse<ResponseProps>) => {
            if (res.data.success) {
              message.success("登录成功", 1, () => {
                onHide()
                window && window.location.replace("/")
              })
            }
          })
          .catch((error: ResponseProps) => {
            message.error(error.message + "，请重新输入", 1, () => {
              this.props.form.resetFields()
            })
          })
      }
    })
  }

  render() {
    const { visible, modalType, onHide, onChangeModalType } = this.props
    const { getFieldDecorator } = this.props.form
    return (
      <Modal
        title={modalType === "login" ? "登录" : "注册"}
        visible={visible}
        width={360}
        footer={null}
        onCancel={onHide}
      >
        <div className={Styles.formSection}>
          <Form onSubmit={this.handleSubmit} className={Styles.form}>
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
              <Button type="primary" htmlType="submit" className={Styles.loginBtn}>
                {modalType === "login" ? "登录" : "注册"}
              </Button>
              {modalType === "login" ? (
                <div className={Styles.goSignUp}>
                  没有账号？点击
                  <Button type="link" onClick={() => onChangeModalType("signUp")}>
                    注册
                  </Button>
                </div>
              ) : (
                <div className={Styles.goSignUp}>
                  已有账号？点击
                  <Button type="link" onClick={() => onChangeModalType("login")}>
                    登录
                  </Button>
                </div>
              )}
            </Form.Item>
          </Form>
        </div>
      </Modal>
    )
  }
}

export default Form.create({ name: "normal_login" })(LoginPage)
