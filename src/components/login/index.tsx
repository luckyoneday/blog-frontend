import * as React from "react"
import { AxiosResponse } from "axios"
import { ResponseProps } from "@interface/index"
import Api from "@api/index"
import { Form, Input, Button, message, Modal } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import Styles from "./index.module.scss"

const { useEffect } = React
interface IFormProps {
  visible: boolean
  modalType: string
  onHide: () => void
  onChangeModalType: (value: string) => void
}

function LoginPage(props: IFormProps) {
  const { visible, modalType, onHide, onChangeModalType } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.resetFields()
  }, [modalType])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const isLogin = modalType === "login"
    const methodName = isLogin ? "login" : "signUp"

    form.validateFields().then(values => {
      Api[methodName](values)
        .then((res: AxiosResponse<ResponseProps>) => {
          if (res.data.success) {
            message.success(isLogin ? "登录成功" : "注册成功，去登录", 1, () => {
              if (isLogin) {
                onHide()
                window.location.href = "/home"
              } else onChangeModalType("login")
            })
          }
        })
        .catch((error: ResponseProps) => {
          message.error(error.message + "，请重新输入", 1, () => {
            form.resetFields()
          })
        })
    })
  }

  return (
    <Modal
      title={modalType === "login" ? "登录" : "注册"}
      visible={visible}
      width={360}
      footer={null}
      onCancel={onHide}
    >
      <div className={Styles.formSection}>
        <Form onFinish={handleSubmit} className={Styles.form} form={form}>
          <Form.Item name="userName" rules={[{ required: true, message: "请输入用户名!" }]}>
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="用户名"
            />
          </Form.Item>
          <Form.Item name="passWord" rules={[{ required: true, message: "请输入密码!" }]}>
            <Input
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="密码"
            />
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

export default LoginPage
