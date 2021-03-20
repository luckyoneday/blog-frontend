import * as React from "react"
import { message } from "antd"
import WithStylesHoc from "@components/withStylesHOC"
import Item from "@components/homePage/item"

import ArticleApi from "@api/article"
import { ArticleDetailItem } from "@interface/article"

import Styles from "./index.module.scss"

const { useEffect, useState } = React

function HomePage() {
  const [articleList, setArticleList] = useState<ArticleDetailItem[]>([])

  useEffect(() => {
    getList()
  }, [])

  const getList = async () => {
    try {
      const res = await ArticleApi.getList()

      if (res.success && res.data) {
        setArticleList(res.data.list)
      }
    } catch (err) {
      message.error(err)
    }
  }
  return (
    <section className={Styles.homeWrap}>
      {articleList.length === 0 ? (
        <div className={Styles.empty}>-- 暂无数据 --</div>
      ) : (
        <div className={Styles.listWrap}>
          {articleList.map(d => (
            <Item key={d.articleHash} item={d} />
          ))}
          <div className={Styles.noMore}>-- 加载完毕 --</div>
        </div>
      )}
    </section>
  )
}
export default WithStylesHoc(HomePage, Styles)
