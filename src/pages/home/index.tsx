import * as React from "react"
import Styles from "./index.module.scss"

const { useEffect, useState } = React

export default function HomePage(props: any) {
  return (
    <section className={Styles.formSection}>
      <div>这是首页</div>
    </section>
  )
}
