import { ResponseModel } from "./responseModel"

export interface ErrorResponseModel{
  error: ResponseModel
  headers :object
  message:string
  name:string
  ok:boolean
  status:number
  statusText :string
  url : string
}
