import * as React from "react"
import { Tabs } from "antd"
import WithStylesHoc from "@components/withStylesHOC"
import ArticleList from "@components/userPage/article"
import DraftList from "@components/userPage/draft"

import Styles from "./index.module.scss"

const { useEffect, useState } = React
const { TabPane } = Tabs

function UserPage(props: any) {
  const [tabKey, setTabKey] = useState("article")
  return (
    <section className={Styles.formSection}>
      <Tabs onChange={setTabKey} activeKey={tabKey}>
        <TabPane tab="我的文章" key="article">
          <ArticleList />
        </TabPane>
        <TabPane tab="我的草稿" key="draft">
          <DraftList />
        </TabPane>
      </Tabs>
    </section>
  )
}

export default WithStylesHoc(UserPage, Styles)
