import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalResponseModel } from 'src/app/models/rental/rentalResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  private apiUrl = "https://localhost:7286/api/rentals/GetRentalsWithDetail";

  constructor(private httpClient:HttpClient) {

   }

   getCustomers() : Observable<RentalResponseModel>{
      return this.httpClient.get<RentalResponseModel>(this.apiUrl);
   }
}
