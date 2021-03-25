import * as React from "react"
import { message } from "antd"
import WithStylesHoc from "@components/withStylesHOC"
import WithFetchHoc from "@components/withFetchHOC"
import Item from "@components/homePage/item"

import ArticleApi from "@api/article"
import { BaseCompProps } from "@interface/index"
import { ArticleDetailItem } from "@interface/article"

import Styles from "./index.module.scss"

const { useEffect, useState } = React

function HomePage({ initData, ...otherProps }: HomePageProps) {
  const { list = {} } = initData ?? {}

  const [articleList, setArticleList] = useState<ArticleDetailItem[]>(list?.data?.list ?? [])

  useEffect(() => {
    if (list?.data?.list) setArticleList(list.data.list)
  }, [list])

  // 考虑之后分页可以用
  // const getList = async () => {
  //   try {
  //     const res = await ArticleApi.getAllList()

  //     if (res.success && res.data) {
  //       setArticleList(res.data.list)
  //     }
  //   } catch (err) {
  //     message.error(err)
  //   }
  // }

  return (
    <section className={Styles.homeWrap}>
      {articleList.length === 0 ? (
        <div className={Styles.empty}>-- 暂无数据 --</div>
      ) : (
        <div className={Styles.listWrap}>
          {articleList.map(d => (
            <Item key={d.articleHash} {...otherProps} item={d} />
          ))}
          <div className={Styles.noMore}>-- 加载完毕 --</div>
        </div>
      )}
    </section>
  )
}

const options = {
  list: async () => await ArticleApi.getAllList()
}

interface HomePageProps extends BaseCompProps {}
export default WithFetchHoc(WithStylesHoc(HomePage, Styles), options)
