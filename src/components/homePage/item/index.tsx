import * as React from "react"
import WithStylesHoc from "@components/withStylesHOC"

import { ArticleDetailItem } from "@interface/article"
import { BaseCompProps } from "@interface/index"

import Styles from "./index.module.scss"

function Item({ item }: ItemProps) {
  const sliceContent = (content: string) => {
    const newContent = content.trim()
    const contentArr = newContent.split("\n")
    const firstP = contentArr[0]
    return firstP.slice(0, 50) + "..."
  }

  return (
    <div className={Styles.listItem}>
      <h3 className={Styles.header}>
        <span
          className={item.articleHash ? Styles.title : ""}
          onClick={() => {
            item.articleHash ? window.open("/detail/" + item.articleHash) : () => {}
          }}
        >
          {item?.title || <span className={Styles.empty}>请输入标题</span>}
        </span>
      </h3>
      <div className={Styles.content}>
        {item?.content ? (
          sliceContent(item.content)
        ) : (
          <span className={Styles.empty}>请输入内容</span>
        )}
      </div>
    </div>
  )
}

interface ItemProps extends BaseCompProps {
  item: ArticleDetailItem
}

export default WithStylesHoc<ItemProps>(Item, Styles)
