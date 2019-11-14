import * as React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Login from './login'
import SignUp from './signUp'

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/signUp" component={SignUp}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

function Index() {
  return (<div>首页</div>)
}