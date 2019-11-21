import * as React from "react"
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom"
import Login from "./login"
import Logout from "./logout"
import SignUp from "./signUp"
import Home from "./home"
import "antd/dist/antd.css"
import "./App.css"

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/signUp" component={SignUp}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/home" component={Home}></Route>
          <Redirect to="/login" />
        </Switch>
      </div>
    </BrowserRouter>
  )
}
