import { ResponseProps } from "./index"

export interface DraftDetailItem {
  draftHash: string
  title: string
  content: string
  createAt: string
  updateAt: string
}

export namespace CreateDraftParams {
  export interface Request {
    title: string
    content: string
  }

  export interface Response extends ResponseProps {
    data: {
      draftHash: string
    }
  }
}

export namespace UpdateDraftParams {
  export interface Request {
    title: string
    content: string
    draftHash: string
  }

  export interface Response extends ResponseProps {
    data: {
      draftHash: string
    }
  }
}

export namespace DraftDetailParams {
  export interface Request {
    draftHash: string
  }

  export interface Response extends ResponseProps {
    data: DraftDetailItem
  }
}

export namespace DraftListParam {
  
  export interface Response extends ResponseProps {
    data: { list: DraftDetailItem[] }
  }
}
