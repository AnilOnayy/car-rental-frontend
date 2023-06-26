import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  private apiUrl = "https://localhost:7286/api/customers/getCustomersWithDetail";

  constructor(private httpClient:HttpClient) {

   }

   getcustomers() : Observable<ListResponseModel<Customer>>{
      return this.httpClient.get<ListResponseModel<Customer>>(this.apiUrl);
   }
}
