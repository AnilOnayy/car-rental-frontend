import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from '../models/rental';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = "https://localhost:7286/api/";

  constructor(private httpClient:HttpClient) {

   }

  pay()
  {
    let path = this.apiUrl + "payment";
    let body =  {

    }
    this.httpClient.post(path,body);
  }

  getRentalDetails(rentalId : number) : Observable<SingleResponseModel<Rental>>
  {
    let path = this.apiUrl + "rentals/GetById?id="+rentalId;
    return this.httpClient.get<SingleResponseModel<Rental>>(path);
  }
}
