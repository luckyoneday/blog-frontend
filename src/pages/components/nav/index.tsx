import * as React from "react"
import { Layout, Menu, message, Modal } from "antd"
import { Link } from "react-router-dom"
import { ClickParam } from "antd/lib/menu"
import axios from "@utils/axios"
import Api from "@api/index"
import { ResponseProps } from "@interface/index"
import FormModal from "../login"
import Styles from "./index.module.scss"

const { Header } = Layout
const { useEffect, useState } = React

export default function NavComponent(props: any) {
  const [route, setRoute] = useState("home")
  const [modalShow, setModalShow] = useState(false)
  const [modalType, setModalType] = useState("login")
  const [user, setUser] = useState({ userId: 0, userName: "", isLogin: false })

  useEffect(() => {
    axios
      .get("/userInfo")
      .then((res: { data: ResponseProps; status: number }) => {
        if (res.status === 200 && res.data.success) {
          setUser(res.data.data)
        }
      })
      .catch(console.log)
  }, [])

  const handleLogout = () => {
    Modal.confirm({
      title: "确认退出登录？",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        Api.logout()
          .then((res: { data: ResponseProps; status: number }) => {
            if (res.status === 200 && res.data.success) {
              message.success("退出登录成功", 1, () => {
                window && window.location.replace("/")
              })
            }
          })
          .catch(console.error)
      }
    })
  }

  return (
    <Header className={Styles.header}>
      <div className={Styles.logo}></div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={route}
        style={{ lineHeight: "64px" }}
        onClick={(e: ClickParam) => {
          setRoute(e.key)
        }}
      >
        <Menu.Item key="home">
          <Link to="/">首页</Link>
        </Menu.Item>
        {user.isLogin ? (
          <Menu.Item key="create">
            <Link to="/create">写文章</Link>
          </Menu.Item>
        ) : null}
        {user.isLogin ? (
          <Menu.SubMenu title="我的">
            <Menu.Item key="userIndex">我的主页</Menu.Item>
            <Menu.Item key="logout" onClick={handleLogout}>
              登出
            </Menu.Item>
          </Menu.SubMenu>
        ) : (
          <>
            <span
              onClick={() => {
                setModalShow(true)
                setModalType("login")
              }}
            >
              登录
            </span>
            <span
              onClick={() => {
                setModalShow(true)
                setModalType("signUp")
              }}
            >
              注册
            </span>
          </>
        )}
      </Menu>
      <FormModal
        modalType={modalType}
        visible={modalShow}
        onHide={() => setModalShow(false)}
        onChangeModalType={(value: string) => setModalType(value)}
      />
    </Header>
  )
}
