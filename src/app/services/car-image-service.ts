import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enviroment } from 'src/environments/enviroment';
import { CarImage } from '../models/car-image';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';

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
}
