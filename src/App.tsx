import * as React from "react"
import { StaticRouterContext, Redirect } from "react-router"
import { Switch, Route } from "react-router-dom"
import Nav from "./pages/components/nav"
import Home from "./pages/home"
import Create from "./pages/create"
import User from "./pages/user"
// import "antd/dist/antd.css"
import "./App.css"

interface AppProps {
  staticContext: StaticRouterContext | null
}
export default function App(props: AppProps) {
  return (
    <>
      <div id="oneday-blog-nav">
        <Nav staticContext={props.staticContext} />
      </div>
      <div id="oneday-blog-body">
        <Switch>
          <Route path="/create" component={Create}></Route>
          <Route path="/user" component={User}></Route>
          <Route path="/home" component={Home}></Route>
          <Redirect to="/home" />
        </Switch>
      </div>
      <div id="oneday-blog-footer">oneday blog @2019 by 武当王也</div>
    </>
  )
}
