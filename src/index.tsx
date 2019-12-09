import * as React from "react"
import * as ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { AppContainer } from "react-hot-loader"
import App from "./App"

const root = document.getElementById("root")
if ((module as any).hot) {
  ;(module as any).hot.accept(() => {
    ReactDOM.render(
      <AppContainer>
        <BrowserRouter>
          <App staticContext={null} />
        </BrowserRouter>
      </AppContainer>,
      root
    )
  })
}

ReactDOM.hydrate(
  <BrowserRouter>
    <App staticContext={null} />
  </BrowserRouter>,
  root
)
