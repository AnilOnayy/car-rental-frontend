import { Car } from "./car";
import { UserDto } from "./userDto";

export interface Rental{
  id :number
  carDetail :Car
  userDetail :UserDto
  rentDate:string
  returnDate:string
  price :number
}
