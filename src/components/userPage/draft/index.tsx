import * as React from "react"
import { message } from "antd"
import Item from "../item"

import DraftApi from "@api/draft"
import { DraftDetailItem } from "@interface/draft"

import Styles from "./index.module.scss"

const { useEffect, useState } = React

function UserDraft() {
  const [draftList, setDraftList] = useState<DraftDetailItem[]>([])

  useEffect(() => {
    getList()
  }, [])

  const getList = async () => {
    try {
      const res = await DraftApi.getList()

      if (res.success && res.data) {
        setDraftList(res.data.list)
      }
    } catch (err) {
      message.error(err)
    }
  }

  const editHandler = (hash: string) => {
    window.open("/edit/" + hash)
  }

  const deleteHandler = async (draftHash: string) => {
    try {
      await DraftApi.delete({ draftHash })
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
            <Item key={d.draftHash} item={d} onEdit={editHandler} onDelete={deleteHandler} />
          ))}
          <div className={Styles.noMore}>-- 加载完毕 --</div>
        </div>
      )}
    </section>
  )
}

export default UserDraft
