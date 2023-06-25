import { ResponseModel } from "../response/responseModel";
import { Brand } from "./brand";


export interface BrandResponseModel extends ResponseModel{
    data : Brand[]
}
