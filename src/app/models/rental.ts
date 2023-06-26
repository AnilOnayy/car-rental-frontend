import { Car } from "./car";

export interface Rental{
  id :number,
  carDetail :Car,
  customerName:string,
  rentDate:string,
  returnDate:string
}
