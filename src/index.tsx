import * as React from "react"
import * as ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import App from "./App"

ReactDOM.hydrate(
  <BrowserRouter>
    <App staticContext={null} />
  </BrowserRouter>,
  document.getElementById("root")
)
