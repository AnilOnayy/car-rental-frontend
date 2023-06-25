import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarResponse } from 'src/app/models/car/carResponse';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl = "https://localhost:7286/api/cars/getall";

  constructor(private httpClient :HttpClient) { }

getCars() : Observable<CarResponse>
{
  return this.httpClient.get<CarResponse>(this.apiUrl);
}
}
