import { ResponseModel } from "../response/responseModel";
import { Color } from "./color";

export interface ColorResponse extends ResponseModel{
  data : Color[]
}
