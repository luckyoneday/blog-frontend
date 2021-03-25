import * as React from "react"
import { BaseCompProps } from "@interface/index"

export default function WithStylesHoc<T extends BaseCompProps>(Component: any, styles: any) {
  class NewComponent extends React.Component<T> {
    constructor(props: T) {
      super(props)
      if (this.props.staticContext) {
        const css = styles._getCss()
        this.props.staticContext.css.push(css)
      }
    }
    render() {
      // 这里的 props 都传下去，子组件可能会用到 staticContext 来获取样式
      return <Component {...this.props} />
    }

    static loadData: () => Promise<void>
  }

  if (Component.loadData) {
    NewComponent.loadData = Component.loadData
  }

  return NewComponent
}
