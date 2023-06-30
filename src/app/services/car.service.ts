import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl = "https://localhost:7286/api";

  constructor(private httpClient :HttpClient) { }

getCars() : Observable<ListResponseModel<Car>>
{
  let apiPath=  this.apiUrl + "/cars/getall";
  return this.httpClient.get<ListResponseModel<Car>>(apiPath);
}

getCarsByColor(colorId:number) : Observable<ListResponseModel<Car>>
{
  let apiPath=  this.apiUrl + "/cars/getbycolor?colorId="+colorId;
  return this.httpClient.get<ListResponseModel<Car>>(apiPath);
}

getCarsByBrand(brandId:number) : Observable<ListResponseModel<Car>>
{
  let apiPath=  this.apiUrl + "/cars/getbybrand?brandId="+brandId;
  return this.httpClient.get<ListResponseModel<Car>>(apiPath);
}

getCarsByFilter(brandId:number,colorId:number)
{
  let apiPath=  this.apiUrl + `/cars/GetByColorAndBrand?brandId=${brandId}&colorId=${colorId}`;
  return this.httpClient.get<ListResponseModel<Car>>(apiPath);
}
}
