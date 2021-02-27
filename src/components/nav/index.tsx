import * as React from "react"
import { Menu, message, Modal, Button } from "antd"
import { Link, useLocation } from "react-router-dom"
import Api from "@api/index"
import { ResponseProps } from "@interface/index"
import FormModal from "../login"
import WithStylesHoc from "../withStylesHOC"
import Styles from "./index.module.scss"

const { useEffect, useState } = React

function NavComponent() {
  let location = useLocation().pathname
  if (location === "/") location = "/home"
  const [route, setRoute] = useState([location])
  const [modalShow, setModalShow] = useState(false)
  const [modalType, setModalType] = useState("login")
  const [user, setUser] = useState({ userName: "", isLogin: false })

  useEffect(() => {
    const isLogin = sessionStorage.getItem("isLogin")
    if (isLogin) {
      Api.getUserInfo()
        .then((res: { data: ResponseProps; status: number }) => {
          if (res.status === 200 && res.data.success) {
            setUser({ userName: res.data.data.userName, isLogin: true })
          }
        })
        .catch(console.log)
    }
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
    <header className={Styles.header}>
      <div className={Styles.middleBlock}>
        <div className={Styles.logo}>youting</div>
        <Menu
          mode="horizontal"
          selectedKeys={route}
          className={Styles.menu}
          onClick={e => {
            setRoute([e.key as string])
          }}
        >
          <Menu.Item key="/home">
            <Link to="/">首页</Link>
          </Menu.Item>
          {user.isLogin ? (
            <Button
              onClick={() => {
                window.open("/create")
              }}
            >
              创建文章
            </Button>
          ) : null}
          {user.isLogin ? (
            <Menu.SubMenu title="我的">
              <Menu.Item key="/user">
                <Link to="/user">我的主页</Link>
              </Menu.Item>
              <Menu.Item key="logout" onClick={handleLogout}>
                登出
              </Menu.Item>
            </Menu.SubMenu>
          ) : (
            <>
              <span
                key="login"
                className={Styles.handle}
                onClick={() => {
                  setModalShow(true)
                  setModalType("login")
                }}
              >
                登录
              </span>
              <span
                key="sign"
                className={Styles.handle}
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
      </div>
      <FormModal
        modalType={modalType}
        visible={modalShow}
        onHide={() => setModalShow(false)}
        onChangeModalType={(value: string) => setModalType(value)}
      />
    </header>
  )
}

export default WithStylesHoc(NavComponent, Styles)
