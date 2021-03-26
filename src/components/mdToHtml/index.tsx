import * as React from "react"
import markdownIt from "markdown-it"
import hljs from "highlight.js"
import DOMPurify from "dompurify"
import Styles from "./index.module.scss"
import "./highlight.css"
import WithStylesHoc from "@components/withStylesHOC"
import { BaseCompProps } from "@interface/index"

function MarkDownToHtml({ inputValue }: MdToHtmlProps) {
  const md = new markdownIt({
    highlight: function (str, lang) {
      let newLang = lang
      try {
        newLang = hljs.getLanguage(lang)?.name || lang
      } catch (r) {
        console.log(r)
      }

      const lineLength = str.split("\n").length - 1
      let lineDom = `<div aria-hidden="true" class=${Styles["line-numbers-rows"]}><b class=${Styles["line-number"]}>code</b>`
      for (let i = 0; i < lineLength; i++) {
        lineDom = lineDom + `<div class=${Styles["line-number"]}>${i + 1}</div>`
      }
      lineDom += `</div>`
      if (newLang) {
        try {
          let html = hljs.highlight(lang, str).value
          if (lineLength) {
            html += `</code>`
          }
          return `<pre class="hljs">${lineDom}<code class="${newLang}"><div class=${Styles["first-line"]}><b>${newLang}</b></div>${html}</pre>`
        } catch (r) {
          console.log(r)
        }
      }
      return str
    }
  })

  const html = DOMPurify.sanitize
    ? DOMPurify.sanitize(md.render(inputValue))
    : md.render(inputValue)

  return <div className={Styles.parsed} dangerouslySetInnerHTML={{ __html: html }}></div>
}

interface MdToHtmlProps extends BaseCompProps {
  inputValue: string
}

export default WithStylesHoc<MdToHtmlProps>(MarkDownToHtml, Styles)
