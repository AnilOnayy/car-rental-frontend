import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from '../models/rental';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  private apiUrl = "https://localhost:7286/api/rentals/GetRentalsWithDetail";

  constructor(private httpClient:HttpClient) {

   }

   getCustomers() : Observable<ListResponseModel<Rental>>{
      return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl);
   }
}
