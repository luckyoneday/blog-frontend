import * as React from "react"
import { message } from "antd"
import { useParams } from "react-router-dom"

import ArticleApi from "@api/article"
import { ArticleDetailItem } from "@interface/article"
import WithStylesHoc from "@components/withStylesHOC"

import styles from "./index.module.scss"
import MarkDownToHtml from "@components/mdToHtml"

const { useState, useEffect } = React
function DetailPage() {
  const hash = useParams() as { hash: string }
  const articleHash = hash.hash || ""

  const [detailInfo, setDetailInfo] = useState<ArticleDetailItem>({} as ArticleDetailItem)

  const getArticleDetail = async () => {
    try {
      const res = await ArticleApi.getDetail({ articleHash })
      if (res && res.data) {
        setDetailInfo(res.data)
      }
    } catch (e) {
      message.warn(e.errorMsg ?? "服务器开小差了")
    }
  }
  useEffect(() => {
    getArticleDetail()
  }, [])

  return (
    <div className={styles.detailWrap}>
      {detailInfo?.cover ? <img src={detailInfo.cover} /> : null}
      <h1 className={styles.title}>{detailInfo?.title}</h1>
      <MarkDownToHtml inputValue={detailInfo?.content || ""} />
    </div>
  )
}

export default WithStylesHoc(DetailPage, styles)
