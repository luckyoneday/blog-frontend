import * as React from "react"
import { Input } from "antd"
import markdownIt from "markdown-it"
import hljs from "highlight.js"
import "highlight.js/styles/solarized-light.css"
import DOMPurify from "dompurify"
import WithStylesHoc from "../../components/withStylesHOC"
import Styles from "./index.module.scss"

const { useEffect, useState } = React
const { TextArea } = Input

function WritePage(props: any) {
  const [value, setValue] = useState("")
  const md = new markdownIt({
    highlight: function (str, lang) {
      let newLang = lang
      try {
        newLang = hljs.getLanguage(lang)?.name || lang
      } catch (r) {
        console.log(r)
      }

      const lineLength = str.split("\n").length - 1
      let lineDom = `<div aria-hidden="true" class=${Styles["line-numbers-rows"]}>`
      for (let i = 0; i < lineLength; i++) {
        lineDom = lineDom + `<div class=${Styles["line-number"]}>${i}</div>`
      }
      lineDom += `</div>`
      if (newLang) {
        try {
          let html = hljs.highlight(lang, str).value
          if (lineLength) {
            html += `</code><b class=${Styles["lang-name"]}>${newLang}</b>`
          }
          return `<pre class="hljs" style="padding-left: 30px">${lineDom}<code class="${newLang}">${html}</pre>`
        } catch (r) {
          console.log(r)
        }
      }
      return str
    }
  })

  const html = DOMPurify.sanitize ? DOMPurify.sanitize(md.render(value)) : ""

  return (
    <section className={Styles.wrap}>
      <div className={Styles.header}>
        <Input size="large" placeholder="请输入文章名称" bordered={false} />
      </div>
      <div className={Styles.article}>
        <div className={Styles.create}>
          <div className={Styles.contentPart}>
            <TextArea
              bordered={false}
              autoSize={{ minRows: 22, maxRows: 30 }}
              value={value}
              placeholder="请输入文章内容"
              onChange={e => setValue(e.target.value)}
            ></TextArea>
          </div>
        </div>
        <div className={Styles.preview}>
          <div className={Styles.contentPart}>
            <div dangerouslySetInnerHTML={{ __html: html }}></div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default WithStylesHoc(WritePage, Styles)
