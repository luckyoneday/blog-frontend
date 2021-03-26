import * as React from "react"
import * as ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { matchRoutes } from "react-router-config"
import { AppContainer } from "react-hot-loader"

import { OptionContextProps } from "./interface"
import { parseSearch } from "@utils/parseSearch"
import routes from "./routes"
import App from "./App"

const root = document.getElementById("root")
const optContext: OptionContextProps = {
  url: window.location.pathname + window.location.search,
  pathname: window.location.pathname,
  query: parseSearch(),
  hashParams: matchRoutes(routes, location.pathname)?.[0]?.match?.params ?? {}
}

if ((module as any).hot) {
  ;(module as any).hot.accept(() => {
    ReactDOM.render(
      <AppContainer>
        <BrowserRouter>
          <App
            staticContext={null}
            __onedayInitData__={window.__ONEDAY_INIT_DATA__}
            __onedayInitContext__={optContext}
          />
        </BrowserRouter>
      </AppContainer>,
      root
    )
  })
}

const renderMethod = (module as any).hot ? ReactDOM.render : ReactDOM.hydrate
renderMethod(
  <BrowserRouter>
    <App
      staticContext={null}
      __onedayInitData__={window.__ONEDAY_INIT_DATA__}
      __onedayInitContext__={optContext}
    />
  </BrowserRouter>,
  root
)
