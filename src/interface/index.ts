export interface InitDataProps {
  [key: string]: any
}

export interface ServerDataProps {
  [key: string]: {
    status: string
    data: InitDataProps
  }
}

export interface OptionProps {
  [key: string]: () => Promise<any>
}

export interface BaseCompProps {
  initData?: InitDataProps
  staticContext?: any
}

export interface ResponseProps {
  success: boolean
  message: string
  code?: number
  data: any
}

export interface LoginSessionProps extends ResponseProps {
  data: {
    userName: string
  }
}
