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
