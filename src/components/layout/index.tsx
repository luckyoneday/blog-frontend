import * as React from "react"
import Nav from "../nav"
import { AppProps } from "../../App"

import "./index.css"

interface LayoutProps extends AppProps {
  path: string
  children: React.ReactNode
}

const noNavPageUrl = ["/edit"]
export default function Layout(props: LayoutProps) {
  const hasNavPage = noNavPageUrl.filter(t => props.path.indexOf("t") === -1).length > 0

  return (
    <>
      {hasNavPage ? (
        <div id="oneday-blog-nav">
          <Nav staticContext={props.staticContext} />
        </div>
      ) : null}
      <div id={hasNavPage ? "oneday-blog-body" : "oneday-blog-body-full"}>{props.children}</div>
      <div id="oneday-blog-footer">oneday blog @2021 by 武当王也</div>
    </>
  )
}
