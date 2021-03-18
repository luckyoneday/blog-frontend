import { get, post } from "@utils/axios"
import { CreateArticleParams, UpdateArticleParams, ArticleDetailParams, ArticleListParam } from '@interface/article'
import { prefix } from './index'

export default class Api {
  static create = (postData: CreateArticleParams.Request): Promise<CreateArticleParams.Response> => {
    return post(`${prefix}/article/create`, postData)
  }

  static update = (postData: UpdateArticleParams.Request): Promise<UpdateArticleParams.Response> => {
    return post(`${prefix}/article/update`, postData)
  }

  static getDetail = (postData: ArticleDetailParams.Request): Promise<ArticleDetailParams.Response>  => {
    return get(`${prefix}/article/detail`,  postData)
  }

  static delete = (postData: ArticleDetailParams.Request) => {
    return post(`${prefix}/article/delete`, postData)
  }

  static getList = (): Promise<ArticleListParam.Response> => {
    return get(`${prefix}/article/list`)
  }
}