import * as React from "react"
import Styles from "./index.module.scss"

const { useEffect, useState } = React

export default function UserPage(props: any) {
  return (
    <section className={Styles.formSection}>
      <div>这是用户页面</div>
    </section>
  )
}
