import * as React from "react"
import Styles from "./index.module.scss"

const { useEffect, useState } = React

export default function WritePage(props: any) {
  return (
    <section className={Styles.formSection}>
      <div>这是写文章页</div>
    </section>
  )
}
