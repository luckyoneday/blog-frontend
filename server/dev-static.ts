import Koa from "koa"
import webpack from "webpack"
import axios from "axios"
import path from "path"
import serverConfig from "../config/webpack.config.server"
import ReactDomServer from "react-dom/server"
import MemoryFs from "memory-fs"
import proxy from "http-proxy-middleware"

//getTemplate用来获取打包后的模板（内存中）
const getTemplate = () => {
  return new Promise((resolve, reject) => {
    //http去获取dev-server中的index.html
    axios
      .get("http://localhost:8080/index.html")
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  })
}

const Module = module.constructor

//node环境中启动一个webpack 来获取打包后的server-entry.js
const mfs = new MemoryFs()

//服务端使用webpack
const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = mfs
let serverBundle: any
serverCompiler.watch({}, (err, status) => {
  if (err) throw err
  let stats = status.toJson()
  stats.errors.forEach(err => console.error(err))
  stats.warnings.forEach(warn => console.warn(warn))

  // 获取bundle文件路径
  const bundlePath = path.join(serverConfig.output.path, serverConfig.output.filename)
  const bundle = mfs.readFileSync(bundlePath, "utf8")
  const m = new (Module as any)()
  m._compile(bundle)
  serverBundle = m.exports.default
})

module.exports = function(app: Koa) {
  //http 代理：所有通过/public访问的 都代理到http://localhost:8080
  app.use(async (ctx: Koa.Context, next: Koa.Next) => {
    proxy({
      target: "http://localhost:8080"
    })
    next()
  })
  app.use(async (ctx: Koa.Context, next: Koa.Next) => {
    try {
      const template = await getTemplate()
      let content = ReactDomServer.renderToString(serverBundle)
      ctx.body = (template as string).replace("<!-- this will be replaced by render  -->", content)
    } catch (e) {
      console.error(e)
    }
    next()
  })
}
