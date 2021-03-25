
import { ServerDataProps, InitDataProps } from '@interface/index'

export const transToInitData = (data: ServerDataProps) => {
  const entries = Object.entries(data)

  return entries.reduce((prev, cur) => {
    if (cur[1].status === "done") {
      prev[cur[0]] = cur[1].data
      return prev
    }
    return prev
  }, {} as InitDataProps)
}