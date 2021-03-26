import Koa from "koa"
import Router from "koa-router"
import * as React from "react"
import { StaticRouterContext } from "react-router"
import { StaticRouter } from "react-router-dom"
import { matchRoutes } from "react-router-config"
import Static from "koa-static"
import * as ReactDOMServer from "react-dom/server"
import * as fs from "fs"
import * as process from "process"

import { InitDataProps, OptionContextProps } from "../src/interface/index"
import routes from "../src/routes"
import App from "../src/App"

interface ContextProps extends StaticRouterContext {
  css: Array<any>
}

const PORT = 4555
const app = new Koa()

const template = fs.readFileSync(process.cwd() + "/dist/index.html", "utf-8")
const router = new Router()

router.get("*", async (ctx: Koa.Context) => {
  const context: ContextProps = { css: [] }

  const { route: currRoute = {}, match } = matchRoutes(routes, ctx.url)?.[0] ?? {}

  let script = "<noscript>oneday ssr inject data</noscript>"
  let finalData = {}
  const optContext: OptionContextProps = {
    url: ctx.originalUrl ?? ctx.url,
    query: ctx.query ?? {},
    pathname: ctx.path ?? "",
    hashParams: match?.params ?? {}
    // context: ctx ?? {}
  }

  if (currRoute && currRoute.loadData && match) {
    console.log("currRoute", currRoute, ctx.url, optContext)
    const loadData = currRoute.loadData
    const entries = Object.entries(loadData)
    const resArr = await Promise.all(
      entries.map(async ([_key, fetch]: [string, any]) => {
        try {
          const singleRes = await fetch(optContext)

          return {
            status: "done",
            data: singleRes
          }
        } catch (e) {
          return {
            status: "pending",
            data: {}
          }
        }
      })
    )

    finalData = entries.reduce((prev, cur, idx) => {
      prev[cur[0]] = resArr[idx]
      return prev
    }, {} as InitDataProps)

    console.log("data is", finalData)
    script = `<script>window.__ONEDAY_INIT_DATA__=${JSON.stringify(finalData)}</script>`
  }

  const content = ReactDOMServer.renderToString(
    <StaticRouter context={context} location={ctx.request.url}>
      <App
        staticContext={context}
        __onedayInitData__={finalData}
        __onedayInitContext__={optContext}
      />
    </StaticRouter>
  )

  if (context.action === "REPLACE" && context.url) {
    ctx.response.redirect(context.url)
  }

  const cssStr = context.css.length ? context.css.join("\n") : ""
  ctx.body = template
    .replace("<!-- this will be replaced by render  -->", content)
    .replace("/* this will be replaced by css */", cssStr)
    .replace("<noscript>oneday ssr inject data</noscript>", script)
  ctx.type = "html"
})

app.use(Static("dist"))
app.use(router.routes())

app.listen(PORT)
console.log("app is listening at port" + PORT)
