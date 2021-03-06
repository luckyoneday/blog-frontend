import * as React from "react"
import { Input, message } from "antd"

import Api from "@api/index"
import MarkDownToHtml from "@components/mdToHtml"

import Styles from "./index.module.scss"

const { useEffect, useRef } = React
const { TextArea } = Input

function CreateContent({ content, onChange }: CreateContentProps) {
  const previewNodeRef = useRef<any>(null)
  const dragPosRef = useRef({ startPos: 0, width: 0 })
  const textareaPosRef = useRef(0)

  useEffect(() => {
    document.addEventListener("mousemove", mouseMoveHandler)
    document.addEventListener("mouseup", mouseUpHandler)
    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler)
      document.removeEventListener("mouseup", mouseUpHandler)
    }
  }, [])

  const dropHandler = (e: React.DragEvent) => {
    e.preventDefault()
    textareaPosRef.current = (e.target as any).selectionStart

    const fileList = e.dataTransfer?.files || []
    if (fileList.length === 0) return
    if (fileList.length > 1) return message.error("单次仅允许上传一个文件")
    const file = fileList[0]
    if (file.type?.indexOf("image") === -1) return message.error("仅允许上传图片文件")

    const formData = new FormData()
    formData.append("image", file)
    // formData.append("token", "2d2df3673fb4ff7d82b15e2ce0c65c1b")
    formData.append("apiType", "ali")

    Api.uploadImage(formData).then(res => {
      if (res && res.ali) {
        const newData =
          content.slice(0, textareaPosRef.current) +
          `\n ![](${res.ali}) \n` +
          content.slice(textareaPosRef.current, content.length)
        onChange(newData)
      }
    })
  }

  const mouseDownHandler = (e: React.MouseEvent) => {
    dragPosRef.current.startPos = e.clientX
    if (previewNodeRef.current) {
      const currentWidth = previewNodeRef.current.getBoundingClientRect()?.width || 0
      dragPosRef.current.width = currentWidth
    }
  }

  const mouseMoveHandler = (e: any) => {
    if (dragPosRef.current.startPos === 0) return

    if (previewNodeRef.current) {
      const diff = e.clientX - dragPosRef.current.startPos
      previewNodeRef.current.style.width = dragPosRef.current.width - diff + "px"
    }
  }

  const mouseUpHandler = () => {
    dragPosRef.current.startPos = 0
  }

  return (
    <div className={Styles.article}>
      <div className={Styles.create}>
        <div className={Styles.contentPart}>
          <TextArea
            bordered={false}
            autoSize={{ minRows: 23 }}
            value={content}
            placeholder="请输入文章内容"
            onChange={e => onChange(e.target.value)}
            onDrop={dropHandler}
          ></TextArea>
        </div>
      </div>
      <div className={Styles.divide} onMouseDown={mouseDownHandler}>
        <div className={Styles.line}></div>
      </div>
      <div className={Styles.preview} ref={node => (previewNodeRef.current = node)}>
        <div className={Styles.contentPart}>
          <MarkDownToHtml inputValue={content} />
        </div>
      </div>
    </div>
  )
}

interface CreateContentProps {
  content: string
  onChange: (content: string) => void
}

export default CreateContent
