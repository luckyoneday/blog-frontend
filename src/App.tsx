import * as React from "react"
import { StaticRouterContext, Redirect } from "react-router"
import { Switch, useLocation } from "react-router-dom"
import { renderRoutes } from "react-router-config"
import { needRedirectUrl, UNAUTHORIZED_CODE } from "@utils/axios"
import { OptionContextProps, ServerDataProps } from "./interface"

import Api from "./api"
import routes from "./routes"
import "./App.less"

const { useEffect } = React
export interface AppProps {
  staticContext: StaticRouterContext | null
  __onedayInitData__: ServerDataProps
  __onedayInitContext__: OptionContextProps
}

export default function App(props: AppProps) {
  const location = useLocation()

  const pageListener = async () => {
    if (!document.hidden) {
      try {
        await Api.verifyLogin()
        sessionStorage.setItem("isLogin", "true")
      } catch (e) {
        sessionStorage.setItem("isLogin", "false")
        if (
          needRedirectUrl.filter(t => location.pathname.includes(t)).length > 0 &&
          e.code === UNAUTHORIZED_CODE
        ) {
          window.location.href = "/home"
        } else {
          console.log(e)
        }
      }
    }
  }

  useEffect(() => {
    pageListener()
    // document.addEventListener("visibilitychange", pageListener)
    // return () => {
    //   document.removeEventListener("visibilitychange", pageListener)
    // }
  }, [location.pathname])

  return (
    <Switch>
      {renderRoutes(routes, props)}
      <Redirect to="/home" />
    </Switch>
  )
}
