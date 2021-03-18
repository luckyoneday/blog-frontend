import * as React from "react"
import { message } from "antd"
import Item from "../item"

import ArticleApi from "@api/article"
import DraftApi from "@api/draft"
import { ArticleDetailItem } from "@interface/article"

import Styles from "./index.module.scss"

const { useEffect, useState } = React

function UserDraft() {
  const [draftList, setDraftList] = useState<ArticleDetailItem[]>([])

  useEffect(() => {
    getList()
  }, [])

  const getList = async () => {
    try {
      const res = await ArticleApi.getList()

      if (res.success && res.data) {
        setDraftList(res.data.list)
      }
    } catch (err) {
      message.error(err)
    }
  }

  const editHandler = async (hash: string, item: any) => {
    try {
      const res = await DraftApi.create({
        title: item.title,
        content: item.content,
        articleHash: hash
      })
      if (res.success) {
        const hash = res.data.draftHash
        window.open(`/edit/${hash}`)
      }
    } catch (e) {
      message.error("创建失败，请稍后重试" + e)
    }
  }

  const deleteHandler = async (articleHash: string) => {
    try {
      await ArticleApi.delete({ articleHash })
      await getList()
    } catch (err) {
      message.error(err)
    }
  }

  return (
    <section className={Styles.draft}>
      {draftList.length === 0 ? (
        <div className={Styles.empty}>-- 暂无数据 --</div>
      ) : (
        <div className={Styles.listWrap}>
          {draftList.map(d => (
            <Item key={d.articleHash} item={d} onEdit={editHandler} onDelete={deleteHandler} />
          ))}
          <div className={Styles.noMore}>-- 加载完毕 --</div>
        </div>
      )}
    </section>
  )
}

export default UserDraft
