import * as React from "react"
import WithStylesHoc from "../components/withStylesHOC"
import Styles from "./index.module.scss"

const { useEffect, useState } = React

function WritePage(props: any) {
  // const []

  useEffect(() => {
    const Editor = process.env.REACT_ENV === "client" ? require("wangeditor") : undefined
    const editor = new Editor(document.querySelector("#oneday-editor"))
    editor.create()
  }, [])

  return (
    <section className={Styles.createSection}>
      <div className={Styles.part}>
        <div>预览</div>
        <div id="oneday-editor"></div>
      </div>
      <div className={Styles.part}></div>
    </section>
  )
}
export default WithStylesHoc(WritePage, Styles)
