import { ResponseModel } from "../response/responseModel";
import { Car } from "./car";

export interface CarResponse extends ResponseModel{
    data : Car[];
}
