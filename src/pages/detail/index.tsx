import * as React from "react"
import { useParams } from "react-router-dom"

import WithStylesHoc from "@components/withStylesHOC"
import styles from "./index.module.scss"

function DetailPage() {
  const hash = useParams() as { hash: string }
  const draftHash = hash.hash || ""

  return <div></div>
}

export default WithStylesHoc(DetailPage, styles)
