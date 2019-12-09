import * as React from "react"
import WithStylesHoc from "../components/withStylesHOC"
import Styles from "./index.module.scss"

const { useEffect, useState } = React

function HomePage(props: any) {
  return (
    <section className={Styles.formSection}>
      <div>这是首页是是是哈是是是生死哈哈</div>
    </section>
  )
}
export default WithStylesHoc(HomePage, Styles)
