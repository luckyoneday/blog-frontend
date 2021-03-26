import * as React from "react"

import ArticleApi from "@api/article"
import { ArticleDetailItem } from "@interface/article"
import WithStylesHoc from "@components/withStylesHOC"

import MarkDownToHtml from "@components/mdToHtml"
import { BaseCompProps, OptionContextProps } from "@interface/index"
import withFetchHOC from "@components/withFetchHOC"

import styles from "./index.module.scss"

const { useState, useEffect } = React

function DetailPage({ initData, ...otherProps }: DetailPageProps) {
  const { detail = {} } = initData ?? {}

  const [detailInfo, setDetailInfo] = useState<ArticleDetailItem>(detail?.data)

  useEffect(() => {
    if (detail.data) setDetailInfo(detail.data)
  }, [detail])

  return (
    <div className={styles.detailWrap}>
      {detailInfo?.cover ? <img src={detailInfo.cover} /> : null}
      <h1 className={styles.title}>{detailInfo?.title}</h1>
      <MarkDownToHtml inputValue={detailInfo?.content || ""} {...otherProps} />
    </div>
  )
}

const options = {
  detail: async (context: OptionContextProps) => {
    const params = context.hashParams
    return await ArticleApi.getDetail({ articleHash: params.hash })
  }
}

interface DetailPageProps extends BaseCompProps {}

export default withFetchHOC(WithStylesHoc<DetailPageProps>(DetailPage, styles), options)
