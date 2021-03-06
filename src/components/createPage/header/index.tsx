import * as React from "react"
import { Input, Button } from "antd"

import Styles from "./index.module.scss"

function CreateHeader({ saveTime, title, onChange, onSave, onPublish }: CreateHeaderProps) {
  return (
    <div className={Styles.header}>
      <div className={Styles.leftTitle}>
        <Input
          size="large"
          placeholder="请输入文章名称"
          bordered={false}
          value={title}
          onChange={e => {
            onChange(e.target.value)
          }}
        />
      </div>
      <div className={Styles.rightSave}>
        {saveTime.length ? <span className={Styles.autoSave}>已于{saveTime}自动存为草稿</span> : ""}
        <Button onClick={onSave} className={Styles.saveBtn}>
          保存草稿
        </Button>
        <Button onClick={onPublish} type="primary">
          发布文章
        </Button>
      </div>
    </div>
  )
}

interface CreateHeaderProps {
  saveTime: string
  title: string
  onChange: (value: string) => void
  onSave: () => void
  onPublish: () => void
}

export default CreateHeader
