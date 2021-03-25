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
          <App staticContext={null} __onedayInitData__={window.__ONEDAY_INIT_DATA__} />
        </BrowserRouter>
      </AppContainer>,
      root
    )
  })
}

const renderMethod = (module as any).hot ? ReactDOM.render : ReactDOM.hydrate
renderMethod(
  <BrowserRouter>
    <App staticContext={null} __onedayInitData__={window.__ONEDAY_INIT_DATA__} />
  </BrowserRouter>,
  root
)
