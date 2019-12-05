import Koa from "koa"
import Router from "koa-router"
import * as React from "react"
import { StaticRouterContext } from "react-router"
import { StaticRouter } from "react-router-dom"
import Static from "koa-static"
import * as ReactDOMServer from "react-dom/server"
import * as fs from "fs"
import * as process from "process"
import App from "../src/App"

const template = fs.readFileSync(process.cwd() + "/dist/index.html", "utf-8")
const cssFiles = fs.readFileSync(process.cwd() + "/dist/main.css", "utf-8")

const PORT = 4555
const app = new Koa()
const router = new Router()

router.get("*", async (ctx: Koa.Context) => {
  const context = { css: [] }
  const content = ReactDOMServer.renderToString(
    <StaticRouter context={context as StaticRouterContext} location={ctx.request.url}>
      <App staticContext={context as StaticRouterContext} />
    </StaticRouter>
  )

  const cssStr = context.css.length ? context.css.join("\n") : ""
  ctx.body = template
    .replace("<!-- this will be replaced by render  -->", content)
    .replace("/* this will be replaced by css */", cssStr + cssFiles)
  ctx.type = "html"
})

app.use(Static("dist"))
app.use(router.routes())

app.listen(PORT)
console.log("app is listening at port" + PORT)
