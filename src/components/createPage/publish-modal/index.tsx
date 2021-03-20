import * as React from "react"
import { Form, Button, message, Modal, Select, Upload } from "antd"
import { UploadOutlined } from "@ant-design/icons"

import { ResponseProps } from "@interface/index"
import { DraftDetailItem } from "@interface/draft"
import ArticleApi from "@api/article"
import UserApi from "@api/index"

import Styles from "./index.module.scss"

const { useState, useEffect } = React

interface IFormProps {
  docInfo?: DraftDetailItem
  visible: boolean
  onHide: () => void
}

const formItemLayout = {
  labelCol: { span: 8 }
}
function PublishModal(props: IFormProps) {
  const { docInfo = {} as DraftDetailItem, visible, onHide } = props
  const [file, setFile] = useState([] as any)
  const [form] = Form.useForm()

  // 如果是编辑文章，draftDetail 也会有 articleHash
  const getDocInitInfo = async (hash: string) => {
    try {
      const res = await ArticleApi.getDetail({ articleHash: hash })
      if (res.success) {
        form.setFieldsValue({ cover: res.data?.cover, visibleStatus: res.data?.visibleStatus })
        setFile([{ url: res.data?.cover, uid: "init", name: "cover.png", status: "done" }])
      }
    } catch (error) {
      message.error(error.message ?? "服务器开小差了，请稍后重试")
    }
  }

  useEffect(() => {
    if (!visible) return
    if (docInfo.articleHash) {
      getDocInitInfo(docInfo.articleHash)
    }
  }, [docInfo.articleHash, visible])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    form
      .validateFields()
      .then(values => {
        const postData = { ...docInfo, ...values, cover: file?.[0]?.url || "" }
        const method = postData.articleHash ? "update" : "create"

        ArticleApi[method](postData)
          .then(res => {
            if (res.success) {
              const articleHash = res.data.articleHash
              message.success("操作成功", 1, () => {
                location.href = `/detail/${articleHash}`
              })
            }
          })
          .catch((error: ResponseProps) => {
            message.error(error.message ?? "服务器开小差了")
          })
      })
      .catch((error: ResponseProps) => {
        message.error(error.message + "，请重新输入", 1, () => {
          form.resetFields()
        })
      })
  }

  const customUpload = async (options: any) => {
    const formData = new FormData()
    formData.append("image", options.file)
    // formData.append("token", "2d2df3673fb4ff7d82b15e2ce0c65c1b")
    formData.append("apiType", "ali")

    const uploadRes = await UserApi.uploadImage(formData)
    if (uploadRes && uploadRes.ali) {
      setFile([{ ...options.file, status: "done", url: uploadRes.ali }])
      options.onSuccess()
    }
  }

  return (
    <Modal title="发布文章" visible={visible} width={360} footer={null} onCancel={onHide}>
      <div className={Styles.formSection}>
        <Form
          onFinish={handleSubmit}
          className={Styles.form}
          form={form}
          {...formItemLayout}
          initialValues={{ visibleStatus: "1" }}
        >
          <Form.Item name="cover" label="上传封面图">
            <Upload
              name="logo"
              maxCount={1}
              listType="picture"
              accept="image/*"
              fileList={file}
              customRequest={customUpload}
              onRemove={() => {
                setFile([])
              }}
            >
              <Button icon={<UploadOutlined />}>点击上传</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="visibleStatus" label="选择可见范围">
            <Select>
              <Select.Option value="0">仅自己可见</Select.Option>
              <Select.Option value="1">对外可见</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={Styles.publishBtn}>
              发布
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}

export default PublishModal
