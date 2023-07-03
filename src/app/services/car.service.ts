import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { CarAddDto } from '../models/carAddDto';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Enviroment } from 'src/environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl = Enviroment.apiUrl;

  constructor(private httpClient :HttpClient) { }

add(addCarDto :  CarAddDto) : Observable<SingleResponseModel<Car>>
{
  let requestPath =  this.apiUrl + "cars/add";
  return this.httpClient.post<SingleResponseModel<Car>>(requestPath,addCarDto);
}

getCars() : Observable<ListResponseModel<Car>>
{
  let requestPath=  this.apiUrl + "cars/getall";
  return this.httpClient.get<ListResponseModel<Car>>(requestPath);
}

getCarsByColor(colorId:number) : Observable<ListResponseModel<Car>>
{
  let requestPath=  this.apiUrl + "cars/getbycolor?colorId="+colorId;
  return this.httpClient.get<ListResponseModel<Car>>(requestPath);
}

getCarsByBrand(brandId:number) : Observable<ListResponseModel<Car>>
{
  let requestPath=  this.apiUrl + "cars/getbybrand?brandId="+brandId;
  return this.httpClient.get<ListResponseModel<Car>>(requestPath);
}

getCarsByFilter(brandId:number,colorId:number)
{
  let requestPath=  this.apiUrl + `cars/GetByColorAndBrand?brandId=${brandId}&colorId=${colorId}`;
  return this.httpClient.get<ListResponseModel<Car>>(requestPath);
}
}
