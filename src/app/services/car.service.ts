import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { CarDto } from '../models/carDto';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Enviroment } from 'src/environments/enviroment';
import { CarImage } from '../models/carImage';
import { Rental } from '../models/rental';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl = Enviroment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  add(addCarDto: any): Observable<SingleResponseModel<Car>> {
    let requestPath = this.apiUrl + "Cars/Add";
    return this.httpClient.post<SingleResponseModel<Car>>(requestPath, addCarDto);
  }

  update(carDto : CarDto) : Observable<SingleResponseModel<Car>>
  {
    let requestPath = this.apiUrl + "Cars/Update";
    return this.httpClient.put<SingleResponseModel<Car>>(requestPath, carDto);
  }

  delete(carId:number) : Observable<SingleResponseModel<Car>>
  {
    let requestPath = this.apiUrl + "Cars/Delete?id="+carId;
    return this.httpClient.delete<SingleResponseModel<Car>>(requestPath);
  }

  getCars(): Observable<ListResponseModel<Car>> {
    let requestPath = this.apiUrl + "Cars/GetAll";
    return this.httpClient.get<ListResponseModel<Car>>(requestPath);
  }
  getCar(carId: number): Observable<SingleResponseModel<Car>> {
    let apiPath = this.apiUrl + "Cars/GetById?id=" + carId;
    return this.httpClient.get<SingleResponseModel<Car>>(apiPath);
  }

  getCarsByColor(colorId: number): Observable<ListResponseModel<Car>> {
    let requestPath = this.apiUrl + "Cars/GetByColor?colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(requestPath);
  }

  getCarsByBrand(brandId: number): Observable<ListResponseModel<Car>> {
    let requestPath = this.apiUrl + "Cars/GetByBrand?brandId=" + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(requestPath);
  }

  getCarsByFilter(brandId: number, colorId: number) {
    let requestPath = this.apiUrl + `Cars/GetByColorAndBrand?brandId=${brandId}&colorId=${colorId}`;
    return this.httpClient.get<ListResponseModel<Car>>(requestPath);
  }

  rentCar(startDate: string, returnDate: string, carId: number): Observable<SingleResponseModel<Rental>> {
    let apiPath = this.apiUrl + "Rentals/Add";
    let body = {
      rentDate: startDate,
      plannedReturnDate: returnDate,
      carId: carId
    };
    return this.httpClient.post<SingleResponseModel<Rental>>(apiPath, body);
  }


}
