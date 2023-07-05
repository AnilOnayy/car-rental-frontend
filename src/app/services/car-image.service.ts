import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from 'src/environments/enviroment';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { CarImage } from '../models/carImage';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  constructor(
    private httpClient : HttpClient
  ) { }

  private apiUrl : string = Enviroment.apiUrl;

  add( formData : FormData) : Observable<ListResponseModel<CarImage>>
  {
    let requestPath = this.apiUrl + "CarImages/Add";
    return this.httpClient.post<ListResponseModel<CarImage>>(requestPath,formData);

  }

  removeCarImage(carImage :CarImage) : Observable< SingleResponseModel<CarImage>>
  {
    let apiPath = this.apiUrl + `CarImages/Delete?id=${carImage.id}`;
    return this.httpClient.delete<SingleResponseModel<CarImage>>(apiPath);
  }
  getImagesByCar(carId: number): Observable<ListResponseModel<CarImage>> {
    let apiPath = this.apiUrl + "CarImages/GetImagesByCarId?carId=" + carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(apiPath);
  }


}
