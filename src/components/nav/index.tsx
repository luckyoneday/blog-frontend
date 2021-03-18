import * as React from "react"
import { Menu, message, Modal, Button } from "antd"
import { Link, useLocation } from "react-router-dom"

import Api from "@api/index"
import DraftApi from "@api/draft"
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
        .then(res => {
          if (res.success && res.data) {
            setUser({ userName: res.data.userName, isLogin: true })
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
          .then(res => {
            if (res.success) {
              message.success("退出登录成功", 1, () => {
                window && window.location.replace("/home")
              })
            }
          })
          .catch(console.error)
      }
    })
  }

  const handleCreateDraft = async () => {
    try {
      const res = await DraftApi.create({ title: "", content: "" })
      if (res.success) {
        const hash = res.data.draftHash
        window.open(`/edit/${hash}`)
      }
    } catch (e) {
      message.error("创建失败，请稍后重试" + e)
    }
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
          <Menu.Item key="1">
            {user.isLogin ? <Button onClick={handleCreateDraft}>创建文章</Button> : null}
          </Menu.Item>
          <Menu.Item key="/home">
            <Link to="/home">首页</Link>
          </Menu.Item>
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
              <Menu.Item
                key="login"
                className={Styles.handle}
                onClick={() => {
                  setModalShow(true)
                  setModalType("login")
                }}
              >
                登录
              </Menu.Item>
              <Menu.Item
                key="sign"
                className={Styles.handle}
                onClick={() => {
                  setModalShow(true)
                  setModalType("signUp")
                }}
              >
                注册
              </Menu.Item>
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
