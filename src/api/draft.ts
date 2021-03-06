import { get, post } from "@utils/axios"
import { CreateDraftParams, UpdateDraftParams, DraftDetailParams, DraftListParam } from '@interface/draft'
import { prefix } from './index'

export default class Api {
  static create = (postData: CreateDraftParams.Request): Promise<CreateDraftParams.Response> => {
    return post(`${prefix}/draft/create`, postData)
  }

  static update = (postData: UpdateDraftParams.Request): Promise<UpdateDraftParams.Response> => {
    return post(`${prefix}/draft/update`, postData)
  }

  static getDetail = (postData: DraftDetailParams.Request): Promise<DraftDetailParams.Response>  => {
    return get(`${prefix}/draft/detail`,  postData)
  }

  static getList = (): Promise<DraftListParam.Response> => {
    return get(`${prefix}/draft/list`)
  }
}