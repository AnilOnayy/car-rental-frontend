import { ResponseModel } from "../response/responseModel";
import { Customer } from "./customer";

export interface CustomerResponse extends ResponseModel{
 data : Customer[]
}
