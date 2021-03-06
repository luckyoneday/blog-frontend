import * as React from "react"
import { useParams } from "react-router-dom"
import { message } from "antd"
import { throttle } from "lodash"
import dayjs from "dayjs"

import DraftApi from "@api/draft"
import WithStylesHoc from "@components/withStylesHOC"
import CreateHeader from "@components/createPage/header"

import Styles from "./index.module.scss"
import CreateContent from "@components/createPage/content"

const { useEffect, useState, useRef } = React

function WritePage() {
  const hash = useParams() as { hash: string }
  const draftHash = hash.hash || ""

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [saveTime, setSaveTime] = useState("")
  const titleRef = useRef("")
  const contentRef = useRef("")

  titleRef.current = title
  contentRef.current = content

  useEffect(() => {
    if (!draftHash) location.href = "/home"
    DraftApi.getDetail({ draftHash }).then(res => {
      if (res.message && res.data) {
        setTitle(res.data?.title || "")
        setContent(res.data?.content || "")
      }
    })
  }, [draftHash])

  const saveHandler = async (click: boolean) => {
    const params = { title: titleRef.current, content: contentRef.current, draftHash }
    try {
      const res = await DraftApi.update(params)

      if (res.success) {
        if (click) message.success("保存草稿成功")
        setSaveTime(dayjs().format("MM:DD HH:mm"))
      }
    } catch (error) {
      message.error(error.message ?? "服务器开小差了，请稍后重试")
    }
  }

  const autoSave = React.useCallback(
    throttle(
      async () => {
        setSaveTime(dayjs().format("MM:DD HH:mm"))
        await saveHandler(false)
      },
      5000,
      { leading: false }
    ),
    []
  )

  return (
    <section className={Styles.wrap}>
      <CreateHeader
        title={title}
        onChange={title => {
          setTitle(title)
          autoSave()
        }}
        saveTime={saveTime}
        onSave={() => saveHandler(true)}
        onPublish={() => {}}
      />
      <CreateContent
        content={content}
        onChange={(content: string) => {
          setContent(content)
          autoSave()
        }}
      />
    </section>
  )
}

export default WithStylesHoc(WritePage, Styles)
