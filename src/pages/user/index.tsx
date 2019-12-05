import * as React from "react"
import WithStylesHoc from "../components/withStylesHOC"
import Styles from "./index.module.scss"

const { useEffect, useState } = React

function UserPage(props: any) {
  return (
    <section className={Styles.formSection}>
      <div>这是用户页面</div>
    </section>
  )
}

export default WithStylesHoc(UserPage, Styles)
