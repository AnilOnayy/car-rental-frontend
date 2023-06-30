import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Rental } from '../models/rental';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = "https://localhost:7286/api/";

  constructor(private httpClient:HttpClient) {

   }

  pay(ccnumber:string,expiration:string,cvv:number,rentalId:number,price:number) : Observable<SingleResponseModel<Rental>>
  {
    let path = this.apiUrl + "payments/add";
    let body =  {
      rentalId : rentalId,
      creditCardNumber : ccnumber,
      expireDate : expiration,
      securityCode : cvv,
      price:price
    }
    return this.httpClient.post<SingleResponseModel<Rental>>(path,body);
  }

  getRentalDetails(rentalId : number) : Observable<SingleResponseModel<Rental>>
  {
    let path = this.apiUrl + "rentals/GetById?id="+rentalId;
    return this.httpClient.get<SingleResponseModel<Rental>>(path);
  }
}
