import { ResponseProps } from "./index"

export enum VisibleStatusEnum {
  Private = "0",
  Public = "1"
}

export interface ArticleDetailItem {
  articleHash: string
  title: string
  content: string
  cover?: string
  createAt: string
  updateAt: string
  visibleStatus: VisibleStatusEnum
}

export namespace CreateArticleParams {
  export interface Request {
    title: string
    content: string
    cover: string
    visibleStatus: VisibleStatusEnum
  }

  export interface Response extends ResponseProps {
    data: {
      articleHash: string
    }
  }
}

export namespace UpdateArticleParams {
  export interface Request {
    title: string
    content: string
    articleHash: string
    cover: string
    visibleStatus: VisibleStatusEnum
  }

  export interface Response extends ResponseProps {
    data: {
      articleHash: string
    }
  }
}

export namespace ArticleDetailParams {
  export interface Request {
    articleHash: string
  }

  export interface Response extends ResponseProps {
    data: ArticleDetailItem
  }
}

export namespace ArticleListParam {
  export interface Response extends ResponseProps {
    data: { list: ArticleDetailItem[] }
  }
}
