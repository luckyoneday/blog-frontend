import * as React from "react"
import axios from "../../utils/axios"

import Styles from "./index.module.scss"

const { useEffect, useState } = React

export default function HomePage(props: any) {
  useEffect(() => {
    axios.get("/userInfo").then(res => {
      console.log(res)
    })
  }, [])

  return <section className={Styles.formSection}>这是home页</section>
}
