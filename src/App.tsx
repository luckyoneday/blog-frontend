import * as React from "react"
import { StaticRouterContext, Redirect } from "react-router"
import { Switch, Route, useLocation } from "react-router-dom"
import { needRedirectUrl, UNAUTHORIZED_CODE } from "@utils/axios"

import Api from "./api"
import Nav from "./components/nav"
import routes from "./routes"
import "./App.less"

const { useEffect } = React
interface AppProps {
  staticContext: StaticRouterContext | null
  __onedayInitData__?: any
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
      {routes.map((item, index) => {
        const noNavPage = item.path.indexOf("/edit") === -1
        return (
          <Route path={item.path} key={index} exact={item.exact}>
            {noNavPage ? (
              <div id="oneday-blog-nav">
                <Nav staticContext={props.staticContext} />
              </div>
            ) : null}
            <div id={noNavPage ? "oneday-blog-body" : "oneday-blog-body-full"}>
              {
                <item.component
                  staticContext={props.staticContext}
                  __onedayInitData__={props.__onedayInitData__ ?? {}}
                />
              }
            </div>
            <div id="oneday-blog-footer">oneday blog @2021 by 武当王也</div>
          </Route>
        )
      })}
      <Redirect to="/home" />
    </Switch>
  )
}
