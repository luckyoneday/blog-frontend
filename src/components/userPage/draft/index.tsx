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
    DraftApi.getList()
      .then(res => {
        if (res.success && res.data) {
          setDraftList(res.data.list)
        }
      })
      .catch(err => {
        message.error(err)
      })
  }, [])

  const editHandler = (hash: string) => {
    location.href = "/create/" + hash
  }

  const deleteHandler = (hash: string) => {}

  return (
    <section className={Styles.draft}>
      {draftList.length === 0 ? (
        <div className={Styles.empty}>-- 暂无数据 --</div>
      ) : (
        <div className={Styles.listWrap}>
          {draftList.map(d => (
            <Item key={d.draftHash} item={d} onEdit={editHandler} onDelete={deleteHandler} />
          ))}
        </div>
      )}
    </section>
  )
}

export default UserDraft
