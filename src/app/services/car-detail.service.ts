import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { SingleResponseModel } from '../models/singleResponseModel';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {

  private apiUrl = "https://localhost:7286/api";
  constructor(private httpClient:HttpClient) { }


  getCar(carId:number) : Observable<SingleResponseModel<Car>>
  {
    let apiPath=  this.apiUrl + "/cars/getbyid?id="+carId;
    return this.httpClient.get<SingleResponseModel<Car>>(apiPath);
  }

  getCarImages(carId:number) : Observable<ListResponseModel<CarImage>>
  {
    let apiPath=  this.apiUrl + "/CarImages/GetImagesByCarId?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(apiPath);
  }
}
