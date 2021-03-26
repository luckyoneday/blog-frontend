import * as React from "react"
import Layout from "@components/layout"

import Home from "@pages/home/index"
import Edit from "@pages/edit/index"
import User from "@pages/user/index"
import Detail from "@pages/detail/index"

const routes: any[] = [
  {
    path: "/",
    component: Home,
    exact: true,
    render: (props: any) => (
      <Layout path="/" {...props}>
        <Home {...props} />
      </Layout>
    )
  },
  {
    path: "/user",
    component: User,
    render: (props: any) => (
      <Layout path="/user" {...props}>
        <User {...props} />
      </Layout>
    )
  },
  {
    path: "/home",
    component: Home,
    render: (props: any) => (
      <Layout path="/home" {...props}>
        <Home {...props} />
      </Layout>
    ),
    loadData: Home.loadData
  },
  {
    path: "/edit/:hash",
    component: Edit,
    render: (props: any) => (
      <Layout path="/edit/:hash" {...props}>
        <Edit {...props} />
      </Layout>
    ),
    exact: true
  },
  {
    path: "/detail/:hash",
    component: Detail,
    render: (props: any) => (
      <Layout path="/detail/:hash" {...props}>
        <Detail {...props} />
      </Layout>
    ),
    loadData: Detail.loadData,
    exact: true
  }
]

export default routes
