import * as React from "react"
import { useParams } from "react-router-dom"
import { message } from "antd"
import { throttle } from "lodash"
import dayjs from "dayjs"

import DraftApi from "@api/draft"
import WithStylesHoc from "@components/withStylesHOC"
import CreateHeader from "@components/createPage/header"
import PublishModal from "@components/createPage/publish-modal"

import Styles from "./index.module.scss"
import CreateContent from "@components/createPage/content"
import { DraftDetailItem } from "@interface/draft"

const { useEffect, useState, useRef } = React

function WritePage() {
  const hash = useParams() as { hash: string }
  const draftHash = hash.hash || ""

  const [publishVisible, setPublishVisible] = useState(false)
  const [docInfo, setDocInfo] = useState<DraftDetailItem>({
    title: "",
    content: ""
  } as DraftDetailItem)
  const [saveTime, setSaveTime] = useState("")

  const docInfoRef = useRef(docInfo)

  docInfoRef.current = docInfo

  useEffect(() => {
    if (!draftHash) window.location.href = "/home"
    DraftApi.getDetail({ draftHash })
      .then(res => {
        if (res.message && res.data) {
          setDocInfo({ ...res.data })
        }
      })
      .catch(error => {
        message.error(error.message ?? "服务器开小差了，请稍后重试")
      })
  }, [draftHash])

  const saveHandler = async (click: boolean) => {
    const params = {
      ...docInfoRef.current,
      title: docInfoRef.current.title,
      content: docInfoRef.current.content
    }
    try {
      const res = await DraftApi.update(params)

      if (res.success) {
        if (click) message.success("保存草稿成功")
        setSaveTime(dayjs().format("MM:DD HH:mm:ss"))
      }
    } catch (error) {
      message.error(error.message ?? "服务器开小差了，请稍后重试")
    }
  }

  const autoSave = React.useCallback(
    throttle(async () => {
      setSaveTime(dayjs().format("MM:DD HH:mm:ss"))
      await saveHandler(false)
    }, 5000),
    []
  )

  const publishHandler = () => {
    setPublishVisible(true)
  }

  return (
    <section className={Styles.wrap}>
      <CreateHeader
        title={docInfo.title}
        onChange={title => {
          setDocInfo(info => ({ ...info, title }))
          autoSave()
        }}
        saveTime={saveTime}
        onSave={() => saveHandler(true)}
        onPublish={publishHandler}
      />
      <CreateContent
        content={docInfo.content}
        onChange={(content: string) => {
          setDocInfo(info => ({ ...info, content }))
          autoSave()
        }}
      />
      <PublishModal
        docInfo={docInfo}
        visible={publishVisible}
        onHide={() => setPublishVisible(false)}
      />
    </section>
  )
}

export default WithStylesHoc(WritePage, Styles)
