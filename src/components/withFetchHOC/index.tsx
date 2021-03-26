import * as React from "react"
import {
  BaseCompProps,
  InitDataProps,
  OptionProps,
  ServerDataProps,
  OptionContextProps
} from "@interface/index"
import { transToInitData } from "./util"

interface WithFetchProps extends BaseCompProps {
  __onedayInitData__: ServerDataProps
  __onedayInitContext__: OptionContextProps
}

export default function withFetchHOC<T extends WithFetchProps>(
  Component: any,
  options: OptionProps
) {
  return class App extends React.Component<T> {
    static loadData = { ...options }

    state = { data: transToInitData(this.props.__onedayInitData__ ?? {}) } as {
      data: InitDataProps
    }

    reFetchData = async () => {
      const initData = this.props.__onedayInitData__ ?? {}
      delete window.__ONEDAY_INIT_DATA__

      const entries = Object.entries(options)

      try {
        const resultList = await Promise.all(
          entries.map(async ([key, fetch]: [string, any]) => {
            if (initData[key]?.status === "done") {
              return Promise.resolve(initData[key].data)
            } else {
              const initContext = { ...this.props.__onedayInitContext__ } ?? {}
              return await fetch(initContext)
            }
          })
        )

        const entriesObject = entries.reduce((prev, cur, idx) => {
          prev[cur[0]] = resultList[idx]
          return prev
        }, {} as InitDataProps)

        this.setState({ data: entriesObject })
      } catch (e) {
        console.error("csr fetch error", e)
      }
    }

    componentDidMount() {
      this.reFetchData()
    }

    render() {
      const { __onedayInitData__, __onedayInitContext__, ...otherProps } = this.props
      return <Component {...otherProps} initData={this.state.data} />
    }
  }
}
