import { Brand } from "./brand"
import { Color } from "./color"

export interface Car{
  id:number
  description :string
  brand :Brand
  color: Color
  modelYear: number
  coverImage :string
  dailyPrice: number
}
