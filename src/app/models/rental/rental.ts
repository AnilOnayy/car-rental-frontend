import { Car } from "../car/car";

export interface Rental{
  id :number,
  carDetail :Car,
  customerName:string,
  rentDate:string,
  returnDate:string
}
