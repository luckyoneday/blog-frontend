import * as React from "react"

export default function WithStylesHoc(Component: any, styles: any) {
  return class NewComponent extends React.Component<{ staticContext: any }> {
    constructor(props: { staticContext: any }) {
      super(props)
      if (this.props.staticContext) {
        const css = styles._getCss()
        this.props.staticContext.css.push(css)
      }
    }
    render() {
      return <Component {...this.props} />
    }
  }
}
