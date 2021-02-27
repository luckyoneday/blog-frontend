import * as React from "react"
import { StaticRouterContext, Redirect, useHistory } from "react-router"
import { Switch, Route, useLocation } from "react-router-dom"
import { needRedirectUrlSet, UNAUTHORIZED_CODE } from "@utils/axios"

import Api from "./api"
import Nav from "./components/nav"
import routes from "./routes"
import "./App.less"

const { useEffect } = React
interface AppProps {
  staticContext: StaticRouterContext | null
}

export default function App(props: AppProps) {
  const location = useLocation()
  const history = useHistory()

  const pageListener = async () => {
    if (!document.hidden) {
      try {
        await Api.verifyLogin()
        sessionStorage.setItem("isLogin", "true")
      } catch (e) {
        sessionStorage.setItem("isLogin", "false")
        if (needRedirectUrlSet.has(location.pathname) && e.code === UNAUTHORIZED_CODE) {
          history.push("/home")
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
        const noNavPage = item.path.indexOf("/create") === -1

        return (
          <Route path={item.path} key={index} exact={item.exact}>
            {noNavPage ? (
              <div id="oneday-blog-nav">
                <Nav staticContext={props.staticContext} />
              </div>
            ) : null}
            <div id={noNavPage ? "oneday-blog-body" : "oneday-blog-body-full"}>
              {<item.component staticContext={props.staticContext} />}
            </div>
            <div id="oneday-blog-footer">oneday blog @2021 by 武当王也</div>
          </Route>
        )
      })}
      <Redirect to="/home" />
    </Switch>
  )
}
