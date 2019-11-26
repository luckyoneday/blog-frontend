import * as React from "react"
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom"
import Nav from "./components/nav"
import Home from "./home"
import Create from "./create"
import User from "./user"
import "antd/dist/antd.css"
import "./App.css"

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route path="/" component={Home}></Route>
        <Route path="/create" component={Create}></Route>
        <Route path="/user" component={User}></Route>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  )
}
