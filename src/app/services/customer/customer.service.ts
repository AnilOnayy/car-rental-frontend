import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerResponse } from 'src/app/models/customer/customerResponse';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  private apiUrl = "https://localhost:7286/api/customers/getCustomersWithDetail";

  constructor(private httpClient:HttpClient) {

   }

   getcustomers() : Observable<CustomerResponse>{
      return this.httpClient.get<CustomerResponse>(this.apiUrl);
   }
}
