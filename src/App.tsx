import * as React from "react"
import { StaticRouterContext, Redirect } from "react-router"
import { Switch, Route } from "react-router-dom"
import Nav from "./pages/components/nav"
import routes from "./routes"
import "./App.less"

interface AppProps {
  staticContext: StaticRouterContext | null
}

export default function App(props: AppProps) {
  return (
    <Switch>
      {routes.map((item, index) => (
        <Route path={item.path} key={index} exact={item.exact}>
          {item.path.indexOf("/create") === -1 ? (
            <div id="oneday-blog-nav">
              <Nav staticContext={props.staticContext} />
            </div>
          ) : null}
          <div id="oneday-blog-body">{<item.component staticContext={props.staticContext} />}</div>
          <div id="oneday-blog-footer">oneday blog @2019 by 武当王也</div>
        </Route>
      ))}
      <Redirect to="/home" />
    </Switch>
  )
}
