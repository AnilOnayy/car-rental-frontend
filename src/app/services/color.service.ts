import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Color } from '../models/color';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  private apiUrl = "https://localhost:7286/api/colors/getall";

  constructor(private httpClient:HttpClient) {

   }

   getColors() : Observable<ListResponseModel<Color>>{
      return this.httpClient.get<ListResponseModel<Color>>(this.apiUrl);
   }
}