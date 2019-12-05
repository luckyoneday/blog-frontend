import * as React from "react"
import WithStylesHoc from "../components/withStylesHOC"
import Styles from "./index.module.scss"

const { useEffect, useState } = React

function WritePage(props: any) {
  return (
    <section className={Styles.formSection}>
      <div>这是写文章页</div>
    </section>
  )
}
export default WithStylesHoc(WritePage, Styles)
