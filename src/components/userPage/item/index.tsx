import * as React from "react"
import { Button, Popconfirm } from "antd"

import { DraftDetailItem } from "@interface/draft"
import { ArticleDetailItem } from "@interface/article"

import Styles from "./index.module.scss"

function Item({ item, onDelete, onEdit }: ItemProps) {
  const sliceContent = (content: string) => {
    const newContent = content.trim()
    const contentArr = newContent.split("\n")
    const firstP = contentArr[0]
    return firstP.slice(0, 50) + "..."
  }

  const hash = (item as DraftDetailItem).draftHash
    ? (item as DraftDetailItem).draftHash
    : (item as ArticleDetailItem).articleHash

  return (
    <div className={Styles.listItem}>
      <h3 className={Styles.header}>
        <span>{item?.title || <span className={Styles.empty}>请输入标题</span>}</span>
        <span>
          <Button type="link" onClick={() => onEdit(hash, item)}>
            编辑
          </Button>
          <Popconfirm
            title="确认删除?"
            onConfirm={() => onDelete(hash, item)}
            onCancel={() => {}}
            okText="确认"
            cancelText="取消"
          >
            <Button type="link">删除</Button>
          </Popconfirm>
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

interface ItemProps {
  item: DraftDetailItem | ArticleDetailItem
  onEdit: (hash: string, item: DraftDetailItem | ArticleDetailItem) => void
  onDelete: (hash: string, item: DraftDetailItem | ArticleDetailItem) => void
}

export default Item
