import * as React from "react"
import { StaticRouterContext, Redirect } from "react-router"
import { Switch, Route } from "react-router-dom"
import Nav from "./pages/components/nav"
import routes from "./routes"
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
          {routes.map((item, index) => (
            <Route path={item.path} component={item.component} key={index}></Route>
          ))}
          <Redirect to="/home" />
        </Switch>
      </div>
      <div id="oneday-blog-footer">oneday blog @2019 by 武当王也</div>
    </>
  )
}
